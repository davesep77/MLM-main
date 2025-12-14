import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { RightSidebar } from './components/RightSidebar';

import { LoginView } from './components/LoginView';
import { GeminiAnalyst } from './components/GeminiAnalyst';
import { ProfileDetails, WalletAddress, SecurityPassword, SecurityTransaction } from './components/ProfileViews';
import { DepositView } from './components/DepositView';
import { PackageDepositWallet, PackageTraydAiWallet, PackageHistory } from './components/PackageViews';
import { TradingRoiCoupons } from './components/TradingRoiViews';
import { GenealogyView } from './components/GenealogyView';
import { FranchiseView } from './components/FranchiseView';
import { TeamDirectReferral, TeamDownlineMember } from './components/TeamViews';
import { InternalTransfer, ExternalTransfer, TransferHistory } from './components/TransferViews';
import { BotEarningWithdrawal, NetworkEarningWithdrawal, CompoundingWithdrawal, WithdrawalHistory } from './components/WithdrawalViews';
import { TradingIncome, ReferralIncome, BinaryIncome, RewardList, UplineFranchise } from './components/IncomeReportViews';
import { TradingReport } from './components/TradingSectionViews';
import { ChatbotHistoryView, ChatbotTicketView } from './components/ChatbotViews';

import { useAppContext } from './context/AppContext';
import {
  Gift,
  Headphones,
  User,
  FileText,
  DollarSign,
  Database,
  Briefcase,
  Wallet as WalletIcon,
  Package
} from 'lucide-react';

// --- Dashboard Sub-Components ---

