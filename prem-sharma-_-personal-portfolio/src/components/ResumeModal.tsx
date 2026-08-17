import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, FileText, Check, ExternalLink, GraduationCap, Code2, FolderGit2, Mail } from 'lucide-react';
import { personalInfo, skillsData, projectsData, educationData } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloading(true);
    // Trigger download of /resume.pdf or fallback
    const link = document.createElement('a');
    link.href = personalInfo.resumePath;
    link.download = 'Prem_Sharma_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setDownloading(false), 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-3xl bg-[#0D121F] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8"
        >
          {/* Modal Header */}
          <div className="bg-[#131A29] px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              <div>
                <h3 className="text-lg font-bold text-slate-100">Resume Preview</h3>
                <p className="text-xs text-slate-400 font-mono">Prem_Sharma_CV.pdf</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
              >
                {downloading ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                <span>{downloading ? 'Downloaded!' : 'Download PDF'}</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Resume View Body */}
          <div className="p-6 sm:p-8 space-y-8 max-h-[75vh] overflow-y-auto font-sans text-slate-200">
            
            {/* Resume Header */}
            <div className="border-b border-slate-800 pb-6 text-center sm:text-left flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-100">{personalInfo.name}</h2>
                <p className="text-cyan-400 font-medium text-sm mt-1">{personalInfo.title}</p>
                <p className="text-xs text-slate-400 mt-1">Swami Vivekananda University | BCA 1st Semester</p>
              </div>

              <div className="text-xs text-slate-400 font-mono space-y-1">
                <div>Email: {personalInfo.email}</div>
                <div>Location: {personalInfo.location}</div>
                <div>GitHub: github.com/sharmaprem3010-netizen</div>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-1.5">
                <span>// Professional Summary</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                {personalInfo.bio}
              </p>
            </div>

            {/* Education Section */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" />
                <span>Education</span>
              </h3>
              {educationData.map((edu) => (
                <div key={edu.id} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 space-y-1">
                  <div className="flex justify-between items-baseline flex-wrap">
                    <h4 className="text-sm font-bold text-slate-100">{edu.degree}</h4>
                    <span className="text-xs font-mono text-cyan-300">{edu.period}</span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">{edu.institution} • {edu.status}</p>
                  <p className="text-xs text-slate-300 pt-1">{edu.description}</p>
                </div>
              ))}
            </div>

            {/* Technical Skills */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-1.5">
                <Code2 className="w-4 h-4" />
                <span>Technical Skills</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
                  <span className="text-xs font-bold text-slate-300 block mb-1">Programming:</span>
                  <p className="text-xs text-cyan-300 font-mono">C, C++, Python, JavaScript</p>
                </div>
                <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
                  <span className="text-xs font-bold text-slate-300 block mb-1">Web Development:</span>
                  <p className="text-xs text-cyan-300 font-mono">HTML5, CSS3, JS, Responsive Design</p>
                </div>
                <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
                  <span className="text-xs font-bold text-slate-300 block mb-1">Computer Science:</span>
                  <p className="text-xs text-cyan-300 font-mono">DSA, OOP, DBMS, Digital Electronics</p>
                </div>
                <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
                  <span className="text-xs font-bold text-slate-300 block mb-1">Tools & Utilities:</span>
                  <p className="text-xs text-cyan-300 font-mono">Git, GitHub, VS Code, MS Office, Excel</p>
                </div>
              </div>
            </div>

            {/* Projects */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-1.5">
                <FolderGit2 className="w-4 h-4" />
                <span>Featured Projects</span>
              </h3>
              <div className="space-y-3">
                {projectsData.map((proj) => (
                  <div key={proj.id} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 space-y-1">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-bold text-slate-100">{proj.name}</h4>
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
                          Live Demo <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-slate-300">{proj.description}</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {proj.technologies.map(t => (
                        <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Replacement Note */}
            <div className="p-3.5 bg-cyan-950/20 border border-cyan-800/40 rounded-xl text-[11px] text-cyan-300/90 font-mono">
              💡 <strong>Note for Prem:</strong> To replace this resume, simply drop your actual <code>resume.pdf</code> into the <code>public/</code> folder.
            </div>

          </div>

          {/* Footer Actions */}
          <div className="bg-[#131A29] px-6 py-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-mono">Prem Sharma Portfolio Resume</span>
            <button
              onClick={handleDownload}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
