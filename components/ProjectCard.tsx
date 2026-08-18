import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, Code2, Sparkles, Layers, Trash2 } from 'lucide-react';
import { Project } from '../types';
import { usePortfolio } from '../src/context/PortfolioContext';
import { EditableText } from './EditableText';

interface ProjectCardProps {
  project: Project;
  originalIndex: number;
  onSelectProject: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, originalIndex, onSelectProject }) => {
  const { isEditing, updateData, data } = usePortfolio();

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newProjects = [...data.projects];
    newProjects.splice(originalIndex, 1);
    updateData('projects', newProjects);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="bg-[#0D121F] rounded-2xl border border-slate-800/90 overflow-hidden shadow-xl hover:border-cyan-500/40 hover:shadow-cyan-950/30 transition-all duration-300 flex flex-col justify-between group relative"
    >
      {isEditing && (
        <button 
          onClick={handleRemove}
          className="absolute top-2 right-2 z-10 p-2 bg-red-500/80 hover:bg-red-500 rounded-full text-white shadow-lg backdrop-blur transition-colors"
          title="Remove Project"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}

      <div>
        {/* Project Image Banner with Overlay */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-900">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D121F] via-[#0D121F]/40 to-transparent"></div>

          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 border border-slate-800 text-[11px] font-semibold text-cyan-300 backdrop-blur-sm flex items-center gap-1">
            <Layers className="w-3 h-3 text-cyan-400" />
            <span>
              <EditableText 
                value={project.category} 
                onChange={(val) => updateData(`projects.${originalIndex}.category`, val as any)} 
              />
            </span>
          </div>

          {project.isFeatured && (
            <div className={`absolute ${isEditing ? 'top-12' : 'top-3'} right-3 px-2.5 py-1 rounded-md bg-cyan-500/20 border border-cyan-500/40 text-[11px] font-bold text-cyan-300 backdrop-blur-sm flex items-center gap-1`}>
              <Sparkles className="w-3 h-3 text-cyan-300" />
              <span>Featured</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-3">
          <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
            <EditableText 
              value={project.name} 
              onChange={(val) => updateData(`projects.${originalIndex}.name`, val)} 
            />
          </h3>

          <div className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
            <EditableText 
              value={project.description} 
              onChange={(val) => updateData(`projects.${originalIndex}.description`, val)}
              multiline 
            />
          </div>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.technologies.map((tech, techIdx) => (
              <span
                key={techIdx}
                className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300"
              >
                <EditableText 
                  value={tech} 
                  onChange={(val) => updateData(`projects.${originalIndex}.technologies.${techIdx}`, val)} 
                />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="p-6 pt-0 border-t border-slate-800/60 mt-4 flex items-center gap-3">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all duration-200"
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}

        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200"
            title="Source Code"
          >
            <Github className="w-4 h-4 text-slate-300" />
            <span className="hidden sm:inline">Code</span>
          </a>
        ) : (
          <span className="py-2.5 px-3 rounded-xl bg-slate-900/50 text-slate-500 text-xs font-mono border border-slate-800/50 flex items-center gap-1">
            <Code2 className="w-3.5 h-3.5" />
            Private
          </span>
        )}

        <button
          onClick={() => onSelectProject(project)}
          className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 border border-slate-800 text-xs transition-colors"
          title="Project Details"
        >
          Details
        </button>
      </div>
    </motion.div>
  );
};
