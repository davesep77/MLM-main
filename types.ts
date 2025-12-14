import React from 'react';

export interface MarketDataPoint {
  date: string;
  price: number;
  volume: number;
  sentiment: number;
}

export interface NavItem {
  label: string;
  icon: React.ReactNode;
  id: string;
  subItems?: NavItem[];
}

export enum AnalysisStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface AnalysisResult {
  summary: string;
  trend: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
}

export interface Transaction {
  id: string;
  slNo: number;
  date: string;
  wallet: string;
  incomeType: string;
  amount: string;
}

export interface DepositHistoryItem {
  id: string;
  slNo: number;
  appliedDate: string;
  usd: number;
  coinType: string;
  coinValue: number;
  approveDate: string;
  status: 'Approve' | 'Reject';
}

export interface PurchaseReportItem {
  id: string;
  slNo: number;
  packageId: string;
  startDate: string;
  endDate: string;
  packageName: string;
  botName: string;
  amount: number;
  wallet: string;
}

export interface Rank {
  id: number;
  name: string;
  image: string;
}

export interface GenealogyNode {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'open' | 'close';
  children?: GenealogyNode[];
}

export interface TeamMember {
  id: string;
  slNo: number;
  userId: string;
  name: string;
  country?: string;
  contact?: string;
  email?: string;
  joinDate: string;
  activationDate?: string;
  packageName?: string;
  status?: 'Active' | 'Inactive';
  sponsorId?: string;
  position?: 'Left' | 'Right';
  totalActive?: number;
  totalPurchase?: number;
}

export interface TransferHistoryItem {
  id: string;
  slNo: number;
  date: string;
  amount: number;
  type: 'Internal' | 'External';
  wallet: string;
  status: 'Success' | 'Pending' | 'Failed';
  transactionId: string;
}

export interface WithdrawalHistoryItem {
  id: string;
  slNo: number;
  date: string;
  amount: number;
  adminCharge: number;
  netAmount: number;
  wallet: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  transactionId: string;
}

export interface IncomeReportItem {
  id: string;
  slNo: number;
  date: string;
  amount: number;
  description?: string; // Used for Trading/Upline
  fromUser?: string; // Used for Referral
  level?: number; // Used for Referral
  leftBusiness?: number; // Used for Binary
  rightBusiness?: number; // Used for Binary
  matchingAmount?: number; // Used for Binary
  rewardName?: string; // Used for Reward
  status?: string; // Used for Reward
  rank?: string; // Used for Reward
}

export interface TradingReportItem {
  id: string;
  slNo: number;
  date: string;
  pair: string;
  low: number;
  high: number;
  purchasePrice: number;
  sellingPrice: number;
  profitPercent?: number;
  lossPercent?: number;
  profitAmount?: number;
  lossAmount?: number;
  prediction?: string;
}

export interface ChatbotTicket {
  id: string;
  subject: string;
  description: string;
  date: string;
  status: 'Open' | 'Closed';
}

// Global State Interfaces
export interface WalletState {
  deposit: number;
  botEarning: number;
  networkEarning: number;
  traydAi: number;
  compounding: number;
}

export interface UserProfile {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  sponsorId?: string;
  sponsorName?: string;
  walletAddress: string;
  image: string;
  position?: 'Left' | 'Right';
  status?: 'Active' | 'Inactive';
  joinedAt?: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}
