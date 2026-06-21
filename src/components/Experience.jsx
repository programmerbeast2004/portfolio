import React from 'react';
import { portfolioConfig } from '../data/config';

const Experience = () => {
  const { experience } = portfolioConfig;

  return (
    <section id="experience" style={{ paddingBottom: '20px', paddingTop: '20px' }}>
      <div className="container">
        <div className="s-lbl fi">03 / Experience</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '30px' }}>
          <h2 className="s-title fi d1" style={{ marginBottom: 0 }}>Where I've <em>Been</em></h2>
        </div>

        <div id="exp-list" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1px', backgroundColor: 'var(--border)', padding: 0 }}>
          {experience && experience.map((exp, idx) => (
            <div key={idx} className="exp-item" style={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              gap: '15px',
              padding: '40px',
              background: 'var(--bg)',
              transition: 'background 0.3s ease',
              cursor: 'pointer'
            }} onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg2)'} onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg)'}>
              <div style={{ flex: '1 1 180px' }}>
                <div className="exp-date" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text3)', marginBottom: '8px' }}>
                  {exp.duration || exp.date || exp.period}
                </div>
                <div className="exp-role" style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text)' }}>
                  {exp.role}
                </div>
              </div>
              
              <div style={{ flex: '3 1 350px' }}>
                <h3 className="exp-company" style={{ fontSize: '24px', fontFamily: '"DM Serif Display", serif', marginBottom: '16px', color: 'var(--text)', lineHeight: '1.2' }}>
                  {exp.company}
                </h3>
                <p className="exp-desc" style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text2)', margin: 0 }}>
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
