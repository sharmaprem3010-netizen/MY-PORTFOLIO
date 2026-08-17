import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail, FileText, Sparkles, Code2, BookOpen, GraduationCap } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { CodeVisualizer } from './CodeVisualizer';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
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
                BCA Student @ Swami Vivekananda University
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-100 tracking-tight leading-[1.1]">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                  {personalInfo.name}
                </span>
              </h1>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-300 tracking-tight flex flex-wrap items-center gap-2">
                <span className="text-cyan-400">BCA Student</span>
                <span className="text-slate-600">|</span>
                <span>Aspiring Software Developer</span>
                <span className="text-slate-600">|</span>
                <span className="text-indigo-400">Web Developer</span>
              </h2>
            </div>

            {/* Subheadline Description */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              I am a 1st Semester Computer Applications student who is passionate about programming, web development, problem solving, and building real-world projects. I am dedicated to mastering C, C++, Python, JavaScript, and Data Structures & Algorithms.
            </p>

            {/* Highlights Chips */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              <div className="px-3 py-1 rounded-md bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-medium flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                C / C++ & Python
              </div>
              <div className="px-3 py-1 rounded-md bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Web Dev (HTML/CSS/JS)
              </div>
              <div className="px-3 py-1 rounded-md bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-medium flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                Data Structures & Algorithms
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all duration-200 flex items-center gap-2 group"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-800 hover:border-slate-700 transition-all duration-200 flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Contact Me</span>
              </a>

              <button
                onClick={onOpenResume}
                className="px-5 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-cyan-300 font-semibold text-sm border border-cyan-500/30 hover:border-cyan-400 transition-all duration-200 flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Resume</span>
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
