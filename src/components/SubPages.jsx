import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink, Code, Calendar, Clock, IdCard, CheckCircle } from 'lucide-react';
import { portfolioConfig as STATE } from '../data/config';

// Utility for escaping text
const esc = (str) => {
  if (!str && str !== 0) return '';
  return String(str);
};

export const BlogListPage = () => {
  return (
    <div id="blog-list-page" className="page sub-p active">
      <div className="container">
        <Link to="/" className="back-l"><ArrowLeft size={16} />Portfolio</Link>
        <div className="s-lbl">Writing</div><h1 className="s-title">All <em>Posts</em></h1>
        <div className="all-blog-g" id="all-blog-grid">
          {STATE.blogs.map(b => (
            <Link to={`/blog/${b.id}`} className="blog-c" key={b.id} style={{textDecoration:'none'}}>
              <div className="blog-date">{esc(b.date)}</div>
              <div className="blog-t">{esc(b.title)}</div>
              <p className="blog-exc">{esc(b.excerpt)}</p>
              <div className="blog-foot">
                <div className="btags">{(b.tags || []).map((t, idx) => <span key={idx} className="btag">{esc(t)}</span>)}</div>
                <div className="blog-rt"><ArrowRight size={16} />{esc(b.read_time)}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div style={{height:'80px'}}></div>
    </div>
  );
};

export const BlogPostPage = () => {
  const { id } = useParams();
  const b = STATE.blogs.find(x => x.id === id);

  if (!b) return <div className="page sub-p active"><div className="container"><h2>Post Not Found</h2></div></div>;

  const bodyHtml = b.content.split('\n\n').map((p, idx) => {
    if (p.startsWith('## ')) return <h2 key={idx}>{esc(p.slice(3))}</h2>;
    return <p key={idx}>{esc(p)}</p>;
  });

  return (
    <div id="blog-post-page" className="page sub-p active">
      <div className="container" id="blog-post-cont">
        <Link to="/blog" className="back-l">
          <ArrowLeft size={16} />All Posts
        </Link>
        <div className="post-tag">{(b.tags || []).join(' · ')}</div>
        <h1 className="post-title">{esc(b.title)}</h1>
        <div className="post-meta">
          <span>{esc(b.date)}</span>
          <span>·</span>
          <span>{esc(b.read_time)} read</span>
        </div>
        <div className="post-body">{bodyHtml}</div>
      </div>
      <div style={{height:'80px'}}></div>
    </div>
  );
};

export const ProjListPage = () => {
  const projects = STATE.projects || [];
  return (
    <div id="proj-page" className="page sub-p active">
      <div className="container" id="proj-page-cont">
        <Link to="/" className="back-l">
          <ArrowLeft size={16} />Portfolio
        </Link>
        <div className="s-lbl">Projects</div>
        <h1 className="s-title">All <em>Work</em></h1>
        <div className="proj-g" id="all-proj-grid">
          {projects.length === 0 ? (
            <p style={{color:'var(--muted)'}}>No projects found.</p>
          ) : (
            projects.map((p, idx) => (
              <Link to={`/projects/${p.id}`} className="proj-c" key={p.id} style={{textDecoration:'none', display: 'flex', flexDirection: 'column', padding: '32px', gap: '16px'}}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="proj-n" style={{ marginBottom: '8px' }}>0{idx + 1}</div>
                    <h3 className="proj-t" style={{ margin: 0 }}>{esc(p.title)}</h3>
                  </div>
                  {p.featured && <div className="feat-b" style={{ position: 'static', marginTop: '4px' }}>Featured</div>}
                </div>
                
                {p.screenshot_url && (
                  <div className="proj-img" style={{ marginBottom: 0 }}>
                    <img src={p.screenshot_url} alt={esc(p.title)} />
                  </div>
                )}
                
                <p className="proj-d" style={{ margin: 0, flex: 1 }}>{esc(p.description)}</p>
                
                <div className="proj-tags" style={{ margin: 0, gap: '6px' }}>
                  {(p.tech || []).slice(0, 4).map((t, i) => <span key={i} className="ptag">{esc(t)}</span>)}
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
      <div style={{height:'80px'}}></div>
    </div>
  );
};

export const SingleProjPage = () => {
  const { id } = useParams();
  const p = STATE.projects.find(x => x.id === id);

  if (!p) return <div className="page sub-p active"><div className="container"><h2>Project Not Found</h2></div></div>;

  return (
    <div id="proj-page" className="page sub-p active">
      <div className="container" id="proj-page-cont">
        <Link to="/projects" className="back-l">
          <ArrowLeft size={16} />All Projects
        </Link>
        <div className="sp-grid">
          <div>
            <div className="s-lbl" style={{ marginBottom: '16px' }}>{p.type === 'app' ? 'Mobile App' : 'Web Project'}</div>
            <h1 className="pp-title" style={{ fontSize: 'clamp(36px, 5vw, 64px)', marginBottom: '24px' }}>{esc(p.title)}</h1>
            <p className="pp-long" style={{ marginBottom: '36px' }}>{esc(p.long_description || p.description)}</p>
            
            <div style={{ marginBottom: '36px' }}>
              <div className="sb-lbl" style={{ marginBottom: '16px', border: 'none', padding: 0 }}>Tech Stack</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(p.tech || []).map((t, idx) => <span key={idx} className="ptag" style={{ fontSize: '10px', padding: '6px 14px' }}>{esc(t)}</span>)}
              </div>
            </div>
            
            <div className="pp-btns" style={{ marginBottom: 0 }}>
              {p.live_url ? <a href={p.live_url} target="_blank" rel="noreferrer" className="btn-p">Live Demo ↗</a> : null}
              {p.github_url ? <a href={p.github_url} target="_blank" rel="noreferrer" className="btn-s">GitHub ↗</a> : null}
            </div>
          </div>
          
          <div className="pp-screen" style={{ margin: 0, marginTop: '100px', height: 'auto', aspectRatio: '16/10' }}>
            {p.screenshot_url ? <img src={p.screenshot_url} alt={esc(p.title)}/> : <div style={{width:'100%', height:'100%', backgroundColor:'var(--surface)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text2)'}}><span>No Screenshot Provided</span></div>}
          </div>
        </div>
      </div>
      <div style={{height:'80px'}}></div>
    </div>
  );
};

const CertCard = ({ cert }) => {
  const skills = (cert.skills || []).map((s, i) => <span key={i} className="cert-skill-tag">{esc(s)}</span>);
  return (
    <div className="cert-card">
      <div className="cert-card-img">
        {cert.image_url ? <img src={cert.image_url} alt={esc(cert.title)}/> : <div style={{width:'100%', height:'100%', backgroundColor:'var(--surface)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text2)', fontSize:'12px'}}><span>No Certificate Image</span></div>}
      </div>
      <div className="cert-title">{esc(cert.title)}</div>
      <div className="cert-instructor">{esc(cert.instructor || '')}</div>
      <div className="cert-meta">
        <div className="cert-meta-item"><Calendar size={16} />{esc(cert.issued_date || '')}</div>
        {cert.hours ? <div className="cert-meta-item"><Clock size={16} />{esc(cert.hours)} hrs</div> : null}
        {cert.credential_id ? <div className="cert-meta-item"><IdCard size={16} />{esc(cert.credential_id)}</div> : null}
      </div>
      {skills.length > 0 ? <div className="cert-skills">{skills}</div> : null}
      {cert.credential_url ? (
        <a href={cert.credential_url} target="_blank" rel="noreferrer" className="cert-verify-btn">
          <CheckCircle size={16} />Verify Certificate
        </a>
      ) : null}
    </div>
  );
};

export const CertsListPage = () => {
  return (
    <div id="certs-page" className="page sub-p active">
      <div className="container" id="certs-page-cont">
        <Link to="/" className="back-l">
          <ArrowLeft size={16} />Portfolio
        </Link>
        <div className="certs-page-header">
          <div className="s-lbl">All Certifications</div>
          <h1 className="s-title">All <em>Certificates</em></h1>
          <p style={{fontSize:'13px',color:'var(--text2)'}}>
            {STATE.certifications.length} total certifications across {STATE.certSources.length} platforms.
          </p>
        </div>
        {STATE.certSources.map(src => {
          const certs = STATE.certifications.filter(c => c.source_id === src.id);
          if (!certs.length) return null;
          return (
            <div key={src.id} style={{marginBottom:'60px'}}>
              <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'24px',paddingBottom:'14px',borderBottom:'1px solid var(--border)'}}>
                <span style={{ fontSize: '24px', lineHeight: '24px' }}>{src.logo_emoji}</span>
                <span style={{fontFamily:"'DM Serif Display',serif",fontSize:'24px',fontStyle:'italic'}}>{esc(src.name)}</span>
                <span style={{fontSize:'9px',letterSpacing:'2px',color:'var(--text3)'}}>{certs.length} cert{certs.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="certs-g">
                {certs.map(c => <CertCard key={c.id} cert={c} />)}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{height:'80px'}}></div>
    </div>
  );
};

export const CertsSourcePage = () => {
  const { sourceId } = useParams();
  const source = STATE.certSources.find(s => s.id === sourceId);
  const certs = STATE.certifications.filter(c => c.source_id === sourceId);

  return (
    <div id="certs-page" className="page sub-p active">
      <div className="container" id="certs-page-cont">
        <Link to="/" className="back-l">
          <ArrowLeft size={16} />Portfolio
        </Link>
        <div className="certs-page-header">
          <div className="certs-source-badge">
            <span className="certs-source-badge-emoji" style={{ display: 'flex', alignItems: 'center' }}>
              {source ? (
                <span style={{ fontSize: '20px', lineHeight: '20px' }}>{source.logo_emoji}</span>
              ) : '🎓'}
            </span>
            <span className="certs-source-badge-name">{esc(source ? source.name : 'Certifications')}</span>
          </div>
          <div className="s-lbl">Certifications</div>
          <h1 className="s-title">{esc(source ? source.name : 'All')} <em>Certificates</em></h1>
          <p style={{fontSize:'13px',color:'var(--text2)',maxWidth:'500px'}}>
            {certs.length} certificate{certs.length !== 1 ? 's' : ''} earned from {esc(source ? source.name : 'this platform')}.
          </p>
        </div>
        <div className="certs-g">
          {certs.map(c => <CertCard key={c.id} cert={c} />)}
        </div>
        <div className="cert-all-strip">
          <span className="cert-strip-label">Other sources</span>
          {STATE.certSources.filter(s => s.id !== sourceId).map(s => (
            <Link to={`/certs/${s.id}`} key={s.id} className="cert-strip-chip" style={{textDecoration:'none', color:'inherit'}}>
              <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: '6px' }}>
                <span style={{ fontSize: '16px', lineHeight: '16px' }}>{s.logo_emoji}</span>
              </span> {esc(s.name)}
            </Link>
          ))}
          <Link to="/certs" className="cert-strip-chip" style={{textDecoration:'none', color:'inherit'}}>
            <span>📋</span> View All
          </Link>
        </div>
      </div>
      <div style={{height:'80px'}}></div>
    </div>
  );
};

export const ResumePage = () => {
  const { personal, social } = STATE;
  const socialUrls = personal.socials || social;
  const resumeUrl = socialUrls?.resume || '#';
  
  // Google Drive requires /preview to be embedded in an iframe
  const isGoogleDrive = resumeUrl.includes('drive.google.com');
  const iframeUrl = isGoogleDrive 
    ? resumeUrl.replace(/\/view.*$/, '/preview') 
    : resumeUrl;

  // Extract ID for direct download if Google Drive
  let downloadUrl = resumeUrl;
  if (isGoogleDrive) {
    const match = resumeUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      downloadUrl = `https://drive.google.com/uc?export=download&id=${match[1]}`;
    }
  }

  return (
    <div id="resume-page" className="page sub-p active" style={{ height: '100dvh', width: '100vw', display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0, margin: 0 }}>
      <div id="resume-page-cont" style={{ display: 'flex', flexDirection: 'column', flex: 1, paddingTop: '85px', paddingBottom: '0px', width: '100%', paddingLeft: '15px', paddingRight: '15px', boxSizing: 'border-box' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexShrink: 0, padding: '0 5px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/" className="back-l" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ArrowLeft size={16} />Portfolio
            </Link>
            <h1 className="s-title" style={{ margin: 0, fontSize: '18px' }}>My <em>Resume</em></h1>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <a href={downloadUrl} target="_blank" rel="noreferrer" className="btn-s" style={{ padding: '6px 14px', fontSize: '12px', height: 'auto', display: 'flex', alignItems: 'center', gap: '6px', borderRadius: '6px', whiteSpace: 'nowrap' }}>
              Download PDF
            </a>
          </div>
        </div>

        <div className="resume-viewer" style={{ flex: 1, minHeight: 0, width: '100%', borderTop: '1px solid var(--border)', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', overflow: 'hidden', backgroundColor: 'var(--surface)', position: 'relative', boxShadow: '0 -10px 30px rgba(0,0,0,0.2)' }}>
          {resumeUrl && resumeUrl !== '#' ? (
            <iframe 
              src={iframeUrl} 
              title="Resume" 
              style={{ width: '100%', height: '100%', border: 'none' }}
              allow="autoplay"
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text2)', flexDirection: 'column', gap: '16px' }}>
              <IdCard size={48} opacity={0.5} />
              <span>Resume link not configured yet.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
