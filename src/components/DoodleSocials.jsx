import React from 'react';
import styled from 'styled-components';
import { portfolioConfig } from '../data/config';

const DoodleSocials = () => {
  const { personal, social } = portfolioConfig;
  const socialUrls = personal.socials || social;

  const icons = {
    github: <svg viewBox="0 0 24 24"><path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.9 3.18 9.06 7.6 10.53.56.1.77-.24.77-.54v-1.9c-3.09.67-3.74-1.49-3.74-1.49-.5-1.28-1.22-1.62-1.22-1.62-1-.68.07-.67.07-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.67 2.57 1.19 3.2.91.1-.71.38-1.2.7-1.47-2.47-.28-5.07-1.23-5.07-5.5 0-1.22.43-2.21 1.13-2.99-.11-.28-.49-1.41.11-2.93 0 0 .92-.29 3.02 1.14.88-.24 1.82-.36 2.76-.36s1.88.12 2.76.36c2.1-1.43 3.02-1.14 3.02-1.14.6 1.52.22 2.65.11 2.93.7.78 1.13 1.77 1.13 2.99 0 4.28-2.61 5.22-5.09 5.49.39.33.73.98.73 1.98v2.94c0 .3.2.65.78.54 4.41-1.47 7.59-5.63 7.59-10.53C23.25 5.48 18.27.5 12 .5z"/></svg>,
    linkedin: <svg viewBox="0 0 24 24"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5zM.2 8h4.6v14H.2V8zm7.8 0h4.4v1.9h.06c.61-1.15 2.1-2.37 4.32-2.37 4.62 0 5.48 3.04 5.48 7v7.47h-4.6v-6.62c0-1.58-.03-3.61-2.2-3.61-2.2 0-2.53 1.72-2.53 3.5v6.73H8V8z"/></svg>,
    twitter: <svg viewBox="0 0 100 100"><path d="M53.564 38.947 87.066 0h-7.941L50.033 33.816 26.801 0H0l35.136 51.137L0 91.977h7.941l30.722 -35.712 24.54 35.712H90L53.561 38.947zM42.686 51.588l-3.56 -5.093L10.8 5.977h12.194l22.86 32.699 3.56 5.093 29.714 42.503H66.935L42.686 51.591z"/></svg>,
    mail: <svg viewBox="0 0 100 100"><path d="M20 80A12 12 0 0 1 8 68v-40A12 12 0 0 1 20 16h56A12 12 0 0 1 88 28v40A12 12 0 0 1 76 80zm10.5 -47.12a4 4 0 1 0 -5.001 6.24l15.001 12.004a12 12 0 0 0 15.001 0l15.001 -12a4 4 0 1 0 -5.001 -6.247l-15.001 12a4 4 0 0 1 -5.001 0z"/></svg>,
    leetcode: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ fill: 'none' }}><path d="M16 4 L6 13 L10.5 17" /><path d="M10.5 17 C 17 23, 22 14, 14 7" /><line x1="9" y1="13" x2="19" y2="13" /></svg>,
    codeforces: <svg viewBox="0 0 24 24"><path d="M4.5 7.5v12h3v-12h-3zm6-3v15h3v-15h-3zm6 5.5v9.5h3v-9.5h-3z"/></svg>
  };

  const socialsList = [
    { name: 'GitHub', url: socialUrls?.github, icon: icons.github, color: '#6e5494', bg: 'rgba(110, 84, 148, 0.2)' },
    { name: 'LinkedIn', url: socialUrls?.linkedin, icon: icons.linkedin, color: '#0a66c2', bg: 'rgba(10, 102, 194, 0.2)' },
    { name: 'Twitter', url: socialUrls?.twitter, icon: icons.twitter, color: '#1da1f2', bg: 'rgba(29, 161, 242, 0.2)' },
    { name: 'Mail', url: `mailto:${personal.email}`, icon: icons.mail, color: '#ea4335', bg: 'rgba(234, 67, 53, 0.2)' },
    { name: 'LeetCode', url: socialUrls?.leetcode, icon: icons.leetcode, color: '#ffa116', bg: 'rgba(255, 161, 22, 0.2)' },
    { name: 'Codeforces', url: socialUrls?.codeforces, icon: icons.codeforces, color: '#d00000', bg: 'rgba(208, 0, 0, 0.2)' }
  ].filter(s => s.url);

  return (
    <StyledWrapper>
      <div>

        <div className="doodle-container">
          <ul className="doodle-icons-list">
            {socialsList.map((s, idx) => (
              <li className="doodle-icon-content" key={idx}>
                <a href={s.url} target="_blank" rel="noreferrer" aria-label={s.name} className="doodle-link" style={{ '--hover-color': s.color, '--bg-color': s.bg, '--brand-color': s.color }}>
                  <div className="doodle-svg-wrapper">
                    {s.icon}
                  </div>
                </a>
                <div className="doodle-tooltip" style={{ '--tooltip-color': s.color }}>{s.name}</div>
              </li>
            ))}
          </ul>
          
          <a href="/resume" onClick={(e) => { e.preventDefault(); if (window.Router) window.Router.showResume(); }} className="doodle-resume-btn">
            DOWNLOAD RESUME
            <svg viewBox="0 0 24 24" fill="currentColor" style={{width:'16px',height:'16px', marginLeft: '6px', transform: 'rotate(-5deg)'}}>
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </a>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* --- THE DOODLE NOTEBOOK CONTAINER --- */
  .doodle-container {
    margin: 0px auto 10px auto; /* Added bottom margin so the shadow is highlighted */
    padding: 20px 32px 32px 32px; /* Increased bottom padding for the button */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px; /* Reduced gap to save vertical space */
    
    width: 100%;
    max-width: 100%; /* Prevents out-of-frame overflow */
    box-sizing: border-box;

    background-color: var(--bg2);

    /* Straight box borders instead of wobbly shape */
    border: 3px solid var(--text);
    border-radius: 16px; /* Straight, clean rounded corners */

    /* Heavy pop-art pencil shadow - perfectly matches theme */
    box-shadow: 6px 8px 0px #0b0c10; /* Always black shadow so it doesn't blob outside in dark mode */

    /* MAGIC TRICK: Applies the SVG pencil texture to the whole box! */
    filter: url(#pencil-texture);
  }

  .doodle-icons-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 18px; /* Elegant, wide spacing between icons */
    flex-wrap: nowrap; /* Force all icons on same line */
    width: 100%;
    max-width: 100%;
  }

  /* Responsive fixes so it doesn't overflow mobile screens */
  @media (max-width: 600px) {
    .doodle-container {
      padding: 24px 20px;
      gap: 20px;
    }
    .doodle-icons-list {
      gap: 12px;
    }
    .doodle-link {
      width: 40px !important; 
      height: 40px !important;
    }
  }

  @media (max-width: 500px) {
    .doodle-container {
      padding: 16px 12px;
      gap: 16px;
      box-shadow: 4px 5px 0px var(--text);
    }
    .doodle-icons-list {
      gap: 8px; /* Tighten gap */
    }
    .doodle-link {
      width: 36px !important; /* Force smaller size on mobile */
      height: 36px !important;
    }
    .doodle-svg-wrapper {
      width: 18px !important;
      height: 18px !important;
    }
  }

  @media (max-width: 380px) {
    .doodle-container {
      padding: 12px 6px;
    }
    .doodle-icons-list {
      gap: 6px;
    }
    .doodle-link {
      width: 32px !important;
      height: 32px !important;
      border-width: 2px;
    }
    .doodle-svg-wrapper {
      width: 16px !important;
      height: 16px !important;
    }
  }

  .doodle-icon-content {
    margin: 0;
    position: relative;
    font-family: 'DM Mono', monospace;
  }

  /* --- THE ICONS (Drawn Buttons) --- */
  .doodle-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 46px; /* Elegant, large touch targets */
    height: 46px;
    text-decoration: none;
    /* Force light pastel color even on dark backgrounds */
    background-color: color-mix(in srgb, var(--brand-color) 20%, #ffffff);

    /* ALWAYS black hand-drawn circles */
    border: 3px solid #0b0c10;
    border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
    box-shadow: 3px 4px 0px #0b0c10; /* ALWAYS black shadow */

    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .doodle-svg-wrapper {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0b0c10; /* ALWAYS black icon */
    transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  /* Hover state adapts to contrast */
  .doodle-link:hover .doodle-svg-wrapper {
    color: #ffffff; /* ALWAYS white on hover */
    fill: #ffffff;
    filter: drop-shadow(1px 1px 0px #0b0c10);
    transform: rotate(15deg) scale(1.15);
  }

  .doodle-svg-wrapper svg {
    width: 100%;
    height: 100%;
  }

  .doodle-resume-btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent; /* Solid fill moved to ::before */
    color: var(--bg); /* Reversed text */
    padding: 14px 32px; /* Much more breathable, elegant padding */
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 3px; /* Clean, spaced out letters */
    text-transform: uppercase;
    text-decoration: none;
    font-family: 'DM Mono', monospace;
    border: 3px solid var(--text); /* Adapts to theme */
    border-radius: 15px 225px 15px 255px / 255px 15px 225px 15px;
    box-shadow: 4px 5px 0px var(--text); /* Adapts to theme */
    transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
    transform: rotate(-1deg);
    z-index: 1;
  }

  .doodle-resume-btn::before {
    content: '';
    position: absolute;
    inset: 3px; /* The gap! Separates border from fill */
    background-color: var(--text); /* Reversed background */
    border-radius: inherit;
    z-index: -1;
    transition: background-color 0.25s;
  }

  .doodle-resume-btn:hover {
    transform: translateY(-2px) scale(1.03) rotate(1deg);
    box-shadow: 6px 7px 0px var(--text); 
    color: #000 !important; /* Force black text for high contrast on green */
    border-radius: 255px 15px 225px 15px / 15px 255px 15px 225px;
  }

  .doodle-resume-btn:hover::before {
    background-color: #4ade80; /* Bright green crayon fill on hover */
  }

  /* --- CRAZY CRAYON HOVER ANIMATIONS --- */
  .doodle-link:hover {
    /* Keep it grounded so the mouse doesn't slip off and cause flickering */
    transform: scale(1.1);
    box-shadow: 5px 7px 0px #0b0c10; /* Slightly deeper shadow on hover */
    animation: child-wiggle 0.3s ease-in-out infinite alternate;
    background-color: var(--brand-color); /* Fills with pure brand color */
    border-radius: 60% 40% 40% 60% / 50% 50% 40% 60%;
  }

  /* Shakes the button like a kid coloring it furiously! */
  @keyframes child-wiggle {
    0% { transform: scale(1.1) rotate(-4deg); }
    100% { transform: scale(1.1) rotate(4deg); }
  }

  /* --- THE SPEECH BUBBLE TOOLTIPS (Sticky Notes) --- */
  .doodle-tooltip {
    position: absolute;
    top: 0px; /* Starts low and hidden */
    left: 50%;
    transform: translateX(-50%) rotate(-5deg); /* Childish crooked tilt */

    padding: 6px 12px;
    color: var(--bg);
    background-color: var(--tooltip-color);

    /* Wobbly hand-drawn speech bubble */
    border: 3px solid var(--text);
    border-radius: 255px 25px 225px 25px / 25px 225px 25px 255px;
    box-shadow: 3px 4px 0px var(--text);

    opacity: 0;
    visibility: hidden;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1px;
    white-space: nowrap;

    /* Bouncy pop-up animation */
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    pointer-events: none;
    z-index: 10;
  }

  /* The little triangle tail drawn under the speech bubble */
  .doodle-tooltip::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%) rotate(15deg) skewX(25deg);
    width: 12px;
    height: 12px;
    background-color: var(--tooltip-color);
    border-bottom: 3px solid var(--text);
    border-right: 3px solid var(--text);
  }

  /* Tooltip Hover Pop-Up */
  .doodle-icon-content:hover .doodle-tooltip {
    opacity: 1;
    visibility: visible;
    top: -62px; /* Adjusted higher to clear larger icons */
    transform: translateX(-50%) rotate(3deg); /* Tilts the other way when popped up! */
  }
`;

export default DoodleSocials;
