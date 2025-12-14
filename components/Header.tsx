import React from 'react';
import { Menu, Grid, Clock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface HeaderProps {
  toggleSidebar: () => void;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar, title = "Dashboard" }) => {
  const { user } = useAppContext();
  const currentDate = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  return (
    <header className="h-20 bg-gradient-to-r from-nexus-sidebar via-nexus-card to-nexus-sidebar border-b border-nexus-primary/20 flex items-center justify-between px-6 sticky top-0 z-20 shadow-lg shadow-black/20">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-white hover:text-nexus-primary transition-colors"
        >
          <Menu size={24} />
        </button>

        {/* Dynamic Title & Icon */}
        <div className="flex items-center gap-3">
          <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
            <Grid className="text-white" size={20} />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-wide">{title}</h2>
        </div>
      </div>

      {/* Center/Right Greeting */}
      <div className="hidden md:flex flex-1 justify-center">
        <div className="bg-black/20 px-6 py-2 rounded-full border border-white/5 backdrop-blur-md">
          <span className="text-nexus-muted font-light mr-2">Hello</span>
          <span className="text-white font-bold">"{user?.name || 'Guest'}"</span>
        </div>
      </div>

      {/* Date Widget */}
      <div className="hidden sm:flex items-center gap-4">
        <div className="flex items-center gap-2 bg-white text-nexus-sidebar px-4 py-2 rounded-lg font-mono text-sm font-bold shadow-lg shadow-white/10">
          <Clock size={16} className="text-nexus-secondary" />
          <span>{currentDate}</span>
        </div>
      </div>
    </header>
  );
};