import { projects, skills, exploring } from '../data/portfolioData';

interface RecruiterViewProps {
  onBack: () => void;
}

export default function RecruiterView({ onBack }: RecruiterViewProps) {
  return (
    <main className="recruiter-page" data-testid="recruiter-mode-page">
      <header className="recruiter-header">
        <div>
          <p className="eyebrow">PREM SHARMA / 2026</p>
          <h1>
            Software developer<br />
            <em>in progress.</em>
          </h1>
        </div>
        <button
          className="outline-button"
          type="button"
          onClick={onBack}
          data-testid="recruiter-mode-exit-button"
        >
          ← BACK TO STORY
        </button>
      </header>
      <div className="recruiter-grid">
        <section className="recruiter-panel">
          <p className="eyebrow">ABOUT</p>
          <p className="recruiter-copy">
            BCA student, full-stack explorer and AI/ML enthusiast. I like turning rough
            ideas into clear, useful software.
          </p>
          <div className="recruiter-links">
            <a href="mailto:sharmaprem3010@gmail.com" data-testid="recruiter-email-link">
              EMAIL ↗
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              data-testid="recruiter-github-link"
            >
              GITHUB ↗
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              data-testid="recruiter-linkedin-link"
            >
              LINKEDIN ↗
            </a>
          </div>
        </section>

        <section className="recruiter-panel">
          <p className="eyebrow">SELECTED WORK</p>
          {projects.map((project) => (
            <div className="recruiter-project" key={project.name}>
              <span>{project.number}</span>
              <strong>{project.name}</strong>
              <small>{project.type}</small>
            </div>
          ))}
        </section>

        <section className="recruiter-panel">
          <p className="eyebrow">CAPABILITIES</p>
          <div className="recruiter-skills">
            {[...skills, ...exploring].map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </section>

        <section className="recruiter-panel">
          <p className="eyebrow">EDUCATION</p>
          <div className="recruiter-project">
            <span>01</span>
            <strong>BCA</strong>
            <small>COMPUTER APPLICATIONS / CURRENT</small>
          </div>
          <div className="recruiter-project">
            <span>02</span>
            <strong>SELF-DIRECTED</strong>
            <small>BUILDING, BREAKING, LEARNING</small>
          </div>
        </section>
      </div>

      <footer className="recruiter-footer">
        <span>AVAILABLE FOR GOOD PROBLEMS</span>
        <a href="mailto:sharmaprem3010@gmail.com" data-testid="recruiter-contact-link">
          START A CONVERSATION ↗
        </a>
      </footer>
    </main>
  );
}
