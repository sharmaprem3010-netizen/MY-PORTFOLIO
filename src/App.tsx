import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import SectionLabel from './components/SectionLabel';
import ProjectCard from './components/ProjectCard';
import ProjectDrawer from './components/ProjectDrawer';
import SkillPopover from './components/SkillPopover';
import RecruiterView from './components/RecruiterView';
import { art, projects, skills, exploring, rules, processSteps, personalInfo } from './data/portfolioData';
import { Project } from './types';

export default function App() {
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Fallback state for main illustration artworks
  const [deskImg, setDeskImg] = useState(art.desk);
  const [labImg, setLabImg] = useState(art.lab);
  const [endingImg, setEndingImg] = useState(art.ending);

  // Scroll progress calculation
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Intersection Observer for scroll reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [recruiterMode]);

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(personalInfo.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const jumpTo = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (recruiterMode) {
    return <RecruiterView onBack={() => setRecruiterMode(false)} />;
  }

  return (
    <div className="portfolio-shell" data-testid="portfolio-page">
      <CustomCursor />
      <Navigation
        progress={progress}
        onNavigate={jumpTo}
        onOpenRecruiter={() => setRecruiterMode(true)}
      />

      <main>
        {/* HERO SECTION */}
        <section id="top" className="hero-section" data-testid="hero-section">
          <div className="hero-kicker">
            <span className="hero-kicker-role">AI & FULL-STACK DEVELOPER</span>
            <div className="hero-live-badge">
              <span className="live-pulse-dot" />
              <span>AVAILABLE FOR ROLES</span>
            </div>
            <span className="hero-kicker-loc">{personalInfo.location.toUpperCase()} / 2026</span>
          </div>

          <div className="hero-art-wrap">
            <div className="hero-art-glow" aria-hidden="true" />
            <div className="hero-art-frame animate-float">
              <img
                src={deskImg}
                alt="Original anime illustration of Prem coding at night"
                referrerPolicy="no-referrer"
                fetchPriority="high"
                width="640"
                height="480"
                onError={() => {
                  if (deskImg !== art.deskFallback) setDeskImg(art.deskFallback);
                }}
              />
            </div>
            <span className="annotation annotation-one">the first commit</span>
            <span className="annotation annotation-two">keep going →</span>
          </div>

          <h1 className="hero-title">
            <span className="hero-word hero-word-1">I BUILD</span>
            <span className="hero-word hero-word-2 hero-indent">THINGS</span>
            <span className="hero-word hero-word-3 hero-outline shimmer-text">THAT</span>
            <span className="hero-word hero-word-4">SHOULDN'T</span>
            <span className="hero-word hero-word-5 hero-indent hero-last">EXIST.</span>
          </h1>

          <div className="hero-footer">
            <p>
              PREM SHARMA
              <br />
              <span>AI DEVELOPER / FULL-STACK BUILDER / BCA STUDENT</span>
            </p>
            <div className="hero-cta-group">
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download="Prem-Sharma-Resume-ATS.pdf"
                className="hero-resume-btn"
                data-testid="hero-resume-download-button"
              >
                <span>RESUME (PDF)</span>
                <span className="btn-arrow-down">↓</span>
              </a>
              <button
                type="button"
                className="hero-scroll-btn"
                onClick={() => jumpTo('about')}
                data-testid="hero-scroll-button"
              >
                SCROLL TO ENTER ↓
              </button>
            </div>
          </div>
        </section>

        {/* 01 ABOUT SECTION */}
        <section id="about" className="about-section paper-section reveal-on-scroll" data-testid="about-section">
          <div className="section-head">
            <SectionLabel index="01" label="WHO IS PREM?" id="about-section-label" />
            <span className="side-note">A SHORT INTRODUCTION / 001</span>
          </div>
          <div className="about-grid">
            <div>
              <h2>
                STILL
                <br />
                <em>LEARNING.</em>
                <br />
                ALWAYS
                <br />
                <span>BUILDING.</span>
              </h2>
              <p className="serif-intro">
                I’m Prem — a second-year BCA (Computer Science) student at Swami Vivekananda University (CGPA 8.5/10), building production web applications and conversational AI systems with Python, Next.js, and modern tools.
              </p>
            </div>
            <div className="portrait-stack animate-subtle-tilt">
              <img
                src={labImg}
                alt="Original anime illustration of Prem in a technology lab"
                decoding="async"
                referrerPolicy="no-referrer"
                width="640"
                height="640"
                onError={() => {
                  if (labImg !== art.labFallback) setLabImg(art.labFallback);
                }}
              />
              <span className="annotation portrait-note">
                curious<br />by default
              </span>
              <span className="portrait-stamp">
                CHARACTER<br />STUDY / 001
              </span>
            </div>
          </div>
          <div className="annotation-row">
            <span>CURIOUS</span>
            <span>BUILDER</span>
            <span>PROBLEM SOLVER</span>
            <span>EXPERIMENTER</span>
            <span>LEARNING EVERY DAY</span>
          </div>
        </section>

        {/* 02 WORK SECTION */}
        <section id="work" className="work-section dark-section reveal-on-scroll" data-testid="work-section">
          <div className="section-head">
            <SectionLabel index="02" label="THE WORK" id="work-section-label" />
            <span className="side-note">SELECTED BUILDS / 004</span>
          </div>
          <div className="work-heading">
            <h2>
              THINGS
              <br />
              <em>I’VE</em>
              <br />
              BUILT<span>.</span>
            </h2>
            <p>
              Not case studies. Evidence.
              <br />
              A few attempts to make the
              <br />
              screen a little more human.
            </p>
          </div>

          <div className="projects-scroll-wrapper" data-testid="projects-scroll-container">
            <div className="projects-sequence">
              {projects.map((project) => (
                <ProjectCard
                  key={project.name}
                  project={project}
                  onOpen={setActiveProject}
                />
              ))}
            </div>
          </div>
          <div className="projects-scroll-hint" aria-hidden="true">
            <span>← HORIZONTAL REEL · SCROLL TO BROWSE →</span>
          </div>

          <div className="work-endnote">
            <span>MORE IN THE NOTEBOOK</span>
            <span>↘ KEEP SCROLLING</span>
          </div>
        </section>

        {/* 03 JOURNEY / MANGA LOG */}
        <section id="journey" className="journey-section paper-section reveal-on-scroll" data-testid="journey-section">
          <div className="section-head">
            <SectionLabel index="03" label="THE STORY SO FAR" id="journey-section-label" />
            <span className="side-note">MANGA LOG / 003</span>
          </div>
          <h2 className="journey-title">
            ORIGIN<br />
            <em>STORY</em><span>_</span>
          </h2>
          <div className="manga-grid">
            <article className="manga-panel panel-wide interactive-panel">
              <span className="panel-year">01 / BEGINNING</span>
              <h3>
                START WITH<br />A QUESTION.
              </h3>
              <p>
                Before the stack, there was curiosity. The kind that keeps asking how a blank screen becomes a place someone can use.
              </p>
              <span className="speech-bubble animate-bob">“what if I tried?”</span>
            </article>
            <article className="manga-panel panel-tall interactive-panel">
              <span className="panel-year">02 / PRACTICE</span>
              <div className="speed-lines" />
              <h3>
                BREAK<br />THE LOOP.
              </h3>
              <p>
                Small projects. Strange bugs. Better questions. Each one a panel in the notebook.
              </p>
            </article>
            <article className="manga-panel panel-accent interactive-panel">
              <span className="panel-year">03 / NOW</span>
              <h3>
                MAKE THE<br />NEXT PANEL.
              </h3>
              <p>
                Full-stack experiments are becoming an AI-shaped practice: build, test, improve, repeat.
              </p>
              <span className="panel-arrow animate-arrow-slide">→</span>
            </article>
          </div>
        </section>

        {/* 04 SKILLS / THE VOCABULARY */}
        <section id="skills" className="skills-section dark-section reveal-on-scroll" data-testid="skills-section">
          <div className="section-head">
            <SectionLabel index="04" label="THE VOCABULARY" id="skills-section-label" />
            <span className="side-note">TOOLS I USE / {skills.length}</span>
          </div>
          <div className="skills-layout">
            <h2>
              I<br />
              <em>SPEAK</em>
            </h2>
            <div className="skill-cloud">
              {skills.map((skill, index) => (
                <button
                  key={skill}
                  type="button"
                  className={index % 3 === 0 ? 'skill-word accent-word' : 'skill-word'}
                  onClick={() => setActiveSkill(skill)}
                  data-testid={`skill-${skill.toLowerCase().replace(/[^a-z0-9]/g, '-')}-button`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
          <div className="exploring-row">
            <p className="eyebrow">CURRENTLY LEARNING</p>
            <div>
              {exploring.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="exploring-chip"
                  onClick={() => setActiveSkill(item)}
                  data-testid={`exploring-${item.toLowerCase().replace(/\s+/g, '-')}-button`}
                >
                  <span>{item}</span>
                  <span className="chip-arrow">↗</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 05 HOW I BUILD */}
        <section className="build-section paper-section reveal-on-scroll" data-testid="build-section">
          <div className="section-head">
            <SectionLabel index="05" label="HOW I BUILD" id="build-section-label" />
            <span className="side-note">THE LOOP / ∞</span>
          </div>
          <div className="build-heading">
            <h2>
              I DON’T JUST<br />
              <em>WRITE CODE.</em>
            </h2>
            <p>
              There’s a rhythm to making something real. It is less about knowing everything, more about staying with the problem.
            </p>
          </div>
          <div className="process-list">
            {processSteps.map(({ number, title, copy }) => (
              <div className="process-item" key={number}>
                <span>{number}</span>
                <strong>{title}</strong>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TERMINAL NOTE */}
        <section className="code-section dark-section reveal-on-scroll" data-testid="code-section">
          <div className="code-intro">
            <p className="eyebrow">A NOTE FROM THE TERMINAL</p>
            <h2>
              CODE IS<br />
              <em>HOW I<br />THINK.</em>
            </h2>
          </div>
          <div className="code-window">
            <div className="code-window-bar">
              <span />
              <span />
              <span />
              <small>prem / idea.js</small>
            </div>
            <pre>
              <code>
                <i>const</i> idea = problem;
                {'\n'}
                <i>let</i> solved = <b>false</b>;
                {'\n\n'}
                <i>while</i> (!solved) {'{\n'}
                {'  '}build(idea);
                {'\n  '}test(<span>withRealPeople</span>);
                {'\n  '}improve(<span>oneThing</span>);
                {'\n  '}solved = <b>maybe</b>;
                {'\n}'}
                {'\n\n'}
                <em>// keep shipping.</em>
                <span className="terminal-cursor" aria-hidden="true">_</span>
              </code>
            </pre>
          </div>
        </section>

        {/* 06 AI SECTION */}
        <section className="ai-section paper-section reveal-on-scroll" data-testid="ai-section">
          <div className="section-head">
            <SectionLabel index="06" label="THE NEXT ARC" id="ai-section-label" />
            <span className="side-note">CURRENTLY EXPLORING / AI</span>
          </div>
          <div className="ai-layout">
            <div>
              <h2>AI<span>.</span></h2>
              <p className="serif-intro">
                The next question is not whether machines can make things. It’s how thoughtful builders can make the relationship useful.
              </p>
              <div className="ai-nodes">
                {exploring.map((node) => (
                  <span key={node} className="ai-node-pill">{node}</span>
                ))}
              </div>
            </div>
            <div className="lab-art animate-subtle-tilt">
              <img
                src={labImg}
                alt="Original anime illustration of Prem exploring AI systems"
                decoding="async"
                referrerPolicy="no-referrer"
                width="640"
                height="640"
                onError={() => {
                  if (labImg !== art.labFallback) setLabImg(art.labFallback);
                }}
              />
              <span className="annotation lab-note">
                new arc<br />loading…
              </span>
            </div>
          </div>
        </section>

        {/* 07 MANIFESTO / MY RULES */}
        <section className="rules-section dark-section reveal-on-scroll" data-testid="manifesto-section">
          <div className="section-head">
            <SectionLabel index="07" label="MY RULES" id="manifesto-section-label" />
            <span className="side-note">MANIFESTO / 008</span>
          </div>
          <div className="rules-list">
            {rules.map((rule, index) => (
              <div className="rule-item" key={rule}>
                <span>0{index + 1}</span>
                <h2>{rule}</h2>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT / END OF EPISODE */}
        <section id="contact" className="contact-section reveal-on-scroll" data-testid="contact-section">
          <div className="contact-container">
            {/* Top Manga Finale Badge */}
            <div className="contact-header-badge">
              <span className="contact-episode-tag">EPISODE FINALE / 2026</span>
              <div className="contact-status-chip">
                <span className="live-pulse-dot" />
                <span>OPEN FOR ROLES</span>
              </div>
            </div>

            <div className="contact-content-grid">
              {/* Left Column: Heading, Narrative, Email, and Action Cards */}
              <div className="contact-main">
                <h2 className="contact-title">
                  LET’S BUILD<br />
                  <em>SOMETHING</em><br />
                  WORTH<br />
                  <span className="contact-outline-text">REMEMBERING.</span>
                </h2>

                <p className="contact-narrative">
                  Always looking for challenging problems, ambitious teams, and thoughtful products at the intersection of full-stack engineering and artificial intelligence.
                </p>

                {/* Email Interactive Bar */}
                <div className="contact-email-bar">
                  <div className="email-meta">
                    <span className="email-kicker">DIRECT INBOX</span>
                    <a href={`mailto:${personalInfo.email}`} className="email-text">
                      {personalInfo.email}
                    </a>
                  </div>
                  <div className="email-btns">
                    <button
                      type="button"
                      className={`email-action-copy ${copiedEmail ? 'is-copied' : ''}`}
                      onClick={handleCopyEmail}
                      data-testid="contact-copy-email-button"
                      aria-label="Copy email address"
                    >
                      {copiedEmail ? 'COPIED TO CLIPBOARD! ✨' : 'COPY EMAIL 📋'}
                    </button>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="email-action-send"
                      data-testid="contact-email-link"
                    >
                      SEND EMAIL ↗
                    </a>
                  </div>
                </div>

                {/* Quick Action Grid Cards */}
                <div className="contact-cards-grid">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-card"
                    data-testid="contact-github-link"
                  >
                    <div className="contact-card-top">
                      <span className="contact-card-pill">GITHUB</span>
                      <span className="contact-card-arrow">↗</span>
                    </div>
                    <strong>Source Code & Repositories</strong>
                    <small>Fitmadix, The Baking Nest, E-Shopping</small>
                  </a>

                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-card"
                    data-testid="contact-linkedin-link"
                  >
                    <div className="contact-card-top">
                      <span className="contact-card-pill">LINKEDIN</span>
                      <span className="contact-card-arrow">↗</span>
                    </div>
                    <strong>Professional Network</strong>
                    <small>premsharmatech • Connect with me</small>
                  </a>

                  <a
                    href={personalInfo.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download="Prem-Sharma-Resume-ATS.pdf"
                    className="contact-card contact-card-highlight"
                    data-testid="contact-resume-link"
                  >
                    <div className="contact-card-top">
                      <span className="contact-card-pill highlight-pill">ATS RESUME</span>
                      <span className="contact-card-arrow">↓</span>
                    </div>
                    <strong>Download Resume (PDF)</strong>
                    <small>Updated 2026 • Verified ATS Format</small>
                  </a>

                  <button
                    type="button"
                    className="contact-card contact-card-recruiter"
                    onClick={() => setRecruiterMode(true)}
                    data-testid="contact-recruiter-button"
                  >
                    <div className="contact-card-top">
                      <span className="contact-card-pill recruiter-pill">RECRUITER VIEW</span>
                      <span className="contact-card-arrow">→</span>
                    </div>
                    <strong>Switch to Recruiter Mode</strong>
                    <small>Academics, Skills & Project Matrix</small>
                  </button>
                </div>
              </div>

              {/* Right Column: Framed Anime Manga Scene */}
              <div className="contact-art-panel">
                <div className="manga-frame-card animate-float">
                  <div className="manga-frame-topbar">
                    <span className="frame-scene-tag">SCENE / CHAPTER 01 END</span>
                    <span className="frame-loc-tag">KOLKATA • 2026</span>
                  </div>
                  <div className="manga-frame-art">
                    <img
                      src={endingImg}
                      alt="Anime illustration of Prem walking toward the next chapter"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      width="640"
                      height="480"
                      onError={() => {
                        if (endingImg !== art.endingFallback) setEndingImg(art.endingFallback);
                      }}
                    />
                    <div className="manga-art-vignette" />
                    <span className="manga-stamp-badge">
                      NEXT ARC<br />LOADING
                    </span>
                  </div>
                  <div className="manga-frame-footer">
                    <p>“The stack will change. The hunger to build won’t.”</p>
                    <small>PREM SHARMA — TO BE CONTINUED →</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Non-Overlapping Footer */}
            <div className="contact-footer-bar">
              <div className="footer-bar-left">
                <strong>PREM SHARMA</strong>
                <span>AI & FULL-STACK DEVELOPER • BCA (CGPA 8.5)</span>
              </div>
              <div className="footer-bar-center">
                <span>SWAMI VIVEKANANDA UNIVERSITY • KOLKATA, INDIA</span>
              </div>
              <div className="footer-bar-right">
                <span>TO BE CONTINUED → CHAPTER 2026</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* OVERLAYS & MODALS */}
      <ProjectDrawer
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />

      <SkillPopover
        skill={activeSkill}
        onClose={() => setActiveSkill(null)}
      />
    </div>
  );
}
