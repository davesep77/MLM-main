import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface RobotCardProps {
  title: string;
  range: string;
  roi: string;
  days: string;
  referral: string;
  binary: string;
  capping: string;
  capitalReturn: string;
  image: string;
}

const RobotCard: React.FC<RobotCardProps> = ({ title, range, roi, days, referral, binary, capping, capitalReturn, image }) => (
  <div className="bg-[#2d1b4e] border border-nexus-primary/30 rounded-xl overflow-hidden shadow-xl relative flex flex-col group hover:-translate-y-2 transition-transform duration-300">
    <div className="p-6 flex flex-col items-center flex-grow relative z-10">
      <div className="h-40 w-full flex items-center justify-center mb-6">
        <img src={image} alt={title} className="h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest">{title}</h3>

      <div className="w-full border border-white/20 rounded-full py-2 px-4 flex justify-between items-center mb-6 bg-white/5 backdrop-blur-sm">
        <span className="text-[10px] md:text-xs text-white uppercase font-bold tracking-wider">PACKAGE RANGE:</span>
        <span className="text-xs md:text-sm text-white font-bold">{range}</span>
      </div>

      <div className="w-full grid grid-cols-2 gap-y-4 gap-x-4 text-[11px] md:text-xs mb-8 px-2">
        <div className="flex items-center justify-between border-b border-white/10 pb-1">
          <div className="flex items-center gap-1 text-white font-bold"><CheckCircle size={12} /> ROI:</div>
          <div className="text-white">{roi}</div>
        </div>
        <div className="flex items-center justify-between border-b border-white/10 pb-1">
          <div className="flex items-center gap-1 text-white font-bold"><CheckCircle size={12} /> Days:</div>
          <div className="text-white">{days}</div>
        </div>
        <div className="flex items-center justify-between border-b border-white/10 pb-1">
          <div className="flex items-center gap-1 text-white font-bold"><CheckCircle size={12} /> Referral:</div>
          <div className="text-white">{referral}</div>
        </div>
        <div className="flex items-center justify-between border-b border-white/10 pb-1">
          <div className="flex items-center gap-1 text-white font-bold"><CheckCircle size={12} /> Binary:</div>
          <div className="text-white">{binary}</div>
        </div>
        <div className="flex items-center justify-between border-b border-white/10 pb-1">
          <div className="flex items-center gap-1 text-white font-bold"><CheckCircle size={12} /> Capping:</div>
          <div className="text-white">{capping}</div>
        </div>
        <div className="flex items-center justify-between border-b border-white/10 pb-1">
          <div className="flex items-center gap-1 text-white font-bold"><CheckCircle size={12} /> Capital Return:</div>
          <div className="text-white">{capitalReturn}</div>
        </div>
      </div>

      <button className="w-full bg-gradient-to-r from-[#3b0764] to-[#6b21a8] hover:from-[#581c87] hover:to-[#7e22ce] text-white font-bold py-3 rounded-full shadow-lg transition-all mt-auto border border-white/10 tracking-wide text-sm">
        Invest Now
      </button>
    </div>

    {/* Background glow for card */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-purple-900/30 pointer-events-none"></div>
  </div>
);

interface PackageWalletLayoutProps {
  walletName: string;
}

const PackageWalletLayout: React.FC<PackageWalletLayoutProps> = ({ walletName }) => {
  const { wallets, buyPackage } = useAppContext();
  const [selectedPkg, setSelectedPkg] = useState('TradeBot');
  const [amount, setAmount] = useState('');

  // Determine current balance based on the view
  const currentBalance = walletName.includes('Deposit') ? wallets.deposit : wallets.traydAi;

  const handlePurchase = () => {
    const cost = parseFloat(amount);
    if (isNaN(cost) || cost < 50) {
      alert("Minimum purchase amount is $50");
      return;
    }

    const success = buyPackage(selectedPkg, cost, walletName);
    if (success) {
      alert("Package Purchased Successfully!");
      setAmount('');
    } else {
      alert("Insufficient Balance!");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Package</h2>
      </div>

      {/* Main Form Section */}
      <div className="bg-[#1a0b2e] border border-nexus-primary/20 rounded-2xl overflow-hidden shadow-2xl relative">
        {/* Background texture */}
        <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/hud-futuristic-interface-screen-design_1017-26694.jpg')] bg-cover opacity-10 pointer-events-none mix-blend-screen"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative z-10">
          {/* Left Form */}
          <div className="p-8 lg:p-10 space-y-5">
            <div className="text-white font-bold mb-2">Balance : $ {currentBalance}</div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-white pl-1">Select Wallet</label>
                <input type="text" value={walletName} readOnly className="w-full bg-white text-gray-900 rounded-lg px-4 py-3 text-sm font-medium focus:outline-none" />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-white pl-1">Select Package</label>
                <select
                  value={selectedPkg}
                  onChange={(e) => setSelectedPkg(e.target.value)}
                  className="w-full bg-white text-gray-900 rounded-lg px-4 py-3 text-sm font-medium focus:outline-none appearance-none"
                >
                  <option value="Evolentra AI">Evolentra AI ($50 - $5000)</option>
                  <option value="SmartBot">SmartBot ($5001 - $35000)</option>
                  <option value="GeniusBot">GeniusBot ($35001+)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-white pl-1">Strategy *</label>
                <select className="w-full bg-white text-gray-900 rounded-lg px-4 py-3 text-sm font-medium focus:outline-none appearance-none">
                  <option>Select Strategy</option>
                  <option>Conservative</option>
                  <option>Aggressive</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-white pl-1">Enter Amount</label>
                  <input
                    type="number"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-white text-gray-900 rounded-lg px-4 py-3 text-sm font-medium focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-white pl-1">Transaction Password *</label>
                  <input type="password" placeholder="Enter Transaction Password" className="w-full bg-white text-gray-900 rounded-lg px-4 py-3 text-sm font-medium focus:outline-none" />
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handlePurchase}
                  className="bg-[#b02dad] hover:bg-[#c03eae] text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all w-32"
                >
                  Confirm
                </button>
              </div>

              <div className="text-xs text-white mt-4">Minimum Purchase should be 50$.</div>

              <div className="text-xs text-white mt-1">
                If you want to deposit more fund, <span className="text-yellow-400 cursor-pointer hover:underline">click here</span> to upgrade your wallet.
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden lg:flex items-center justify-center p-8 relative overflow-hidden">
            {/* Background glow behind wallet */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/30 rounded-full blur-3xl"></div>
            <img
              src="https://img.freepik.com/free-psd/3d-rendering-wallet-with-money_23-2149999999.jpg"
              alt="Digital Wallet"
              className="w-3/4 max-w-sm object-contain drop-shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500"
              style={{ filter: "hue-rotate(260deg) saturate(1.2) brightness(1.1)" }}
            />
          </div>
        </div>
      </div>

      {/* Bot Packages Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <RobotCard
          title="EVOLENTRA AI"
          range="$50 - $5000"
          roi="1.4% - 1.8%"
          days="140"
          referral="7%"
          binary="10%"
          capping="$1000"
          capitalReturn="50%"
          image="https://cdn3d.iconscout.com/3d/premium/thumb/robot-9642959-7896434.png?f=webp"
        />
        <RobotCard
          title="SMARTBOT"
          range="$5001 - $35,000"
          roi="1.7% - 2.3%"
          days="140"
          referral="8%"
          binary="10%"
          capping="$2000"
          capitalReturn="75%"
          image="https://cdn3d.iconscout.com/3d/premium/thumb/robot-with-touch-screen-10250645-8294218.png?f=webp"
        />
        <RobotCard
          title="GENIUSBOT"
          range="$35,001 - Unlimited"
          roi="2.2% - 3%"
          days="140"
          referral="9%"
          binary="10%"
          capping="$5000"
          capitalReturn="100%"
          image="https://cdn3d.iconscout.com/3d/premium/thumb/female-cyborg-11270258-9076046.png?f=webp"
        />
      </div>

      <div className="w-full bg-[#1a0b2e] py-4 rounded-b-xl border-t border-nexus-primary/20 mt-4">
        <div className="text-center text-white text-sm">2025 © Copyright Evolentra</div>
      </div>
    </div>
  );
};

export const PackageDepositWallet: React.FC = () => <PackageWalletLayout walletName="Deposit Wallet" />;
export const PackageTraydAiWallet: React.FC = () => <PackageWalletLayout walletName="Evolentra Wallet" />;

export const PackageHistory: React.FC = () => {
  const { purchases } = useAppContext();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Purchase Report</h2>
      </div>

      <div className="bg-[#1a0b2e] border border-nexus-primary/20 rounded-2xl overflow-hidden shadow-2xl relative min-h-[300px]">
        <div className="bg-[#2d1b4e] px-8 py-4 border-b border-nexus-primary/20">
          <h3 className="text-lg font-bold text-white">Purchase Report</h3>
        </div>

        {/* Background Overlay */}
        <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-photo/view-futuristic-robot-character_23-2151044436.jpg')] bg-cover opacity-10 pointer-events-none"></div>

        <div className="relative z-10 overflow-x-auto p-0">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#9d3a9d] text-white">
              <tr>
                <th className="px-6 py-4 font-semibold whitespace-nowrap border-r border-white/10">Sr No</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap border-r border-white/10">Package ID</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap border-r border-white/10">Start Date</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap border-r border-white/10">End Date</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap border-r border-white/10">Package Name</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap border-r border-white/10">BOT Name</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap border-r border-white/10">Amount</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap border-r border-white/10">Wallet</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-nexus-primary/10">
              {purchases.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors text-white border-b border-nexus-primary/10">
                  <td className="px-6 py-4 whitespace-nowrap border-r border-nexus-primary/10">{item.slNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap border-r border-nexus-primary/10">{item.packageId}</td>
                  <td className="px-6 py-4 whitespace-nowrap border-r border-nexus-primary/10">{item.startDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap border-r border-nexus-primary/10">{item.endDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap border-r border-nexus-primary/10">{item.packageName}</td>
                  <td className="px-6 py-4 whitespace-nowrap border-r border-nexus-primary/10">{item.botName}</td>
                  <td className="px-6 py-4 whitespace-nowrap border-r border-nexus-primary/10">{item.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap border-r border-nexus-primary/10">{item.wallet}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="bg-[#b02dad] hover:bg-[#c03eae] text-white text-xs font-bold py-1 px-4 rounded shadow transition-colors">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};