import React, { useState } from 'react';
import { usePortfolio } from '../src/context/PortfolioContext';
import { Save, RefreshCw, X, Edit3, Download, Github, Loader2 } from 'lucide-react';

interface AdminPanelProps {
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const { data, exportData, resetData } = usePortfolio();
  const [isSavingGithub, setIsSavingGithub] = useState(false);

  const handleSaveToGitHub = async () => {
    const pat = localStorage.getItem('github_pat') || prompt('Enter your GitHub Personal Access Token (PAT) with repo permissions to save directly to the live site:');
    
    if (!pat) {
      alert('A GitHub PAT is required to save directly to the repository.');
      return;
    }

    localStorage.setItem('github_pat', pat);
    setIsSavingGithub(true);

    try {
      const owner = 'sharmaprem3010-netizen';
      const repo = 'MY-PORTFOLIO';
      const path = 'src/content.json';
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

      // 1. Get current file SHA
      const getRes = await fetch(apiUrl, {
        headers: {
          Authorization: `token ${pat}`,
          Accept: 'application/vnd.github.v3+json'
        }
      });

      let sha;
      if (getRes.ok) {
        const getJson = await getRes.json();
        sha = getJson.sha;
      } else if (getRes.status !== 404) {
        throw new Error('Failed to fetch current file info. Check your PAT and permissions.');
      }

      // 2. Encode content properly for Unicode
      const jsonString = JSON.stringify(data, null, 2);
      const contentBase64 = btoa(unescape(encodeURIComponent(jsonString)));

      // 3. Put new file content
      const putRes = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          Authorization: `token ${pat}`,
          Accept: 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
          message: 'Update portfolio content via Admin Panel',
          content: contentBase64,
          sha: sha
        })
      });

      if (putRes.ok) {
        alert('Successfully saved to GitHub! Your changes will appear on the live site in 1-2 minutes.');
      } else {
        const errorData = await putRes.json();
        throw new Error(errorData.message || 'Failed to push to GitHub.');
      }

    } catch (err: any) {
      alert(`Error saving to GitHub: ${err.message}`);
      // If auth failed, clear the invalid token
      if (err.message.includes('PAT') || err.message.includes('Bad credentials')) {
        localStorage.removeItem('github_pat');
      }
    } finally {
      setIsSavingGithub(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-slate-900/95 border-b border-cyan-500/30 backdrop-blur-md z-[100] px-4 py-3 flex flex-wrap items-center justify-between shadow-lg shadow-cyan-500/10 gap-y-3">
      <div className="flex items-center gap-2 text-cyan-400 font-bold">
        <Edit3 className="w-5 h-5" />
        <span>Live Edit Mode Active</span>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        <button
          onClick={resetData}
          className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg flex items-center gap-2 border border-slate-700 transition-colors"
          title="Reset to default data"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="hidden sm:inline">Reset</span>
        </button>
        
        <button
          onClick={exportData}
          className="px-3 py-2 bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-bold rounded-lg flex items-center gap-2 shadow-md shadow-indigo-500/20 transition-all"
          title="Download changes as JSON file"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Export JSON</span>
        </button>
        
        <button
          onClick={async () => {
            try {
              const res = await fetch('/api/save-portfolio', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data, null, 2),
              });
              if (res.ok) {
                alert('Saved successfully to src/content.json locally!\n\nTo see these changes on your main site, you must commit the changes to src/content.json and push them to GitHub.');
              } else {
                alert('Failed to save to disk. Are you running the local Vite dev server? Try using "Export JSON" or "Save to GitHub" instead.');
              }
            } catch (err) {
              alert('Error saving to disk. Are you on the deployed site? Use "Save to GitHub" instead.');
            }
          }}
          className="px-3 py-2 bg-green-500 hover:bg-green-400 text-slate-950 text-sm font-bold rounded-lg flex items-center gap-2 shadow-md shadow-green-500/20 transition-all"
          title="Save changes to content.json on local disk (requires local dev server)"
        >
          <Save className="w-4 h-4" />
          <span className="hidden lg:inline">Local Save</span>
        </button>

        <button
          onClick={handleSaveToGitHub}
          disabled={isSavingGithub}
          className="px-3 py-2 bg-[#2ea44f] hover:bg-[#2c974b] text-white text-sm font-bold rounded-lg flex items-center gap-2 shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          title="Push changes directly to your GitHub repository"
        >
          {isSavingGithub ? <Loader2 className="w-4 h-4 animate-spin" /> : <Github className="w-4 h-4" />}
          <span className="hidden sm:inline">{isSavingGithub ? 'Saving...' : 'Save to Live Site'}</span>
        </button>
        
        <button
          onClick={onClose}
          className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium rounded-lg flex items-center gap-2 border border-red-500/20 transition-colors ml-1"
        >
          <X className="w-4 h-4" />
          <span className="hidden sm:inline">Exit</span>
        </button>
      </div>
    </div>
  );
};
