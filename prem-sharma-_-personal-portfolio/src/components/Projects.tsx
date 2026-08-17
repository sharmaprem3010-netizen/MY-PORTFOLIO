import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FolderGit2, Plus, Sparkles, Filter } from 'lucide-react';
import { projectsData as initialProjects } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { AddProjectModal } from './AddProjectModal';

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Web App' | 'Frontend'>('All');

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'All') return true;
    return project.category === activeFilter;
  });

  const handleAddProject = (newProj: Project) => {
    setProjects((prev) => [newProj, ...prev]);
  };

  return (
    <section id="projects" className="py-24 bg-[#0A0D14] border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Portfolio Works</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
              Featured Projects
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Real-world web applications and projects built during my learning journey.
            </p>
          </div>

          {/* Actions & Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center bg-slate-900/80 p-1 rounded-xl border border-slate-800">
              {(['All', 'Web App', 'Frontend'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeFilter === filter
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              title="Add extra project"
            >
              <Plus className="w-4 h-4 text-cyan-400" />
              <span>Add Project</span>
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelectProject={setSelectedProject}
            />
          ))}
        </div>

        {/* Modals */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        <AddProjectModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddProject={handleAddProject}
        />

      </div>
    </section>
  );
};
