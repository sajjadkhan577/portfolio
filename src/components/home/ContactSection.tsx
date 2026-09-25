import React, { useState } from 'react';
import {
  Calendar,
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  MessageSquare,
  Linkedin,
  Github,
  DollarSign,
} from 'lucide-react';
import { SiteSettings } from '../../data/initialData';
import { Section, Input, Textarea, Select } from '../ui/FormElements';
import { Card, Button } from '../ui/Button';

interface ContactSectionProps {
  settings: SiteSettings;
  preselectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  settings,
  preselectedService,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project_type: preselectedService || 'Coach & Consultant Websites',
    budget: '$3,000 - $5,000',
    message: '',
    website: '', // Honeypot field
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const projectOptions = [
    { value: 'Coach & Consultant Websites', label: 'Coach & Consultant Website (Booking & Funnels)' },
    { value: 'Online Course Platforms (LMS)', label: 'Online Course Platform (LMS & Payment Verification)' },
    { value: 'Client Portals & Admin Dashboards', label: 'Client Portal or Admin Dashboard' },
    { value: 'E-Commerce and Business Websites', label: 'E-Commerce / Business Web App' },
    { value: 'Bug Fixes, Upgrades & Maintenance', label: 'Bug Fixes, Performance Boost or Upgrades' },
    { value: 'Other Custom Development', label: 'Other Custom Full-Stack Project' },
  ];

