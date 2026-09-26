import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle, X, ShieldCheck } from 'lucide-react';
import { Service, Testimonial, FAQ } from '../../data/initialData';
import { Card, Button, Badge } from '../ui/Button';
import { Input, Textarea } from '../ui/FormElements';

interface AdminContentProps {
  token: string;
}

export const AdminContent: React.FC<AdminContentProps> = ({ token }) => {
  const [activeSubTab, setActiveSubTab] = useState<'services' | 'testimonials' | 'faqs'>('services');

  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);
  const [editingFaq, setEditingFaq] = useState<Partial<FAQ> | null>(null);

  const [isSaving, setIsSaving] = useState(false);

  const loadData = async () => {
    try {
      const [sRes, tRes, fRes] = await Promise.all([
        fetch('/api/services'),
        fetch('/api/testimonials'),
        fetch('/api/faqs'),
      ]);
      setServices(await sRes.json());
      setTestimonials(await tRes.json());
      setFaqs(await fRes.json());
    } catch (err) {
      console.error('Error loading content:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Services actions
  const saveService = async () => {
    if (!editingService?.title) return;
    setIsSaving(true);
    try {
      const isNew = !editingService.id;
      const url = isNew ? '/api/admin/services' : `/api/admin/services/${editingService.id}`;
      const method = isNew ? 'POST' : 'PUT';

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(editingService),
      });
      await loadData();
      setEditingService(null);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteService = async (id: string) => {
    if (!window.confirm('Delete service?')) return;
    await fetch(`/api/admin/services/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  // Testimonials actions
  const saveTestimonial = async () => {
    if (!editingTestimonial?.quote) return;
    setIsSaving(true);
    try {
      const isNew = !editingTestimonial.id;
      const url = isNew ? '/api/admin/testimonials' : `/api/admin/testimonials/${editingTestimonial.id}`;
      const method = isNew ? 'POST' : 'PUT';

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(editingTestimonial),
      });
      await loadData();
      setEditingTestimonial(null);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!window.confirm('Delete testimonial?')) return;
    await fetch(`/api/admin/testimonials/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  // FAQs actions
  const saveFaq = async () => {
    if (!editingFaq?.question) return;
    setIsSaving(true);
    try {
      const isNew = !editingFaq.id;
      const url = isNew ? '/api/admin/faqs' : `/api/admin/faqs/${editingFaq.id}`;
      const method = isNew ? 'POST' : 'PUT';

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(editingFaq),
      });
      await loadData();
      setEditingFaq(null);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteFaq = async (id: string) => {
    if (!window.confirm('Delete FAQ?')) return;
    await fetch(`/api/admin/faqs/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    setFaqs((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Sub tabs */}
      <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-4">
        <button
          onClick={() => setActiveSubTab('services')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-colors cursor-pointer ${
            activeSubTab === 'services'
              ? 'bg-[var(--accent-color)] text-[var(--bg-primary)] font-bold'
              : 'bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
          }`}
        >
          Services ({services.length})
        </button>
        <button
          onClick={() => setActiveSubTab('testimonials')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-colors cursor-pointer ${
            activeSubTab === 'testimonials'
              ? 'bg-[var(--accent-color)] text-[var(--bg-primary)] font-bold'
              : 'bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
          }`}
        >
          Testimonials ({testimonials.length})
        </button>
        <button
          onClick={() => setActiveSubTab('faqs')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-colors cursor-pointer ${
            activeSubTab === 'faqs'
              ? 'bg-[var(--accent-color)] text-[var(--bg-primary)] font-bold'
              : 'bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
          }`}
        >
          FAQs ({faqs.length})
        </button>
      </div>

      {/* Services Tab */}
      {activeSubTab === 'services' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs text-[var(--text-muted)]">Specialized Services list</span>
            <Button
              size="sm"
              variant="primary"
              onClick={() =>
                setEditingService({
                  title: '',
                  description: '',
                  icon: 'Wrench',
                  sort_order: services.length + 1,
                  published: true,
                })
              }
              leftIcon={<Plus className="w-4 h-4 text-[var(--bg-primary)]" />}
            >
              Add Service
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((s) => (
              <Card key={s.id} className="border-[var(--border-color)] bg-[var(--bg-surface)] p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-[var(--text-primary)] text-base">{s.title}</h4>
                  <Badge variant={s.published ? 'success' : 'neutral'}>
                    {s.published ? 'Live' : 'Draft'}
                  </Badge>
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{s.description}</p>
                <div className="pt-2 flex items-center justify-end gap-2 border-t border-[var(--border-color)]">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingService(s)}
                    leftIcon={<Edit2 className="w-3 h-3" />}
                  >
                    Edit
                  </Button>
                  <button
                    onClick={() => deleteService(s.id)}
                    className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Testimonials Tab */}
      {activeSubTab === 'testimonials' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs text-[var(--text-muted)]">Verified client testimonials</span>
            <Button
              size="sm"
              variant="primary"
              onClick={() =>
                setEditingTestimonial({
                  author_name: '[name/title, or "Client, online education"]',
                  author_role: 'Founder / Educator',
                  quote: "[paste the client's words]",
                  avatar_url: '',
                  sort_order: testimonials.length + 1,
                  published: true,
                })
              }
              leftIcon={<Plus className="w-4 h-4 text-[var(--bg-primary)]" />}
            >
              Add Testimonial
            </Button>
          </div>

          <div className="space-y-4">
            {testimonials.map((t) => (
              <Card key={t.id} className="border-[var(--border-color)] bg-[var(--bg-surface)] p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[var(--text-primary)]">{t.author_name}</span>
                    <span className="text-xs text-[var(--text-muted)]">({t.author_role})</span>
                  </div>
                  <Badge variant={t.published ? 'success' : 'neutral'}>
                    {t.published ? 'Published' : 'Hidden'}
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] italic">"{t.quote}"</p>
                <div className="pt-2 flex items-center justify-end gap-2 border-t border-[var(--border-color)]">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingTestimonial(t)}
                    leftIcon={<Edit2 className="w-3 h-3" />}
                  >
                    Edit
                  </Button>
                  <button
                    onClick={() => deleteTestimonial(t.id)}
                    className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* FAQs Tab */}
      {activeSubTab === 'faqs' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs text-[var(--text-muted)]">Frequently Asked Questions</span>
            <Button
              size="sm"
              variant="primary"
              onClick={() =>
                setEditingFaq({
                  question: '',
                  answer: '',
                  sort_order: faqs.length + 1,
                  published: true,
                })
              }
              leftIcon={<Plus className="w-4 h-4 text-[var(--bg-primary)]" />}
            >
              Add FAQ
            </Button>
          </div>

          <div className="space-y-3">
            {faqs.map((f) => (
              <Card key={f.id} className="border-[var(--border-color)] bg-[var(--bg-surface)] p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[var(--text-primary)] text-sm">{f.question}</span>
                  <Badge variant={f.published ? 'success' : 'neutral'}>
                    {f.published ? 'Live' : 'Draft'}
                  </Badge>
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{f.answer}</p>
                <div className="pt-2 flex items-center justify-end gap-2 border-t border-[var(--border-color)]">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingFaq(f)}
                    leftIcon={<Edit2 className="w-3 h-3" />}
                  >
                    Edit
                  </Button>
                  <button
                    onClick={() => deleteFaq(f.id)}
                    className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="w-full max-w-lg border-[var(--border-color)] bg-[var(--bg-surface)] p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-[var(--text-primary)] text-lg">Edit Service</h3>
            <Input
              label="Service Title"
              value={editingService.title || ''}
              onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
            />
            <Textarea
              label="Description"
              rows={3}
              value={editingService.description || ''}
              onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
            />
            <Input
              label="Lucide Icon (Calendar, GraduationCap, LayoutDashboard, ShoppingBag, Wrench)"
              value={editingService.icon || 'Wrench'}
              onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
            />
            <label className="flex items-center gap-2 text-xs text-[var(--text-primary)]">
              <input
                type="checkbox"
                checked={editingService.published || false}
                onChange={(e) =>
                  setEditingService({ ...editingService, published: e.target.checked })
                }
              />
              <span>Published on Website</span>
            </label>
            <div className="flex justify-end gap-2 pt-2 border-t border-[var(--border-color)]">
              <Button variant="ghost" size="sm" onClick={() => setEditingService(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={saveService} isLoading={isSaving}>
                Save
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Edit Testimonial Modal */}
      {editingTestimonial && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="w-full max-w-lg border-[var(--border-color)] bg-[var(--bg-surface)] p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-[var(--text-primary)] text-lg">Edit Testimonial</h3>
            <Input
              label="Author Name"
              value={editingTestimonial.author_name || ''}
              onChange={(e) =>
                setEditingTestimonial({ ...editingTestimonial, author_name: e.target.value })
              }
            />
            <Input
              label="Author Role"
              value={editingTestimonial.author_role || ''}
              onChange={(e) =>
                setEditingTestimonial({ ...editingTestimonial, author_role: e.target.value })
              }
            />
            <Textarea
              label="Client Quote / Feedback"
              rows={4}
              value={editingTestimonial.quote || ''}
              onChange={(e) =>
                setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })
              }
            />
            <label className="flex items-center gap-2 text-xs text-[var(--text-primary)]">
              <input
                type="checkbox"
                checked={editingTestimonial.published || false}
                onChange={(e) =>
                  setEditingTestimonial({ ...editingTestimonial, published: e.target.checked })
                }
              />
              <span>Visible on Site</span>
            </label>
            <div className="flex justify-end gap-2 pt-2 border-t border-[var(--border-color)]">
              <Button variant="ghost" size="sm" onClick={() => setEditingTestimonial(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={saveTestimonial} isLoading={isSaving}>
                Save
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Edit FAQ Modal */}
      {editingFaq && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="w-full max-w-lg border-[var(--border-color)] bg-[var(--bg-surface)] p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-[var(--text-primary)] text-lg">Edit FAQ</h3>
            <Input
              label="Question"
              value={editingFaq.question || ''}
              onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
            />
            <Textarea
              label="Answer"
              rows={4}
              value={editingFaq.answer || ''}
              onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
            />
            <label className="flex items-center gap-2 text-xs text-[var(--text-primary)]">
              <input
                type="checkbox"
                checked={editingFaq.published || false}
                onChange={(e) => setEditingFaq({ ...editingFaq, published: e.target.checked })}
              />
              <span>Visible in FAQ Accordion</span>
            </label>
            <div className="flex justify-end gap-2 pt-2 border-t border-[var(--border-color)]">
              <Button variant="ghost" size="sm" onClick={() => setEditingFaq(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={saveFaq} isLoading={isSaving}>
                Save
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
