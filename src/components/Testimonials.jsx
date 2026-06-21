import React from 'react';
import { portfolioConfig } from '../data/config';

const Testimonials = () => {
  const { testimonials } = portfolioConfig;

  return (
    <section id="testimonials">
      <div className="container">
        <div className="s-lbl fi">06 / Testimonials</div>
        <h2 className="s-title fi d1">What people<br/><em>say</em></h2>
        <div className="testi-g fi d2" id="testi-grid">
          {testimonials && testimonials.map((testi, idx) => (
            <div key={idx} className="testi-c">
              <p className="testi-q">"{testi.quote}"</p>
              <div className="testi-author">
                <strong>{testi.name}</strong> - {testi.role || testi.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
