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
      <div className="container">
      <div className="h-content" style={{position: 'relative', zIndex: 10, textAlign: 'left', alignItems: 'flex-start', padding: 0, marginLeft: 'auto', marginRight: '0', maxWidth: '850px', width: '100%'}}>
        <div className="h-eyebrow" id="h-eyebrow" style={{justifyContent: 'flex-start'}}>{personal.location}</div>
        <h1 className="h-name" style={{textAlign: 'left'}}>Apoorv<br/><em>Mehrotra</em></h1>
        <div className="h-roles" style={{justifyContent: 'flex-start'}}><span>AIML Enthusiast</span><div className="rsep"></div><span>MERN Developer</span><div className="rsep"></div><span>Problem Solver</span></div>
        
        <div style={{
          backgroundColor: 'var(--bg)',
          padding: '40px',
          marginTop: '40px',
          marginBottom: '40px',
          transition: 'background 0.3s ease',
        }} onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg2)'} onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg)'}>
          <p className="h-bio" id="h-bio" style={{textAlign: 'left', margin: 0, padding: 0, fontSize: '18px', lineHeight: '1.7', color: 'var(--text2)', border: 'none'}}>{personal.bio}</p>
        </div>

        <div className="h-btns" style={{justifyContent: 'flex-start', gap: '16px', display: 'flex'}}>
          <Link to="/projects" className="btn-p">View Projects</Link>
          <a href="/#contact" className="btn-p" onClick={(e) => { e.preventDefault(); if (window.Router) { window.Router.navTo(e, 'contact'); } }}>Let's Talk</a>
        </div>
      </div>
      <div className="scroll-ind"><div className="scroll-ln"></div>scroll</div>
      </div>
    </section>
  );
};

export default HeroProfile;
