import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const CHATBOT_HISTORY_DATA = [
  { id: 1, slNo: 1, date: '10/12/2025 14:30:22', query: 'Analyze market trend for TRX/USDT', response: 'Bullish Trend ↗ detected with 85% confidence.', status: 'Completed' },
  { id: 2, slNo: 2, date: '10/12/2025 10:15:05', query: 'What is the current resistance level?', response: 'Resistance at 0.2450 based on recent high.', status: 'Completed' },
  { id: 3, slNo: 3, date: '09/12/2025 18:45:30', query: 'Predict next 24h movement', response: 'Consolidation expected between 0.23 and 0.24.', status: 'Completed' },
  { id: 4, slNo: 4, date: '08/12/2025 09:20:11', query: 'Summary of trading volume', response: 'Volume spike observed (+12% vs avg).', status: 'Completed' },
];

const Th = ({ children }: { children?: React.ReactNode }) => (
  <th className="px-6 py-4 font-semibold whitespace-nowrap text-left text-sm">{children}</th>
);

const Td = ({ children, className = "", ...props }: { children?: React.ReactNode, className?: string } & React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className={`px-6 py-4 text-sm ${className}`} {...props}>{children}</td>
);

export const ChatbotHistoryView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Chatbot Interaction History</h2>
      </div>

      <div className="bg-[#1a0b2e] border border-nexus-primary/20 rounded-2xl overflow-hidden shadow-2xl relative min-h-[400px]">
         {/* Decorative Background */}
         <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/hud-futuristic-interface-screen-design_1017-26694.jpg')] bg-cover opacity-10 pointer-events-none"></div>

         <div className="relative z-10 overflow-x-auto">
           <table className="w-full text-left text-white border-collapse">
             <thead className="bg-[#9d3a9d]">
               <tr>
                 <Th>Sr No</Th>
                 <Th>Date</Th>
                 <Th>Query</Th>
                 <Th>Response Summary</Th>
                 <Th>Status</Th>
               </tr>
             </thead>
             <tbody className="divide-y divide-nexus-primary/10">
               {CHATBOT_HISTORY_DATA.map((item) => (
                 <tr key={item.id} className="hover:bg-white/5 transition-colors border-b border-nexus-primary/10">
                   <Td>{item.slNo}</Td>
                   <Td className="whitespace-nowrap">{item.date}</Td>
                   <Td className="max-w-xs truncate" title={item.query}>{item.query}</Td>
                   <Td className="max-w-xs truncate" title={item.response}>{item.response}</Td>
                   <Td>
                      <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-bold uppercase">
                        {item.status}
                      </span>
                   </Td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
      </div>
    </div>
  );
};

export const ChatbotTicketView: React.FC = () => {
  const { createTicket, tickets } = useAppContext();
  const [subject, setSubject] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = () => {
    if (subject && desc) {
      createTicket(subject, desc);
      setSubject('');
      setDesc('');
      alert('Ticket Created Successfully');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">ChatBot</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ticket Form */}
        <div className="bg-[#1a0b2e] border border-nexus-primary/20 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden flex flex-col">
           <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/hud-futuristic-interface-screen-design_1017-26694.jpg')] bg-cover opacity-20 pointer-events-none mix-blend-screen"></div>
           <div className="absolute inset-0 bg-gradient-to-br from-[#2d1b4e]/90 to-[#0f0518]/95 pointer-events-none"></div>

           <div className="relative z-10 w-full h-full flex-grow flex flex-col">
              <div className="border border-white/20 rounded-xl p-6 md:p-8 backdrop-blur-sm bg-white/5 flex-grow flex flex-col">
                  <div className="border-b border-white/20 pb-4 mb-6">
                      <h3 className="text-lg font-medium text-white">Create Ticket</h3>
                  </div>
                  
                  <div className="space-y-6 flex-grow flex flex-col">
                      <div>
                        <input 
                          type="text" 
                          placeholder="Enter Subject" 
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full bg-white text-gray-800 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 font-medium"
                        />
                      </div>
                      
                      <div className="flex-grow flex flex-col">
                        <textarea 
                          placeholder="Enter Description" 
                          value={desc}
                          onChange={(e) => setDesc(e.target.value)}
                          className="w-full bg-white text-gray-800 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 flex-grow min-h-[150px] resize-none font-medium"
                        ></textarea>
                      </div>
                      
                      <div className="flex justify-end pt-4">
                          <button 
                            onClick={handleSubmit}
                            className="bg-[#b02dad] hover:bg-[#c03eae] text-white font-bold py-3 px-8 rounded-md shadow-lg transition-transform transform hover:-translate-y-0.5"
                          >
                              Create Ticket
                          </button>
                      </div>
                  </div>
              </div>
           </div>
        </div>

        {/* Recent Tickets List */}
        <div className="bg-[#1a0b2e] border border-nexus-primary/20 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <h3 className="text-lg font-bold text-white mb-4">Your Tickets</h3>
            <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {tickets.length === 0 && <p className="text-nexus-muted">No tickets created yet.</p>}
                {tickets.map(ticket => (
                    <div key={ticket.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="text-white font-bold">{ticket.subject}</h4>
                            <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded">{ticket.status}</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-2">{ticket.description}</p>
                        <div className="text-xs text-gray-500 text-right">{ticket.date}</div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};