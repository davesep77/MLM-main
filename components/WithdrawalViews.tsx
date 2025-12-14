import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { WalletState } from '../types';

const InputGroup = ({ label, type = "text", placeholder = "", readOnly = false, value = "", onChange }: { label: string, type?: string, placeholder?: string, readOnly?: boolean, value?: string, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-white block">{label}</label>
    <input 
      type={type}
      className="w-full bg-white text-gray-900 rounded-lg px-4 py-3 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-nexus-primary transition-all shadow-sm"
      placeholder={placeholder}
      readOnly={readOnly}
      value={value}
      onChange={onChange}
    />
  </div>
);

const PrimaryButton = ({ label, onClick }: { label: string, onClick?: () => void }) => (
  <button onClick={onClick} className="bg-[#b02dad] hover:bg-[#c03eae] text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all transform hover:-translate-y-1 w-auto min-w-[160px]">
    {label}
  </button>
);

// Helper to map wallet name to State keys
const getWalletKey = (name: string): keyof WalletState => {
  if (name.includes('Bot Earning')) return 'botEarning';
  if (name.includes('Network')) return 'networkEarning';
  if (name.includes('Deposit')) return 'deposit';
  if (name.includes('Compounding')) return 'compounding';
  return 'deposit';
};

interface WithdrawalFormProps {
  walletName: string;
}

const WithdrawalForm: React.FC<WithdrawalFormProps> = ({ walletName }) => {
  const { wallets, user, withdrawFunds } = useAppContext();
  const walletKey = getWalletKey(walletName);
  const availableBalance = wallets[walletKey];
  const [amount, setAmount] = useState('');

  const handleWithdrawal = () => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) {
      alert("Invalid Amount");
      return;
    }
    
    const success = withdrawFunds(walletKey, val);
    if (success) {
      alert("Withdrawal Request Submitted!");
      setAmount('');
    } else {
      alert("Insufficient Balance!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">{walletName}</h2>
      </div>

      <div className="bg-[#1a0b2e] border border-nexus-primary/20 rounded-2xl p-8 shadow-xl relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/hud-futuristic-interface-screen-design_1017-26694.jpg')] bg-cover opacity-10 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup label="Available Balance" value={`$ ${availableBalance.toFixed(4)}`} readOnly />
              <InputGroup 
                label="Enter Amount" 
                placeholder="Enter amount to withdraw" 
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              
              <div className="space-y-2">
                  <label className="text-sm font-medium text-white block">Select Coin</label>
                  <input 
                    type="text" 
                    className="w-full bg-white text-gray-900 rounded-lg px-4 py-3 font-medium text-sm focus:outline-none shadow-sm"
                    defaultValue="USDT TRC-20"
                    readOnly
                  />
              </div>

              <div className="space-y-2">
                  <label className="text-sm font-medium text-white block">Wallet Address</label>
                   <input 
                    type="text" 
                    className="w-full bg-white text-gray-500 rounded-lg px-4 py-3 font-medium text-sm focus:outline-none shadow-sm cursor-not-allowed"
                    defaultValue={user.walletAddress}
                    readOnly
                  />
                  <span className="text-[10px] text-yellow-400 italic">Address loaded from profile</span>
              </div>

              <div className="md:col-span-2">
                 <InputGroup label="Transaction Password" placeholder="Enter transaction password" type="password" />
              </div>
           </div>
           
           <div className="flex justify-end pt-4">
              <PrimaryButton label="Withdraw Now" onClick={handleWithdrawal} />
           </div>
           
           <div className="text-center text-xs text-nexus-muted mt-4">
              Note: A withdrawal fee will be applied to the transaction.
           </div>
        </div>
      </div>
    </div>
  );
};

export const BotEarningWithdrawal: React.FC = () => <WithdrawalForm walletName="Bot Earning Wallet" />;
export const NetworkEarningWithdrawal: React.FC = () => <WithdrawalForm walletName="Network Earning Wallet" />;
export const CompoundingWithdrawal: React.FC = () => <WithdrawalForm walletName="Compounding Wallet" />;

export const WithdrawalHistory: React.FC = () => {
  const { withdrawals } = useAppContext();
  
  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Withdrawal History</h2>
      </div>

      <div className="bg-[#1a0b2e] border border-nexus-primary/20 rounded-2xl overflow-hidden shadow-2xl relative min-h-[400px]">
         <div className="bg-[#2d1b4e] px-8 py-4 border-b border-nexus-primary/20">
            <h3 className="text-lg font-bold text-white">History Log</h3>
         </div>

         <div className="relative z-10 overflow-x-auto">
           <table className="w-full text-sm text-left">
             <thead className="bg-[#9d3a9d] text-white">
               <tr>
                 <th className="px-6 py-4 font-semibold whitespace-nowrap">Sr No</th>
                 <th className="px-6 py-4 font-semibold whitespace-nowrap">Date</th>
                 <th className="px-6 py-4 font-semibold whitespace-nowrap">Wallet</th>
                 <th className="px-6 py-4 font-semibold whitespace-nowrap">Transaction ID</th>
                 <th className="px-6 py-4 font-semibold whitespace-nowrap">Amount</th>
                 <th className="px-6 py-4 font-semibold whitespace-nowrap">Admin Charge</th>
                 <th className="px-6 py-4 font-semibold whitespace-nowrap">Net Amount</th>
                 <th className="px-6 py-4 font-semibold whitespace-nowrap">Status</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-nexus-primary/10">
               {withdrawals.map((item) => (
                 <tr key={item.id} className="hover:bg-white/5 transition-colors text-white border-b border-nexus-primary/10">
                   <td className="px-6 py-4 whitespace-nowrap">{item.slNo}</td>
                   <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                   <td className="px-6 py-4 whitespace-nowrap">{item.wallet}</td>
                   <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-nexus-muted">{item.transactionId}</td>
                   <td className="px-6 py-4 whitespace-nowrap font-bold">${item.amount}</td>
                   <td className="px-6 py-4 whitespace-nowrap text-red-300">${item.adminCharge.toFixed(2)}</td>
                   <td className="px-6 py-4 whitespace-nowrap text-green-300 font-bold">${item.netAmount.toFixed(2)}</td>
                   <td className="px-6 py-4 whitespace-nowrap">
                     <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${item.status === 'Approved' ? 'bg-green-500/20 text-green-400' : item.status === 'Rejected' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                       {item.status}
                     </span>
                   </td>
                 </tr>
               ))}
               {withdrawals.length === 0 && (
                 <tr>
                   <td colSpan={8} className="text-center py-8 text-nexus-muted">No withdrawal history found</td>
                 </tr>
               )}
             </tbody>
           </table>
         </div>
      </div>
    </div>
  );
};