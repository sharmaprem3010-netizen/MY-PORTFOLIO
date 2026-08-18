import React from 'react';
import { motion } from 'motion/react';
import { User, GraduationCap, Code2, Rocket, Brain, CheckCircle2, MapPin, Building2, Plus, Trash2 } from 'lucide-react';
import { usePortfolio } from '../src/context/PortfolioContext';
import { EditableText } from './EditableText';

export const About: React.FC = () => {
  const { data, updateData, isEditing } = usePortfolio();
  const { personalInfo } = data;

  const addAboutBullet = () => {
    const bullets = personalInfo.aboutBullets || [
      "Focused on writing clean, readable, and structured code.",
      "Self-motivated student eager to solve real-world technical problems.",
      "Continuously improving technical knowledge through hands-on development."
    ];
    updateData('personalInfo.aboutBullets', [...bullets, "New Focus Area"]);
  };

  const removeAboutBullet = (idxToRemove: number) => {
    const bullets = personalInfo.aboutBullets || [
      "Focused on writing clean, readable, and structured code.",
      "Self-motivated student eager to solve real-world technical problems.",
      "Continuously improving technical knowledge through hands-on development."
    ];
    updateData('personalInfo.aboutBullets', bullets.filter((_, idx) => idx !== idxToRemove));
  };

  const addAboutHighlight = () => {
    const highlightsData = personalInfo.aboutHighlights || highlights;
    const newHighlight = {
      icon: "Rocket",
      title: "New Highlight",
      description: "Description of your new highlight."
    };
    updateData('personalInfo.aboutHighlights', [...highlightsData, newHighlight]);
  };

  const removeAboutHighlight = (idxToRemove: number) => {
    const highlightsData = personalInfo.aboutHighlights || highlights;
    updateData('personalInfo.aboutHighlights', highlightsData.filter((_, idx) => idx !== idxToRemove));
  };

  const highlights = [
    {
      icon: GraduationCap,
      title: "BCA Undergraduate",
      description: "1st Semester student at Swami Vivekananda University, building theoretical & practical CS foundations."
    },
    {
      icon: Code2,
      title: "Active Developer",
      description: "Writing code in C, C++, Python, and JavaScript while developing interactive web applications."
    },
    {
      icon: Brain,
      title: "Problem Solver",
      description: "Focusing on Data Structures & Algorithms (DSA) to write clean, time-efficient code."
    },
    {
      icon: Rocket,
      title: "Practical Builder",
      description: "Turning classroom concepts into live software projects like FitMadix and personal portfolio tools."
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#0A0D14] border-t border-slate-900/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <User className="w-3.5 h-3.5" />
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            <EditableText 
              value={personalInfo.title}
              onChange={(val) => updateData('personalInfo.title', val)}
            />
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            <EditableText 
              value={personalInfo.tagline}
              onChange={(val) => updateData('personalInfo.tagline', val)}
              multiline
              className="w-full"
            />
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Main Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-[#0E131F] rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
                <div>
                  <h3 className="text-2xl font-bold text-slate-100">
                    <EditableText 
                      value={personalInfo.name}
                      onChange={(val) => updateData('personalInfo.name', val)}
                    />
                  </h3>
                  <p className="text-cyan-400 font-medium text-sm mt-0.5">
                    <EditableText 
                      value={personalInfo.title}
                      onChange={(val) => updateData('personalInfo.title', val)}
                    />
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                  <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>
                    <EditableText 
                      value={personalInfo.education}
                      onChange={(val) => updateData('personalInfo.education', val)}
                    />
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed flex flex-col gap-2">
                {personalInfo.aboutDetailed.map((paragraph, idx) => (
                  <EditableText 
                    key={idx}
                    value={paragraph}
                    onChange={(val) => updateData(`personalInfo.aboutDetailed.${idx}`, val)}
                    multiline
                    element="p"
                    className="w-full"
                  />
                ))}
              </div>

              {/* Key Bullet Statements */}
              <div className="pt-2 space-y-2 relative">
                {(personalInfo.aboutBullets || [
                  "Focused on writing clean, readable, and structured code.",
                  "Self-motivated student eager to solve real-world technical problems.",
                  "Continuously improving technical knowledge through hands-on development."
                ]).map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 relative group">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                    <span className="w-full">
                      <EditableText 
                        value={bullet} 
                        onChange={(val) => updateData(`personalInfo.aboutBullets.${idx}`, val)} 
                        multiline
                      />
                    </span>
                    {isEditing && (
                      <button
                        onClick={() => removeAboutBullet(idx)}
                        className="opacity-0 group-hover:opacity-100 p-0.5 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded transition-all absolute right-0 top-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <button
                    onClick={addAboutBullet}
                    className="mt-2 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 text-xs font-medium flex items-center gap-1 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Focus Area
                  </button>
                )}
              </div>
            </div>

            {/* University & Location Footer */}
            <div className="mt-8 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <EditableText 
                  value={personalInfo.location}
                  onChange={(val) => updateData('personalInfo.location', val)}
                />
              </span>
              <span className="text-cyan-400 font-mono">Status: <EditableText value={personalInfo.semester} onChange={(val) => updateData('personalInfo.semester', val)} /></span>
            </div>
          </motion.div>

          {/* Highlights Grid */}
          <div className="lg:col-span-5 relative">
            {isEditing && (
              <div className="flex justify-end mb-4">
                <button
                  onClick={addAboutHighlight}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Plus className="w-4 h-4" /> Add Highlight
                </button>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {(personalInfo.aboutHighlights || highlights).map((item, index) => {
                const iconMap: Record<string, React.FC<any>> = {
                  GraduationCap,
                  Code2,
                  Brain,
                  Rocket
                };
                const Icon = typeof item.icon === 'string' ? (iconMap[item.icon] || GraduationCap) : item.icon;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-[#0E131F] rounded-xl p-5 border border-slate-800/90 hover:border-cyan-500/40 transition-all duration-300 group shadow-md relative"
                  >
                    {isEditing && (
                      <button
                        onClick={() => removeAboutHighlight(index)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-md transition-colors z-10"
                        title="Remove Highlight"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="w-full pr-6">
                        <h4 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                          <EditableText 
                            value={item.title} 
                            onChange={(val) => updateData(`personalInfo.aboutHighlights.${index}.title`, val)} 
                          />
                        </h4>
                        <div className="text-xs text-slate-400 leading-relaxed mt-1">
                          <EditableText 
                            value={item.description} 
                            onChange={(val) => updateData(`personalInfo.aboutHighlights.${index}.description`, val)} 
                            multiline
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
