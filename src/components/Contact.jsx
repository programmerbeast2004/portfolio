import React from 'react';
import { portfolioConfig } from '../data/config';

const Contact = () => {
  const { personal, social } = portfolioConfig;

  return (
    <section id="contact" style={{ paddingBottom: '40px', paddingTop: '40px' }}>
      <div className="container">
        <div className="s-lbl fi">08 / Contact</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '60px' }}>
          <h2 className="s-title fi d1" style={{ marginBottom: 0 }}>Let's build<br/>something <em>smart</em></h2>
        </div>

        <div className="contact-g" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="fi" style={{ 
            padding: '48px 40px', 
            marginTop: '20px', 
            marginLeft: '-40px', /* Pull it left to align text with heading */
            backgroundColor: 'var(--bg)', 
            transition: 'background 0.3s ease',
            cursor: 'pointer' 
          }} onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg2)'} onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg)'}>
            <p className="c-sub" style={{ fontSize: '20px', fontWeight: '500', marginBottom: '40px', lineHeight: '1.6', color: 'var(--text2)' }}>Got a project that needs intelligent engineering? I'd love to hear from you.</p>
            
            <div style={{ marginBottom: '50px', width: '100%', maxWidth: '100%' }}>
              <div style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--text3)', marginBottom: '16px', fontWeight: '700' }}>Start a conversation</div>
              <a href={`mailto:${personal.email}`} className="cool-email" style={{ fontSize: 'clamp(24px, 5vw, 40px)', fontWeight: '700', wordBreak: 'break-all', overflowWrap: 'anywhere', display: 'inline-block', maxWidth: '100%', color: 'var(--text)' }}>
                {personal.email}
              </a>
            </div>

            <div className="c-socs" id="c-socs" style={{ gap: '15px', display: 'flex', flexWrap: 'wrap' }}>
            <a href={social.github} target="_blank" rel="noreferrer" className="c-soc">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.9 3.18 9.06 7.6 10.53.56.1.77-.24.77-.54v-1.9c-3.09.67-3.74-1.49-3.74-1.49-.5-1.28-1.22-1.62-1.22-1.62-1-.68.07-.67.07-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.67 2.57 1.19 3.2.91.1-.71.38-1.2.7-1.47-2.47-.28-5.07-1.23-5.07-5.5 0-1.22.43-2.21 1.13-2.99-.11-.28-.49-1.41.11-2.93 0 0 .92-.29 3.02 1.14.88-.24 1.82-.36 2.76-.36s1.88.12 2.76.36c2.1-1.43 3.02-1.14 3.02-1.14.6 1.52.22 2.65.11 2.93.7.78 1.13 1.77 1.13 2.99 0 4.28-2.61 5.22-5.09 5.49.39.33.73.98.73 1.98v2.94c0 .3.2.65.78.54 4.41-1.47 7.59-5.63 7.59-10.53C23.25 5.48 18.27.5 12 .5z"/>
              </svg>
              GitHub
            </a>
            <a href={social.linkedin} target="_blank" rel="noreferrer" className="c-soc">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5zM.2 8h4.6v14H.2V8zm7.8 0h4.4v1.9h.06c.61-1.15 2.1-2.37 4.32-2.37 4.62 0 5.48 3.04 5.48 7v7.47h-4.6v-6.62c0-1.58-.03-3.61-2.2-3.61-2.2 0-2.53 1.72-2.53 3.5v6.73H8V8z"/>
              </svg>
              LinkedIn
            </a>
            <a href={social.twitter} target="_blank" rel="noreferrer" className="c-soc">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2H21.5l-7.39 8.44L23 22h-6.828l-5.34-6.996L4.61 22H1.352l7.9-9.02L1 2h6.995l4.83 6.35L18.244 2z"/>
              </svg>
              Twitter
            </a>
            <a href="/resume" onClick={(e) => { e.preventDefault(); if (window.Router) window.Router.showResume(); }} className="c-soc">
              <svg viewBox="0 0 24 24">
                <path fill="#34A853" d="M7.71 3L1 14.5h5.45L13.16 3z"/>
                <path fill="#FBBC05" d="M16.29 3h-3.13l6.71 11.5H23z"/>
                <path fill="#4285F4" d="M1 14.5L7.71 26h8.58L23 14.5h-5.45l-3.71 6.5H6.45l-3.71-6.5z"/>
              </svg>
              Resume
            </a>
          </div>
          </div>
        </div>

        <div style={{ marginTop: '80px', paddingTop: '30px', borderTop: '1px solid var(--border)', textAlign: 'left', fontSize: '11px', color: 'var(--text3)', letterSpacing: '1px' }}>
          2026 {personal.name}. Built with obsession.
        </div>
      </div>
    </section>
  );
};

export default Contact;
