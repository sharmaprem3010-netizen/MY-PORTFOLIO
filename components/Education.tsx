import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Calendar, BookOpen, Building2, CheckCircle2 } from 'lucide-react';
import { educationData } from '../data/portfolioData';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 bg-[#080B11] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Education
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Formal computer applications degree and academic foundations.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto relative pl-6 sm:pl-8 border-l-2 border-slate-800 space-y-12">
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-[#080B11] border-2 border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <div className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform"></div>
              </div>

              {/* Education Card */}
              <div className="bg-[#0D121F] rounded-2xl p-6 sm:p-8 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 shadow-xl space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-[11px] font-semibold">
                      {edu.status}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mt-2">
                      {edu.degree}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{edu.period}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                  <Building2 className="w-4 h-4 text-indigo-400" />
                  <span>{edu.institution}</span>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {edu.description}
                </p>

                {/* Academic Focus Highlights */}
                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                    Key Focus Areas
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {edu.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Expandable Future Education Placeholder Node */}
          <div className="relative pt-4 opacity-75">
            <div className="absolute -left-[31px] sm:-left-[39px] top-6 w-6 h-6 rounded-full bg-[#080B11] border-2 border-slate-700 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-slate-600"></div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-dashed border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>Future Academic Milestones & Certifications</span>
              <span className="font-mono text-[10px] text-cyan-400/80">Upcoming</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
