import React from 'react';

const steps = [
  {
    step: '01',
    title: 'Understand the need',
    description: 'We start with the people using the product, the problem to solve, and what a useful outcome looks like.',
  },
  {
    step: '02',
    title: 'Plan the right shape',
    description: 'Together we define the important flows, technical approach, and a clear, manageable scope.',
  },
  {
    step: '03',
    title: 'Build in the open',
    description: 'The work takes shape in focused steps, with regular check-ins so the result stays aligned with your needs.',
  },
  {
    step: '04',
    title: 'Refine and hand over',
    description: 'We test the experience, address the details, and make sure you know how to move forward after launch.',
  },
];

export const ProcessSection: React.FC = () => (
  <section id="process" className="editorial-section">
    <div className="editorial-container">
      <div className="section-heading">
        <p className="section-kicker">How we’ll work</p>
        <h2 className="section-title">Clear steps. No mystery handoffs.</h2>
        <p className="section-description">
          A straightforward collaboration, from the first conversation through delivery.
        </p>
      </div>
      <div className="services-list">
        {steps.map((item) => (
          <article className="service-row" key={item.step}>
            <span className="service-index">{item.step}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <span aria-hidden="true" />
          </article>
        ))}
      </div>
    </div>
  </section>
);
