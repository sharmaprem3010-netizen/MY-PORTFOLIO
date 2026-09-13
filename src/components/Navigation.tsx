import { useState, useEffect } from 'react';

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
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close on Escape or resize to desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth > 900) setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleItemClick = (id: string) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  const handleRecruiterClick = () => {
    setMobileOpen(false);
    onOpenRecruiter();
  };

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
          onClick={() => handleItemClick('top')}
          data-testid="navigation-wordmark-button"
        >
          PREM<span>.</span>
        </button>

        {/* Desktop Links */}
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

        {/* Right Nav Actions (Mobile index toggle + Recruiter button) */}
        <div className="nav-right-actions">
          <button
            className="mobile-nav-toggle"
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close section index' : 'Open section index'}
            data-testid="mobile-menu-toggle-button"
          >
            <span className="mobile-toggle-bars">
              <span className={`toggle-line ${mobileOpen ? 'open-1' : ''}`} />
              <span className={`toggle-line ${mobileOpen ? 'open-2' : ''}`} />
            </span>
            <span className="mobile-toggle-label">{mobileOpen ? 'CLOSE' : 'INDEX'}</span>
          </button>

          <button
            className="recruiter-nav-button"
            type="button"
            onClick={onOpenRecruiter}
            aria-label="Open recruiter mode"
            data-testid="recruiter-mode-open-button"
          >
            <span className="recruiter-accent-bar" aria-hidden="true" />
            <span className="recruiter-text-desktop">RECRUITER MODE</span>
            <span className="recruiter-text-mobile">RECRUITER</span>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Sheet */}
      {mobileOpen && (
        <div
          className="mobile-menu-backdrop"
          onClick={() => setMobileOpen(false)}
          role="presentation"
        >
          <div
            className="mobile-menu-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation index"
            onClick={(e) => e.stopPropagation()}
            data-testid="mobile-navigation-drawer"
          >
            <div className="mobile-menu-header">
              <span className="eyebrow">PORTFOLIO INDEX / 2026</span>
              <button
                type="button"
                className="mobile-menu-close"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation"
                data-testid="mobile-menu-close-button"
              >
                CLOSE ×
              </button>
            </div>

            <div className="mobile-menu-links">
              {navItems.map(([number, label, id]) => (
                <button
                  key={id}
                  type="button"
                  className="mobile-menu-link"
                  onClick={() => handleItemClick(id)}
                  data-testid={`mobile-nav-${id}-button`}
                >
                  <span className="mobile-link-num">{number}</span>
                  <span className="mobile-link-label">{label}</span>
                  <span className="mobile-link-arrow">→</span>
                </button>
              ))}
            </div>

            <div className="mobile-menu-footer">
              <button
                type="button"
                className="mobile-recruiter-btn"
                onClick={handleRecruiterClick}
                data-testid="mobile-recruiter-toggle-button"
              >
                <span>SWITCH VIEW</span>
                <strong>RECRUITER MODE ↗</strong>
              </button>
              <div className="mobile-menu-socials">
                <a href="mailto:sharmaprem3010@gmail.com">EMAIL ↗</a>
                <a href="https://github.com/sharmaprem3010-netizen" target="_blank" rel="noreferrer">GITHUB ↗</a>
                <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LINKEDIN ↗</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
