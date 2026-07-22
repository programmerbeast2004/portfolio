import React from 'react';
import styled from 'styled-components';
import { Sun, Moon } from 'lucide-react';

const ThemeSwitch = ({ theme, toggleTheme }) => {
  const isDark = theme === 'dark';
  
  return (
    <SwitchWrapper 
      onClick={toggleTheme} 
      aria-label="Toggle theme"
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <IconWrapper $isDark={isDark}>
        {isDark ? (
          <Moon size={12} strokeWidth={3} />
        ) : (
          <Sun size={12} strokeWidth={3} />
        )}
      </IconWrapper>
    </SwitchWrapper>
  );
};

const SwitchWrapper = styled.button`
  width: 52px;
  height: 28px;
  border-radius: 30px;
  background: var(--text); /* Reversed background */
  border: 1px solid var(--border-h);
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 4px;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  margin-right: 16px;
  outline: none;
  
  &:hover {
    border-color: var(--text2);
    box-shadow: 0 0 12px rgba(255, 255, 255, 0.1);
  }
  
  &:focus-visible {
    box-shadow: 0 0 0 2px var(--bg), 0 0 0 4px var(--text);
  }
`;

const IconWrapper = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--bg); /* Reversed circle */
  color: var(--text); /* Reversed icon color */
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${props => props.$isDark ? 'translateX(22px)' : 'translateX(0)'};
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s, color 0.3s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

export default ThemeSwitch;
