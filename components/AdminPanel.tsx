import React from 'react';
import { usePortfolio } from '../src/context/PortfolioContext';
import { Save, RefreshCw, X, Edit3 } from 'lucide-react';

interface AdminPanelProps {
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const { data, exportData, resetData } = usePortfolio();

  return (
    <div className="fixed top-0 left-0 w-full bg-slate-900/95 border-b border-cyan-500/30 backdrop-blur-md z-[100] px-4 py-3 flex items-center justify-between shadow-lg shadow-cyan-500/10">
      <div className="flex items-center gap-2 text-cyan-400 font-bold">
        <Edit3 className="w-5 h-5" />
        <span>Live Edit Mode Active</span>
      </div>
      
      <div className="flex items-center gap-3">
        <button
          onClick={resetData}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg flex items-center gap-2 border border-slate-700 transition-colors"
          title="Reset to default data"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="hidden sm:inline">Reset</span>
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
                alert('Saved successfully to disk!');
              } else {
                alert('Failed to save to disk.');
              }
            } catch (err) {
              alert('Error saving to disk.');
            }
          }}
          className="px-4 py-2 bg-green-500 hover:bg-green-400 text-slate-950 text-sm font-bold rounded-lg flex items-center gap-2 shadow-md shadow-green-500/20 transition-all"
          title="Save changes to content.json on disk"
        >
          <Save className="w-4 h-4" />
          <span className="hidden sm:inline">Save to Disk</span>
        </button>
        
        <button
          onClick={onClose}
          className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium rounded-lg flex items-center gap-2 border border-red-500/20 transition-colors ml-2"
        >
          <X className="w-4 h-4" />
          <span className="hidden sm:inline">Exit</span>
        </button>
      </div>
    </div>
  );
};
