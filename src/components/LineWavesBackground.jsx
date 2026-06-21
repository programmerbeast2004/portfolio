import React, { useState, useEffect } from 'react';
import LineWaves from './LineWaves';

export default function LineWavesBackground() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Initial read
    const initialTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    setTheme(initialTheme);

    // Watch for theme changes dynamically
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1,
      pointerEvents: 'none', 
      opacity: isDark ? 0.6 : 0.6, 
      filter: isDark ? 'none' : 'invert(1)', 
      WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,1) 80%)',
      maskImage: 'linear-gradient(to right, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,1) 80%)'
    }}>
      <LineWaves
        speed={0.15}
        innerLineCount={28}
        outerLineCount={32}
        warpIntensity={1.2}
        rotation={-45}
        edgeFadeWidth={0.1}
        colorCycleSpeed={0.5}
        brightness={isDark ? 0.08 : 0.12} 
        color1="#ffffff"
        color2={isDark ? "#aaddff" : "#ffffff"} 
        color3="#ffffff"
        enableMouseInteraction={true}
        mouseInfluence={2.5}
      />
    </div>
  );
}
