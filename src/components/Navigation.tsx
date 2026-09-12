interface NavigationProps {
  progress: number;
  onNavigate: (sectionId: string) => void;
  onOpenRecruiter: () => void;
}

const navItems = [
  ['01', 'ABOUT', 'about'],
  ['02', 'WORK', 'work'],
  ['03', 'SKILLS', 'skills'],
  ['04', 'JOURNEY', 'journey'],
  ['05', 'CONTACT', 'contact'],
] as const;

export default function Navigation({ progress, onNavigate, onOpenRecruiter }: NavigationProps) {
  return (
    <>
      <div
        className="scroll-progress"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />
      <nav
        className="floating-nav"
        aria-label="Primary navigation"
        data-testid="portfolio-navigation"
      >
        <button
          className="wordmark"
          type="button"
          onClick={() => onNavigate('top')}
          data-testid="navigation-wordmark-button"
        >
          PREM<span>.</span>
        </button>

        <div className="nav-links">
          {navItems.map(([number, label, id]) => (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              data-testid={`navigation-${id}-button`}
            >
              <span>{number}</span>
              {label}
            </button>
          ))}
        </div>

        <button
          className="menu-button"
          type="button"
          onClick={onOpenRecruiter}
          aria-label="Open recruiter mode"
          data-testid="recruiter-mode-open-button"
        >
          <span />
          <span />
          <small>
            RECRUITER<br />MODE
          </small>
        </button>
      </nav>
    </>
  );
}
