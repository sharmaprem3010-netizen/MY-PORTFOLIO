import {
  projects,
  skills,
  exploring,
  personalInfo,
  education,
  certifications,
  languages,
} from '../data/portfolioData';

interface RecruiterViewProps {
  onBack: () => void;
}

export default function RecruiterView({ onBack }: RecruiterViewProps) {
  return (
    <main className="recruiter-page" data-testid="recruiter-mode-page">
      <header className="recruiter-header">
        <div>
          <p className="eyebrow">{personalInfo.location.toUpperCase()} / 2026</p>
          <h1>
            {personalInfo.name}
            <br />
            <em>{personalInfo.role}</em>
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            download="Prem-Sharma-Resume-ATS.pdf"
            className="outline-button"
            style={{
              background: 'var(--crimson)',
              color: 'var(--paper)',
              borderColor: 'var(--crimson)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
            }}
            data-testid="recruiter-download-resume-top"
          >
            ATS RESUME (PDF) ↓
          </a>
          <button
            className="outline-button"
            type="button"
            onClick={onBack}
            data-testid="recruiter-mode-exit-button"
          >
            ← BACK TO STORY
          </button>
        </div>
      </header>

      <div className="recruiter-grid">
        {/* SUMMARY & CONTACT */}
        <section className="recruiter-panel">
          <p className="eyebrow">PROFESSIONAL SUMMARY</p>
          <p className="recruiter-copy" style={{ fontSize: '1.25rem', lineHeight: '1.4', margin: '30px 0' }}>
            {personalInfo.summary}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '25px', fontSize: '12px' }}>
            <div>
              <span style={{ color: '#777', font: "9px 'JetBrains Mono Variable', monospace" }}>PHONE: </span>
              <strong>{personalInfo.phone}</strong>
            </div>
            <div>
              <span style={{ color: '#777', font: "9px 'JetBrains Mono Variable', monospace" }}>LOCATION: </span>
              <strong>{personalInfo.location}</strong>
            </div>
          </div>
          <div className="recruiter-links" style={{ flexWrap: 'wrap', gap: '14px' }}>
            <a href={`mailto:${personalInfo.email}`} data-testid="recruiter-email-link">
              EMAIL ↗
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="recruiter-github-link"
            >
              GITHUB ↗
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="recruiter-linkedin-link"
            >
              LINKEDIN ↗
            </a>
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="Prem-Sharma-Resume-ATS.pdf"
              data-testid="recruiter-resume-link"
              style={{ color: 'var(--crimson)', fontWeight: 600 }}
            >
              DOWNLOAD RESUME PDF ↓
            </a>
          </div>
        </section>

        {/* SELECTED WORK */}
        <section className="recruiter-panel">
          <p className="eyebrow">PRODUCTION PROJECTS & EVIDENCE</p>
          {projects.map((project) => (
            <div className="recruiter-project" key={project.name} style={{ gridTemplateColumns: '32px 1fr' }}>
              <span>{project.number}</span>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
                  <strong>{project.name}</strong>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--crimson)', font: "9px 'JetBrains Mono Variable', monospace", textDecoration: 'underline' }}
                      >
                        LIVE SITE ↗
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#555', font: "9px 'JetBrains Mono Variable', monospace", textDecoration: 'underline' }}
                      >
                        CODE ↗
                      </a>
                    )}
                  </div>
                </div>
                <small style={{ display: 'block', margin: '4px 0 6px' }}>{project.type} · {project.tags.join(' / ')}</small>
                {project.highlights && (
                  <p style={{ margin: 0, fontSize: '11px', color: '#444', lineHeight: '1.4' }}>
                    {project.highlights[0]}
                  </p>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* TECHNICAL CAPABILITIES */}
        <section className="recruiter-panel">
          <p className="eyebrow">CORE SKILLS & TECH STACK</p>
          <div className="recruiter-skills" style={{ marginTop: '25px', marginBottom: '20px' }}>
            {skills.map((skill) => (
              <span key={skill} style={{ fontWeight: 600 }}>{skill}</span>
            ))}
          </div>
          <p className="eyebrow" style={{ marginTop: '30px' }}>SPECIALIZATIONS & EXPLORATIONS</p>
          <div className="recruiter-skills" style={{ marginTop: '15px' }}>
            {exploring.map((item) => (
              <span key={item} style={{ borderColor: 'var(--crimson)', color: 'var(--crimson)' }}>
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* EDUCATION, CERTIFICATIONS & LANGUAGES */}
        <section className="recruiter-panel">
          <p className="eyebrow">EDUCATION & ACADEMICS</p>
          {education.map((edu, idx) => (
            <div className="recruiter-project" key={edu.institution} style={{ gridTemplateColumns: '32px 1fr' }}>
              <span>0{idx + 1}</span>
              <div>
                <strong>{edu.degree}</strong>
                <small style={{ display: 'block' }}>
                  {edu.institution} · {edu.period}
                </small>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--crimson)', marginTop: '2px', display: 'inline-block' }}>
                  {edu.grade}
                </span>
              </div>
            </div>
          ))}

          <div style={{ marginTop: '28px' }}>
            <p className="eyebrow">CERTIFICATIONS</p>
            {certifications.map((cert) => (
              <div key={cert.name} style={{ marginTop: '10px', fontSize: '13px' }}>
                <strong>• {cert.name}</strong>
                <span style={{ color: '#666', fontSize: '11px', marginLeft: '6px' }}>
                  — {cert.issuer} ({cert.year})
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '24px' }}>
            <p className="eyebrow">LANGUAGES</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
              {languages.map((lang) => (
                <span
                  key={lang.language}
                  style={{
                    border: '1px solid #ccc',
                    padding: '4px 8px',
                    fontSize: '11px',
                    fontFamily: "'JetBrains Mono Variable', monospace",
                  }}
                >
                  {lang.language} ({lang.proficiency})
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>

      <footer className="recruiter-footer" style={{ alignItems: 'center' }}>
        <span>OPEN FOR ROLES: AI ENGINEER / FULL-STACK DEVELOPER</span>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            download="Prem-Sharma-Resume-ATS.pdf"
            style={{ color: 'var(--crimson)', fontWeight: 600 }}
          >
            DOWNLOAD RESUME PDF ↓
          </a>
          <a href={`mailto:${personalInfo.email}`} data-testid="recruiter-contact-link">
            START A CONVERSATION ↗
          </a>
        </div>
      </footer>
    </main>
  );
}

