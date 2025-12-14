import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { WalletState } from '../types';

const InputGroup = ({ label, type = "text", placeholder = "", readOnly = false, value, onChange }: { label: string, type?: string, placeholder?: string, readOnly?: boolean, value?: string, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
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

const SelectGroup = ({ label, options, value, onChange }: { label: string, options: string[], value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-white block">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="w-full bg-white text-gray-900 rounded-lg px-4 py-3 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-nexus-primary transition-all shadow-sm"
    >
      {options.map((opt, idx) => <option key={idx} value={opt}>{opt}</option>)}
    </select>
  </div>
);

const PrimaryButton = ({ label, onClick }: { label: string, onClick?: () => void }) => (
  <button onClick={onClick} className="bg-[#b02dad] hover:bg-[#c03eae] text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all transform hover:-translate-y-1 w-auto min-w-[160px]">
    {label}
  </button>
);

// Helper to map UI names to State keys
const getWalletKey = (name: string): keyof WalletState => {
  if (name.includes('Bot Earning')) return 'botEarning';
  if (name.includes('Network')) return 'networkEarning';
  if (name.includes('Deposit')) return 'deposit';
  if (name.includes('Evolentra')) return 'traydAi';
  return 'deposit';
};

export const InternalTransfer: React.FC = () => {
  const { transferFunds } = useAppContext();
  const [fromWallet, setFromWallet] = useState('Bot Earning Wallet');
  const [toWallet, setToWallet] = useState('Deposit Wallet');
  const [amount, setAmount] = useState('');

  const handleTransfer = () => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) {
      alert("Invalid Amount");
      return;
    }

    const success = transferFunds(getWalletKey(fromWallet), getWalletKey(toWallet), val, false);
    if (success) {
      alert("Transfer Successful!");
      setAmount('');
    } else {
      alert("Insufficient Funds!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Internal Transfer</h2>
      </div>

      <div className="bg-[#1a0b2e] border border-nexus-primary/20 rounded-2xl p-8 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/hud-futuristic-interface-screen-design_1017-26694.jpg')] bg-cover opacity-10 pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectGroup
              label="Select Wallet"
              options={['Bot Earning Wallet', 'Network Earning Wallet']}
              value={fromWallet}
              onChange={(e) => setFromWallet(e.target.value)}
            />
            <SelectGroup
              label="Select To Wallet"
              options={['Deposit Wallet', 'Evolentra Wallet']}
              value={toWallet}
              onChange={(e) => setToWallet(e.target.value)}
            />
            <InputGroup
              label="Enter Amount"
              placeholder="Enter amount to transfer"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <InputGroup label="Transaction Password" placeholder="Enter transaction password" type="password" />
          </div>

          <div className="flex justify-end pt-4">
            <PrimaryButton label="Transfer Now" onClick={handleTransfer} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ExternalTransfer: React.FC = () => {
  const { transferFunds } = useAppContext();
  const [fromWallet, setFromWallet] = useState('Deposit Wallet');
  const [amount, setAmount] = useState('');
  const [extAddress, setExtAddress] = useState('');

  const handleTransfer = () => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) {
      alert("Invalid Amount");
      return;
    }
    if (!extAddress) {
      alert("Enter External Address");
      return;
    }

    const success = transferFunds(getWalletKey(fromWallet), 'deposit', val, true, extAddress);
    if (success) {
      alert("External Transfer Initiated!");
      setAmount('');
      setExtAddress('');
    } else {
      alert("Insufficient Funds!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">External Transfer</h2>
      </div>

      <div className="bg-[#1a0b2e] border border-nexus-primary/20 rounded-2xl p-8 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/hud-futuristic-interface-screen-design_1017-26694.jpg')] bg-cover opacity-10 pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectGroup
              label="Select Wallet"
              options={['Deposit Wallet', 'Bot Earning Wallet']}
              value={fromWallet}
              onChange={(e) => setFromWallet(e.target.value)}
            />
            <InputGroup
              label="Enter Amount"
              placeholder="Enter amount to transfer"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="md:col-span-2">
              <InputGroup
                label="External Wallet Address"
                placeholder="Enter external wallet address (TRC20)"
                value={extAddress}
                onChange={(e) => setExtAddress(e.target.value)}
              />
            </div>
            <InputGroup label="Transaction Password" placeholder="Enter transaction password" type="password" />
          </div>

          <div className="flex justify-end pt-4">
            <PrimaryButton label="Transfer Now" onClick={handleTransfer} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const TransferHistory: React.FC = () => {
  const { transfers } = useAppContext();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Evolentra Wallet History</h2>
      </div>

      <div className="bg-[#1a0b2e] border border-nexus-primary/20 rounded-2xl overflow-hidden shadow-2xl relative min-h-[400px]">
        <div className="bg-[#2d1b4e] px-8 py-4 border-b border-nexus-primary/20">
          <h3 className="text-lg font-bold text-white">Transaction History</h3>
        </div>

        <div className="relative z-10 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#9d3a9d] text-white">
              <tr>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Sr No</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Date</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Transaction ID</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Type</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Details</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Amount</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-nexus-primary/10">
              {transfers.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors text-white border-b border-nexus-primary/10">
                  <td className="px-6 py-4 whitespace-nowrap">{item.slNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-nexus-muted">{item.transactionId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${item.type === 'Internal' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.wallet}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold">${item.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${item.status === 'Success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
              {transfers.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-nexus-muted">No transactions found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};