import React from 'react';
import { motion } from 'motion/react';
import { Target, Cpu, Layers, Sparkles, GitPullRequest, Briefcase, CheckCircle } from 'lucide-react';
import { goalsData } from '../data/portfolioData';

export const Goals: React.FC = () => {
  const iconMap: Record<string, React.FC<{ className?: string }>> = {
    Target,
    Cpu,
    Layers,
    Sparkles,
    GitPullRequest,
    Briefcase
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
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {goalsData.map((goal, idx) => {
            const IconComponent = iconMap[goal.icon] || Target;
            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-[#0D121F] rounded-2xl p-6 border border-slate-800 hover:border-cyan-500/40 hover:bg-[#101728] transition-all duration-300 shadow-xl group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {goal.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {goal.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span className="px-2 py-0.5 rounded bg-slate-900 text-cyan-400 border border-slate-800">
                    {goal.category} Goal
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
