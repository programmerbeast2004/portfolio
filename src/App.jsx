import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import TalkModal from './components/TalkModal';
import Terminal from './components/Terminal';
import { BlogListPage, BlogPostPage, ProjListPage, SingleProjPage, CertsListPage, CertsSourcePage, ResumePage } from './components/SubPages';
import { portfolioConfig } from './data/config';

// Import exact CSS
import './main.css';
import './animations.css';
import './responsive-fix.css';

import { useLocation } from 'react-router-dom';
import LineWavesBackground from './components/LineWavesBackground';

const RouterBridge = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Re-initialize GSAP animations whenever the route changes
    if (window.AnimationAPI && typeof window.AnimationAPI.initAnimations === 'function') {
      setTimeout(() => {
        window.AnimationAPI.initAnimations();
      }, 100);
    }
  }, [location.pathname]);

  useEffect(() => {
    window.Router = {
      goHome: () => navigate('/'),
      showAllBlogs: () => navigate('/blog'),
      showBlogPost: (id) => navigate(`/blog/${id}`),
      showAllProjects: () => navigate('/projects'),
      showProjPage: (id) => navigate(`/projects/${id}`),
      showAllCerts: () => navigate('/certs'),
      showCertsPage: (sourceId) => navigate(`/certs/${sourceId}`),
      showResume: () => navigate('/resume'),
      navTo: (e, id) => {
        if (e && e.preventDefault) e.preventDefault();
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    };
  }, [navigate]);
  return null;
};

function App() {
  const [talkOpen, setTalkOpen] = useState(false);
  const [preloaderOpen, setPreloaderOpen] = useState(true);

  useEffect(() => {
    // IMPORTANT: Expose STATE globally so that terminal.js works exactly as original!
    window.STATE = portfolioConfig;

    // Hide preloader after a short delay to match original behavior
    const timer = setTimeout(() => {
      setPreloaderOpen(false);
    }, 1500);

    // Load original vanilla JS scripts to guarantee identical behavior
    const loadScript = (src) => {
      return new Promise((resolve) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        document.body.appendChild(script);
      });
    };

    const loadAllScripts = async () => {
      await loadScript('/js/mouseTracker.js');
      await loadScript('/js/interactiveAbout.js');
      await loadScript('/js/quote-generator.js');
      await loadScript('/js/terminal.js');
      await loadScript('/js/animations.js?v=purge');
    };

    loadAllScripts();

    // Basic Custom Cursor Logic from the original app
    const cur = document.getElementById('cur');
    const curr = document.getElementById('cur-r');
    
    const moveCursor = (e) => {
      if(cur) cur.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      if(curr) curr.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };

    const hoverIn = () => document.body.classList.add('hov');
    const hoverOut = () => document.body.classList.remove('hov');

    window.addEventListener('mousemove', moveCursor);
    
    // Setup observer to add hover listeners dynamically since components render dynamically
    const mutationObserver = new MutationObserver(() => {
      const interactives = document.querySelectorAll('a, button, input, textarea, .chroma-card, .btn-p, .btn-s, .nav-logo');
      interactives.forEach(el => {
        el.addEventListener('mouseenter', hoverIn);
        el.addEventListener('mouseleave', hoverOut);
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // Handle scroll animations (.fi elements fading in)
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('v');
        }
      });
    }, { threshold: 0.1 });

    const observeElements = () => {
      document.querySelectorAll('.fi').forEach(el => scrollObserver.observe(el));
    };
    
    // Initial observation
    observeElements();
    
    // Observe new elements if routes change
    const routeObserver = new MutationObserver(() => {
      observeElements();
    });
    routeObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', moveCursor);
      mutationObserver.disconnect();
      scrollObserver.disconnect();
      routeObserver.disconnect();
    };
  }, []);

  return (
    <Router>
      <RouterBridge />
      <LineWavesBackground />
      <div id="pre" className={preloaderOpen ? '' : 'loaded'}>
        <div className="pre-name">APOORV</div>
        <div className="dmx-root" role="status" aria-live="polite" aria-label="Loading">
          <span className="dmx-dot"></span>
          <span className="dmx-dot"></span>
          <span className="dmx-dot"></span>
          <span className="dmx-dot"></span>
        </div>
        <div className="pre-role">AIML Enthusiast · Programmer · Building Scalable Tech Solutions</div>
      </div>
      <div id="cur"></div>
      <div id="cur-r"></div>
      <div id="toast"></div>

      <Navbar onOpenTalk={() => setTalkOpen(true)} />
      <TalkModal isOpen={talkOpen} onClose={() => setTalkOpen(false)} />
      <Terminal />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:id" element={<BlogPostPage />} />
        <Route path="/projects" element={<ProjListPage />} />
        <Route path="/projects/:id" element={<SingleProjPage />} />
        <Route path="/certs" element={<CertsListPage />} />
        <Route path="/certs/:sourceId" element={<CertsSourcePage />} />
        <Route path="/resume" element={<ResumePage />} />
      </Routes>

      <a href="#" className="scroll-top" id="scrollTopBtn" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
        <ArrowUp size={20} />
      </a>
    </Router>
  );
}

export default App;