  const budgetOptions = [
    { value: '< $1,000', label: 'Under $1,000 (Small sprint / bug fix)' },
    { value: '$1,000 - $3,000', label: '$1,000 - $3,000 (Standard website / funnel)' },
    { value: '$3,000 - $5,000', label: '$3,000 - $5,000 (Full platform / custom LMS)' },
    { value: '$5,000+', label: '$5,000+ (Comprehensive enterprise system)' },
  ];

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Please provide your full name (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please provide a valid business or personal email.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 15) {
      errors.message = 'Please provide a few details about your project (at least 15 characters).';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus({ type: null, message: '' });

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus({
          type: 'success',
          message: data.message || 'Thank you! Your message has been sent directly to Sajjad.',
        });
        setFormData({
          name: '',
          email: '',
          project_type: 'Coach & Consultant Websites',
          budget: '$3,000 - $5,000',
          message: '',
          website: '',
        });
        setFormErrors({});
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Could not send message. Please email directly at sajjad2003khan@gmail.com.',
        });
      }
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please email directly at sajjad2003khan@gmail.com.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section
      id="contact"
      eyebrow="Initiate Project"
      title="Let's Build Your Platform"
      subtitle="Have an online course platform, booking funnel, or custom dashboard to build? Book a call directly or send an inquiry below."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Booking & Fast Channels */}
        <div className="lg:col-span-5 space-y-6">
          {/* Calendar Booking Card */}
          <Card className="border-[#1e293b] bg-gradient-to-br from-[#111827] to-[#0a0e17] p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#00e599]/10 border border-[#00e599]/30 flex items-center justify-center text-[#00e599]">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#f8fafc]">
                Schedule a Free Strategy Call
              </h3>
              <p className="text-xs sm:text-sm text-[#94a3b8] mt-1.5 leading-relaxed">
                20-minute video discussion to explore your architecture requirements, timeline milestones, and exact budget estimate.
              </p>
            </div>

            <div className="pt-2">
              <a
                href={
                  settings.booking_url && !settings.booking_url.includes('[')
                    ? settings.booking_url
                    : `mailto:${settings.contact_email}?subject=Strategy%20Call%20Booking`
                }
                target={settings.booking_url && !settings.booking_url.includes('[') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#00e599] hover:bg-[#00cc88] text-[#0a0e17] font-semibold text-sm transition-all shadow-md shadow-[#00e599]/20"
              >
                <Calendar className="w-4 h-4" />
                <span>
                  {settings.booking_url && !settings.booking_url.includes('[')
                    ? 'Open Booking Calendar'
                    : 'Request Call via Email'}
                </span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </Card>

          {/* Direct Channels List */}
          <Card className="border-[#1e293b] bg-[#111827] p-6 space-y-4">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#64748b]">
              Direct Contact Channels
            </h4>

            <div className="space-y-3 text-sm">
              <a
                href={`mailto:${settings.contact_email}`}
                className="flex items-center justify-between p-3 rounded-xl bg-[#0a0e17] border border-[#1e293b] hover:border-[#00e599]/40 group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#00e599]" />
                  <div>
                    <span className="text-xs text-[#64748b] block">Direct Email</span>
                    <span className="text-xs sm:text-sm font-mono text-[#f8fafc] group-hover:text-[#00e599] transition-colors">
                      {settings.contact_email}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#64748b]" />
              </a>

              {settings.whatsapp && (
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#0a0e17] border border-[#1e293b] hover:border-[#00e599]/40 group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-4 h-4 text-[#00e599]" />
                    <div>
                      <span className="text-xs text-[#64748b] block">WhatsApp</span>
                      <span className="text-xs sm:text-sm font-mono text-[#f8fafc] group-hover:text-[#00e599] transition-colors">
                        {settings.whatsapp}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#64748b]" />
                </a>
              )}

              {settings.linkedin_url && (
                <a
                  href={settings.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#0a0e17] border border-[#1e293b] hover:border-[#00e599]/40 group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-4 h-4 text-[#00e599]" />
                    <div>
                      <span className="text-xs text-[#64748b] block">LinkedIn</span>
                      <span className="text-xs sm:text-sm text-[#f8fafc] group-hover:text-[#00e599] transition-colors">
                        sajjad-khan-dev
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#64748b]" />
                </a>
              )}

              {settings.github_url && (
                <a
                  href={settings.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#0a0e17] border border-[#1e293b] hover:border-[#00e599]/40 group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Github className="w-4 h-4 text-[#00e599]" />
                    <div>
                      <span className="text-xs text-[#64748b] block">GitHub Repos</span>
                      <span className="text-xs sm:text-sm text-[#f8fafc] group-hover:text-[#00e599] transition-colors">
                        sajjadkhan577
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#64748b]" />
                </a>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column: Validated Project Inquiry Form */}
        <div className="lg:col-span-7">
          <Card className="border-[#1e293b] bg-[#111827] p-6 sm:p-8">
            <h3 className="text-xl font-bold text-[#f8fafc] mb-2">
              Send a Detailed Project Inquiry
            </h3>
            <p className="text-xs sm:text-sm text-[#94a3b8] mb-6">
              Fill out this form and I will reply within 24 hours with architectural suggestions and a preliminary scope.
            </p>

            {submitStatus.type === 'success' && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-emerald-300">
                  {submitStatus.message}
                </p>
              </div>
            )}

            {submitStatus.type === 'error' && (
              <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-rose-300">
                  {submitStatus.message}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot field (hidden from legitimate users, traps automated bots) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website (Leave Empty)</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Your Name"
                  placeholder="e.g. Sarah Jenkins"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  error={formErrors.name}
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="e.g. sarah@coaching.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  error={formErrors.email}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Project Category"
                  options={projectOptions}
                  value={formData.project_type}
                  onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                />
                <Select
                  label="Estimated Budget"
                  options={budgetOptions}
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                />
              </div>

              <Textarea
                label="Project Details & Requirements"
                rows={5}
                placeholder="Tell me about what you are building: do you need student authentication, payment verification, a booking funnel, or custom dashboards? What is your desired launch timeframe?"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                error={formErrors.message}
                helperText="Minimum 15 characters. The more specific details you share, the faster I can provide a scope."
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  isLoading={isSubmitting}
                  leftIcon={<Send className="w-4 h-4 text-[#0a0e17]" />}
                >
                  Send Project Inquiry
                </Button>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-[#64748b]">
                <span>✓ IP Rate-Limited & Honeypot Protected</span>
                <span>✓ Direct Inbox Delivery</span>
              </div>

              {/* Privacy Note */}
              <div className="p-3 rounded-xl bg-[#0a0e17] border border-[#1e293b] text-left">
                <p className="text-[11px] text-[#94a3b8] leading-relaxed">
                  <strong className="text-[#f8fafc] font-semibold">🔒 Privacy Guarantee:</strong> Your contact information and project details are held in strict confidence. I never sell your data, send marketing spam, or share client project details without explicit written consent.
                </p>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </Section>
  );
};
