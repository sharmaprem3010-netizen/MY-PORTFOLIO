import { useEffect } from 'react';
import { Project } from '../types';

interface ProjectDrawerProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDrawer({ project, onClose }: ProjectDrawerProps) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="overlay-backdrop"
      role="presentation"
      onClick={onClose}
    >
      <aside
        className="project-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={`${project.name} project details`}
        onClick={(event) => event.stopPropagation()}
        data-testid="project-detail-drawer"
      >
        <button
          type="button"
          className="drawer-close"
          onClick={onClose}
          data-testid="project-detail-close-button"
        >
          CLOSE ×
        </button>
        <p className="eyebrow">
          PROJECT {project.number} / {project.status}
        </p>
        <h2>{project.name}</h2>
        <p className="drawer-statement">{project.statement}</p>
        {project.overview && (
          <p className="drawer-overview text-sm opacity-80 mt-2 mb-4 leading-relaxed">
            {project.overview}
          </p>
        )}
        <div className="drawer-meta">
          <span>
            WHAT IT IS<strong>{project.type}</strong>
          </span>
          <span>
            TECHNOLOGY<strong>{project.tags.join(' / ')}</strong>
          </span>
          <span>
            STATUS<strong>{project.status}</strong>
          </span>
        </div>
        <div className="drawer-links">
          <a
            href={project.liveUrl || '#'}
            onClick={(e) => {
              if (!project.liveUrl) e.preventDefault();
            }}
            target={project.liveUrl ? '_blank' : undefined}
            rel="noreferrer"
            data-testid="project-live-link"
          >
            LIVE WEBSITE ↗
          </a>
          <a
            href={project.githubUrl || 'https://github.com'}
            target="_blank"
            rel="noreferrer"
            data-testid="project-source-link"
          >
            SOURCE CODE ↗
          </a>
        </div>
      </aside>
    </div>
  );
}
