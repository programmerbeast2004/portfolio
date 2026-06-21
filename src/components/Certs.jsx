import React from 'react';
import { portfolioConfig } from '../data/config';

import { Link } from 'react-router-dom';

const Certs = () => {
  const { certSources } = portfolioConfig;

  return (
    <section id="certs">
      <div className="container">
        <div className="s-lbl fi">05 / Certifications</div>
        <div style={{display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'60px'}}>
          <h2 className="s-title fi d1" style={{marginBottom:0}}>Earned<br/><em>Credentials</em></h2>
          <Link to="/certs" className="btn-s fi d2">All Certs</Link>
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
