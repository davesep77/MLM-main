import React from 'react';
import { Gift } from 'lucide-react';

const StatCard = ({ title, value }: { title: string, value: string }) => (
  <div className="bg-[#4a1c40] border border-nexus-primary/30 rounded-xl p-6 flex flex-col justify-center h-32 relative overflow-hidden shadow-lg group hover:-translate-y-1 transition-transform duration-300">
     {/* Gradient overlay */}
     <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-transparent pointer-events-none"></div>
     <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Gift size={64} />
     </div>
     <div className="relative z-10">
        <h3 className="text-[10px] md:text-xs font-bold text-white uppercase tracking-wider mb-2 opacity-80">{title}</h3>
        <div className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">{value}</div>
     </div>
  </div>
);

export const TradingRoiCoupons: React.FC = () => {
  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Coupons</h2>
      </div>

      <div className="bg-[#1a0b2e] border border-nexus-primary/20 rounded-2xl p-8 relative overflow-hidden shadow-2xl min-h-[600px]">
         {/* Background decoration matching screenshot */}
         <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/hud-futuristic-interface-screen-design_1017-26694.jpg')] bg-cover opacity-10 pointer-events-none mix-blend-screen"></div>
         <div className="absolute -left-20 top-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>

         <div className="relative z-10 space-y-8">
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-6 gap-4">
               <h3 className="text-lg font-bold text-white">Coupons</h3>
               <div className="flex gap-4">
                  <button className="bg-[#b02dad] hover:bg-[#c03eae] text-white text-sm font-bold py-2 px-6 rounded shadow-lg transition-colors transform hover:scale-105 active:scale-95">
                     Scratch All
                  </button>
                  <button className="bg-[#b02dad] hover:bg-[#c03eae] text-white text-sm font-bold py-2 px-6 rounded shadow-lg transition-colors transform hover:scale-105 active:scale-95">
                     View Report
                  </button>
               </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
               <StatCard title="TOTAL SCRATCH CARD" value="83" />
               <StatCard title="SCRATCH CARD" value="83" />
               <StatCard title="UNSCRATCH CARD" value="0" />
               <StatCard title="TOTAL INCOME" value="$123.0525" />
            </div>

            {/* Date */}
            <div className="text-white font-bold text-sm">
               Date : Wed Dec 10 2025
            </div>

            {/* Scratch Card Result Visualization */}
            <div className="flex justify-center mt-12 mb-8">
               <div className="relative w-72 h-64 animate-in fade-in zoom-in duration-500">
                   {/* Card Container */}
                   <div className="absolute inset-0 bg-gradient-to-b from-purple-600 to-indigo-900 rounded-xl shadow-[0_0_30px_rgba(168,85,247,0.4)] p-1 flex flex-col items-center justify-center text-center overflow-hidden border border-white/20">
                       {/* Confetti/Sparkles Decoration */}
                       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
                       <div className="absolute -top-10 -left-10 w-20 h-20 bg-yellow-400/30 blur-xl rounded-full"></div>
                       <div className="absolute top-10 right-10 w-4 h-4 bg-white/40 rotate-45"></div>
                       <div className="absolute bottom-4 left-4 w-2 h-2 bg-pink-500 rounded-full"></div>
                       
                       <div className="relative z-10 w-full h-full rounded-lg flex flex-col items-center justify-center p-6 bg-white/5 backdrop-blur-sm">
                           {/* Gift Icon */}
                           <div className="mb-3 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.6)] transform hover:scale-110 transition-transform cursor-pointer">
                              <Gift size={56} strokeWidth={1.5} />
                           </div>
                           
                           <h4 className="text-white font-serif italic text-2xl font-bold mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">Congratulations</h4>
                           
                           <div className="bg-white rounded-lg py-3 px-4 w-full shadow-inner transform rotate-1 hover:rotate-0 transition-transform duration-300">
                              <div className="text-purple-700 font-bold text-lg mb-1 flex items-center justify-center gap-2">
                                 <span className="text-xl">🎉</span> Get $1.4700
                              </div>
                              <div className="text-gray-600 text-[10px] font-bold">Package : $105</div>
                              <div className="text-gray-500 text-[9px] font-mono mt-0.5">Package ID : TT0001160983</div>
                           </div>
                       </div>
                   </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};