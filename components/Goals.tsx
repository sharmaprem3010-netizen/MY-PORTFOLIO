import React from 'react';
import { motion } from 'motion/react';
import { Target, Cpu, Layers, Sparkles, GitPullRequest, Briefcase, CheckCircle, Plus, Trash2 } from 'lucide-react';
import { usePortfolio } from '../src/context/PortfolioContext';
import { EditableText } from './EditableText';
import { GoalItem } from '../types';

export const Goals: React.FC = () => {
  const { data, updateData, isEditing } = usePortfolio();

  const iconMap: Record<string, React.FC<{ className?: string }>> = {
    Target,
    Cpu,
    Layers,
    Sparkles,
    GitPullRequest,
    Briefcase
  };

  const handleAddGoal = () => {
    const newGoal: GoalItem = {
      id: Date.now().toString(),
      title: 'New Goal Title',
      description: 'Describe your new goal here.',
      icon: 'Target',
      category: 'Project'
    };
    updateData('goals', [...data.goals, newGoal]);
  };

  const handleRemoveGoal = (index: number) => {
    const newData = [...data.goals];
    newData.splice(index, 1);
    updateData('goals', newData);
  };

  return (
    <section id="goals" className="py-24 bg-[#080B11] border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Target className="w-3.5 h-3.5" />
            <span>Future Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            What I'm Working Towards
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Long-term aspirations and key goals driving my daily engineering practice.
          </p>

          {isEditing && (
            <button
              onClick={handleAddGoal}
              className="mt-4 mx-auto px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 rounded-lg flex items-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4" /> Add Goal
            </button>
          )}
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.goals.map((goal, idx) => {
            const IconComponent = iconMap[goal.icon] || Target;
            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-[#0D121F] rounded-2xl p-6 border border-slate-800 hover:border-cyan-500/40 hover:bg-[#101728] transition-all duration-300 shadow-xl group flex flex-col justify-between relative"
              >
                {isEditing && (
                  <button 
                    onClick={() => handleRemoveGoal(idx)}
                    className="absolute top-2 right-2 z-10 p-2 bg-red-500/20 hover:bg-red-500/50 text-red-400 hover:text-white rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}

                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    <EditableText value={goal.title} onChange={(val) => updateData(`goals.${idx}.title`, val)} />
                  </h3>

                  <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <EditableText value={goal.description} onChange={(val) => updateData(`goals.${idx}.description`, val)} multiline />
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span className="px-2 py-0.5 rounded bg-slate-900 text-cyan-400 border border-slate-800">
                    <EditableText value={goal.category} onChange={(val) => updateData(`goals.${idx}.category`, val as any)} /> Goal
                  </span>
                  <div className="flex items-center gap-1 text-emerald-400 font-sans">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Active Target</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
