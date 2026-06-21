import React from 'react';
import { portfolioConfig } from '../data/config';

const Footer = () => {
  return (
    <footer>
      <div className="ft">2026 {portfolioConfig.personal.name}. Built with obsession.</div>
    </footer>
  );
};

export default Footer;
