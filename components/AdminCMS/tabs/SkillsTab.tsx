import React, { useState } from 'react';
import { Cpu, Plus, Edit2, Trash2, Check, X, Sparkles, Code2, Globe, Terminal, Laptop } from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { SkillItem, SkillCategory, SkillLevel } from '../../../types';

export const SkillsTab: React.FC = () => {
  const { skills, addSkill, updateSkill, deleteSkill } = usePortfolio();

  const [editingSkill, setEditingSkill] = useState<SkillItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [filterCategory, setFilterCategory] = useState<SkillCategory | 'All'>('All');

  const [form, setForm] = useState({
    name: '',
    category: 'Programming' as SkillCategory,
    level: 'Intermediate' as SkillLevel,
    description: '',
    iconName: 'Code2',
  });

  const handleStartCreate = () => {
    setEditingSkill(null);
    setForm({
      name: '',
      category: filterCategory === 'All' ? 'Programming' : filterCategory,
      level: 'Intermediate',
      description: '',
      iconName: 'Code2',
    });
    setIsCreating(true);
  };

  const handleStartEdit = (skill: SkillItem) => {
    setIsCreating(false);
    setEditingSkill(skill);
    setForm({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      description: skill.description || '',
      iconName: skill.iconName || 'Code2',
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return;

    if (isCreating) {
      const newSkill: SkillItem = {
        id: `skill-${Date.now()}`,
        name: form.name,
        category: form.category,
        level: form.level,
        description: form.description,
        iconName: form.iconName,
      };
      addSkill(newSkill);
      setIsCreating(false);
    } else if (editingSkill) {
      updateSkill(editingSkill.id, {
        name: form.name,
        category: form.category,
        level: form.level,
        description: form.description,
        iconName: form.iconName,
      });
      setEditingSkill(null);
    }
  };

  const filteredSkills = skills.filter((s) => {
    if (filterCategory === 'All') return true;
    return s.category === filterCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Manage Skills ({skills.length})</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Add or modify programming languages, frameworks, CS concepts, and tools.
          </p>
        </div>

        {!isCreating && !editingSkill && (
          <button
            onClick={handleStartCreate}
            className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Skill</span>
          </button>
        )}
      </div>

      {/* Category Pills Filter */}
      <div className="flex flex-wrap gap-1.5">
        {(['All', 'Programming', 'Web Development', 'Computer Science', 'Tools'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterCategory === cat
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Editor Form Modal/Inline */}
      {(isCreating || editingSkill) && (
        <form onSubmit={handleSave} className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h4 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>{isCreating ? 'Add New Skill' : `Edit "${editingSkill?.name}"`}</span>
            </h4>
            <button
              type="button"
              onClick={() => {
                setIsCreating(false);
                setEditingSkill(null);
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Skill Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. TypeScript / SQL / DSA"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-[#0D121F] border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as SkillCategory })}
                className="w-full bg-[#0D121F] border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="Programming">Programming</option>
                <option value="Web Development">Web Development</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Tools">Tools</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Proficiency Level</label>
              <select
                value={form.level}
                onChange={(e) => setForm({ ...form, level: e.target.value as SkillLevel })}
                className="w-full bg-[#0D121F] border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="Intermediate">Intermediate</option>
                <option value="Learning">Active Learning</option>
                <option value="Beginner">Beginner</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Short Description / Sub-topics</label>
            <input
              type="text"
              placeholder="e.g. Arrays, Linked Lists, Stacks, Queues, Sorting & Searching"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full bg-[#0D121F] border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setIsCreating(false);
                setEditingSkill(null);
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md"
            >
              {isCreating ? 'Add Skill' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}

      {/* Skills Grid List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pr-1">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-slate-100 text-xs sm:text-sm truncate">{skill.name}</h4>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-semibold border ${
                    skill.level === 'Intermediate'
                      ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                      : skill.level === 'Learning'
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                      : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                  }`}
                >
                  {skill.level}
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono block mt-0.5">{skill.category}</span>
              {skill.description && (
                <p className="text-[11px] text-slate-400 truncate mt-1">{skill.description}</p>
              )}
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => handleStartEdit(skill)}
                className="p-1.5 rounded-lg bg-slate-800 text-cyan-300 hover:bg-cyan-500/20"
                title="Edit Skill"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  if (confirm(`Remove skill "${skill.name}"?`)) {
                    deleteSkill(skill.id);
                  }
                }}
                className="p-1.5 rounded-lg bg-slate-800 text-rose-400 hover:bg-rose-500/20"
                title="Delete Skill"
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
