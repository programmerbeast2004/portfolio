/**
 * mouseTracker.js — Mouse tracking system for interactive elements
 * Handles cursor position tracking and parallax effects
 */

class MouseTracker {
  constructor(options = {}) {
    this.mouse = { x: 0, y: 0 };
    this.smoothMouse = { x: 0, y: 0 };
    this.elements = [];
    this.smoothness = options.smoothness || 0.15;
    this.enabled = true;
    this.rafId = null;
    this.init();
  }

  init() {
    document.addEventListener('mousemove', (e) => this.onMouseMove(e), { passive: true });
    document.addEventListener('mouseleave', () => this.onMouseLeave());
    document.addEventListener('visibilitychange', () => this.onVisibilityChange());
    if (!document.hidden) {
      this.animate();
    }
  }

  onMouseMove(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
    this.enabled = true;
    if (!this.rafId && !document.hidden) {
      this.animate();
    }
  }

  onMouseLeave() {
    this.enabled = false;
  }

  onVisibilityChange() {
    if (document.hidden) {
      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }
    } else if (!this.rafId) {
      this.animate();
    }
  }

  registerElement(element, options = {}) {
    this.elements.push({
      element,
      intensity: options.intensity || 1,
      type: options.type || 'parallax', // 'parallax' or 'rotate'
      minDistance: options.minDistance || 0,
      callback: options.callback
    });
  }

  animate() {
    // Smooth mouse position
    this.smoothMouse.x += (this.mouse.x - this.smoothMouse.x) * this.smoothness;
    this.smoothMouse.y += (this.mouse.y - this.smoothMouse.y) * this.smoothness;

    // Update registered elements
    this.elements.forEach(item => {
      if (!this.enabled) {
        // Reset position when mouse leaves window
        gsap.to(item.element, {
          x: 0,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          duration: 0.6,
          ease: 'power2.out'
        });
        return;
      }

      const rect = item.element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(this.mouse.x - centerX, 2) +
        Math.pow(this.mouse.y - centerY, 2)
      );

      // ✅ FIX: angle declared at forEach scope so callback can access it
      const angle = Math.atan2(this.mouse.y - centerY, this.mouse.x - centerX);

      if (distance > item.minDistance) {
        const magnitude = Math.min(distance / 100, 1);

        if (item.type === 'parallax') {
          const moveX = Math.cos(angle) * magnitude * item.intensity;
          const moveY = Math.sin(angle) * magnitude * item.intensity;

          gsap.to(item.element, {
            x: moveX,
            y: moveY,
            duration: 0.4,
            ease: 'power1.out',
            overwrite: 'auto'
          });
        } else if (item.type === 'rotate') {
          const rotX = (this.mouse.y - centerY) / rect.height * item.intensity;
          const rotY = (this.mouse.x - centerX) / rect.width * item.intensity;

          gsap.to(item.element, {
            rotationX: rotX,
            rotationY: rotY,
            duration: 0.5,
            ease: 'power1.out',
            overwrite: 'auto'
          });
        }
      }

      // ✅ FIX: angle is now accessible here (was ReferenceError before)
      if (item.callback) {
        item.callback({
          x: this.smoothMouse.x,
          y: this.smoothMouse.y,
          angle
        });
      }
    });

    if (!document.hidden) {
      this.rafId = requestAnimationFrame(() => this.animate());
    }
  }

  destroy() {
    // Cleanup if needed
    this.elements = [];
  }
}

// Global instance
window.MouseTracker = null;

function initMouseTracker() {
  if (!window.MouseTracker) {
    window.MouseTracker = new MouseTracker({ smoothness: 0.12 });
  }
  return window.MouseTracker;
}

// Export
window.initMouseTracker = initMouseTracker;