import React from 'react';
import { portfolioConfig } from '../data/config';

const Skills = () => {
  const { skills } = portfolioConfig;

  return (
    <section id="skills">
      <div className="container">
        <div className="s-lbl fi">02 / Skills</div>
        <h2 className="s-title fi d1">The <em>Stack</em></h2>
        <div className="skills-g fi d2" id="skills-grid">
          {skills.map((group, i) => (
            <div key={i} className="skill-c">
              <div className="skill-h">{group.category}</div>
              <ul>
                {group.items.map((skillObj, idx) => (
                  <li key={idx}>{skillObj.item || skillObj}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
