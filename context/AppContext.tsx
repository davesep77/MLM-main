import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  WalletState,
  UserProfile,
  DepositHistoryItem,
  PurchaseReportItem,
  TransferHistoryItem,
  WithdrawalHistoryItem,
  Transaction,
  ChatbotTicket
} from '../types';
import { userService } from '../services/userService';
import { walletService } from '../services/walletService';

interface AppContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: UserProfile | null;
  wallets: WalletState;
  deposits: DepositHistoryItem[];
  purchases: PurchaseReportItem[];
  transfers: TransferHistoryItem[];
  withdrawals: WithdrawalHistoryItem[];
  transactions: Transaction[];
  tickets: ChatbotTicket[];

  // Actions
  login: () => void;
  logout: () => void;
  depositFunds: (amount: number) => Promise<boolean>;
  buyPackage: (pkgName: string, amount: number, wallet: string) => Promise<boolean>;
  transferFunds: (fromWallet: keyof WalletState, toWallet: keyof WalletState, amount: number, isExternal: boolean, extAddress?: string) => Promise<boolean>;
  withdrawFunds: (wallet: keyof WalletState, amount: number) => Promise<boolean>;
  createTicket: (subject: string, description: string) => void;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const defaultWallets: WalletState = {
  deposit: 0,
  botEarning: 0,
  networkEarning: 0,
  traydAi: 0,
  compounding: 0
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [wallets, setWallets] = useState<WalletState>(defaultWallets);

  // Histories
  const [deposits, setDeposits] = useState<DepositHistoryItem[]>([]);
  const [purchases, setPurchases] = useState<PurchaseReportItem[]>([]);
  const [transfers, setTransfers] = useState<TransferHistoryItem[]>([]);
  const [withdrawals, setWithdrawals] = useState<WithdrawalHistoryItem[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [tickets, setTickets] = useState<ChatbotTicket[]>([]);

  // Load initial data on mount (or when logged in, in a real app)
  useEffect(() => {
    const initData = async () => {
      setIsLoading(true);
      try {
        const userRes = await userService.getProfile();
        setUser(userRes.data);

        const walletRes = await walletService.getWallets();
        setWallets(walletRes.data);

        const historyRes = await walletService.getHistory();
        setDeposits(historyRes.data.deposits);
        setPurchases(historyRes.data.purchases);
        setTransfers(historyRes.data.transfers);
        setWithdrawals(historyRes.data.withdrawals);
        setTransactions(historyRes.data.transactions);
      } catch (error) {
        console.error("Failed to load initial data", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoggedIn) {
      initData();
    }
  }, [isLoggedIn]);

  const login = () => setIsLoggedIn(true);
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const depositFunds = async (amount: number): Promise<boolean> => {
    setIsLoading(true);
    try {
      await walletService.deposit(amount);

      // Optimistic Update
      setWallets(prev => ({ ...prev, deposit: prev.deposit + amount }));

      const newDeposit: DepositHistoryItem = {
        id: Math.random().toString(36).substr(2, 9),
        slNo: deposits.length + 1,
        appliedDate: new Date().toLocaleString(),
        usd: amount,
        coinType: 'USDT.TRC20',
        coinValue: amount,
        approveDate: new Date().toLocaleDateString(),
        status: 'Approve'
      };
      setDeposits(prev => [newDeposit, ...prev]);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const buyPackage = async (pkgName: string, amount: number, walletName: string): Promise<boolean> => {
    let walletKey: keyof WalletState = 'deposit';
    if (walletName.includes('Evolentra')) walletKey = 'traydAi';

    if (wallets[walletKey] < amount) return false;

    setIsLoading(true);
    try {
      await walletService.purchasePackage({ pkgName, amount, wallet: walletName });

      setWallets(prev => ({ ...prev, [walletKey]: prev[walletKey] - amount }));

      const newPurchase: PurchaseReportItem = {
        id: Math.random().toString(36).substr(2, 9),
        slNo: purchases.length + 1,
        packageId: 'PKG' + Math.floor(Math.random() * 100000),
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        packageName: pkgName,
        botName: pkgName,
        amount: amount,
        wallet: walletName
      };
      setPurchases(prev => [newPurchase, ...prev]);
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const transferFunds = async (from: keyof WalletState, to: keyof WalletState, amount: number, isExternal: boolean, extAddress?: string): Promise<boolean> => {
    if (wallets[from] < amount) return false;

    setIsLoading(true);
    try {
      await walletService.transfer({ from, to, amount, isExternal });

      setWallets(prev => ({ ...prev, [from]: prev[from] - amount }));
      if (!isExternal) {
        setWallets(prev => ({ ...prev, [to]: prev[to] + amount }));
      }

      const newTransfer: TransferHistoryItem = {
        id: Math.random().toString(36).substr(2, 9),
        slNo: transfers.length + 1,
        date: new Date().toLocaleDateString(),
        amount: amount,
        type: isExternal ? 'External' : 'Internal',
        wallet: isExternal ? `${from} -> ${extAddress}` : `${from} -> ${to}`,
        status: 'Success',
        transactionId: 'TXN' + Math.floor(Math.random() * 10000000)
      };
      setTransfers(prev => [newTransfer, ...prev]);
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const withdrawFunds = async (wallet: keyof WalletState, amount: number): Promise<boolean> => {
    if (wallets[wallet] < amount) return false;

    setIsLoading(true);
    try {
      await walletService.withdraw({ wallet, amount });

      setWallets(prev => ({ ...prev, [wallet]: prev[wallet] - amount }));

      const adminCharge = amount * 0.05;
      const newWithdrawal: WithdrawalHistoryItem = {
        id: Math.random().toString(36).substr(2, 9),
        slNo: withdrawals.length + 1,
        date: new Date().toLocaleDateString(),
        amount: amount,
        adminCharge: adminCharge,
        netAmount: amount - adminCharge,
        wallet: wallet,
        status: 'Pending',
        transactionId: 'WTH' + Math.floor(Math.random() * 10000000)
      };
      setWithdrawals(prev => [newWithdrawal, ...prev]);
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const createTicket = (subject: string, description: string) => {
    const newTicket: ChatbotTicket = {
      id: Math.random().toString(36).substr(2, 9),
      subject,
      description,
      date: new Date().toLocaleString(),
      status: 'Open'
    };
    setTickets(prev => [newTicket, ...prev]);
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    setIsLoading(true);
    try {
      await userService.updateProfile(updates);
      setUser(prev => (prev ? { ...prev, ...updates } : null));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppContext.Provider value={{
      isLoggedIn, isLoading, user, wallets, deposits, purchases, transfers, withdrawals, transactions, tickets,
      login, logout, depositFunds, buyPackage, transferFunds, withdrawFunds, createTicket, updateProfile
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};