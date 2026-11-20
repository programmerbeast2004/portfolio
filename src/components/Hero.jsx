import React, { useState, useEffect } from 'react';
import { portfolioConfig } from '../data/config';
import { Link } from 'react-router-dom';
import DoodleSocials from './DoodleSocials';
import ProfileCard from './ProfileCard';

export const HeroProfile = () => {
  const { personal, social } = portfolioConfig;
  const [theme, setTheme] = useState(
    () => (typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme')) || 'dark'
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme) setTheme(currentTheme);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const handleContactClick = () => {
    if (window.Router) {
      window.Router.navTo(null, 'contact');
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero-profile">
      <div className="h-inner-profile">
        <ProfileCard
          avatarUrl={personal.photo_url || '/profile.jpg'}
          miniAvatarUrl={personal.photo_url || '/profile.jpg'}
          name={personal.name}
          title={personal.title}
          handle="programmerbeast2004"
          status={personal.available ? 'Available for opportunities' : 'Not available currently'}
          statusColor={personal.available ? '#22c55e' : '#ef4444'}
          contactText="Contact"
          onContactClick={handleContactClick}
          holo={0.8}
          glare={0.5}
          tiltStrength={12}
          parallax={8}
          radius={16}
          enableTilt={true}
          intro={true}
          showUserInfo={false}
          enableMobileTilt={false}
          theme={theme === 'light' ? 'light' : 'dark'}
          className="mx-auto"
        />
      </div>
      <div style={{ marginTop: '15px', width: '100%', zIndex: 10, position: 'relative' }}>
        <DoodleSocials />
      </div>
    </section>
  );
};

export const HeroContent = () => {
  const { personal } = portfolioConfig;

  return (
    <section id="hero-content">
      <div className="container" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div className="h-content" style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'left',
          alignItems: 'flex-start',
          padding: 0,
          width: '100%',
          maxWidth: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1
        }}>
          {/* Top Bar: Eyebrow Location */}
          <div className="h-top-bar" style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
            <div className="h-eyebrow" id="h-eyebrow">
              {personal.location}
            </div>
          </div>

          {/* Main Hero Centerpiece: Grand Display Typography & Specializations */}
          <div className="h-main-intro" style={{ margin: 'auto 0', padding: '28px 0', width: '100%' }}>
            <h1 className="h-name" style={{
              textAlign: 'left',
              marginBottom: '20px',
              fontSize: 'clamp(68px, 9.5vw, 150px)',
              lineHeight: '1.02',
              letterSpacing: '-1px'
            }}>
              Apoorv
              <em style={{ display: 'block', marginTop: '10px' }}>Mehrotra</em>
            </h1>
            
            <div className="h-roles" style={{
              justifyContent: 'flex-start',
              fontSize: 'clamp(11px, 1.2vw, 14px)',
              letterSpacing: '4px',
              gap: '14px',
              marginBottom: '20px'
            }}>
              <span>AIML Enthusiast</span>
              <div className="rsep"></div>
              <span>MERN Developer</span>
              <div className="rsep"></div>
              <span>Problem Solver</span>
            </div>

            <p style={{
              maxWidth: '720px',
              fontSize: 'clamp(14px, 1.25vw, 17px)',
              lineHeight: '1.6',
              color: 'var(--text3)',
              fontFamily: "'Inter', sans-serif",
              margin: '0',
              fontWeight: '400',
              letterSpacing: '-0.01em'
            }}>
              Engineering intelligent systems, scalable web architectures, and interactive digital experiences.
            </p>
          </div>

          {/* Bottom Bar: Action CTAs + Scroll indicator */}
          <div className="h-bottom-bar" style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div className="h-btns" style={{ justifyContent: 'flex-start', gap: '16px', display: 'flex', marginTop: 0 }}>
              <Link to="/projects" className="btn-p">View Projects →</Link>
              <a href="/#contact" className="btn-s" onClick={(e) => { e.preventDefault(); if (window.Router) { window.Router.navTo(e, 'contact'); } }}>Let's Talk ↗</a>
            </div>

            <div className="h-scroll-prompt" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: "'DM Mono', monospace",
              fontSize: '10px',
              fontWeight: '700',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'var(--text3)'
            }}>
              <div style={{ width: '32px', height: '1px', background: 'var(--border-h)' }}></div>
              <span>scroll</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroProfile;
