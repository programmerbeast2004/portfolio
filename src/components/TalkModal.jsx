import React, { useState } from 'react';
import { portfolioConfig } from '../data/config';

const TalkModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
    onClose();
  };

  return (
    <div id="talk-modal" className="talk-modal" style={{ display: 'flex', opacity: 1, visibility: 'visible', zIndex: 9999 }}>
      <div className="talk-overlay" onClick={onClose} style={{ opacity: 1 }}></div>
      <div className="talk-container" style={{ transform: 'scale(1)', opacity: 1 }}>
        <button className="talk-close" onClick={onClose}>✕</button>
        <div className="talk-header">
          <h2 className="talk-title">Let's Talk</h2>
          <p className="talk-subtitle">I'd love to hear from you. Send me a message.</p>
        </div>
        <form className="talk-form" id="talk-form" onSubmit={handleSubmit}>
          <div className="talk-group">
            <label className="talk-label">Your Email</label>
            <input type="email" className="talk-input" id="talk-email" placeholder="hello@example.com" required />
          </div>
          <div className="talk-group">
            <label className="talk-label">Your Name</label>
            <input type="text" className="talk-input" id="talk-name" placeholder="Hooman" required />
          </div>
          <div className="talk-group">
            <label className="talk-label">Message</label>
            <textarea className="talk-textarea" id="talk-message" placeholder="Tell me about your project..." rows="6" required></textarea>
          </div>
          <button type="submit" className="talk-btn" id="talk-btn">
            <span className="talk-btn-text">Send Message</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default TalkModal;
