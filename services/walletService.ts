import {
    WalletState,
    DepositHistoryItem,
    PurchaseReportItem,
    TransferHistoryItem,
    WithdrawalHistoryItem,
    Transaction
} from '../types';
import { mockApiResponse } from './api';
import { MOCK_DB } from './mockDatabase';

// Initial Mock Data Sources (In a real app, these come from the DB)
// We keep initial empty states or minimal seed data for the "Professional Template" feel
// so it doesn't look like a completely empty shell.
const INITIAL_WALLETS: WalletState = {
    deposit: 0,
    botEarning: 71.0525,
    networkEarning: 0,
    traydAi: 0,
    compounding: 0
};

export const walletService = {
    getWallets: async (userId: string = 'TAI768273') => {
        return mockApiResponse<WalletState>(`wallets?id=${userId}`);
    },

    getHistory: async (userId: string = 'TAI768273') => {
        // The PHP API has /transactions.php
        // We need to map that to the expected structure: deposits, purchases, transfers, withdrawals, transactions.
        // For this transition, we will fetch the unified 'transactions' table from PHP 
        // and maybe empty arrays for specific legacy mock structures if they aren't fully migrated in PHP yet.

        const txResponse = await mockApiResponse<Transaction[]>(`transactions?id=${userId}`);
        const allTransactions = txResponse.data;

        // We can filter the single transaction list into categories if we want to support the old UI structures,
        // or ensure the UI uses this unified list.
        // The UI (AppContext) expects { deposits, purchases, transfers, withdrawals, transactions }.

        // Simple mapping:
        return {
            status: 200,
            message: 'Success',
            data: {
                transactions: allTransactions,
                deposits: [], // Populated via separate call or filter if needed
                purchases: [],
                transfers: [],
                withdrawals: []
            }
        };
    },

    deposit: async (amount: number) => {
        return { status: 200, message: 'Deposit successful', data: { success: true } };
    },

    transfer: async (data: any) => {
        return { status: 200, message: 'Transfer successful', data: { success: true } };
    },

    withdraw: async (data: any) => {
        return { status: 200, message: 'Withdrawal submitted', data: { success: true } };
    },

    purchasePackage: async (data: any) => {
        return { status: 200, message: 'Purchase successful', data: { success: true } };
    }
};
