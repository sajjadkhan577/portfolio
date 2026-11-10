import React, { useEffect, useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Upload,
  Eye,
  CheckCircle,
  X,
  Sparkles,
} from 'lucide-react';
import { Project, initialProjects } from '../../data/initialData';
import { Card, Button, Badge } from '../ui/Button';
import { Input, Textarea } from '../ui/FormElements';

interface AdminProjectsProps {
  token: string;
}

export const AdminProjects: React.FC<AdminProjectsProps> = ({ token }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isLoading, setIsLoading] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [techInput, setTechInput] = useState('');
  const [imageError, setImageError] = useState('');
  const [saveError, setSaveError] = useState('');

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/projects', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json().catch(() => null);
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      }
    } catch (err) {
      console.warn('Using default projects fallback:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenNew = () => {
    setImageError('');
    setSaveError('');
    setEditingProject({
      title: '',
      slug: '',
      summary: '',
      problem: '',
      solution: '',
      result: '',
      tech: ['React', 'Node.js', 'Tailwind CSS'],
      cover_image_url: '',
      gallery: [],
      live_url: '',
      repo_url: '',
      client_name: '',
      show_client_name: false,
      featured: true,
      sort_order: projects.length + 1,
      published: true,
    });
    setTechInput('React, Node.js, Tailwind CSS');
  };

  const handleOpenEdit = (p: Project) => {
    setImageError('');
    setSaveError('');
    setEditingProject(p);
    setTechInput(p.tech.join(', '));
  };

  const handleTitleChange = (newTitle: string) => {
    if (!editingProject) return;
    const updates: Partial<Project> = { title: newTitle };
    // Auto-generate slug if new project or matching old slug
    if (!editingProject.id || !editingProject.slug) {
      updates.slug = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }
    setEditingProject({ ...editingProject, ...updates });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProject) return;

    setImageError('');
    setSaveError('');
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setImageError('Choose a JPG, PNG, or WebP image.');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setImageError('Choose an image smaller than 15 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => setImageError('The selected image could not be read. Please try another file.');
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        setImageError('The selected image could not be read. Please try another file.');
        return;
      }

      const img = new Image();
      img.onload = () => {
        try {
          const scale = Math.min(1, 1600 / img.width, 1000 / img.height);
          const width = Math.max(1, Math.round(img.width * scale));
          const height = Math.max(1, Math.round(img.height * scale));
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const context = canvas.getContext('2d');
          if (!context) {
            setImageError('Image compression is unavailable in this browser.');
            return;
          }
          context.drawImage(img, 0, 0, width, height);

          const compressedImage = canvas.toDataURL('image/webp', 0.82);
          if (compressedImage.length > 5 * 1024 * 1024) {
            setImageError('The compressed image is still too large. Choose a smaller image.');
            return;
          }
          setEditingProject((current) => current ? { ...current, cover_image_url: compressedImage } : current);
        } catch (error) {
          console.error('Image compression error:', error);
          setImageError('The image could not be prepared. Please try another file.');
        }
      };
      img.onerror = () => setImageError('The selected file is not a readable image.');
      img.src = reader.result;
    };
    try {
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Image read error:', error);
      setImageError('The selected image could not be read. Please try another file.');
    }
  };

  const handleSave = async () => {
    if (!editingProject || !editingProject.title || !editingProject.slug) {
      setSaveError('Please provide a title and slug.');
      return;
    }

    setIsSaving(true);
    setSaveError('');

    try {
      let coverImageUrl = editingProject.cover_image_url || '';
      if (coverImageUrl.startsWith('data:')) {
        const uploadResponse = await fetch('/api/admin/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            dataUrl: coverImageUrl,
            filename: `${editingProject.slug}-preview.webp`,
            mimeType: 'image/webp',
          }),
        });
        const uploadData: unknown = await uploadResponse.json().catch(() => null);
        const uploadMessage = uploadData && typeof uploadData === 'object' && 'error' in uploadData && typeof uploadData.error === 'string'
          ? uploadData.error
          : 'Image upload failed. Please try again.';
        if (!uploadResponse.ok) throw new Error(uploadMessage);
        if (!uploadData || typeof uploadData !== 'object' || !('url' in uploadData) || typeof uploadData.url !== 'string') {
          throw new Error('The image upload did not return a usable URL.');
        }
        coverImageUrl = uploadData.url;
      }

      const techArray = techInput.split(',').map((tech) => tech.trim()).filter(Boolean);
      const payload = { ...editingProject, cover_image_url: coverImageUrl, tech: techArray };
      const isNew = !editingProject.id;
      const url = isNew ? '/api/admin/projects' : `/api/admin/projects/${editingProject.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        await fetchProjects();
        setEditingProject(null);
      } else {
        const errorData: unknown = await res.json().catch(() => null);
        const message = errorData && typeof errorData === 'object' && 'error' in errorData && typeof errorData.error === 'string'
          ? errorData.error
          : 'Failed to save project.';
        throw new Error(message);
      }
    } catch (err) {
      console.error('Save error:', err);
      setSaveError(err instanceof Error ? err.message : 'Failed to save project.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this project permanently?')) return;
    try {
      await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
            Projects & Architecture Portfolio
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            Manage featured client builds, problem/solution breakdowns, live links, and privacy settings.
          </p>
        </div>

        <Button
          size="sm"
          variant="primary"
          onClick={handleOpenNew}
          leftIcon={<Plus className="w-4 h-4 text-[var(--bg-primary)]" />}
        >
          Add New Project
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card
            key={project.id || project.slug}
            className="border-[var(--border-color)] bg-[var(--bg-surface)] p-5 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-[var(--bg-primary)] border border-[var(--border-color)]">
                {project.cover_image_url ? (
                  <img
                    src={project.cover_image_url}
                    alt={`${project.title} project preview`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs font-mono text-[var(--text-muted)]">
                    [No Screenshot]
                  </div>
                )}
                <div className="absolute top-2 right-2 flex items-center gap-1">
                  <Badge variant={project.published ? 'success' : 'neutral'}>
                    {project.published ? 'Live' : 'Draft'}
                  </Badge>
                  {project.featured && <Badge variant="accent">Featured</Badge>}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-[var(--text-primary)] text-base line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)] line-clamp-2 mt-1">
                  {project.summary}
                </p>
              </div>

              <div className="flex flex-wrap gap-1 text-[11px] font-mono text-[var(--text-muted)]">
                {project.tech.slice(0, 3).map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded bg-[var(--bg-surface-elevated)] border border-[var(--border-glow)]">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleOpenEdit(project)}
                  leftIcon={<Edit2 className="w-3.5 h-3.5" />}
                >
                  Edit
                </Button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2 rounded-xl text-[var(--text-muted)] hover:text-rose-400 hover:bg-[var(--bg-primary)] transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {project.live_url && !project.live_url.includes('[') && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[var(--accent-color)] flex items-center gap-1 hover:underline"
                >
                  <ExternalLink className="w-3 h-3" />
                  Live
                </a>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Edit/Create Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">
                {editingProject.id ? 'Edit Project' : 'Create New Project'}
              </h3>
              <button
                onClick={() => setEditingProject(null)}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Project Title"
                  value={editingProject.title || ''}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Masterclass Portal"
                  required
                />
                <Input
                  label="URL Slug"
                  value={editingProject.slug || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                  placeholder="e.g. masterclass-portal"
                  required
                />
              </div>

              <Textarea
                label="High-Level Summary"
                rows={2}
                value={editingProject.summary || ''}
                onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                placeholder="One or two sentences explaining the core application."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Textarea
                  label="The Challenge / Problem"
                  rows={3}
                  value={editingProject.problem || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, problem: e.target.value })}
                  placeholder="What operational bottleneck or limitation did the client face?"
                />
                <Textarea
                  label="What Sajjad Built"
                  rows={3}
                  value={editingProject.solution || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                  placeholder="The architecture, dashboards, and features built."
                />
              </div>

              <Textarea
                label="Measurable Client Outcome (Result)"
                rows={2}
                value={editingProject.result || ''}
                onChange={(e) => setEditingProject({ ...editingProject, result: e.target.value })}
                placeholder="e.g. 3x faster student enrollment, $45k processed smoothly."
              />

              <Input
                label="Technologies (Comma-separated)"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="PHP, MySQL, React, Tailwind CSS"
              />

              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Project Preview Image
                </label>
                <p className="text-xs text-[var(--text-muted)]">
                  Choose a project-specific image. It is resized to WebP and uploaded when you save.
                </p>
                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-2 px-3 py-2 bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-dark)] text-xs font-medium text-[var(--text-primary)] rounded-xl border border-[var(--border-glow)] cursor-pointer">
                    <Upload className="w-4 h-4 text-[var(--accent-color)]" />
                    <span>{editingProject.cover_image_url ? 'Replace Image' : 'Choose Image'}</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(event) => {
                        handleImageUpload(event);
                        event.currentTarget.value = '';
                      }}
                      className="hidden"
                    />
                  </label>
                  {editingProject.cover_image_url && (
                    <span className="text-xs text-[var(--accent-color)] font-mono">Preview ready</span>
                  )}
                </div>
                {imageError && <p className="text-xs text-rose-400" role="alert">{imageError}</p>}
                {editingProject.cover_image_url && (
                  <img
                    src={editingProject.cover_image_url}
                    alt={`${editingProject.title || 'Project'} preview before saving`}
                    className="w-full max-h-72 border border-[var(--border-color)] object-contain bg-[var(--bg-primary)]"
                  />
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Live Website URL"
                  value={editingProject.live_url || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, live_url: e.target.value })}
                  placeholder="https://..."
                />
                <Input
                  label="GitHub Repository URL"
                  value={editingProject.repo_url || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, repo_url: e.target.value })}
                  placeholder="https://github.com/..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Client Name"
                  value={editingProject.client_name || ''}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, client_name: e.target.value })
                  }
                  placeholder="e.g. Online Education Client"
                />

                <div className="flex flex-col justify-center space-y-2 pt-4">
                  <label className="flex items-center gap-2 text-xs text-[var(--text-primary)] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingProject.show_client_name || false}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          show_client_name: e.target.checked,
                        })
                      }
                      className="rounded bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--accent-color)] focus:ring-[var(--accent-color)]"
                    />
                    <span>Show Client Name Publicly</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs text-[var(--text-primary)] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingProject.featured || false}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, featured: e.target.checked })
                      }
                      className="rounded bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--accent-color)] focus:ring-[var(--accent-color)]"
                    />
                    <span>Mark as Featured (Home Page)</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs text-[var(--text-primary)] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingProject.published || false}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, published: e.target.checked })
                      }
                      className="rounded bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--accent-color)] focus:ring-[var(--accent-color)]"
                    />
                    <span>Published (Visible to public)</span>
                  </label>
                </div>
              </div>
            </div>

            {saveError && <p className="text-sm text-rose-400" role="alert">{saveError}</p>}
            <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-end gap-3">
              <Button variant="ghost" size="sm" onClick={() => setEditingProject(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleSave}
                isLoading={isSaving}
                leftIcon={<CheckCircle className="w-4 h-4 text-[var(--bg-primary)]" />}
              >
                Save Project Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
