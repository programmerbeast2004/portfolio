import React from 'react';
import { portfolioConfig } from '../data/config';

const About = () => {
  const { stats } = portfolioConfig;

  return (
    <section id="about" style={{ paddingBottom: '40px', paddingTop: '40px' }}>
      <div className="container">
        <div className="s-lbl fi">01 / About</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '60px' }}>
          <h2 className="s-title fi d1" style={{ marginBottom: 0 }}>Where <em>code</em> meets <em>intelligence</em></h2>
        </div>

        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1px', backgroundColor: 'var(--border)', alignItems: 'stretch' }}>
          <div className="fi" style={{ padding: '40px', background: 'var(--bg)', transition: 'background 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg2)'} onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg)'}>
            <div className="about-text" style={{ fontSize: '16px', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '20px' }}>I'm <strong>Apoorv Mehrotra</strong>, a developer exploring the delicate balance between <strong>human intuition</strong> and <strong>machine intelligence</strong>. I believe in transparent, honest engineering where complex systems serve a clear, human purpose.</p>
              <p style={{ marginBottom: '20px' }}>My foundation is rooted in core <strong>Computer Science principles</strong>—mastering algorithms, robust data structures, and scalable systems architecture—powered by the versatility of the <strong>MERN ecosystem</strong> and <strong>Python</strong>.</p>
              <p>I approach problems by prioritizing clarity and resilience over hype. I strive to seamlessly integrate <strong>traditional architectural patterns</strong> with <strong>modern, agentic AI workflows</strong> to build applications that don't just function, but adapt and evolve intelligently.</p>
            </div>
          </div>
          <div className="fi d2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', backgroundColor: 'var(--border)' }}>
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-c" style={{ padding: '40px', background: 'var(--bg)', transition: 'background 0.3s ease', display: 'flex', flexDirection: 'column', justifyContent: 'center', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg2)'} onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg)'}>
                <div className="stat-v" style={{ fontSize: '48px', fontFamily: '"Bebas Neue", sans-serif', lineHeight: 1, marginBottom: '8px' }}>{stat.value}</div>
                <div className="stat-l" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text3)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
