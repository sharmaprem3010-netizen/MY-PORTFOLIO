import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Copy, Check, Terminal as TerminalIcon, Code, Sparkles, Cpu } from 'lucide-react';

export const CodeVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'developer' | 'skills' | 'status'>('developer');
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);

  const codeSnippets = {
    developer: `// Prem Sharma - Developer Profile
const developer = {
  name: "Prem Sharma",
  education: "BCA 1st Semester",
  university: "Swami Vivekananda University",
  role: "Aspiring Software Developer",
  passions: [
    "Clean Code & Logic Building",
    "Data Structures & Algorithms",
    "Modern Web Architecture"
  ],
  status: "Actively Building & Learning"
};

console.log(\`Hello! I'm \${developer.name}.\`);`,

    skills: `// Technical Stack & CS Fundamentals
const technicalStack = {
  languages: ["C", "C++", "Python", "JavaScript"],
  webDev: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
  coreCS: ["DSA", "OOP", "DBMS", "Digital Electronics"],
  tools: ["Git", "GitHub", "VS Code", "MS Office"]
};

// Continuous Skill Enhancement
function learnAndBuild() {
  return technicalStack.languages.map(lang => \`Mastering \${lang}\`);
}`,

    status: `// Current Academic & Project Status
const currentFocus = {
  semester: "1st Semester BCA",
  university: "Swami Vivekananda University",
  activeProjects: ["FitMadix Web App", "Personal Developer Portfolio"],
  learningNow: "Data Structures & Algorithms (DSA)"
};`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput(null);
    setTimeout(() => {
      setIsRunning(false);
      setOutput(">> Process exited with code 0\n>> Prem Sharma: Ready to collaborate and build!");
    }, 600);
  };

  return (
    <div className="w-full max-w-lg mx-auto rounded-xl bg-[#0D111A] border border-slate-800/90 shadow-2xl shadow-cyan-950/20 overflow-hidden font-mono text-xs">
      {/* Title Bar */}
      <div className="bg-[#141A26] px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          </div>
          <span className="ml-2 text-slate-400 font-sans text-xs font-semibold flex items-center gap-1.5">
            <Code className="w-3.5 h-3.5 text-cyan-400" />
            prem-sharma.ts
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-1.5 text-slate-400 hover:text-cyan-300 rounded hover:bg-slate-800/80 transition-colors flex items-center gap-1"
            title="Copy code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 transition-colors flex items-center gap-1 font-sans font-medium text-[11px]"
          >
            <Play className={`w-3 h-3 fill-current ${isRunning ? 'animate-spin' : ''}`} />
            <span>Run</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-[#0f1420] px-3 pt-2 border-b border-slate-800/80 flex items-center gap-1">
        <button
          onClick={() => setActiveTab('developer')}
          className={`px-3 py-1.5 rounded-t-md border-t border-x text-[11px] font-sans flex items-center gap-1.5 transition-all ${
            activeTab === 'developer'
              ? 'bg-[#0D111A] text-cyan-300 border-slate-800 border-b-transparent font-medium'
              : 'text-slate-400 hover:text-slate-200 border-transparent'
          }`}
        >
          <Sparkles className="w-3 h-3 text-cyan-400" />
          developer.js
        </button>

        <button
          onClick={() => setActiveTab('skills')}
          className={`px-3 py-1.5 rounded-t-md border-t border-x text-[11px] font-sans flex items-center gap-1.5 transition-all ${
            activeTab === 'skills'
              ? 'bg-[#0D111A] text-cyan-300 border-slate-800 border-b-transparent font-medium'
              : 'text-slate-400 hover:text-slate-200 border-transparent'
          }`}
        >
          <Cpu className="w-3 h-3 text-indigo-400" />
          skills.ts
        </button>

        <button
          onClick={() => setActiveTab('status')}
          className={`px-3 py-1.5 rounded-t-md border-t border-x text-[11px] font-sans flex items-center gap-1.5 transition-all ${
            activeTab === 'status'
              ? 'bg-[#0D111A] text-cyan-300 border-slate-800 border-b-transparent font-medium'
              : 'text-slate-400 hover:text-slate-200 border-transparent'
          }`}
        >
          <TerminalIcon className="w-3 h-3 text-amber-400" />
          status.json
        </button>
      </div>

      {/* Code Editor Body */}
      <div className="p-4 overflow-x-auto min-h-[220px] bg-[#0D111A] text-slate-300 leading-relaxed font-mono">
        <AnimatePresence mode="wait">
          <motion.pre
            key={activeTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="whitespace-pre"
          >
            <code>
              {codeSnippets[activeTab].split('\n').map((line, idx) => (
                <div key={idx} className="table-row">
                  <span className="table-cell text-right pr-4 text-slate-600 select-none text-[11px] w-6">
                    {idx + 1}
                  </span>
                  <span className="table-cell">
                    {line.includes('//') ? (
                      <span className="text-slate-500 italic">{line}</span>
                    ) : line.includes('const') || line.includes('function') || line.includes('return') ? (
                      <span className="text-cyan-400">{line}</span>
                    ) : line.includes('"') || line.includes('`') ? (
                      <span className="text-emerald-300">{line}</span>
                    ) : (
                      <span>{line}</span>
                    )}
                  </span>
                </div>
              ))}
            </code>
          </motion.pre>
        </AnimatePresence>
      </div>

      {/* Console Output Footer */}
      {output && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="border-t border-slate-800 bg-[#080b12] p-3 text-[11px] font-mono text-cyan-300/90"
        >
          <div className="flex items-center justify-between text-slate-500 text-[10px] uppercase font-bold mb-1 tracking-wider">
            <span>Terminal Output</span>
            <button onClick={() => setOutput(null)} className="hover:text-slate-300">Clear</button>
          </div>
          <pre className="whitespace-pre-wrap">{output}</pre>
        </motion.div>
      )}

      <div className="bg-[#141A26] px-4 py-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-sans">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>BCA 1st Sem @ SVU</span>
        </div>
        <span className="font-mono text-[10px] text-slate-500">UTF-8 | TypeScript</span>
      </div>
    </div>
  );
};
