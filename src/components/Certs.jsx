import React from 'react';
import { portfolioConfig } from '../data/config';

import { Link } from 'react-router-dom';

const Certs = () => {
  const { certSources } = portfolioConfig;

  return (
    <section id="certs">
      <div className="container">
        <div className="s-lbl fi">05 / Certifications</div>
        <div className="s-header-row">
          <h2 className="s-title fi d1" style={{marginBottom:0}}>Earned<br/><em>Credentials</em></h2>
          <Link to="/certs" className="doodle-btn doodle-btn-certs fi d2" title="View all credentials">
            <svg viewBox="0 0 24 24" fill="currentColor" style={{width:'15px', height:'15px', marginRight:'7px', transform: 'rotate(-3deg)'}}>
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
            </svg>
            All Certs
          </Link>
        </div>
        <div className="cert-sources-g fi d2" id="cert-sources-grid">
          {certSources && certSources.map((source, idx) => {
            const count = portfolioConfig.certifications ? portfolioConfig.certifications.filter(c => c.source_id === source.id).length : 0;
            return (
              <Link to={`/certs/${source.id}`} key={idx} className="cert-source-card" style={{ '--source-color': source.color }}>
                <div className="cert-source-icon-container" style={{ marginBottom: '16px', fontSize: '36px', lineHeight: '36px' }}>
                  {source.logo_emoji}
                </div>
                <div className="cert-source-name">{source.name}</div>
                <div className="cert-source-count">{count} {count === 1 ? 'Certificate' : 'Certificates'}</div>
                <div className="cert-source-arrow">View Credentials <span style={{fontFamily:'serif', fontSize:'14px'}}>&rarr;</span></div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Certs;
