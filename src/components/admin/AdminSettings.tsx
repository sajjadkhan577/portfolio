import React, { useEffect, useState } from 'react';
import { CheckCircle, Save, Globe, Share2, Sparkles, RefreshCw } from 'lucide-react';
import { initialSettings, SiteSettings } from '../../data/initialData';
import { Card, Button } from '../ui/Button';
import { Input, Textarea } from '../ui/FormElements';

interface AdminSettingsProps {
  token: string;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({ token }) => {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadSettings = async () => {
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data && typeof data === 'object' && data.hero_headline) {
            setSettings((prev) => ({ ...prev, ...data }));
          }
        }
      } catch (err) {
        console.warn('Using default settings fallback:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadSettings();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    setErrorMessage(null);

    try {
      let res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      });

      // Backward compatibility fallback
      if (res.status === 404) {
        res = await fetch('/api/admin/site-settings', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(settings),
        });
      }

      if (res.status === 401) {
        localStorage.removeItem('admin_token');
        setErrorMessage('Admin session has expired. Please refresh to log in again.');
        setTimeout(() => {
          window.location.reload();
        }, 1200);
        return;
      }

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error || 'Failed to update settings. Please check server logs or re-login.');
      }
    } catch (err) {
      console.error('Settings save error:', err);
      setErrorMessage('Network error while saving settings.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
            Site Settings & Global Parameters
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            Configure hero headlines, client availability status, booking links, and search meta tags.
          </p>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isSaving}
          leftIcon={<Save className="w-4 h-4 text-[var(--bg-primary)]" />}
        >
          {saveSuccess ? 'Saved Successfully!' : 'Save Site Settings'}
        </Button>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-xs font-mono text-emerald-400">
          <CheckCircle className="w-4 h-4" />
          <span>Global site settings updated and synchronized.</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-xs font-mono text-rose-400">
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Hero & Availability */}
      <Card className="border-[var(--border-color)] bg-[var(--bg-surface)] p-6 space-y-4">
        <h3 className="font-bold text-[var(--text-primary)] text-base flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[var(--accent-color)]" />
          Hero Headline & Availability
        </h3>

        <div className="grid grid-cols-1 gap-4">
          <Input
            label="Hero Main Headline"
            value={settings.hero_headline}
            onChange={(e) => setSettings({ ...settings, hero_headline: e.target.value })}
          />

          <Textarea
            label="Hero Subheadline"
            rows={3}
            value={settings.hero_subheadline}
            onChange={(e) => setSettings({ ...settings, hero_subheadline: e.target.value })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <Input
              label="Availability Pill Text"
              value={settings.availability_text}
              onChange={(e) => setSettings({ ...settings, availability_text: e.target.value })}
              placeholder="e.g. Available for 2 Client Projects (Q2 2026)"
            />

            <div className="pt-5">
              <label className="flex items-center gap-2 text-xs text-[var(--text-primary)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.availability_open}
                  onChange={(e) =>
                    setSettings({ ...settings, availability_open: e.target.checked })
                  }
                  className="rounded bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--accent-color)]"
                />
                <span>Open for Client Inquiries (Green Pulse Dot)</span>
              </label>
            </div>
          </div>
        </div>
      </Card>

      {/* Communication & Social Channels */}
      <Card className="border-[var(--border-color)] bg-[var(--bg-surface)] p-6 space-y-4">
        <h3 className="font-bold text-[var(--text-primary)] text-base flex items-center gap-2">
          <Share2 className="w-4 h-4 text-[var(--accent-color)]" />
          Direct Channels & Booking URLs
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Primary Contact Email"
            type="email"
            value={settings.contact_email}
            onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
          />

          <Input
            label="WhatsApp Number (with country code)"
            value={settings.whatsapp}
            onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
            placeholder="+92 300 1234567"
          />

          <Input
            label="Calendly / Cal.com Booking Link"
            value={settings.booking_url}
            onChange={(e) => setSettings({ ...settings, booking_url: e.target.value })}
            placeholder="https://cal.com/sajjadkhan"
          />

          <Input
            label="LinkedIn URL"
            value={settings.linkedin_url}
            onChange={(e) => setSettings({ ...settings, linkedin_url: e.target.value })}
          />

          <Input
            label="GitHub Profile URL"
            value={settings.github_url}
            onChange={(e) => setSettings({ ...settings, github_url: e.target.value })}
          />

          <Input
            label="Fiverr Profile URL"
            value={settings.fiverr_url}
            onChange={(e) => setSettings({ ...settings, fiverr_url: e.target.value })}
            placeholder="https://www.fiverr.com/..."
          />
        </div>
      </Card>

      {/* SEO & Meta */}
      <Card className="border-[var(--border-color)] bg-[var(--bg-surface)] p-6 space-y-4">
        <h3 className="font-bold text-[var(--text-primary)] text-base flex items-center gap-2">
          <Globe className="w-4 h-4 text-[var(--accent-color)]" />
          Search Engine Optimization (SEO)
        </h3>

        <div className="space-y-4">
          <Input
            label="Page Title Tag"
            value={settings.seo_title}
            onChange={(e) => setSettings({ ...settings, seo_title: e.target.value })}
          />

          <Textarea
            label="Meta Description Tag"
            rows={2}
            value={settings.seo_description}
            onChange={(e) => setSettings({ ...settings, seo_description: e.target.value })}
          />
        </div>
      </Card>
    </form>
  );
};
