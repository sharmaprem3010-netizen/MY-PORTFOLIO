import { useEffect } from 'react';
import { skillDescriptions, exploringDescriptions } from '../data/portfolioData';

interface SkillPopoverProps {
  skill: string | null;
  onClose: () => void;
}

export default function SkillPopover({ skill, onClose }: SkillPopoverProps) {
  useEffect(() => {
    if (!skill) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [skill, onClose]);

  if (!skill) return null;

  const description =
    skillDescriptions[skill] ||
    exploringDescriptions[skill] ||
    `${skill} is part of the toolkit Prem uses to turn questions into experiments. Details are intentionally evolving.`;

  return (
    <div
      className="skill-popover"
      role="dialog"
      aria-label={`${skill} information`}
      data-testid="skill-information-panel"
    >
      <span className="eyebrow">SKILL NOTE</span>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close skill information"
        data-testid="skill-information-close-button"
      >
        ×
      </button>
      <h3>{skill}</h3>
      <p>{description}</p>
    </div>
  );
}
