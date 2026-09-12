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
          <a
            href="/Prem-Sharma-Resume-ATS.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Prem-Sharma-Resume-ATS.pdf"
            style={{
              display: 'flex',
              gap: '4px',
              font: "500 9px 'JetBrains Mono Variable', monospace",
              letterSpacing: '.13em',
              color: 'var(--crimson)',
              textDecoration: 'none',
              alignItems: 'center',
              padding: '2px 6px',
              border: '1px solid rgba(229,57,53,0.3)',
              borderRadius: '4px',
            }}
            data-testid="navigation-resume-link"
          >
            RESUME ↓
          </a>
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
