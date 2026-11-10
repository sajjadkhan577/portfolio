import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Service } from '../../data/initialData';

interface ServicesSectionProps {
  services: Service[];
  onSelectService?: (serviceTitle: string) => void;
}

const coreOfferings = [
  {
    title: 'Website Development',
    matches: ['website development', 'coach & consultant', 'coach website'],
    description: 'A clear, well-built website helps people understand what you offer and take the next step with confidence.',
  },
  {
    title: 'Full-Stack Web Applications',
    matches: ['full-stack', 'online course', '(lms)', 'web application'],
    description: 'Purpose-built applications bring the interface, business logic, and data together around the way your work actually happens.',
  },
  {
    title: 'Responsive Website Design',
    matches: ['responsive website', 'responsive design'],
    description: 'Thoughtful layouts and interactions make your site easier to use across phones, tablets, and desktop screens.',
  },
  {
    title: 'Business Websites',
    matches: ['business website', 'e-commerce', 'ecommerce'],
    description: 'A professional online presence gives customers a useful place to learn about your business, services, and how to reach you.',
  },
  {
    title: 'API Integration',
    matches: ['api integration'],
    description: 'Connect your website to the services and data your team already uses, reducing repetitive work and disconnected customer experiences.',
  },
  {
    title: 'Website Maintenance and Optimization',
    matches: ['maintenance', 'bug fix', 'optimization'],
    description: 'Ongoing updates, fixes, and performance improvements help keep your site reliable as your business and content evolve.',
  },
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, onSelectService }) => {
  const publishedServices = services
    .filter((service) => service.published)
    .sort((a, b) => a.sort_order - b.sort_order);
  const usedServiceIds = new Set<string>();
  const visibleServices = [
    ...coreOfferings.map((offering, index) => {
      const match = publishedServices.find((service) =>
        !usedServiceIds.has(service.id) &&
        offering.matches.some((keyword) => service.title.toLowerCase().includes(keyword))
      );
      if (match) usedServiceIds.add(match.id);
      return {
        id: match?.id || `core-${index}`,
        title: offering.title,
        description: match?.description || offering.description,
      };
    }),
    ...publishedServices
      .filter((service) => !usedServiceIds.has(service.id))
      .map((service) => ({ id: service.id, title: service.title, description: service.description })),
  ];

  return (
    <section id="services" className="editorial-section editorial-section-muted">
      <div className="editorial-container">
        <div className="section-heading">
          <p className="section-kicker">What I can help with</p>
          <h2 className="section-title">Digital work that moves your business forward.</h2>
          <p className="section-description">
            From a considered first website to a more involved application, the aim is the same:
            make the next step easier for the people who use it.
          </p>
        </div>

        <div className="services-list">
          {visibleServices.map((service, index) => (
            <article className="service-row" key={service.id || service.title}>
              <span className="service-index">{String(index + 1).padStart(2, '0')}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <button
                type="button"
                onClick={() => onSelectService?.(service.title)}
                aria-label={`Discuss ${service.title}`}
              >
                <ArrowUpRight size={18} />
              </button>
            </article>
          ))}
        </div>

        <div className="service-cta">
          <p>Have a particular problem in mind? Tell me what you need to make easier, and we can work out the right scope together.</p>
          <button
            type="button"
            className="editorial-button"
            onClick={() => onSelectService?.('Other Custom Development')}
          >
            Talk through your project <ArrowUpRight size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};
