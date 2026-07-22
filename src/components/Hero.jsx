import React from 'react';
import { portfolioConfig } from '../data/config';
import { Link } from 'react-router-dom';
import DoodleSocials from './DoodleSocials';

export const HeroProfile = () => {
  const { personal, social } = portfolioConfig;
  const socialUrls = personal.socials || social;

  // For the mouse move chroma effect
  const chromaMove = (e, element) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    element.style.setProperty('--mx', `${x}px`);
    element.style.setProperty('--my', `${y}px`);
  };

  const chromaLeave = (element) => {
    element.style.setProperty('--mx', '50%');
    element.style.setProperty('--my', '50%');
  };

  return (
    <section id="hero-profile">
      
      <div className="h-inner-profile">
        <div 
          className="chroma-card" 
          style={{ marginTop: '10px' }}
          onMouseMove={(e) => chromaMove(e, e.currentTarget)} 
          onMouseLeave={(e) => chromaLeave(e.currentTarget)}
        >
          {personal.photo_url ? (
            <img 
              src={personal.photo_url} 
              alt={personal.name} 
              className="chroma-img"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div 
              className="chroma-img"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                backgroundColor: 'rgba(255,255,255,0.05)', 
                color: 'var(--text-primary)', 
                fontSize: '120px', 
                fontWeight: '800',
                fontFamily: 'var(--font-heading)',
                paddingTop: '20px'
              }}
            >
              {personal.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </div>
          )}
          <div className="chroma-spot"></div>
          <div className="chroma-footer">
            <div className="chroma-name" id="h-chroma-name">{personal.name}</div>
            <div className="chroma-role" id="h-chroma-role">{personal.title}</div>
            <div className="chroma-status">
              <div 
                className="sdot" 
                id="h-sdot"
                style={{
                  background: personal.available ? '#4ade80' : '#ef4444',
                  boxShadow: `0 0 8px ${personal.available ? '#4ade80' : '#ef4444'}`
                }}
              ></div>
              <span className="stxt" id="h-stxt">{personal.available ? 'Available for opportunities' : 'Not available currently'}</span>
            </div>
          </div>
        </div>
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
