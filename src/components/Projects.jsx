import React from 'react';
import { portfolioConfig } from '../data/config';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const Projects = () => {
  const { projects } = portfolioConfig;
  const navigate = useNavigate();

  // Render only featured projects on the home page
  const featured = projects ? projects.filter(p => p.featured) : [];

  return (
    <section id="projects">
      <div className="container">
        <div className="s-lbl fi">04 / Projects</div>
        
        <div className="s-header-row">
          <h2 className="s-title fi d1" style={{marginBottom:0}}>Selected<br/><em>Work</em></h2>
          <Link to="/projects" className="doodle-btn doodle-btn-projects fi d2" title="View all projects">
            <svg viewBox="0 0 24 24" fill="currentColor" style={{width:'15px', height:'15px', marginRight:'7px', transform: 'rotate(3deg)'}}>
              <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/>
            </svg>
            View All
          </Link>
        </div>

        <div className="proj-g fi d2" id="proj-grid">
          {featured.map((proj, idx) => (
            <div 
              key={proj.id || idx} 
              className="proj-c" 
              onClick={() => navigate(`/projects/${proj.id}`)}
              style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', padding: '32px', gap: '16px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className="proj-n" style={{ marginBottom: '8px' }}>0{idx + 1}</div>
                  <h3 className="proj-t" style={{ margin: 0 }}>{proj.title}</h3>
                </div>
                {proj.featured && <div className="feat-b" style={{ position: 'static', marginTop: '4px' }}>Featured</div>}
              </div>
              
              {proj.image_url && (
                <div className="proj-img" style={{ marginBottom: 0 }}>
                  <img src={proj.image_url} alt={proj.title} />
                </div>
              )}
              
              <p className="proj-d" style={{ margin: 0, flex: 1 }}>{proj.description}</p>
              
              <div className="proj-tags" style={{ margin: 0, gap: '6px' }}>
                {proj.tech && proj.tech.map((t, i) => <span key={i} className="ptag">{t}</span>)}
              </div>
              
              <div className="proj-links" style={{ display: 'flex', gap: '10px', marginTop: '10px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                {proj.live_url && (
                  <a href={proj.live_url} target="_blank" rel="noreferrer" className="btn-s" onClick={(e) => e.stopPropagation()} style={{display:'flex', alignItems:'center', gap:'6px', flex: 1, justifyContent: 'center', padding: '10px'}}>
                    Live Site <ArrowUpRight size={14} />
                  </a>
                )}
                {proj.github_url && (
                  <a href={proj.github_url} target="_blank" rel="noreferrer" className="btn-s" onClick={(e) => e.stopPropagation()} style={{display:'flex', alignItems:'center', gap:'6px', flex: 1, justifyContent: 'center', padding: '10px'}}>
                    GitHub <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
