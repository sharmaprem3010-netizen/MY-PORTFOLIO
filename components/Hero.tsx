import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail, FileText, Sparkles, Code2, BookOpen, GraduationCap, Plus, Trash2 } from 'lucide-react';
import { usePortfolio } from '../src/context/PortfolioContext';
import { EditableText } from './EditableText';
import { CodeVisualizer } from './CodeVisualizer';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const { data, updateData, isEditing } = usePortfolio();
  const { personalInfo } = data;

  const addHeroHighlight = () => {
    const highlights = personalInfo.heroHighlights || ["C / C++ & Python", "Web Dev (HTML/CSS/JS)", "Data Structures & Algorithms"];
    updateData('personalInfo.heroHighlights', [...highlights, "New Highlight"]);
  };

  const removeHeroHighlight = (idxToRemove: number) => {
    const highlights = personalInfo.heroHighlights || ["C / C++ & Python", "Web Dev (HTML/CSS/JS)", "Data Structures & Algorithms"];
    updateData('personalInfo.heroHighlights', highlights.filter((_, idx) => idx !== idxToRemove));
  };

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 shadow-inner">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
              </span>
              <span className="text-xs font-semibold text-slate-300 tracking-wide flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                <EditableText
                  value={personalInfo.semester}
                  onChange={(val) => updateData('personalInfo.semester', val)}
                />
                {' @ '}
                <EditableText
                  value={personalInfo.education}
                  onChange={(val) => updateData('personalInfo.education', val)}
                />
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-100 tracking-tight leading-[1.1]">
                Hi, I'm{' '}
                <EditableText
                  value={personalInfo.name}
                  onChange={(val) => updateData('personalInfo.name', val)}
                  className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent inline-block min-w-[150px]"
                />
              </h1>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-300 tracking-tight">
                <EditableText
                  value={personalInfo.title}
                  onChange={(val) => updateData('personalInfo.title', val)}
                  className="inline-block w-full text-cyan-200"
                />
              </h2>
            </div>

            {/* Subheadline Description */}
            <div className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              <EditableText
                value={personalInfo.bio}
                onChange={(val) => updateData('personalInfo.bio', val)}
                multiline
                element="p"
                className="w-full"
              />
            </div>

            {/* Highlights Chips */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              {(personalInfo.heroHighlights || [
                "C / C++ & Python",
                "Web Dev (HTML/CSS/JS)",
                "Data Structures & Algorithms"
              ]).map((highlight, idx) => (
                <div key={idx} className="px-3 py-1 rounded-md bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-medium flex items-center gap-1.5 relative group">
                  {idx === 0 && <Code2 className="w-3.5 h-3.5 text-cyan-400" />}
                  {idx === 1 && <Sparkles className="w-3.5 h-3.5 text-indigo-400" />}
                  {idx >= 2 && <BookOpen className="w-3.5 h-3.5 text-amber-400" />}
                  <EditableText 
                    value={highlight} 
                    onChange={(val) => updateData(`personalInfo.heroHighlights.${idx}`, val)} 
                  />
                  {isEditing && (
                    <button
                      onClick={() => removeHeroHighlight(idx)}
                      className="ml-1 opacity-0 group-hover:opacity-100 p-0.5 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded transition-all"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <button
                  onClick={addHeroHighlight}
                  className="px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 text-xs font-medium flex items-center gap-1 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all duration-200 flex items-center gap-2 group"
                onClick={(e) => {
                  if ((e.target as HTMLElement).tagName === 'INPUT') e.preventDefault();
                }}
              >
                <span>
                  <EditableText 
                    value={personalInfo.heroButtons?.[0] || 'View My Projects'} 
                    onChange={(val) => updateData('personalInfo.heroButtons.0', val)} 
                  />
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-800 hover:border-slate-700 transition-all duration-200 flex items-center gap-2"
                onClick={(e) => {
                  if ((e.target as HTMLElement).tagName === 'INPUT') e.preventDefault();
                }}
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>
                  <EditableText 
                    value={personalInfo.heroButtons?.[1] || 'Contact Me'} 
                    onChange={(val) => updateData('personalInfo.heroButtons.1', val)} 
                  />
                </span>
              </a>

              <button
                onClick={(e) => {
                  if ((e.target as HTMLElement).tagName === 'INPUT') return;
                  onOpenResume();
                }}
                className="px-5 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-cyan-300 font-semibold text-sm border border-cyan-500/30 hover:border-cyan-400 transition-all duration-200 flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>
                  <EditableText 
                    value={personalInfo.heroButtons?.[2] || 'Resume'} 
                    onChange={(val) => updateData('personalInfo.heroButtons.2', val)} 
                  />
                </span>
              </button>
            </div>
          </motion.div>

          {/* Right Visual Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 w-full"
          >
            <CodeVisualizer />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
