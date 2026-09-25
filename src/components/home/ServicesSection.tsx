import React from 'react';
import {
  Calendar,
  GraduationCap,
  LayoutDashboard,
  ShoppingBag,
  Wrench,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Service } from '../../data/initialData';
import { Section } from '../ui/FormElements';
import { Card } from '../ui/Button';

interface ServicesSectionProps {
  services: Service[];
  onSelectService?: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onSelectService,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calendar':
        return <Calendar className="w-6 h-6 text-[#00e599]" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-[#00e599]" />;
      case 'LayoutDashboard':
        return <LayoutDashboard className="w-6 h-6 text-[#00e599]" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-6 h-6 text-[#00e599]" />;
      case 'Wrench':
      default:
        return <Wrench className="w-6 h-6 text-[#00e599]" />;
    }
  };

  const getDeliverables = (title: string): string[] => {
    if (title.includes('Coach')) {
      return [
        'Automated Cal.com / Calendly calendar booking',
        'Lead capture forms & email notifications',
        'High-converting testimonial & offer structure',
        'Mobile speed & Core Web Vitals optimization',
      ];
    }
    if (title.includes('Course') || title.includes('LMS')) {
      return [
        'Student accounts, secure login & access gating',
        'Enrollment flows & course progress tracking',
        'Payment submission & receipt verification queue',
        'Scholarship and donation forms with admin review',
      ];
    }
    if (title.includes('Portal') || title.includes('Dashboard')) {
      return [
        'Multi-role access (Admin, Team, Client)',
        'Actionable KPI summaries & real-time reporting',
        'Document exchange & status workflows',
        'Intuitive custom database UI',
      ];
    }
    if (title.includes('Commerce')) {
      return [
        'Custom product catalogs & instant filter search',
        'Frictionless responsive cart and checkout',
        'Payment gateway integration (Stripe, PayPal, Local)',
        'Order & inventory management dashboard',
      ];
    }
    return [
      'PHP & MySQL query performance tuning',
      'Node.js & React bugs & deprecation upgrades',
      'Security patching & database schema migration',
      'Ongoing technical maintenance agreements',
    ];
  };

  const handleInquire = (serviceTitle: string) => {
    if (onSelectService) {
      onSelectService(serviceTitle);
    }
    const contactEl = document.querySelector('#contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Section
      id="services"
      eyebrow="Specialized Offerings"
      title="Engineered for Coaches, Course Creators & Businesses"
      subtitle="I do not build generic template sites. Every solution is custom-architected to solve bottlenecks in lead generation, student enrollment, and daily business operations."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => {
          const deliverables = getDeliverables(service.title);

          return (
            <Card
              key={service.id || index}
              hoverEffect
              className="flex flex-col justify-between border-[#1e293b] bg-[#111827]/90 relative overflow-hidden group"
            >
              <div className="space-y-4">
                {/* Header with Icon and Order Index */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#1e293b] border border-[#334155] flex items-center justify-center group-hover:border-[#00e599]/60 transition-colors">
                    {getIcon(service.icon)}
                  </div>
                  <span className="text-xs font-mono text-[#64748b] font-semibold">
                    0{index + 1}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-bold text-[#f8fafc] group-hover:text-[#00e599] transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#94a3b8] leading-relaxed">
                  {service.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="pt-3 border-t border-[#1e293b] space-y-2">
                  <span className="text-xs font-mono font-medium text-[#64748b] block uppercase">
                    What You Get:
                  </span>
                  {deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-[#94a3b8]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00e599] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-[#1e293b]">
                <button
                  onClick={() => handleInquire(service.title)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#1e293b] hover:bg-[#273549] text-xs font-semibold text-[#f8fafc] hover:text-[#00e599] border border-[#334155] hover:border-[#00e599]/40 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Request Proposal for This</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
};
