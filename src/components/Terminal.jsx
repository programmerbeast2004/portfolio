import React from 'react';

const Terminal = () => {
  return (
    <>
      <div id="cli-trigger" title="Open Developer Terminal" onClick={() => window.openCLI && window.openCLI()}>
        <div className="cli-trigger-dot"></div>
        <div className="cli-trigger-text"><div className="cli-prompt-blink"></div></div>
      </div>

      <div id="cli-overlay" onClick={(e) => window.handleOverlayClick && window.handleOverlayClick(e.nativeEvent)}>
        <div id="terminal">
          <div className="term-bar">
            <div className="term-dot r" onClick={() => window.closeCLI && window.closeCLI()}></div>
            <div className="term-dot y"></div>
            <div className="term-dot g"></div>
            <div className="term-title">apoorv@portfolio -- zsh -- 80x24</div>
            <button className="term-close-btn" onClick={() => window.closeCLI && window.closeCLI()}>x</button>
          </div>
          <div className="term-body" id="term-body"></div>
          <div className="term-input-row">
            <span className="term-prompt"><span>apoorv</span>@portfolio:~$</span>
            <input id="term-input" type="text" placeholder="type 'help' for commands..." autoComplete="off" spellCheck="false"/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terminal;
