import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import SectionLabel from './components/SectionLabel';
import ProjectCard from './components/ProjectCard';
import ProjectDrawer from './components/ProjectDrawer';
import SkillPopover from './components/SkillPopover';
import RecruiterView from './components/RecruiterView';
import { art, projects, skills, exploring, rules, processSteps } from './data/portfolioData';
import { Project } from './types';

export default function App() {
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  // Fallback state for main illustration artworks
  const [deskImg, setDeskImg] = useState(art.desk);
  const [labImg, setLabImg] = useState(art.lab);
  const [endingImg, setEndingImg] = useState(art.ending);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
            <span>SOFTWARE DEVELOPER</span>
            <span>NEW DELHI / 2026</span>
          </div>
          <div className="hero-art-wrap">
            <div className="hero-art-frame">
              <img
                src={deskImg}
                alt="Original anime illustration of Prem coding at night"
                referrerPolicy="no-referrer"
                onError={() => {
                  if (deskImg !== art.deskFallback) setDeskImg(art.deskFallback);
                }}
              />
            </div>
            <span className="annotation annotation-one">the first commit</span>
            <span className="annotation annotation-two">keep going →</span>
          </div>
          <h1 className="hero-title">
            <span>I BUILD</span>
            <span className="hero-indent">THINGS</span>
            <span className="hero-outline">THAT</span>
            <span>SHOULDN'T</span>
            <span className="hero-indent hero-last">EXIST.</span>
          </h1>
          <div className="hero-footer">
            <p>
              PREM SHARMA
              <br />
              <span>BUILDER / AI EXPLORER / CURIOUS HUMAN</span>
            </p>
            <button
              type="button"
              onClick={() => jumpTo('about')}
              data-testid="hero-scroll-button"
            >
              SCROLL TO ENTER ↓
            </button>
          </div>
        </section>

        {/* 01 ABOUT SECTION */}
        <section id="about" className="about-section paper-section" data-testid="about-section">
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
                I’m Prem — a BCA student learning in public, making useful things, and following the questions that lead from software into AI.
              </p>
            </div>
            <div className="portrait-stack">
              <img
                src={labImg}
                alt="Original anime illustration of Prem in a technology lab"
                loading="lazy"
                referrerPolicy="no-referrer"
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
        <section id="work" className="work-section dark-section" data-testid="work-section">
          <div className="section-head">
            <SectionLabel index="02" label="THE WORK" id="work-section-label" />
            <span className="side-note">SELECTED BUILDS / 005</span>
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
        <section id="journey" className="journey-section paper-section" data-testid="journey-section">
          <div className="section-head">
            <SectionLabel index="03" label="THE STORY SO FAR" id="journey-section-label" />
            <span className="side-note">MANGA LOG / 003</span>
          </div>
          <h2 className="journey-title">
            ORIGIN<br />
            <em>STORY</em><span>_</span>
          </h2>
          <div className="manga-grid">
            <article className="manga-panel panel-wide">
              <span className="panel-year">01 / BEGINNING</span>
              <h3>
                START WITH<br />A QUESTION.
              </h3>
              <p>
                Before the stack, there was curiosity. The kind that keeps asking how a blank screen becomes a place someone can use.
              </p>
              <span className="speech-bubble">“what if I tried?”</span>
            </article>
            <article className="manga-panel panel-tall">
              <span className="panel-year">02 / PRACTICE</span>
              <div className="speed-lines" />
              <h3>
                BREAK<br />THE LOOP.
              </h3>
              <p>
                Small projects. Strange bugs. Better questions. Each one a panel in the notebook.
              </p>
            </article>
            <article className="manga-panel panel-accent">
              <span className="panel-year">03 / NOW</span>
              <h3>
                MAKE THE<br />NEXT PANEL.
              </h3>
              <p>
                Full-stack experiments are becoming an AI-shaped practice: build, test, improve, repeat.
              </p>
              <span className="panel-arrow">→</span>
            </article>
          </div>
        </section>

        {/* 04 SKILLS / THE VOCABULARY */}
        <section id="skills" className="skills-section dark-section" data-testid="skills-section">
          <div className="section-head">
            <SectionLabel index="04" label="THE VOCABULARY" id="skills-section-label" />
            <span className="side-note">TOOLS I USE / 008</span>
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
                  data-testid={`skill-${skill.toLowerCase().replace(/\+/g, 'plus')}-button`}
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
                  onClick={() => setActiveSkill(item)}
                  data-testid={`exploring-${item.toLowerCase().replace(/\s+/g, '-')}-button`}
                >
                  {item} ↗
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 05 HOW I BUILD */}
        <section className="build-section paper-section" data-testid="build-section">
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
        <section className="code-section dark-section" data-testid="code-section">
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
              </code>
            </pre>
          </div>
        </section>

        {/* 06 AI SECTION */}
        <section className="ai-section paper-section" data-testid="ai-section">
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
                  <span key={node}>{node}</span>
                ))}
              </div>
            </div>
            <div className="lab-art">
              <img
                src={labImg}
                alt="Original anime illustration of Prem exploring AI systems"
                loading="lazy"
                referrerPolicy="no-referrer"
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
        <section className="rules-section dark-section" data-testid="manifesto-section">
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
        <section id="contact" className="contact-section" data-testid="contact-section">
          <div className="contact-art">
            <img
              src={endingImg}
              alt="Original anime illustration of Prem walking toward the next chapter"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => {
                if (endingImg !== art.endingFallback) setEndingImg(art.endingFallback);
              }}
            />
          </div>
          <div className="contact-copy">
            <p className="eyebrow">END OF EPISODE / FOR NOW</p>
            <h2>
              LET’S BUILD<br />
              <em>SOMETHING</em><br />
              WORTH<br />
              REMEMBERING<span>.</span>
            </h2>
            <div className="contact-links">
              <a
                href="mailto:sharmaprem3010@gmail.com"
                data-testid="contact-email-link"
              >
                EMAIL ↗
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                data-testid="contact-github-link"
              >
                GITHUB ↗
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                data-testid="contact-linkedin-link"
              >
                LINKEDIN ↗
              </a>
              <button
                type="button"
                onClick={() => setRecruiterMode(true)}
                data-testid="contact-recruiter-button"
              >
                RECRUITER MODE ↗
              </button>
            </div>
          </div>
          <div className="contact-footer">
            <span>PREM SHARMA / SOFTWARE DEVELOPER IN PROGRESS / 2026</span>
            <span>TO BE CONTINUED →</span>
            <span>NEXT EPISODE → UNKNOWN</span>
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
