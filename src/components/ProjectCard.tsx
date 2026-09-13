import { useState } from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const [imgSrc, setImgSrc] = useState(project.image);

  const testIdKey = project.name.toLowerCase().replace(/\s+/g, '-');

  return (
    <button
      type="button"
      className="project-card"
      data-testid={`project-${testIdKey}-button`}
      onClick={() => onOpen(project)}
    >
      <div className="project-media">
        <img
          src={imgSrc}
          alt={`Original anime illustration for ${project.name}`}
          decoding="async"
          width="400"
          height="260"
          referrerPolicy="no-referrer"
          onError={() => {
            if (project.fallbackImage && imgSrc !== project.fallbackImage) {
              setImgSrc(project.fallbackImage);
            }
          }}
        />
        <span className="project-open">
          <span>OPEN</span>
          <span className="open-arrow">↗</span>
        </span>
      </div>
      <div className="project-topline">
        <span>PROJECT {project.number}</span>
        <span className="project-status-pill">{project.status}</span>
      </div>
      <h3 data-testid={`project-${testIdKey}-title`}>{project.name}</h3>
      <p className="project-type">{project.type}</p>
      <p className="project-statement">{project.statement}</p>
      <div className="tag-row">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </button>
  );
}
