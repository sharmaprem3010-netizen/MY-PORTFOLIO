import React, { useState } from 'react';

interface HiddenEditButtonProps {
  onAuthenticate: (password: string) => void;
}

import { Settings } from 'lucide-react';

export const HiddenEditButton: React.FC<HiddenEditButtonProps> = ({ onAuthenticate }) => {
  const [showPrompt, setShowPrompt] = useState(false);

  // Only render the edit button if the app is running on localhost
  if (typeof window !== 'undefined' && 
      window.location.hostname !== 'localhost' && 
      window.location.hostname !== '127.0.0.1') {
    return null;
  }

  const handleClick = () => {
    setShowPrompt(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    onAuthenticate(password);
    setShowPrompt(false);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-full shadow-lg shadow-cyan-500/20 transition-all z-40"
        aria-label="Admin Settings"
      >
        <Settings size={20} />
        <span>Edit Portfolio</span>
      </button>
      {showPrompt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <form
            onSubmit={handleSubmit}
            className="bg-[#0A0D14] p-6 rounded-xl shadow-lg border border-slate-800 max-w-sm w-full"
          >
            <h2 className="text-xl font-bold text-slate-100 mb-4 text-center">
              Admin Access
            </h2>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="w-full p-2 mb-4 rounded bg-slate-900 text-slate-200 border border-slate-700 focus:outline-none focus:border-cyan-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold py-2 rounded"
            >
              Continue
            </button>
          </form>
        </div>
      )}
    </>
  );
};
