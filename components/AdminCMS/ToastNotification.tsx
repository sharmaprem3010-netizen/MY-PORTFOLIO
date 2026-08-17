import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const ToastNotification: React.FC = () => {
  const { notification } = usePortfolio();

  if (!notification) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-cyan-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
  };

  const borders = {
    success: 'border-emerald-500/40 bg-[#0B1713]/95 shadow-emerald-950/40',
    info: 'border-cyan-500/40 bg-[#0B1524]/95 shadow-cyan-950/40',
    error: 'border-rose-500/40 bg-[#1D0B10]/95 shadow-rose-950/40',
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 max-w-md pointer-events-auto"
      >
        <div
          className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border backdrop-blur-md shadow-2xl text-slate-100 text-xs sm:text-sm font-medium ${
            borders[notification.type]
          }`}
        >
          {icons[notification.type]}
          <span className="flex-1">{notification.message}</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
