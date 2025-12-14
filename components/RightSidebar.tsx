import React from 'react';
import { Bot, MessageSquare, Bell } from 'lucide-react';

export const RightSidebar: React.FC = () => {
  return (
    <div className="hidden xl:flex flex-col items-center w-16 bg-nexus-sidebar border-l border-nexus-primary/20 py-6 gap-6 z-20">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-nexus-secondary to-nexus-primary p-[2px]">
        <div className="w-full h-full rounded-full bg-nexus-sidebar flex items-center justify-center">
          <Bot size={20} className="text-white" />
        </div>
      </div>
      
      <div className="flex flex-col gap-4 mt-auto mb-auto">
        <button className="w-10 h-10 rounded-lg bg-nexus-card hover:bg-nexus-primary/20 flex items-center justify-center text-nexus-primary transition-colors relative group">
          <MessageSquare size={20} />
          <span className="absolute right-0 top-0 w-3 h-3 bg-red-500 rounded-full border-2 border-nexus-sidebar"></span>
        </button>
        
        <button className="w-10 h-10 rounded-lg bg-nexus-card hover:bg-nexus-primary/20 flex items-center justify-center text-nexus-primary transition-colors">
          <Bell size={20} />
        </button>
      </div>
      
      <div className="mt-auto">
         {/* Spacer */}
      </div>
    </div>
  );
};