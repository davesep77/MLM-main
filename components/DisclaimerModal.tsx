import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export const DisclaimerModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-nexus-800 border border-nexus-accent/30 rounded-lg max-w-lg w-full shadow-2xl p-6 relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="flex items-start gap-4 mb-4">
          <div className="bg-orange-500/20 p-3 rounded-full text-orange-500">
            <AlertTriangle size={32} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Educational Mock-up Only</h2>
            <p className="text-sm text-slate-300">
              Strictly Non-Commercial & Synthetic Data
            </p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-300">
          <p>
            This application is a <strong>clean-room reconstruction</strong> created solely for educational analysis of UI/UX principles.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>It is <strong>not affiliated</strong> with evolentra.com or any financial institution.</li>
            <li>All data displayed is <strong>randomly generated (synthetic)</strong> and holds no real-world value.</li>
            <li>No scraping tools or automated cloning software were used.</li>
          </ul>
          <div className="bg-nexus-900 p-3 rounded border border-nexus-700 mt-4">
            <p className="text-xs font-mono text-nexus-accent">
              STATUS: EDUCATIONAL_MODE_ACTIVE<br />
              DATA_SOURCE: MATH.RANDOM()
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(false)}
          className="w-full mt-6 bg-nexus-accent hover:bg-cyan-400 text-nexus-900 font-bold py-3 px-4 rounded transition-colors"
        >
          I Understand
        </button>
      </div>
    </div>
  );
};