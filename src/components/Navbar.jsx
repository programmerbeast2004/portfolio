import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ onOpenTalk }) => {
  const [theme, setTheme] = useState('dark');
  const [burgerOpen, setBurgerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setBurgerOpen(false);

    const scrollToTarget = () => {
      const el = document.getElementById(targetId);
      if (el) {
        const navHeight = document.getElementById('main-nav')?.offsetHeight || 60;
        const computedStyle = window.getComputedStyle(el);
        const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
        const y = el.getBoundingClientRect().top + window.scrollY - navHeight + paddingTop;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    };

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(scrollToTarget, 150);
    } else {
      scrollToTarget();
    }
  };

  return (
    <>
      <nav id="main-nav">
        <Link className="nav-logo" to="/" style={{display:'flex', alignItems:'center'}}>
          <img src="/favicon.svg" style={{width:'28px', height:'28px'}} alt="AV" />
        </Link>
        <ul className="nav-links">
          <li><a href="/#about" onClick={(e) => handleNavClick(e, 'about')}>About</a></li>
          <li><a href="/#skills" onClick={(e) => handleNavClick(e, 'skills')}>Skills</a></li>
          <li><a href="/#experience" onClick={(e) => handleNavClick(e, 'experience')}>Experience</a></li>
          <li><a href="/#projects" onClick={(e) => handleNavClick(e, 'projects')}>Projects</a></li>
          <li><a href="/#certs" onClick={(e) => handleNavClick(e, 'certs')}>Certs</a></li>
          <li><a href="/#services" onClick={(e) => handleNavClick(e, 'services')}>Services</a></li>
          <li><a href="/#blog" onClick={(e) => handleNavClick(e, 'blog')}>Blog</a></li>
        </ul>
        <div className="nav-r">
          <div className="theme-tog" onClick={toggleTheme}>
            <span className="tog-lbl" id="tog-lbl">{theme === 'dark' ? 'Dark' : 'Light'}</span>
            <div className="tog"></div>
          </div>
          <button onClick={(e) => handleNavClick(e, 'contact')} className="nav-cta nav-cta-desktop" style={{border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '12px', background: 'var(--text)', color: 'var(--bg)', padding: '8px 16px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 700}}>Hire Me</button>
          <button id="nav-burger" onClick={() => setBurgerOpen(!burgerOpen)} className={`nav-burger-btn ${burgerOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div id="nav-burger-menu" className={burgerOpen ? 'open' : ''}>
        <a href="/#about" onClick={(e) => handleNavClick(e, 'about')}>About</a>
        <a href="/#skills" onClick={(e) => handleNavClick(e, 'skills')}>Skills</a>
        <a href="/#experience" onClick={(e) => handleNavClick(e, 'experience')}>Experience</a>
        <a href="/#projects" onClick={(e) => handleNavClick(e, 'projects')}>Projects</a>
        <a href="/#certs" onClick={(e) => handleNavClick(e, 'certs')}>Certs</a>
        <a href="/#services" onClick={(e) => handleNavClick(e, 'services')}>Services</a>
        <a href="/#blog" onClick={(e) => handleNavClick(e, 'blog')}>Blog</a>
        <hr style={{margin: '8px 0', border: 'none', borderTop: '1px solid var(--border)'}} />
        <button onClick={(e) => handleNavClick(e, 'contact')} style={{color: 'var(--text)', fontWeight: 'bold', background: 'transparent', border: 'none', padding: '15px 0', textAlign: 'left', fontSize: '18px', cursor: 'pointer', textTransform: 'uppercase', fontFamily: 'inherit'}}>Hire Me</button>
      </div>
    </>
  );
};

export default Navbar;
