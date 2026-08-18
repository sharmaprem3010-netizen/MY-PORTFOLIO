import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Journey } from './components/Journey';
import { Goals } from './components/Goals';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { HiddenEditButton } from './components/HiddenEditButton';
import { AdminPanel } from './components/AdminPanel';
import { ADMIN_PASSWORD } from './src/config';
import { usePortfolio } from './src/context/PortfolioContext';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const { isEditing, setIsEditing } = usePortfolio();

  return (
    <div className="min-h-screen bg-[#0A0D14] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />
      
      <main>
        <Hero onOpenResume={() => setIsResumeOpen(true)} />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Journey />
        <Goals />
        <Contact />
      </main>

      <Footer />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {!isEditing && (
        <HiddenEditButton onAuthenticate={(password) => {
          if (password === ADMIN_PASSWORD) {
            setIsEditing(true);
          } else {
            alert('Incorrect password');
          }
        }} />
      )}
      
      {isEditing && (
        <AdminPanel onClose={() => setIsEditing(false)} />
      )}
    </div>
  );
}
