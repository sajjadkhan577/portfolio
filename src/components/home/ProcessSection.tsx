import React from 'react';
import { Compass, Layers, Code2, Rocket } from 'lucide-react';
import { Section } from '../ui/FormElements';
import { Card } from '../ui/Button';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Discovery & Blueprint',
      icon: <Compass className="w-6 h-6 text-[#00e599]" />,
      description:
        'We define your audience, exact funnel steps, enrollment bottlenecks, and database schemas before writing a single line of code. No speculative scope creep.',
      deliverable: 'Technical architecture specification & wireframes',
    },
    {
      step: '02',
      title: 'Database & System Architecture',
      icon: <Layers className="w-6 h-6 text-[#00e599]" />,
      description:
        'Designing normalized schemas (MySQL/MongoDB), clean REST or GraphQL APIs, payment gateways, and authentication security guards tailored to your business model.',
      deliverable: 'Functional database schema & interactive staging base',
    },
    {
      step: '03',
      title: 'Sprint Development & Live Demos',
      icon: <Code2 className="w-6 h-6 text-[#00e599]" />,
      description:
        'Rapid milestone-based builds. You receive private staging links to test student dashboards, booking flows, and admin actions as they are built.',
      deliverable: 'Weekly review checkpoints & verified milestone demos',
    },
    {
      step: '04',
      title: 'Testing, Launch & Video Walkthrough',
      icon: <Rocket className="w-6 h-6 text-[#00e599]" />,
      description:
        'Cross-browser testing, Core Web Vitals speed optimization, domain/server provisioning, and a custom recorded video training for you and your team.',
      deliverable: 'Production deployment + recorded admin walkthrough',
    },
  ];

  return (
    <Section
      id="process"
      eyebrow="Predictable Delivery"
      title="How We Build Your Platform in 4 Frictionless Steps"
      subtitle="Working remotely with clients worldwide requires transparency, clear milestones, and zero technical surprises. Here is my proven collaboration formula."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((item) => (
          <Card
            key={item.step}
            hoverEffect
            className="border-[#1e293b] bg-[#111827]/80 p-6 flex flex-col justify-between relative group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#1e293b] border border-[#334155] flex items-center justify-center group-hover:border-[#00e599]/60 transition-colors">
                  {item.icon}
                </div>
                <span className="text-xl font-mono font-bold text-[#334155] group-hover:text-[#00e599]/60 transition-colors">
                  {item.step}
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#f8fafc] group-hover:text-[#00e599] transition-colors">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-[#1e293b] text-xs font-mono text-[#00e599] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e599]"></span>
              <span>{item.deliverable}</span>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};
