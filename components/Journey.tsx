import React from 'react';
import { motion } from 'motion/react';
import { Map, Code2, Terminal, Layout, Binary, FileCode2, Globe, Check, Clock, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { usePortfolio } from '../src/context/PortfolioContext';
import { EditableText } from './EditableText';
import { JourneyStep } from '../types';

export const Journey: React.FC = () => {
  const { data, updateData, isEditing } = usePortfolio();

  const handleAddJourney = () => {
    const newStep: JourneyStep = {
      id: Date.now().toString(),
      phase: 'New Phase',
      title: 'New Title',
      period: 'YYYY - YYYY',
      status: 'Upcoming',
      description: 'Description of the journey step.',
      skillsAcquired: ['Skill 1', 'Skill 2'],
      icon: 'Code2'
    };
    updateData('journey', [...data.journey, newStep]);
  };

  const handleRemoveJourney = (index: number) => {
    const newData = [...data.journey];
    newData.splice(index, 1);
    updateData('journey', newData);
  };

  const getStatusBadge = (status: string, index: number) => {
    const badgeMap = {
      'Completed': (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
          <Check className="w-3 h-3" /> <EditableText value={status} onChange={(val) => updateData(`journey.${index}.status`, val as any)} />
        </span>
      ),
      'In Progress': (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
          <Clock className="w-3 h-3 animate-spin" /> <EditableText value={status} onChange={(val) => updateData(`journey.${index}.status`, val as any)} />
        </span>
      ),
      'Upcoming': (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
          <EditableText value={status} onChange={(val) => updateData(`journey.${index}.status`, val as any)} />
        </span>
      )
    };

    return badgeMap[status as keyof typeof badgeMap] || badgeMap['Upcoming'];
  };

  return (
    <section id="journey" className="py-24 bg-[#0A0D14] border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Map className="w-3.5 h-3.5" />
            <span>Developer Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            My Learning Journey
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            From first lines of C code to web development and data structures.
          </p>

          {isEditing && (
            <button
              onClick={handleAddJourney}
              className="mt-4 mx-auto px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 rounded-lg flex items-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4" /> Add Journey Step
            </button>
          )}
        </div>

        {/* Visual Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.journey.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`bg-[#0D121F] rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden ${
                step.status === 'In Progress'
                  ? 'border-cyan-500/50 shadow-cyan-950/30'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {isEditing && (
                <button 
                  onClick={() => handleRemoveJourney(idx)}
                  className="absolute top-2 right-2 z-10 p-2 bg-red-500/20 hover:bg-red-500/50 text-red-400 hover:text-white rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              {/* Background Glow for In Progress */}
              {step.status === 'In Progress' && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl pointer-events-none"></div>
              )}

              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-400 tracking-wider">
                    <EditableText value={step.phase} onChange={(val) => updateData(`journey.${idx}.phase`, val)} />
                  </span>
                  {getStatusBadge(step.status, idx)}
                </div>

                <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                  <span>
                    <EditableText value={step.title} onChange={(val) => updateData(`journey.${idx}.title`, val)} />
                  </span>
                </h3>

                <div className="text-xs text-slate-300 leading-relaxed">
                  <EditableText value={step.description} onChange={(val) => updateData(`journey.${idx}.description`, val)} multiline />
                </div>

                {/* Acquired Skills */}
                <div className="pt-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block mb-2">
                    Key Topics Covered
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {step.skillsAcquired.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-cyan-300"
                      >
                        <EditableText value={skill} onChange={(val) => updateData(`journey.${idx}.skillsAcquired.${sIdx}`, val)} />
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>
                  <EditableText value={step.period} onChange={(val) => updateData(`journey.${idx}.period`, val)} />
                </span>
                <span className="flex items-center gap-1 text-slate-400 group-hover:text-cyan-400 transition-colors">
                  Step 0{idx + 1} <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
