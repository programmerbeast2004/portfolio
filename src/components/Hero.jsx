import React from 'react';
import { portfolioConfig } from '../data/config';

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
          style={{ marginTop: '30px' }}
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

      <div className="arc arc-centered" id="arc-links">
        <a id="arc-github" href={socialUrls?.github} target="_blank" rel="noreferrer" className="arc-i">
          <svg viewBox="0 0 24 24" fill="currentColor" style={{width:'15px',height:'15px'}}>
            <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.9 3.18 9.06 7.6 10.53.56.1.77-.24.77-.54v-1.9c-3.09.67-3.74-1.49-3.74-1.49-.5-1.28-1.22-1.62-1.22-1.62-1-.68.07-.67.07-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.67 2.57 1.19 3.2.91.1-.71.38-1.2.7-1.47-2.47-.28-5.07-1.23-5.07-5.5 0-1.22.43-2.21 1.13-2.99-.11-.28-.49-1.41.11-2.93 0 0 .92-.29 3.02 1.14.88-.24 1.82-.36 2.76-.36s1.88.12 2.76.36c2.1-1.43 3.02-1.14 3.02-1.14.6 1.52.22 2.65.11 2.93.7.78 1.13 1.77 1.13 2.99 0 4.28-2.61 5.22-5.09 5.49.39.33.73.98.73 1.98v2.94c0 .3.2.65.78.54 4.41-1.47 7.59-5.63 7.59-10.53C23.25 5.48 18.27.5 12 .5z"/>
          </svg>
        </a>
        <a id="arc-linkedin" href={socialUrls?.linkedin} target="_blank" rel="noreferrer" className="arc-i">
          <img src="https://www.linkedin.com/favicon.ico" style={{width:'15px',height:'15px',objectFit:'contain'}} alt="LinkedIn"/>
        </a>
        <a id="arc-twitter" href={socialUrls?.twitter} target="_blank" rel="noreferrer" className="arc-i">
          <img src="https://abs.twimg.com/favicons/twitter.3.ico" style={{width:'15px',height:'15px',objectFit:'contain'}} alt="Twitter"/>
        </a>
        <a id="arc-email" href={`mailto:${personal.email}`} className="arc-i">
          <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico" style={{width:'15px',height:'15px',objectFit:'contain'}} alt="Email"/>
        </a>
        <a id="arc-leetcode" href={socialUrls?.leetcode} target="_blank" rel="noreferrer" className="arc-i">
          <img src="https://leetcode.com/favicon.ico" style={{width:'15px',height:'15px',objectFit:'contain'}} alt="LeetCode"/>
        </a>
        <a id="arc-codeforces" href={socialUrls?.codeforces} target="_blank" rel="noreferrer" className="arc-i">
          <img src="https://codeforces.com/favicon.ico" style={{width:'15px',height:'15px',objectFit:'contain'}} alt="Codeforces"/>
        </a>
      </div>
      <div className="arc-resume-row" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <a id="arc-resume" href="/resume" onClick={(e) => { e.preventDefault(); if (window.Router) window.Router.showResume(); }} className="arc-i arc-resume-btn">
          DOWNLOAD RESUME
          <svg viewBox="0 0 24 24" fill="currentColor" style={{width:'14px',height:'14px'}}>
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </a>
      </div>
    </section>
  );
};

export const HeroContent = () => {
  const { personal } = portfolioConfig;

  return (
    <section id="hero-content">
      <div className="h-bg-word" id="hero-bg-word">WIN !!</div>
      <div className="h-content" style={{position: 'relative', zIndex: 10, textAlign: 'left', alignItems: 'flex-start', padding: 0}}>
        <div className="h-eyebrow" id="h-eyebrow" style={{justifyContent: 'flex-start'}}>{personal.location}</div>
        <h1 className="h-name" style={{textAlign: 'left'}}>Apoorv<br/><em>Mehrotra</em></h1>
        <div className="h-roles" style={{justifyContent: 'flex-start'}}><span>AIML Enthusiast</span><div className="rsep"></div><span>MERN Developer</span><div className="rsep"></div><span>Problem Solver</span></div>
        <p className="h-bio" id="h-bio" style={{textAlign: 'left', borderTop: 'none', borderLeft: '1px solid var(--border-h, rgba(255,255,255,0.3))', padding: '0 0 0 16px'}}>{personal.bio}</p>
        <div className="h-btns" style={{justifyContent: 'flex-start'}}>
          <a href="/projects" className="btn-p">View Projects</a>
          <a href="#contact" className="btn-p">Let's Talk</a>
        </div>
      </div>
      <div className="scroll-ind"><div className="scroll-ln"></div>scroll</div>
    </section>
  );
};

export default HeroProfile;
