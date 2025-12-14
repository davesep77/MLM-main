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
import { walletService } from '../services/walletService';
import { authService, SignInData, SignUpData } from '../services/authService';
import { userService } from '../services/userService';
import { supabase } from '../services/supabase';

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
  signIn: (data: SignInData) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  logout: () => Promise<void>;
  depositFunds: (amount: number) => Promise<boolean>;
  buyPackage: (pkgName: string, amount: number, wallet: string) => Promise<boolean>;
  transferFunds: (fromWallet: keyof WalletState, toWallet: keyof WalletState, amount: number, isExternal: boolean, extAddress?: string) => Promise<boolean>;
  withdrawFunds: (wallet: keyof WalletState, amount: number) => Promise<boolean>;
  createTicket: (subject: string, description: string) => void;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  reloadUser: () => Promise<void>;
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
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [wallets, setWallets] = useState<WalletState>(defaultWallets);

  // Histories
  const [deposits, setDeposits] = useState<DepositHistoryItem[]>([]);
  const [purchases, setPurchases] = useState<PurchaseReportItem[]>([]);
  const [transfers, setTransfers] = useState<TransferHistoryItem[]>([]);
  const [withdrawals, setWithdrawals] = useState<WithdrawalHistoryItem[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [tickets, setTickets] = useState<ChatbotTicket[]>([]);

  useEffect(() => {
    checkSession();

    const { data: { subscription } } = authService.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        await loadUserData();
        setIsLoggedIn(true);
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
        setUser(null);
        setWallets(defaultWallets);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkSession = async () => {
    try {
      const session = await authService.getSession();
      if (session) {
        await loadUserData();
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Session check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserData = async () => {
    try {
      console.log('AppContext - Loading user data...');
      const currentUser = await authService.getCurrentUser();
      console.log('AppContext - Retrieved user:', currentUser);
      if (currentUser) {
        setUser(currentUser);
        await loadWalletsAndHistory(currentUser.id);
      } else {
        console.log('AppContext - No user returned from authService');
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  };

  const loadWalletsAndHistory = async (userId: string) => {
    try {
      const { data: walletData } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (walletData) {
        setWallets({
          deposit: Number(walletData.deposit_balance) || 0,
          botEarning: Number(walletData.bot_earning_balance) || 0,
          networkEarning: Number(walletData.network_earning_balance) || 0,
          traydAi: Number(walletData.trayd_ai_balance) || 0,
          compounding: Number(walletData.compounding_balance) || 0,
        });
      }

      const { data: transactionsData } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (transactionsData) {
        const txs: Transaction[] = transactionsData.map((tx: any) => ({
          id: tx.id,
          date: new Date(tx.created_at).toLocaleDateString(),
          description: tx.description || tx.type,
          amount: Number(tx.amount),
          type: tx.type,
          status: tx.status,
        }));
        setTransactions(txs);
      }
    } catch (error) {
      console.error('Failed to load wallets and history:', error);
    }
  };

  const signIn = async (data: SignInData) => {
    setIsLoading(true);
    try {
      await authService.signIn(data);
    } catch (error: any) {
      console.error('Sign in failed:', error);
      throw new Error(error.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (data: SignUpData) => {
    setIsLoading(true);
    try {
      await authService.signUp(data);
    } catch (error: any) {
      console.error('Sign up failed:', error);
      throw new Error(error.message || 'Sign up failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.signOut();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
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
      await loadUserData();
    } finally {
      setIsLoading(false);
    }
  };

  const reloadUser = async () => {
    await loadUserData();
  };

  return (
    <AppContext.Provider value={{
      isLoggedIn, isLoading, user, wallets, deposits, purchases, transfers, withdrawals, transactions, tickets,
      signIn, signUp, logout, depositFunds, buyPackage, transferFunds, withdrawFunds, createTicket, updateProfile, reloadUser
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