const CareerBanner = () => (
  <div className="col-span-12 bg-nexus-card border border-nexus-primary/30 rounded-2xl p-6 relative overflow-hidden shadow-xl shadow-black/40 mb-6">
    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-pink-900/50 z-0"></div>
    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">

      {/* Left Image Placeholder */}
      <div className="h-48 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-900 flex items-center justify-center border border-white/10 shadow-lg group relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=300&auto=format&fit=crop')] bg-cover bg-center opacity-60 group-hover:scale-110 transition-transform duration-500"></div>
        <div className="relative z-10 bg-black/30 p-4 rounded-full backdrop-blur-sm">
          <Gift size={48} className="text-white drop-shadow-lg" />
        </div>
        <div className="absolute top-2 left-2 bg-nexus-primary px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg">Bronze</div>
      </div>

      {/* Middle Content */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-white text-center lg:text-left">Career Progression : <span className="text-nexus-primary">Bronze</span></h3>

        <div className="space-y-2">
          <div className="flex justify-between text-sm font-semibold text-gray-300">
            <span>Left hand side business: <span className="text-white">$0 - $3500</span></span>
          </div>
          <div className="h-3 bg-black/40 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-white w-[10%] rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm font-semibold text-gray-300">
            <span>Right hand side business: <span className="text-nexus-primary">$50 - $3500</span></span>
          </div>
          <div className="h-3 bg-black/40 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-white w-[5%] rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
          </div>
        </div>

        <div className="pt-2 text-center lg:text-left">
          <span className="text-gray-300 text-sm font-bold">Reward Amount is : </span>
          <span className="text-nexus-primary text-lg font-bold drop-shadow-md">$100.00</span>
        </div>
      </div>

      {/* Right Image Placeholder */}
      <div className="h-48 rounded-xl bg-gradient-to-bl from-fuchsia-800 to-purple-900 flex items-center justify-center border border-white/10 shadow-lg group relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300&auto=format&fit=crop')] bg-cover bg-center opacity-60 group-hover:scale-110 transition-transform duration-500"></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="bg-black/30 p-4 rounded-full backdrop-blur-sm mb-2">
            <Headphones size={48} className="text-white drop-shadow-lg" />
          </div>
          <span className="text-white font-bold text-shadow">Upcoming Reward</span>
        </div>
      </div>
    </div>
  </div>
);

const WalletCard = ({ label, value, icon, gradient }: { label: string, value: string, icon: React.ReactNode, gradient: string }) => (
  <div className={`rounded-2xl p-6 relative overflow-hidden border border-white/10 shadow-lg ${gradient}`}>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm shadow-inner">
        {icon}
      </div>
      <div>
        <div className="text-xs text-white/70 font-semibold tracking-wider uppercase mb-1">{label}</div>
        <div className="text-2xl font-bold text-white drop-shadow-md">{value}</div>
      </div>
    </div>
  </div>
);

const StartBotForm = () => {
  const { wallets } = useAppContext();
  return (
    <div className="bg-nexus-card border border-nexus-primary/20 rounded-2xl p-6 shadow-xl relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <Briefcase size={120} />
      </div>
      <h3 className="text-xl font-bold text-white mb-6">Start Bot</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs text-white font-semibold">Package*</label>
          <select className="w-full bg-white text-gray-900 rounded-md p-3 text-sm font-medium focus:outline-none">
            <option>Select package</option>
            <option>Starter</option>
            <option>Pro</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs text-white font-semibold">Strategy *</label>
          <select className="w-full bg-white text-gray-900 rounded-md p-3 text-sm font-medium focus:outline-none">
            <option>Select Strategy</option>
            <option>Conservative</option>
            <option>Aggressive</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs text-white font-semibold">Amount *</label>
          <input type="text" className="w-full bg-white text-gray-900 rounded-md p-3 text-sm font-medium focus:outline-none" placeholder="" />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-white font-semibold">Payment Method *</label>
          <select className="w-full bg-white text-gray-900 rounded-md p-3 text-sm font-medium focus:outline-none">
            <option>Choose Wallet</option>
            <option>Deposit Wallet</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs text-white font-semibold">Deposit Wallet Balance ($)</label>
          <input type="text" className="w-full bg-white text-gray-900 rounded-md p-3 text-sm font-medium focus:outline-none" value={wallets.deposit} readOnly />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-white font-semibold">Transaction Password *</label>
          <input type="password" className="w-full bg-white text-gray-900 rounded-md p-3 text-sm font-medium focus:outline-none" />
        </div>
      </div>
      <div className="mt-8 flex gap-4">
        <button className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold py-3 px-8 rounded-md shadow-lg transition-colors text-sm">
          Cancel
        </button>
        <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-md shadow-lg transition-colors text-sm">
          Start Bot
        </button>
      </div>
    </div>
  );
};

const TransactionTable = () => {
  const { transactions } = useAppContext();

  return (
    <div className="col-span-12 bg-nexus-card border border-nexus-primary/20 rounded-2xl overflow-hidden mt-8">
      <div className="p-6 border-b border-nexus-primary/10">
        <h3 className="text-lg font-bold text-white">Recent Transactions</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#9d3a9d] text-white">
            <tr>
              <th className="px-6 py-4 font-semibold">SL No.</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Wallet</th>
              <th className="px-6 py-4 font-semibold">Income Type</th>
              <th className="px-6 py-4 font-semibold">Amount($)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-nexus-primary/10">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-white/5 transition-colors text-gray-200">
                <td className="px-6 py-4">{tx.slNo}</td>
                <td className="px-6 py-4">{tx.date}</td>
                <td className="px-6 py-4">{tx.wallet}</td>
                <td className="px-6 py-4">{tx.incomeType}</td>
                <td className="px-6 py-4 font-medium text-white">{tx.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

import { teamService } from './services/teamService';
import { Rank } from './types';

// ... (previous imports)

const CareerRanksGrid = () => {
  const [ranks, setRanks] = useState<Rank[]>([]);

  React.useEffect(() => {
    teamService.getRanks().then(res => setRanks(res.data));
  }, []);

  return (
    <div className="col-span-12 mt-8">
      <h3 className="text-lg font-bold text-white mb-4 pl-1">Career Progression</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {ranks.map((rank) => (
          <div key={rank.id} className="bg-nexus-card border border-nexus-primary/20 rounded-xl overflow-hidden relative group">
            <div className="absolute top-4 left-4 z-10 bg-nexus-secondary px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg">
              {rank.name}
            </div>
            <div className="h-40 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-nexus-card to-transparent z-10"></div>
              <img
                src={rank.image}
                alt={rank.name}
                className="w-full h-full object-cover opacity-70 group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-nexus-primary/50 rounded-xl transition-colors pointer-events-none"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main App ---

function App() {
  const { isLoggedIn, logout, wallets, isLoading } = useAppContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  const getHeaderTitle = () => {
    switch (currentView) {
      case 'dashboard': return 'Dashboard';
      case 'deposit': return 'Cash Deposit';
      case 'deposit-wallet': return 'Deposit Wallet';
      case 'profile': return 'Profile';
      case 'profile-details': return 'Account Setting';
      case 'profile-wallet': return 'Wallet Address';
      case 'profile-password': return 'Security';
      case 'profile-transaction': return 'Security';
      case 'package-deposit': return 'Deposit Wallet';
      case 'package-traydai': return 'Evolentra Wallet';
      case 'package-history': return 'Purchase Report';
      case 'roi': return 'Coupons';
      case 'genealogy': return 'Genealogy';
      case 'franchise': return 'Franchise';
      case 'team-direct': return 'Direct Referral';
      case 'team-downline': return 'Downline Member';
      case 'transfer-internal': return 'Internal Transfer';
      case 'transfer-external': return 'External Transfer';
      case 'transfer-history': return 'Evolentra Wallet History';
      case 'withdrawal-bot': return 'Bot Earning Wallet';
      case 'withdrawal-network': return 'Network Earning Wallet';
      case 'withdrawal-compound': return 'Compounding Wallet';
      case 'withdrawal-history': return 'Withdrawal History';
      case 'income-trading': return 'Trading Income';
      case 'income-referral': return 'Referral Income';
      case 'income-binary': return 'Binary Income';
      case 'income-reward': return 'Reward List';
      case 'income-upline': return 'Upline Franchise';
      case 'trading': return 'Trading Report';
      case 'chatbot': return 'Chatbot';
      case 'chatbot-main': return 'Chatbot';
      case 'chatbot-view': return 'View Chatbot';
      default: return 'Dashboard';
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'chatbot':
      case 'chatbot-main':
        return <ChatbotTicketView />;
      case 'chatbot-view':
        return <ChatbotHistoryView />;
      case 'profile':
      case 'profile-details':
        return <ProfileDetails />;
      case 'profile-wallet':
        return <WalletAddress />;
      case 'profile-password':
        return <SecurityPassword />;
      case 'profile-transaction':
        return <SecurityTransaction />;
      case 'deposit':
      case 'deposit-wallet':
        return <DepositView />;
      case 'package-deposit':
        return <PackageDepositWallet />;
      case 'package-traydai':
        return <PackageTraydAiWallet />;
      case 'package-history':
        return <PackageHistory />;
      case 'roi':
        return <TradingRoiCoupons />;
      case 'genealogy':
        return <GenealogyView />;
      case 'franchise':
        return <FranchiseView />;
      case 'team-direct':
        return <TeamDirectReferral />;
      case 'team-downline':
        return <TeamDownlineMember />;
      case 'transfer-internal':
        return <InternalTransfer />;
      case 'transfer-external':
        return <ExternalTransfer />;
      case 'transfer-history':
        return <TransferHistory />;
      case 'withdrawal-bot':
        return <BotEarningWithdrawal />;
      case 'withdrawal-network':
        return <NetworkEarningWithdrawal />;
      case 'withdrawal-compound':
        return <CompoundingWithdrawal />;
      case 'withdrawal-history':
        return <WithdrawalHistory />;
      case 'income-trading':
        return <TradingIncome />;
      case 'income-referral':
        return <ReferralIncome />;
      case 'income-binary':
        return <BinaryIncome />;
      case 'income-reward':
        return <RewardList />;
      case 'income-upline':
        return <UplineFranchise />;
      case 'trading':
        return <TradingReport />;
      case 'dashboard':
      default:
        return (
          <div className="pb-20">
            <CareerBanner />

            {/* Wallets Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              <WalletCard
                label="Deposit Wallet"
                value={`$${wallets.deposit}`}
                icon={<User className="text-white" />}
                gradient="bg-gradient-to-br from-[#4a1c40] to-[#2e1065]"
              />
              <WalletCard
                label="Bot Earning Wallet"
                value={`$${wallets.botEarning}`}
                icon={<FileText className="text-yellow-400" />}
                gradient="bg-gradient-to-br from-[#4a1c40] to-[#2e1065]"
              />
              <WalletCard
                label="Network Earning Wallet"
                value={`$${wallets.networkEarning}`}
                icon={<DollarSign className="text-pink-400" />}
                gradient="bg-gradient-to-br from-[#4a1c40] to-[#2e1065]"
              />
              <WalletCard
                label="Evolentra"
                value={`$${wallets.traydAi}`}
                icon={<Database className="text-cyan-400" />}
                gradient="bg-gradient-to-br from-[#4a1c40] to-[#2e1065]"
              />
            </div>

            {/* Compound & Bot Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
              {/* Left Column: Compound Wallet + Teams */}
              <div className="space-y-6">
                {/* Compound Wallet */}
                <div className="bg-gradient-to-r from-[#4a1c40] to-[#2e1065] rounded-2xl p-6 flex items-center justify-between border border-white/10 shadow-lg h-[100px]">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                      <WalletIcon size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Compound Wallet</h3>
                  </div>
                  <div className="text-2xl font-bold text-white">${wallets.compounding}</div>
                </div>

                {/* Team Stats Grid */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-nexus-card border border-nexus-primary/20 rounded-2xl p-6 h-32 flex flex-col justify-center">
                    <h4 className="text-gray-200 text-sm font-bold mb-2">Left Team</h4>
                    <div className="text-3xl font-bold text-white">52</div>
                  </div>
                  <div className="bg-nexus-card border border-nexus-primary/20 rounded-2xl p-6 h-32 flex flex-col justify-center">
                    <h4 className="text-gray-200 text-sm font-bold mb-2">Left Business</h4>
                    <div className="text-3xl font-bold text-white">$0</div>
                  </div>
                  <div className="bg-nexus-card border border-nexus-primary/20 rounded-2xl p-6 h-32 flex flex-col justify-center">
                    <h4 className="text-gray-200 text-sm font-bold mb-2">Right Team</h4>
                    <div className="text-3xl font-bold text-white">57</div>
                  </div>
                  <div className="bg-nexus-card border border-nexus-primary/20 rounded-2xl p-6 h-32 flex flex-col justify-center relative overflow-hidden">
                    <h4 className="text-gray-200 text-sm font-bold mb-2">Right Business</h4>
                    <div className="text-3xl font-bold text-white">$50</div>
                    {/* Decorative circle from screenshot */}
                    <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"></div>
                  </div>
                </div>

                {/* Notification Bar from screenshot 2 */}
                <div className="bg-[#2d1b4e] border border-nexus-primary/30 rounded-lg p-3 flex items-center justify-between">
                  <div className="text-yellow-400">
                    <BellIcon size={20} />
                  </div>
                  <span className="text-white text-sm"></span>
                  <span className="text-white font-mono">١</span>
                </div>
              </div>

              {/* Right Column: Start Bot Form */}
              <div>
                <StartBotForm />
              </div>
            </div>

            {/* Career Ranks Grid */}
            <CareerRanksGrid />

            {/* Transactions Table */}
            <TransactionTable />
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-[#0f0518] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <LoginView onLogin={() => {}} />;
  }

  return (
    <div className="flex h-screen bg-nexus-bg text-slate-200 font-sans">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentView={currentView}
        onChangeView={setCurrentView}
        onLogout={logout}
      />

      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <Header
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          title={getHeaderTitle()}
        />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6 scrollbar-thin scrollbar-thumb-nexus-primary/20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
          <div className="max-w-[1600px] mx-auto">


            {renderContent()}

            <footer className="text-center text-xs text-nexus-muted py-6 border-t border-nexus-primary/10 mt-8">
              <p>© 2025 Evolentra. All rights reserved.</p>
            </footer>
          </div>
        </main>
      </div>

      <RightSidebar />
    </div>
  );
}

// Missing Icon Component shim
const BellIcon = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
)

export default App;