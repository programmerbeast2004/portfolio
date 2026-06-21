import React, { useEffect, useRef } from 'react';
import { portfolioConfig } from '../data/config';
import { Code, Cpu, Rocket, Layout, Database, Sparkles, Terminal, Smartphone, Globe, Cloud } from 'lucide-react';

const iconMap = {
  Code: <Code size={28} strokeWidth={1.5} />,
  Cpu: <Cpu size={28} strokeWidth={1.5} />,
  Rocket: <Rocket size={28} strokeWidth={1.5} />,
  Layout: <Layout size={28} strokeWidth={1.5} />,
  Database: <Database size={28} strokeWidth={1.5} />,
  Sparkles: <Sparkles size={28} strokeWidth={1.5} />,
  Terminal: <Terminal size={28} strokeWidth={1.5} />,
  Smartphone: <Smartphone size={28} strokeWidth={1.5} />,
  Globe: <Globe size={28} strokeWidth={1.5} />,
  Cloud: <Cloud size={28} strokeWidth={1.5} />,
};

const Services = () => {
  const { services } = portfolioConfig;
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    cardsRef.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  if (!services || services.length === 0) return null;

  return (
    <section id="services" className="services-section" style={{ paddingTop: 'clamp(30px, 5vh, 60px)', paddingBottom: 'clamp(30px, 5vh, 60px)' }}>
      <style>{`
        .service-card {
          position: relative;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 16px 20px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          flex-direction: column;
          gap: 10px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }
        
        .service-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--text), transparent);
          transform: scaleX(0);
          transition: transform 0.6s ease;
        }

        .service-card:hover {
          transform: translateY(-3px);
          border-color: var(--text);
          background: var(--bg2);
          box-shadow: 0 10px 20px rgba(0,0,0,0.15);
        }

        .service-card:hover::before {
          transform: scaleX(1);
        }

        .service-icon-wrap {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: var(--bg3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text);
          border: 1px solid var(--border);
          position: relative;
          transition: all 0.4s ease;
        }

        .service-card:hover .service-icon-wrap {
          transform: scale(1.1) rotate(5deg);
          background: var(--text);
          color: var(--bg);
          border-color: var(--text);
        }
        
        .service-card:hover .service-icon-glow {
          opacity: 0.15;
        }

        .service-icon-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 8px;
          background: var(--text);
          filter: blur(8px);
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: -1;
        }

        /* MOBILE ELEGANCE FIXES (320px - 425px) */
        @media (max-width: 480px) {
          .services-section {
            padding-top: 10px !important;
            padding-bottom: 20px !important;
          }
          .services-header {
            margin-bottom: 15px !important;
          }
          .services-grid {
            gap: 10px !important;
          }
          .service-card {
            padding: 16px 12px !important;
            gap: 8px !important;
            align-items: center;
            text-align: center;
            border-radius: 10px;
          }
          .service-icon-wrap {
            width: 28px !important;
            height: 28px !important;
          }
          .service-icon-wrap svg {
            width: 16px !important;
            height: 16px !important;
          }
          .service-title {
            font-size: 13px !important;
            line-height: 1.3 !important;
            margin-top: 4px !important;
          }
          .service-desc {
            font-size: 10px !important;
            line-height: 1.4 !important;
            /* Ellipsis for super clean mobile layout */
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
      `}</style>

      <div className="container">
        <div className="s-lbl fi" style={{ marginBottom: '10px' }}>06 / Services</div>
        <div className="services-header" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <h2 className="s-title fi d1" style={{ marginBottom: 0, fontSize: 'clamp(42px, 6vw, 64px)' }}>How  can I <em>Help You ?</em></h2>
        </div>

        <div className="services-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
          marginTop: '0px'
        }}>
          {services.map((service, idx) => (
            <div
              key={service.id}
              className="service-card fi"
              ref={el => cardsRef.current[idx] = el}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="service-icon-wrap">
                <div className="service-icon-glow"></div>
                {iconMap[service.icon] || <Code size={20} strokeWidth={1.5} />}
              </div>

              <h3 className="service-title" style={{ margin: 0, fontSize: 'clamp(15px, 2.5vw, 20px)', fontWeight: 600, letterSpacing: '-0.3px', lineHeight: '1.2' }}>{service.title}</h3>

              <p className="service-desc" style={{ margin: 0, color: 'var(--text2)', fontSize: 'clamp(11px, 1.8vw, 14px)', lineHeight: '1.5', flex: 1 }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
