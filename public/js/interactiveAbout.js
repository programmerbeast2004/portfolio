/**
 * interactiveAbout.js — Interactive about page with mouse-tracking character
 * Similar to daveholloway.uk about section
 */

function initInteractiveAbout() {
  const tracker = initMouseTracker();
  const charContainer = document.getElementById('about-char-container');
  
  if (!charContainer) return;

  // Register character container for mouse tracking
  tracker.registerElement(charContainer, {
    intensity: 40,
    type: 'parallax',
    minDistance: 100
  });

  // Eye tracking for more sophisticated effect
  const leftEye = charContainer.querySelector('.about-char-eye-left');
  const rightEye = charContainer.querySelector('.about-char-eye-right');
  
  if (leftEye && rightEye) {
    initEyeTracking(leftEye, rightEye);
  }

  // Animate in on scroll
  gsap.set(charContainer, { opacity: 0, scale: 0.9 });
  
  gsap.to(charContainer, {
    opacity: 1,
    scale: 1,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#about',
      start: 'top 60%',
      toggleActions: 'play none none reverse'
    }
  });
}

function initEyeTracking(leftEye, rightEye) {
  document.addEventListener('mousemove', (e) => {
    updateEyePosition(leftEye, e);
    updateEyePosition(rightEye, e);
  });
}

function updateEyePosition(eye, event) {
  const eyeRect = eye.getBoundingClientRect();
  const eyeCenterX = eyeRect.left + eyeRect.width / 2;
  const eyeCenterY = eyeRect.top + eyeRect.height / 2;

  const angle = Math.atan2(event.clientY - eyeCenterY, event.clientX - eyeCenterX);
  const distance = 8; // Max pixel distance for pupil movement

  const pupil = eye.querySelector('.pupil');
  if (pupil) {
    const pupilX = Math.cos(angle) * distance;
    const pupilY = Math.sin(angle) * distance;

    gsap.to(pupil, {
      x: pupilX,
      y: pupilY,
      duration: 0.1,
      overwrite: 'auto'
    });
  }
}

// Call on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initInteractiveAbout);
} else {
  initInteractiveAbout();
}

window.initInteractiveAbout = initInteractiveAbout;
