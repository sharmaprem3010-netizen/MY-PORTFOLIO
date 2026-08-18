import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Code2, Globe, Terminal, Laptop, Search, CheckCircle, Sparkles, Trash2, Plus } from 'lucide-react';
import { usePortfolio } from '../src/context/PortfolioContext';
import { SkillCategory, SkillLevel } from '../types';
import { EditableText } from './EditableText';

export const Skills: React.FC = () => {
  const { data, updateData, isEditing } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { label: SkillCategory | 'All'; icon: React.FC<{ className?: string }> }[] = [
    { label: 'All', icon: Sparkles },
    { label: 'Programming', icon: Code2 },
    { label: 'Web Development', icon: Globe },
    { label: 'Computer Science', icon: Terminal },
    { label: 'Tools', icon: Laptop },
  ];

  const filteredSkills = data.skills.filter((skill) => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (skill.description && skill.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'Intermediate':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
            Intermediate
          </span>
        );
      case 'Learning':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            Active Learning
          </span>
        );
      case 'Beginner':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            Beginner
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-500/15 text-slate-300 border border-slate-500/30">
            {level}
          </span>
        );
    }
  };

  const addSkill = () => {
    const newSkill = {
      id: `skill-${Date.now()}`,
      name: 'New Skill',
      level: 'Learning' as SkillLevel,
      iconName: 'Code2',
      category: 'Programming' as SkillCategory,
      description: 'Description of the new skill.'
    };
    updateData('skills', [...data.skills, newSkill]);
  };

  const removeSkill = (idToRemove: string) => {
    if (confirm('Are you sure you want to remove this skill?')) {
      updateData('skills', data.skills.filter(s => s.id !== idToRemove));
    }
  };

  return (
    <section id="skills" className="py-24 bg-[#080B11] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Abilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Skills & Knowledge Base
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Honest representation of my programming, web development, computer science fundamentals, and tools.
          </p>
          {isEditing && (
            <button
              onClick={addSkill}
              className="absolute top-0 right-0 flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/30 transition-colors text-sm font-semibold"
            >
              <Plus className="w-4 h-4" /> Add Skill
            </button>
          )}
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 w-full md:w-auto">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  onClick={() => setSelectedCategory(cat.label)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skill (e.g. C++, DSA)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 transition-colors"
            />
          </div>

        </div>

        {/* Skills Cards Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filteredSkills.map((skill) => {
              const originalIndex = data.skills.findIndex(s => s.id === skill.id);
              return (
                <motion.div
                  key={skill.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#0D121F] rounded-xl p-5 border border-slate-800/90 hover:border-slate-700 hover:bg-[#101728] transition-all duration-200 shadow-lg flex flex-col justify-between group relative"
                >
                  {isEditing && (
                    <button
                      onClick={() => removeSkill(skill.id)}
                      className="absolute top-2 right-2 p-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-md transition-colors z-10"
                      title="Remove Skill"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3 pr-8">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 group-hover:border-cyan-500/30 transition-colors">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                            <EditableText
                              value={skill.name}
                              onChange={(val) => updateData(`skills.${originalIndex}.name`, val)}
                            />
                          </h3>
                          <span className="text-[11px] text-slate-400 font-mono">
                            <EditableText
                              value={skill.category}
                              onChange={(val) => updateData(`skills.${originalIndex}.category`, val as any)}
                            />
                          </span>
                        </div>
                      </div>

                      {getLevelBadge(skill.level)}
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed pt-1">
                      <EditableText
                        value={skill.description || ''}
                        onChange={(val) => updateData(`skills.${originalIndex}.description`, val)}
                        multiline
                      />
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span className="flex gap-1 items-center">
                      Level: 
                      <EditableText
                        value={skill.level}
                        onChange={(val) => updateData(`skills.${originalIndex}.level`, val as any)}
                      />
                    </span>
                    <span className="text-cyan-400/80">Active</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm">
            No skills found matching "{searchQuery}".
          </div>
        )}

      </div>
    </section>
  );
};
