import React, { useState } from 'react';
import { FolderGit2, Plus, Edit2, Trash2, ExternalLink, Github, Sparkles, Image as ImageIcon, Check, X, Upload } from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Project } from '../../../types';

const PRESET_IMAGES = [
  { name: 'Fitness / Health App', url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop' },
  { name: 'Portfolio / Web Dev', url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop' },
  { name: 'Code / Algorithms', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop' },
  { name: 'Terminal / Dashboard', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop' },
  { name: 'Mobile / Responsive', url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop' },
];

export const ProjectsTab: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject } = usePortfolio();

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [form, setForm] = useState({
    name: '',
    description: '',
    longDescription: '',
    image: PRESET_IMAGES[0].url,
    technologies: 'HTML5, CSS3, JavaScript',
    liveUrl: '',
    githubUrl: '',
    category: 'Web App' as 'Web App' | 'Frontend' | 'Utility',
    isFeatured: true,
  });

  const handleStartCreate = () => {
    setEditingProject(null);
    setForm({
      name: '',
      description: '',
      longDescription: '',
      image: PRESET_IMAGES[0].url,
      technologies: 'HTML5, CSS3, JavaScript',
      liveUrl: '',
      githubUrl: '',
      category: 'Web App',
      isFeatured: true,
    });
    setIsCreating(true);
  };

  const handleStartEdit = (proj: Project) => {
    setIsCreating(false);
    setEditingProject(proj);
    setForm({
      name: proj.name,
      description: proj.description,
      longDescription: proj.longDescription || proj.description,
      image: proj.image || PRESET_IMAGES[0].url,
      technologies: proj.technologies.join(', '),
      liveUrl: proj.liveUrl || '',
      githubUrl: proj.githubUrl || '',
      category: proj.category || 'Web App',
      isFeatured: !!proj.isFeatured,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setForm((prev) => ({ ...prev, image: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.description) return;

    const techArray = form.technologies
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (isCreating) {
      const newProj: Project = {
        id: `proj-${Date.now()}`,
        name: form.name,
        description: form.description,
        longDescription: form.longDescription || form.description,
        image: form.image,
        technologies: techArray.length > 0 ? techArray : ['Web Development'],
        liveUrl: form.liveUrl || undefined,
        githubUrl: form.githubUrl || undefined,
        category: form.category,
        isFeatured: form.isFeatured,
      };
      addProject(newProj);
      setIsCreating(false);
    } else if (editingProject) {
      updateProject(editingProject.id, {
        name: form.name,
        description: form.description,
        longDescription: form.longDescription || form.description,
        image: form.image,
        technologies: techArray.length > 0 ? techArray : ['Web Development'],
        liveUrl: form.liveUrl || undefined,
        githubUrl: form.githubUrl || undefined,
        category: form.category,
        isFeatured: form.isFeatured,
      });
      setEditingProject(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-cyan-400" />
            <span>Manage Projects ({projects.length})</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Add new projects, update live demo links, customize screenshots, and tags.
          </p>
        </div>

        {!isCreating && !editingProject && (
          <button
            onClick={handleStartCreate}
            className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
          </button>
        )}
      </div>

      {/* Editor Form Modal/Inline */}
      {(isCreating || editingProject) && (
        <form onSubmit={handleSave} className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h4 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>{isCreating ? 'Create New Project' : `Edit "${editingProject?.name}"`}</span>
            </h4>
            <button
              type="button"
              onClick={() => {
                setIsCreating(false);
                setEditingProject(null);
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Project Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. FitMadix Fitness App"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-[#0D121F] border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                className="w-full bg-[#0D121F] border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="Web App">Web App</option>
                <option value="Frontend">Frontend</option>
                <option value="Utility">Utility</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Short Description *</label>
            <input
              type="text"
              required
              placeholder="1-2 sentences describing the core value of this project"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full bg-[#0D121F] border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Detailed Explanation (Details Modal)</label>
            <textarea
              rows={3}
              placeholder="In-depth description of features, problem solved, and architecture..."
              value={form.longDescription}
              onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
              className="w-full bg-[#0D121F] border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Image Chooser & Upload */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>Project Banner Image</span>
              </span>
              <label className="cursor-pointer text-cyan-400 hover:text-cyan-300 text-xs flex items-center gap-1">
                <Upload className="w-3 h-3" />
                <span>Upload Screenshot</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </label>

            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="Paste image URL..."
                className="w-full bg-[#0D121F] border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
              />
              <div className="w-12 h-9 rounded-lg border border-slate-700 overflow-hidden shrink-0 bg-slate-950">
                <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[10px] text-slate-500 py-0.5">Quick Covers:</span>
              {PRESET_IMAGES.map((preset) => (
                <button
                  type="button"
                  key={preset.name}
                  onClick={() => setForm({ ...form, image: preset.url })}
                  className={`text-[10px] px-2 py-0.5 rounded border transition-colors ${
                    form.image === preset.url
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                <span>Live Demo URL</span>
              </label>
              <input
                type="url"
                placeholder="https://fitmadix-app.vercel.app/"
                value={form.liveUrl}
                onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                className="w-full bg-[#0D121F] border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Github className="w-3.5 h-3.5 text-slate-300" />
                <span>GitHub Repository URL</span>
              </label>
              <input
                type="url"
                placeholder="https://github.com/..."
                value={form.githubUrl}
                onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                className="w-full bg-[#0D121F] border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Tech Stack (comma separated)</label>
            <input
              type="text"
              placeholder="e.g. React, Tailwind CSS, TypeScript, Web APIs"
              value={form.technologies}
              onChange={(e) => setForm({ ...form, technologies: e.target.value })}
              className="w-full bg-[#0D121F] border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="isFeatured"
              checked={form.isFeatured}
              onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
              className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700"
            />
            <label htmlFor="isFeatured" className="text-xs text-slate-300 cursor-pointer">
              Mark as <strong>Featured Project</strong> (Highlight badge on homepage)
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setIsCreating(false);
                setEditingProject(null);
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md"
            >
              {isCreating ? 'Add Project' : 'Save Project'}
            </button>
          </div>
        </form>
      )}

      {/* Projects List */}
      <div className="grid grid-cols-1 gap-3">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-16 h-12 rounded-lg bg-slate-800 overflow-hidden shrink-0 border border-slate-700">
                <img src={proj.image} alt={proj.name} className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-100 text-sm truncate">{proj.name}</h4>
                  {proj.isFeatured && (
                    <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-semibold border border-cyan-500/30">
                      Featured
                    </span>
                  )}
                  {proj.category && (
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-mono">
                      {proj.category}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 truncate max-w-md">{proj.description}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {proj.technologies.map((t) => (
                    <span key={t} className="text-[10px] text-cyan-400/80 font-mono">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              {proj.liveUrl && (
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-400"
                  title="Live Demo"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <button
                onClick={() => handleStartEdit(proj)}
                className="p-2 rounded-lg bg-slate-800 text-cyan-300 hover:bg-cyan-500/20 border border-slate-700"
                title="Edit Project"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  if (confirm(`Are you sure you want to delete "${proj.name}"?`)) {
                    deleteProject(proj.id);
                  }
                }}
                className="p-2 rounded-lg bg-slate-800 text-rose-400 hover:bg-rose-500/20 border border-slate-700"
                title="Delete Project"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
