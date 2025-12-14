import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export const DepositView: React.FC = () => {
  const { deposits, depositFunds } = useAppContext();
  const [amount, setAmount] = useState('');

  const handleDeposit = async () => {
    const val = parseFloat(amount);
    if (!isNaN(val) && val > 0) {
      const success = await depositFunds(val);
      if (success) {
        setAmount('');
        alert('Deposit Request Submitted Successfully!');
      } else {
        alert('Failed to submit deposit request. Please try again.');
      }
    } else {
      alert('Please enter a valid amount greater than 0');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Cash Deposit</h2>
      </div>

      {/* Deposit Form Card */}
      <div className="bg-[#1a0b2e] border border-nexus-primary/20 rounded-2xl p-8 shadow-xl relative overflow-hidden bg-[url('https://img.freepik.com/free-vector/hud-futuristic-interface-screen-design_1017-26694.jpg')] bg-cover">
         <div className="absolute inset-0 bg-[#2d1b4e]/90 z-0"></div>
         
         <div className="relative z-10 max-w-4xl">
             <div className="grid grid-cols-1 gap-6">
                 <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                     <label className="md:col-span-2 text-sm font-medium text-white">Enter Amount</label>
                     <div className="md:col-span-10">
                         <input 
                           type="number" 
                           placeholder="Enter Amount"
                           value={amount}
                           onChange={(e) => setAmount(e.target.value)}
                           className="w-full bg-white text-gray-900 rounded-lg px-4 py-3 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-nexus-primary"
                         />
                     </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                     <label className="md:col-span-2 text-sm font-medium text-white">Select Coin</label>
                     <div className="md:col-span-10">
                         <input 
                            type="text"
                            value="Tether USDT(TRC20)"
                            readOnly
                            className="w-full bg-white text-gray-500 rounded-lg px-4 py-3 font-medium text-sm focus:outline-none"
                         />
                     </div>
                 </div>

                 <div className="flex justify-end mt-4">
                    <button 
                      onClick={handleDeposit}
                      className="bg-[#b02dad] hover:bg-[#c03eae] text-white font-bold py-2 px-8 rounded-lg shadow-lg transition-all w-32"
                    >
                        Pay
                    </button>
                 </div>
             </div>
         </div>
      </div>

      {/* Deposit History Table */}
      <div className="bg-[#1a0b2e] border border-nexus-primary/20 rounded-2xl overflow-hidden shadow-2xl relative min-h-[300px]">
        {/* Background Overlay to match screenshot feel */}
        <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-photo/view-futuristic-robot-character_23-2151044436.jpg')] bg-cover opacity-10 pointer-events-none"></div>

        <div className="relative z-10 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#9d3a9d] text-white">
              <tr>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">SL. No.</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Applied Date</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">USD</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Coin Type</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Coin Value</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Approve Date</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-nexus-primary/10">
              {deposits.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                    No deposits yet. Make your first deposit above!
                  </td>
                </tr>
              ) : (
                deposits.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors text-white">
                    <td className="px-6 py-4 whitespace-nowrap">{item.slNo}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.appliedDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${item.usd}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.coinType}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.coinValue}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.approveDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className={`
                          py-1.5 px-6 rounded text-white font-medium text-xs
                          ${item.status === 'Approve' ? 'bg-teal-500 hover:bg-teal-600' : 'bg-red-500 hover:bg-red-600'}
                        `}
                      >
                        {item.status}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};