import React from 'react';
import { motion } from 'motion/react';
import { User, GraduationCap, Code2, Rocket, Brain, CheckCircle2, MapPin, Building2 } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const About: React.FC = () => {
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
            Aspiring Software Developer & BCA Student
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Dedicated to continuous learning, building real projects, and mastering software fundamentals.
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
                  <h3 className="text-2xl font-bold text-slate-100">{personalInfo.name}</h3>
                  <p className="text-cyan-400 font-medium text-sm mt-0.5">{personalInfo.title}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                  <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Swami Vivekananda University</span>
                </div>
              </div>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  I am a 1st Semester Bachelor of Computer Applications (BCA) student at <strong className="text-slate-100">Swami Vivekananda University</strong>. My goal is to become a highly skilled software developer by establishing strong roots in programming, web architecture, and algorithmic logic.
                </p>
                <p>
                  Currently, I am actively honing my skills in <strong className="text-cyan-300">C, C++, Python, and JavaScript</strong> alongside web technologies (HTML5, CSS3, Responsive Design). I spend time solving coding problems and understanding Data Structures and Algorithms (DSA) step by step.
                </p>
                <p>
                  Rather than just learning theory, I actively build real projects like <strong className="text-indigo-300">FitMadix</strong> and responsive portfolio tools using modern developer workflows like Git and VS Code.
                </p>
              </div>

              {/* Key Bullet Statements */}
              <div className="pt-2 space-y-2">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <span>Focused on writing clean, readable, and structured code.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <span>Self-motivated student eager to solve real-world technical problems.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <span>Continuously improving technical knowledge through hands-on development.</span>
                </div>
              </div>
            </div>

            {/* University & Location Footer */}
            <div className="mt-8 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                West Bengal, India
              </span>
              <span className="text-cyan-400 font-mono">Status: BCA 1st Sem Student</span>
            </div>
          </motion.div>

          {/* Highlights Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-[#0E131F] rounded-xl p-5 border border-slate-800/90 hover:border-cyan-500/40 transition-all duration-300 group shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
