import React from 'react';
import { HeroProfile, HeroContent } from './Hero';
import About from './About';
import Skills from './Skills';
import Experience from './Experience';
import Projects from './Projects';
import Certs from './Certs';
import Services from './Services';
import BlogSection from './BlogSection';
import Contact from './Contact';
import Footer from './Footer';

const Home = () => {
  return (
    <div id="main-page" className="page active">
      <div className="split-layout">
        <div className="split-left">
          <HeroProfile />
        </div>
        <div className="split-right">
          <HeroContent />
          <div className="sep" style={{marginTop: '40px'}}></div>
          <About />
          <div className="sep"></div>
          <Skills />
          <div className="sep"></div>
          <Experience />
          <div className="sep"></div>
          <Projects />
          <div className="sep"></div>
          <Certs />
          <div className="sep"></div>
          <Services />
          <div className="sep"></div>
          <BlogSection />
          <div className="sep"></div>
          <Contact />
        </div>
      </div>
    </div>
  );
};

export default Home;
