import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Github, Linkedin, Mail, MessageCircle, Send } from 'lucide-react';
import { SiteSettings } from '../../data/initialData';

interface ContactSectionProps {
  settings: SiteSettings;
  preselectedService?: string;
  standalone?: boolean;
}

interface ContactFormData {
  name: string;
  email: string;
  project_type: string;
  budget: string;
  message: string;
  website: string;
}

const projectOptions = [
  'Website Development',
  'Full-Stack Web Applications',
  'Responsive Website Design',
  'Business Websites',
  'API Integration',
  'Website Maintenance and Optimization',
  'Other Custom Development',
];

const budgetOptions = ['Not sure yet', 'Under $1,000', '$1,000 - $3,000', '$3,000 - $5,000', '$5,000+'];

export const ContactSection: React.FC<ContactSectionProps> = ({ settings, preselectedService, standalone = false }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    project_type: preselectedService || '',
    budget: '',
    message: '',
    website: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  useEffect(() => {
    if (preselectedService) {
      setFormData((previous) => ({ ...previous, project_type: preselectedService }));
    }
  }, [preselectedService]);

  const updateField = (field: keyof ContactFormData, value: string) => {
    setFormData((previous) => ({ ...previous, [field]: value }));
    setFormErrors((previous) => ({ ...previous, [field]: '' }));
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (formData.name.trim().length < 2) errors.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.project_type) errors.project_type = 'Choose a project type, or select “Other”.';
    if (formData.message.trim().length < 15) {
      errors.message = 'Please share a little more detail (at least 15 characters).';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitStatus({ type: null, message: '' });
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const contentType = response.headers.get('content-type') || '';
      const data = contentType.includes('application/json') ? await response.json() : null;

      if (response.ok && data?.success) {
        setSubmitStatus({
          type: 'success',
          message: data.message || 'Thanks for reaching out. Your message has been sent.',
        });
        setFormData({ name: '', email: '', project_type: '', budget: '', message: '', website: '' });
        setFormErrors({});
      } else {
        setSubmitStatus({
          type: 'error',
          message: data?.error || `Your message could not be sent (error ${response.status}). Please email me directly.`,
        });
      }
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'A network error prevented your message from being sent. Please email me directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappUrl = settings.whatsapp
    ? `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`
    : '';
  const Heading = standalone ? 'h1' : 'h2';

  return (
    <section id="contact" className="editorial-contact">
      <div className="editorial-container">
        <div className="section-heading">
          <p className="section-kicker">Have something in mind?</p>
          <Heading className="section-title">Let’s make your next idea useful.</Heading>
          <p className="section-description">
            Share a little about what you’re working on. I’ll get back to you to talk through
            the goals, constraints, and a sensible next step.
          </p>
        </div>

        <div className="editorial-contact-grid">
          <aside className="contact-direct" aria-label="Other ways to get in touch">
            <p>Prefer a direct conversation? Choose whichever channel works for you.</p>
            <a href={`mailto:${settings.contact_email}`}>
              <Mail size={15} aria-hidden="true" /> {settings.contact_email}
            </a>
            {whatsappUrl && (
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={15} aria-hidden="true" /> WhatsApp
              </a>
            )}
            {settings.linkedin_url && (
              <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer">
                <Linkedin size={15} aria-hidden="true" /> LinkedIn
              </a>
            )}
            {settings.github_url && (
              <a href={settings.github_url} target="_blank" rel="noopener noreferrer">
                <Github size={15} aria-hidden="true" /> GitHub
              </a>
            )}
            {settings.booking_url && !settings.booking_url.includes('[') && (
              <a href={settings.booking_url} target="_blank" rel="noopener noreferrer">
                <ArrowUpRight size={15} aria-hidden="true" /> Schedule a conversation
              </a>
            )}
          </aside>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <h3 className="contact-form-heading">Tell me about your project</h3>
            {submitStatus.type && (
              <p
                className={`contact-feedback contact-feedback-${submitStatus.type}`}
                role={submitStatus.type === 'error' ? 'alert' : 'status'}
                aria-live="polite"
              >
                {submitStatus.message}
              </p>
            )}
            <div className="contact-fields">
              <div className="contact-field">
                <label htmlFor="contact-name">Your name</label>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={(event) => updateField('name', event.target.value)}
                  aria-invalid={Boolean(formErrors.name)}
                  aria-describedby={formErrors.name ? 'contact-name-error' : undefined}
                  required
                />
                {formErrors.name && <span className="contact-error" id="contact-name-error">{formErrors.name}</span>}
              </div>
              <div className="contact-field">
                <label htmlFor="contact-email">Email address</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  aria-invalid={Boolean(formErrors.email)}
                  aria-describedby={formErrors.email ? 'contact-email-error' : undefined}
                  required
                />
                {formErrors.email && <span className="contact-error" id="contact-email-error">{formErrors.email}</span>}
              </div>
              <div className="contact-field">
                <label htmlFor="contact-type">What are you looking to build?</label>
                <select
                  id="contact-type"
                  name="project_type"
                  value={formData.project_type}
                  onChange={(event) => updateField('project_type', event.target.value)}
                  aria-invalid={Boolean(formErrors.project_type)}
                  aria-describedby={formErrors.project_type ? 'contact-type-error' : undefined}
                  required
                >
                  <option value="">Select a project type</option>
                  {preselectedService && !projectOptions.includes(preselectedService) && (
                    <option value={preselectedService}>{preselectedService}</option>
                  )}
                  {projectOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
                {formErrors.project_type && <span className="contact-error" id="contact-type-error">{formErrors.project_type}</span>}
              </div>
              <div className="contact-field">
                <label htmlFor="contact-budget">Budget range (optional)</label>
                <select
                  id="contact-budget"
                  name="budget"
                  value={formData.budget}
                  onChange={(event) => updateField('budget', event.target.value)}
                >
                  <option value="">Choose a range</option>
                  {budgetOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </div>
              <div className="contact-field contact-field-full">
                <label htmlFor="contact-message">A few details</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={(event) => updateField('message', event.target.value)}
                  placeholder="What are you hoping to build or improve?"
                  aria-invalid={Boolean(formErrors.message)}
                  aria-describedby={formErrors.message ? 'contact-message-error' : undefined}
                  required
                />
                {formErrors.message && <span className="contact-error" id="contact-message-error">{formErrors.message}</span>}
              </div>
              <div className="contact-field" aria-hidden="true" style={{ position: 'absolute', left: '-10000px' }}>
                <label htmlFor="contact-website">Leave this field empty</label>
                <input
                  id="contact-website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(event) => updateField('website', event.target.value)}
                />
              </div>
            </div>
            <div className="contact-submit">
              <button type="submit" className="editorial-button" disabled={isSubmitting}>
                {isSubmitting ? 'Sending…' : 'Send your inquiry'}
                <Send size={14} aria-hidden="true" />
              </button>
            </div>
            <p className="contact-note">
              Your details are used only to respond to this inquiry. Fields marked as required
              must be completed before sending.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
