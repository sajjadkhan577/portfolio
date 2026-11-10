import React from 'react';

const skillGroups = [
  { title: 'Frontend development', skills: ['JavaScript', 'React', 'HTML & CSS', 'Tailwind CSS', 'Bootstrap'] },
  { title: 'Backend development', skills: ['PHP', 'Node.js', 'Express'] },
  { title: 'Databases', skills: ['MySQL', 'MongoDB'] },
  { title: 'Tools & technologies', skills: ['Git', 'Progressive web apps'] },
];

export const TrustStrip: React.FC = () => (
  <section className="editorial-section editorial-section-muted" aria-labelledby="skills-title">
    <div className="editorial-container">
      <div className="section-heading">
        <p className="section-kicker">The toolkit</p>
        <h2 className="section-title" id="skills-title">A practical stack, chosen for the work.</h2>
      </div>
      <div className="skills-groups">
        {skillGroups.map((group) => (
          <div className="skill-group" key={group.title}>
            <h3>{group.title}</h3>
            <div className="skill-list">
              {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
