// ════════════════════════════════════════════════════════
//  globe.js — Purple Plasma Globe
//  Drop-in for contact section. Zero dependencies.
//  Renders into #contact-globe canvas.
// ════════════════════════════════════════════════════════

// ════════════════════════════════════════════════════
//  PLASMA GLOBE — Pure WebGL
//  Glass shell (fresnel) + Volumetric plasma + Particles
// ════════════════════════════════════════════════════

// FIX: wrap everything in DOMContentLoaded so canvas is guaranteed to exist
// and the globe never blocks button clicks during early page parse
(function () {
  function initGlobe() {
    const canvas = document.getElementById('contact-globe');
    if (!canvas) return; // FIX: silently bail if section not present

    // FIX: pointer-events none — canvas must NEVER intercept button clicks
    canvas.style.pointerEvents = 'none';

    const gl = canvas.getContext('webgl', { antialias: true, alpha: true, premultipliedAlpha: false });
    if (!gl) {
      console.warn('Globe: WebGL not available, skipping.');
      return; // FIX: don't replace entire page body, just skip
    }

    gl.getExtension('OES_standard_derivatives');
    gl.getExtension('OES_element_index_uint');

    // ── RAF handle (needed for context loss cancellation) ──────────────────
    let rafId = null;
    let isContextLost = false;

    // FIX: context loss handler — stops the loop so buttons stay clickable
    canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      isContextLost = true;
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }, false);

    // FIX: context restored — rebuild and restart
    canvas.addEventListener('webglcontextrestored', () => {
      isContextLost = false;
      initPrograms();
      rafId = requestAnimationFrame(draw);
    }, false);

    // ── Size ───────────────────────────────────────────────────────────────
    let W, H;
    function resize() {
      const parent = canvas.parentElement;
      const maxSz  = parent ? Math.min(parent.offsetWidth, 480) : 420;
      const sz     = Math.min(window.innerWidth * 0.45, maxSz, 460);
      W = H = sz;
      canvas.width        = W * devicePixelRatio;
      canvas.height       = H * devicePixelRatio;
      canvas.style.width  = W + 'px';
      canvas.style.height = H + 'px';
      if (!isContextLost) gl.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();
    window.addEventListener('resize', resize);

    // ── Theme ──────────────────────────────────────────────────────────────
    const PALETTE = {
      colorDeep:    [0.04, 0.04, 0.18],
      colorMid:     [0.10, 0.04, 0.48],
      colorBright:  [0.61, 0.36, 0.90],
      shellColor:   [0.48, 0.19, 1.00],
      shellOpacity: 0.41,
      brightness:   1.31,
      threshold:    0.072,
    };
    const theme = () => PALETTE;

    // ── Shader compiler ────────────────────────────────────────────────────
    function mkShader(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s));
      return s;
    }
    function mkProg(vs, fs) {
      const p = gl.createProgram();
      gl.attachShader(p, mkShader(gl.VERTEX_SHADER, vs));
      gl.attachShader(p, mkShader(gl.FRAGMENT_SHADER, fs));
      gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) console.error(gl.getProgramInfoLog(p));
      return p;
    }

    // ── Sphere geometry ────────────────────────────────────────────────────
    function makeSphere(radius, segs) {
      const pos = [], nrm = [], idx = [];
      for (let lat = 0; lat <= segs; lat++) {
        const theta = lat * Math.PI / segs;
        const sinT = Math.sin(theta), cosT = Math.cos(theta);
        for (let lon = 0; lon <= segs; lon++) {
          const phi = lon * 2 * Math.PI / segs;
          const x = Math.cos(phi) * sinT, y = cosT, z = Math.sin(phi) * sinT;
          pos.push(x * radius, y * radius, z * radius);
          nrm.push(x, y, z);
        }
      }
      for (let lat = 0; lat < segs; lat++) {
        for (let lon = 0; lon < segs; lon++) {
          const a = lat * (segs + 1) + lon;
          const b = a + segs + 1;
          idx.push(a, b, a + 1, b, b + 1, a + 1);
        }
      }
      return {
        pos: new Float32Array(pos),
        nrm: new Float32Array(nrm),
        idx: new Uint16Array(idx),
        count: idx.length
      };
    }

    // ── GLSL noise ─────────────────────────────────────────────────────────
    const NOISE_GLSL = `
precision highp float;

vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}

float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);
  const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(
    i.z+vec4(0.,i1.z,i2.z,1.))
    +i.y+vec4(0.,i1.y,i2.y,1.))
    +i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;
  vec4 s1=floor(b1)*2.+1.;
  vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
  m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

float fbm(vec3 p){
  float total=0.;float amp=0.5;float freq=1.;
  for(int i=0;i<3;i++){total+=snoise(p*freq)*amp;amp*=0.5;freq*=2.;}
  return total;
}
`;

    // ── Shader sources ─────────────────────────────────────────────────────
    const PLASMA_VS = `
precision highp float;
attribute vec3 aPos;
attribute vec3 aNrm;
uniform mat4 uMVP;
uniform mat4 uMV;
uniform mat3 uNM;
varying vec3 vPos;
varying vec3 vNormal;
varying vec3 vViewPos;
void main(){
  vPos = aPos;
  vNormal = normalize(uNM * aNrm);
  vec4 mv = uMV * vec4(aPos, 1.0);
  vViewPos = -mv.xyz;
  gl_Position = uMVP * vec4(aPos, 1.0);
}`;

    const PLASMA_FS = NOISE_GLSL + `
varying vec3 vPos;
varying vec3 vNormal;
varying vec3 vViewPos;
uniform float uTime;
uniform float uScale;
uniform float uBrightness;
uniform float uThreshold;
uniform vec3  uColorDeep;
uniform vec3  uColorMid;
uniform vec3  uColorBright;
void main(){
  vec3 p = vPos * uScale;
  vec3 q = vec3(
    fbm(p + vec3(0.0, uTime*0.05, 0.0)),
    fbm(p + vec3(5.2, 1.3, 2.8) + uTime*0.05),
    fbm(p + vec3(2.2, 8.4, 0.5) - uTime*0.02)
  );
  float density = fbm(p + 2.0*q);
  float t = (density + 0.4) * 0.8;
  float alpha = smoothstep(uThreshold, 0.7, t);
  vec3 cWhite = vec3(1.0);
  vec3 color = mix(uColorDeep,  uColorMid,    smoothstep(uThreshold, 0.5, t));
  color       = mix(color,      uColorBright,  smoothstep(0.5, 0.8, t));
  color       = mix(color,      cWhite,        smoothstep(0.8, 1.0, t));
  vec3 N = normalize(vNormal);
  vec3 V = normalize(vViewPos);
  float facing = dot(N, V);
  float depthFactor = (facing + 1.0) * 0.5;
  float finalAlpha = alpha * (0.02 + 0.98 * depthFactor);
  gl_FragColor = vec4(color * uBrightness, finalAlpha);
}`;

    const SHELL_VS = `
precision highp float;
attribute vec3 aPos;
attribute vec3 aNrm;
uniform mat4 uMVP;
uniform mat4 uMV;
uniform mat3 uNM;
varying vec3 vNormal;
varying vec3 vViewPos;
void main(){
  vNormal  = normalize(uNM * aNrm);
  vec4 mv  = uMV * vec4(aPos,1.0);
  vViewPos = -mv.xyz;
  gl_Position = uMVP * vec4(aPos,1.0);
}`;

    const SHELL_FS = `
precision highp float;
varying vec3 vNormal;
varying vec3 vViewPos;
uniform vec3  uColor;
uniform float uOpacity;
void main(){
  float fresnel = pow(1.0 - dot(normalize(vNormal), normalize(vViewPos)), 2.5);
  gl_FragColor = vec4(uColor, fresnel * uOpacity);
}`;

    const PART_VS = `
precision highp float;
attribute vec3 aPos;
attribute float aSize;
uniform mat4 uMVP;
uniform float uTime;
uniform float uPixelRatio;
varying float vAlpha;
void main(){
  vec3 pos = aPos;
  pos.y += sin(uTime*0.2 + aPos.x*3.0)*0.02;
  pos.x += cos(uTime*0.15 + aPos.z*3.0)*0.02;
  vec4 clip = uMVP * vec4(pos, 1.0);
  gl_Position = clip;
  float baseSize = (8.0*aSize + 4.0) * uPixelRatio;
  gl_PointSize = baseSize / (clip.w * 0.5);
  vAlpha = 0.8 + 0.2*sin(uTime + aSize*10.0);
}`;

    const PART_FS = `
precision highp float;
uniform vec3 uColor;
varying float vAlpha;
void main(){
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  if(d > 0.5) discard;
  float glow = pow(1.0 - d*2.0, 1.8);
  gl_FragColor = vec4(uColor, glow * vAlpha);
}`;

    // ── Programs + buffers (extracted so they can be rebuilt on context restore)
    let plasmaProg, shellProg, partProg, sphereBufs, pPosBuf, pSzBuf;

    function mkSphereBufs(geo) {
      const posBuf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
      gl.bufferData(gl.ARRAY_BUFFER, geo.pos, gl.STATIC_DRAW);

      const nrmBuf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, nrmBuf);
      gl.bufferData(gl.ARRAY_BUFFER, geo.nrm, gl.STATIC_DRAW);

      const idxBuf = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuf);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geo.idx, gl.STATIC_DRAW);

      return { posBuf, nrmBuf, idxBuf, count: geo.count };
    }

    // Particle data stays in CPU memory so it can be re-uploaded after restore
    const PCOUNT = 600;
    const pPos   = new Float32Array(PCOUNT * 3);
    const pSizes = new Float32Array(PCOUNT);
    for (let i = 0; i < PCOUNT; i++) {
      const r     = 0.95 * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      pPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPos[i * 3 + 2] = r * Math.cos(phi);
      pSizes[i]       = Math.random();
    }

    // FIX: initPrograms is a function so it can be called again after context restore
    function initPrograms() {
      plasmaProg = mkProg(PLASMA_VS, PLASMA_FS);
      shellProg  = mkProg(SHELL_VS,  SHELL_FS);
      partProg   = mkProg(PART_VS,   PART_FS);

      const sphere = makeSphere(1.0, 64);
      sphereBufs   = mkSphereBufs(sphere);

      pPosBuf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, pPosBuf);
      gl.bufferData(gl.ARRAY_BUFFER, pPos, gl.STATIC_DRAW);

      pSzBuf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, pSzBuf);
      gl.bufferData(gl.ARRAY_BUFFER, pSizes, gl.STATIC_DRAW);
    }

    initPrograms();

    // ── Matrix math ────────────────────────────────────────────────────────
    const m4 = {
      identity() { return new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]); },
      perspective(fov, asp, near, far) {
        const f = 1 / Math.tan(fov / 2), nf = 1 / (near - far);
        return new Float32Array([
          f/asp,0,0,0,
          0,f,0,0,
          0,0,(far+near)*nf,-1,
          0,0,2*far*near*nf,0
        ]);
      },
      multiply(a, b) {
        const r = new Float32Array(16);
        for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
          let s = 0; for (let k = 0; k < 4; k++) s += a[i + k*4] * b[k + j*4];
          r[i + j*4] = s;
        }
        return r;
      },
      rotateX(m, a) {
        const c=Math.cos(a), s=Math.sin(a), r=new Float32Array(m);
        const m1=m[4],m5=m[5],m6=m[6],m7=m[7];
        const m2=m[8],m9=m[9],m10=m[10],m11=m[11];
        r[4]=m1*c+m2*s; r[5]=m5*c+m9*s; r[6]=m6*c+m10*s; r[7]=m7*c+m11*s;
        r[8]=-m1*s+m2*c; r[9]=-m5*s+m9*c; r[10]=-m6*s+m10*c; r[11]=-m7*s+m11*c;
        return r;
      },
      rotateY(m, a) {
        const c=Math.cos(a), s=Math.sin(a), r=new Float32Array(m);
        r[0]=m[0]*c-m[8]*s;  r[2]=m[0]*s+m[8]*c;
        r[4]=m[4]*c-m[9]*s;  r[6]=m[4]*s+m[9]*c;
        r[8]=m[8]*c-m[10]*s; r[10]=m[8]*s+m[10]*c;
        return r;
      },
      translate(m, x, y, z) {
        const r = new Float32Array(m);
        r[12]=m[0]*x+m[4]*y+m[8]*z+m[12];
        r[13]=m[1]*x+m[5]*y+m[9]*z+m[13];
        r[14]=m[2]*x+m[6]*y+m[10]*z+m[14];
        r[15]=m[3]*x+m[7]*y+m[11]*z+m[15];
        return r;
      },
      normalMatrix(mv) {
        return new Float32Array([
          mv[0],mv[1],mv[2],
          mv[4],mv[5],mv[6],
          mv[8],mv[9],mv[10]
        ]);
      }
    };

    // ── Uniform helpers ────────────────────────────────────────────────────
    function uLoc(prog, name) { return gl.getUniformLocation(prog, name); }
    function bindSphere(prog, bufs) {
      const aP = gl.getAttribLocation(prog, 'aPos');
      const aN = gl.getAttribLocation(prog, 'aNrm');
      gl.bindBuffer(gl.ARRAY_BUFFER, bufs.posBuf);
      gl.enableVertexAttribArray(aP);
      gl.vertexAttribPointer(aP, 3, gl.FLOAT, false, 0, 0);
      if (aN >= 0) {
        gl.bindBuffer(gl.ARRAY_BUFFER, bufs.nrmBuf);
        gl.enableVertexAttribArray(aN);
        gl.vertexAttribPointer(aN, 3, gl.FLOAT, false, 0, 0);
      }
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufs.idxBuf);
    }

    // ── Rotation state ─────────────────────────────────────────────────────
    let rotX = 0, rotY2 = 0;
    const START = performance.now();

    // ── Draw loop ──────────────────────────────────────────────────────────
    function draw() {
      // FIX: hard guard — never touch a lost context
      if (isContextLost || gl.isContextLost()) return;

      const elapsed   = (performance.now() - START) / 1000;
      const th        = theme();

      rotX     += 0.002;
      rotY2    += 0.005;
      const plasmaRotY = elapsed * 0.08;

      const proj = m4.perspective(75 * Math.PI / 180, 1.0, 0.1, 100);
      let view   = m4.identity();
      view       = m4.translate(view, 0, 0, -2.4);

      let model  = m4.identity();
      model      = m4.rotateX(model, rotX);
      model      = m4.rotateY(model, rotY2);
      const mv   = m4.multiply(view, model);
      const mvp  = m4.multiply(proj, mv);
      const nm   = m4.normalMatrix(mv);

      let plasmaModel = m4.identity();
      plasmaModel     = m4.rotateX(plasmaModel, rotX);
      plasmaModel     = m4.rotateY(plasmaModel, rotY2 + plasmaRotY);
      const plasmaMV  = m4.multiply(view, plasmaModel);
      const plasmaMVP = m4.multiply(proj, plasmaMV);
      const plasmaNM  = m4.normalMatrix(plasmaMV);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
      gl.disable(gl.DEPTH_TEST);
      gl.depthMask(false);

      // Shell back
      gl.useProgram(shellProg);
      bindSphere(shellProg, sphereBufs);
      gl.uniformMatrix4fv(uLoc(shellProg,'uMVP'), false, mvp);
      gl.uniformMatrix4fv(uLoc(shellProg,'uMV'),  false, mv);
      gl.uniformMatrix3fv(uLoc(shellProg,'uNM'),  false, nm);
      gl.uniform3f(uLoc(shellProg,'uColor'), 0, 0, 0.33);
      gl.uniform1f(uLoc(shellProg,'uOpacity'), 0.3);
      gl.frontFace(gl.CW);
      gl.drawElements(gl.TRIANGLES, sphereBufs.count, gl.UNSIGNED_SHORT, 0);

      // Plasma
      gl.useProgram(plasmaProg);
      bindSphere(plasmaProg, sphereBufs);
      gl.uniformMatrix4fv(uLoc(plasmaProg,'uMVP'), false, plasmaMVP);
      gl.uniformMatrix4fv(uLoc(plasmaProg,'uMV'),  false, plasmaMV);
      gl.uniformMatrix3fv(uLoc(plasmaProg,'uNM'),  false, plasmaNM);
      gl.uniform1f(uLoc(plasmaProg,'uTime'),       elapsed * 0.78);
      gl.uniform1f(uLoc(plasmaProg,'uScale'),      0.1404);
      gl.uniform1f(uLoc(plasmaProg,'uBrightness'), th.brightness);
      gl.uniform1f(uLoc(plasmaProg,'uThreshold'),  th.threshold);
      gl.uniform3fv(uLoc(plasmaProg,'uColorDeep'),   th.colorDeep);
      gl.uniform3fv(uLoc(plasmaProg,'uColorMid'),    th.colorMid);
      gl.uniform3fv(uLoc(plasmaProg,'uColorBright'), th.colorBright);
      gl.frontFace(gl.CCW);
      gl.drawElements(gl.TRIANGLES, sphereBufs.count, gl.UNSIGNED_SHORT, 0);
      gl.frontFace(gl.CW);
      gl.drawElements(gl.TRIANGLES, sphereBufs.count, gl.UNSIGNED_SHORT, 0);
      gl.frontFace(gl.CCW);

      // Shell front
      gl.useProgram(shellProg);
      bindSphere(shellProg, sphereBufs);
      gl.uniformMatrix4fv(uLoc(shellProg,'uMVP'), false, mvp);
      gl.uniformMatrix4fv(uLoc(shellProg,'uMV'),  false, mv);
      gl.uniformMatrix3fv(uLoc(shellProg,'uNM'),  false, nm);
      gl.uniform3fv(uLoc(shellProg,'uColor'),  th.shellColor);
      gl.uniform1f(uLoc(shellProg,'uOpacity'), th.shellOpacity);
      gl.frontFace(gl.CCW);
      gl.drawElements(gl.TRIANGLES, sphereBufs.count, gl.UNSIGNED_SHORT, 0);

      // Particles
      gl.useProgram(partProg);
      gl.bindBuffer(gl.ARRAY_BUFFER, pPosBuf);
      const aP2 = gl.getAttribLocation(partProg, 'aPos');
      gl.enableVertexAttribArray(aP2);
      gl.vertexAttribPointer(aP2, 3, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, pSzBuf);
      const aSz = gl.getAttribLocation(partProg, 'aSize');
      gl.enableVertexAttribArray(aSz);
      gl.vertexAttribPointer(aSz, 1, gl.FLOAT, false, 0, 0);

      gl.uniformMatrix4fv(uLoc(partProg,'uMVP'), false, mvp);
      gl.uniform1f(uLoc(partProg,'uTime'),       elapsed);
      gl.uniform1f(uLoc(partProg,'uPixelRatio'), devicePixelRatio);
      gl.uniform3f(uLoc(partProg,'uColor'), 1, 1, 1);
      gl.drawArrays(gl.POINTS, 0, PCOUNT);

      // FIX: store rafId so context loss handler can cancel it
      rafId = requestAnimationFrame(draw);
    }

    // FIX: Pause when tab not visible (massive performance gain)
    let isVisible = true;
    document.addEventListener('visibilitychange', () => {
      isVisible = !document.hidden;
      if (isVisible && rafId === null && !isContextLost) {
        rafId = requestAnimationFrame(draw);
      } else if (!isVisible && rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    });

    // FIX: start the loop only after everything is set up
    if (!document.hidden) {
      rafId = requestAnimationFrame(draw);
    }
  }

  // FIX: guarantee canvas exists before touching WebGL
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobe);
  } else {
    initGlobe();
  }
})();