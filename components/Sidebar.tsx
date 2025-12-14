import React, { useState } from 'react';
import {
  LayoutDashboard,
  Wallet,
  Package,
  TrendingUp,
  Users,
  Briefcase,
  UserPlus,
  ArrowLeftRight,
  LogOut,
  Bot,
  FileText,
  User,
  ChevronDown,
  ChevronRight,
  Shield,
  CreditCard,
  Settings,
  Gift
} from 'lucide-react';
import { NavItem } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: string;
  onChangeView: (id: string) => void;
  onLogout: () => Promise<void>;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', icon: <LayoutDashboard size={18} />, id: 'dashboard' },
  { label: 'Deposit Wallet', icon: <Wallet size={18} />, id: 'deposit-wallet' },
  {
    label: 'Profile',
    icon: <User size={18} />,
    id: 'profile',
    subItems: [
      { label: 'Profile Details', icon: <Settings size={14} />, id: 'profile-details' },
      { label: 'Wallet Address', icon: <Wallet size={14} />, id: 'profile-wallet' },
      { label: 'Security Password', icon: <Shield size={14} />, id: 'profile-password' },
      { label: 'Security Transaction', icon: <CreditCard size={14} />, id: 'profile-transaction' },
    ]
  },
  { label: 'Deposit', icon: <Wallet size={18} />, id: 'deposit' },
  {
    label: 'Package',
    icon: <Package size={18} />,
    id: 'package',
    subItems: [
      { label: 'Deposit Wallet', icon: <Wallet size={14} />, id: 'package-deposit' },
      { label: 'Evolentra Wallet', icon: <Wallet size={14} />, id: 'package-traydai' },
      { label: 'Investment History', icon: <FileText size={14} />, id: 'package-history' },
    ]
  },
  { label: 'Trading ROI', icon: <TrendingUp size={18} />, id: 'roi' },
  { label: 'Genealogy', icon: <Users size={18} />, id: 'genealogy' },
  { label: 'Franchise', icon: <Briefcase size={18} />, id: 'franchise' },
  {
    label: 'Team',
    icon: <UserPlus size={18} />,
    id: 'team',
    subItems: [
      { label: 'Direct referral', icon: <User size={14} />, id: 'team-direct' },
      { label: 'Downline member', icon: <Users size={14} />, id: 'team-downline' },
    ]
  },
  {
    label: 'Transfer',
    icon: <ArrowLeftRight size={18} />,
    id: 'transfer',
    subItems: [
      { label: 'Internal Transfer', icon: <ArrowLeftRight size={14} />, id: 'transfer-internal' },
      { label: 'External Transfer', icon: <ArrowLeftRight size={14} />, id: 'transfer-external' },
      { label: 'Evolentra Wallet History', icon: <FileText size={14} />, id: 'transfer-history' },
    ]
  },
  {
    label: 'Withdrawal',
    icon: <LogOut size={18} className="rotate-180" />,
    id: 'withdrawal',
    subItems: [
      { label: 'Bot Earning Wallet', icon: <Wallet size={14} />, id: 'withdrawal-bot' },
      { label: 'Network Earning Wallet', icon: <Wallet size={14} />, id: 'withdrawal-network' },
      { label: 'Compounding Wallet', icon: <Wallet size={14} />, id: 'withdrawal-compound' },
      { label: 'Withdrawal History', icon: <FileText size={14} />, id: 'withdrawal-history' },
    ]
  },
  {
    label: 'Income Report',
    icon: <FileText size={18} />,
    id: 'income',
    subItems: [
      { label: 'Trading Income', icon: <TrendingUp size={14} />, id: 'income-trading' },
      { label: 'Referral Income', icon: <UserPlus size={14} />, id: 'income-referral' },
      { label: 'Binary Income', icon: <Users size={14} />, id: 'income-binary' },
      { label: 'Reward List', icon: <Gift size={14} />, id: 'income-reward' },
      { label: 'Upline Franchise', icon: <Briefcase size={14} />, id: 'income-upline' },
    ]
  },
  { label: 'Trading Section', icon: <TrendingUp size={18} />, id: 'trading' },
  {
    label: 'Chatbot',
    icon: <Bot size={18} />,
    id: 'chatbot',
    subItems: [
      { label: 'Chatbot', icon: <Bot size={14} />, id: 'chatbot-main' },
      { label: 'View Chatbot', icon: <FileText size={14} />, id: 'chatbot-view' },
    ]
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, currentView, onChangeView, onLogout }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(['profile', 'package', 'team', 'transfer', 'withdrawal', 'income', 'chatbot']);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isExpanded = (id: string) => expandedItems.includes(id);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-nexus-sidebar border-r border-nexus-primary/20 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo Area */}
        <div className="h-20 flex items-center px-6 border-b border-nexus-primary/20 bg-gradient-to-r from-nexus-sidebar to-nexus-card">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold tracking-wider text-white">
              EVOL<span className="text-nexus-primary">ENTRA</span>
            </h1>
            <span className="text-[10px] text-nexus-muted tracking-widest uppercase">Bots, Brains, Big Gains</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 space-y-1 scrollbar-thin scrollbar-thumb-nexus-primary/20">
          {NAV_ITEMS.map((item) => {
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isActive = currentView === item.id || (hasSubItems && item.subItems?.some(sub => sub.id === currentView));
            const expanded = isExpanded(item.id);

            return (
              <div key={item.id}>
                <button
                  onClick={() => {
                    if (hasSubItems) {
                      toggleExpand(item.id);
                    } else {
                      onChangeView(item.id);
                      if (window.innerWidth < 1024) onClose();
                    }
                  }}
                  className={`
                    w-full flex items-center gap-4 px-6 py-3.5 text-sm font-medium transition-all duration-200 border-l-4
                    ${isActive && !hasSubItems
                      ? 'bg-nexus-primary/10 text-white border-nexus-primary'
                      : 'text-nexus-muted hover:text-white border-transparent hover:bg-white/5'}
                    ${hasSubItems && isActive ? 'text-white' : ''}
                  `}
                >
                  <div className={`${isActive ? 'text-nexus-primary' : 'text-nexus-muted'}`}>
                    {item.icon}
                  </div>
                  <span className="flex-1 text-left">{item.label}</span>

                  {hasSubItems && (
                    <div className="text-nexus-muted">
                      {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </div>
                  )}
                  {/* Arrow for submenus indicator if no subitems structure (legacy) */}
                  {!hasSubItems && ['Chatbot'].includes(item.label) && (
                    <div className="ml-auto opacity-50 text-[10px]">▶</div>
                  )}
                </button>

                {/* Sub Menu */}
                {hasSubItems && expanded && (
                  <div className="bg-black/20 py-2">
                    {item.subItems?.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => {
                          onChangeView(subItem.id);
                          if (window.innerWidth < 1024) onClose();
                        }}
                        className={`
                          w-full flex items-center gap-3 pl-14 pr-6 py-2.5 text-sm transition-colors
                          ${currentView === subItem.id
                            ? 'text-white font-medium'
                            : 'text-nexus-muted/70 hover:text-white'}
                        `}
                      >
                        <span className="text-[10px] mr-1">-</span> {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <div className="mt-8 pt-4 border-t border-nexus-primary/20 px-4">
            <button
              onClick={() => onLogout()}
              className="flex items-center gap-4 px-2 py-3 text-nexus-muted hover:text-white w-full transition-colors"
            >
              <LogOut size={18} />
              Log Out
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};