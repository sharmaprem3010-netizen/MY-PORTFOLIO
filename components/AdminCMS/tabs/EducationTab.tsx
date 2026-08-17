import React, { useState } from 'react';
import { GraduationCap, Plus, Edit2, Trash2, Check, X, Sparkles, Calendar, Building2 } from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { EducationItem } from '../../../types';

export const EducationTab: React.FC = () => {
  const { education, addEducation, updateEducation, deleteEducation } = usePortfolio();

  const [editingEdu, setEditingEdu] = useState<EducationItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [form, setForm] = useState({
    degree: '',
    institution: '',
    period: '',
    status: '',
    description: '',
    highlights: '',
  });

  const handleStartCreate = () => {
    setEditingEdu(null);
    setForm({
      degree: '',
      institution: 'Swami Vivekananda University',
      period: '2026 - Present',
      status: '1st Semester Student',
      description: '',
      highlights: 'Focusing on C, C++, and Data Structures\nStudying Digital Electronics\nBuilding web projects',
    });
    setIsCreating(true);
  };

  const handleStartEdit = (edu: EducationItem) => {
    setIsCreating(false);
    setEditingEdu(edu);
    setForm({
      degree: edu.degree,
      institution: edu.institution,
      period: edu.period,
      status: edu.status,
      description: edu.description,
      highlights: edu.highlights.join('\n'),
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.degree || !form.institution) return;

    const highlightsArray = form.highlights
      .split('\n')
      .map((h) => h.trim())
      .filter(Boolean);

    if (isCreating) {
      const newEdu: EducationItem = {
        id: `edu-${Date.now()}`,
        degree: form.degree,
        institution: form.institution,
        period: form.period,
        status: form.status,
        description: form.description,
        highlights: highlightsArray,
      };
      addEducation(newEdu);
      setIsCreating(false);
    } else if (editingEdu) {
      updateEducation(editingEdu.id, {
        degree: form.degree,
        institution: form.institution,
        period: form.period,
        status: form.status,
        description: form.description,
        highlights: highlightsArray,
      });
      setEditingEdu(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span>Manage Academic Degrees ({education.length})</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Add or update college degrees, school qualifications, and coursework milestones.
          </p>
        </div>

        {!isCreating && !editingEdu && (
          <button
            onClick={handleStartCreate}
            className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Degree / College</span>
          </button>
        )}
      </div>

      {/* Editor Form Modal/Inline */}
      {(isCreating || editingEdu) && (
        <form onSubmit={handleSave} className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h4 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>{isCreating ? 'Add Education Entry' : `Edit "${editingEdu?.degree}"`}</span>
            </h4>
            <button
              type="button"
              onClick={() => {
                setIsCreating(false);
                setEditingEdu(null);
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Degree / Course Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Bachelor of Computer Applications (BCA)"
                value={form.degree}
                onChange={(e) => setForm({ ...form, degree: e.target.value })}
                className="w-full bg-[#0D121F] border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Institution / University *</label>
              <input
                type="text"
                required
                placeholder="e.g. Swami Vivekananda University"
                value={form.institution}
                onChange={(e) => setForm({ ...form, institution: e.target.value })}
                className="w-full bg-[#0D121F] border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Period</label>
              <input
                type="text"
                placeholder="e.g. 2026 - Present"
                value={form.period}
                onChange={(e) => setForm({ ...form, period: e.target.value })}
                className="w-full bg-[#0D121F] border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Status Badge</label>
              <input
                type="text"
                placeholder="e.g. 1st Semester Student"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full bg-[#0D121F] border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
            <textarea
              rows={3}
              placeholder="Overview of the degree curriculum and learning outcomes..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full bg-[#0D121F] border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Key Focus Highlights (1 per line)</label>
            <textarea
              rows={4}
              placeholder="Focusing on C, C++, and DSA&#10;Studying Digital Electronics&#10;Building web applications"
              value={form.highlights}
              onChange={(e) => setForm({ ...form, highlights: e.target.value })}
              className="w-full bg-[#0D121F] border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-sans"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setIsCreating(false);
                setEditingEdu(null);
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md"
            >
              {isCreating ? 'Add Education' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}

      {/* Education List */}
      <div className="space-y-3">
        {education.map((edu) => (
          <div
            key={edu.id}
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-2"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  {edu.status}
                </span>
                <h4 className="font-bold text-slate-100 text-sm sm:text-base mt-1">{edu.degree}</h4>
                <p className="text-xs text-slate-400">{edu.institution} • <span className="font-mono text-cyan-400">{edu.period}</span></p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => handleStartEdit(edu)}
                  className="p-1.5 rounded-lg bg-slate-800 text-cyan-300 hover:bg-cyan-500/20"
                  title="Edit Degree"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Remove "${edu.degree}"?`)) {
                      deleteEducation(edu.id);
                    }
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 text-rose-400 hover:bg-rose-500/20"
                  title="Delete Entry"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-300">{edu.description}</p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {edu.highlights.map((h, i) => (
                <span key={i} className="text-[11px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  ✓ {h}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
