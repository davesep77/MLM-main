import { mockApiResponse } from './api';
import { MOCK_DB } from './mockDatabase';
import { IncomeReportItem, TradingReportItem, MarketDataPoint } from '../types';

export const reportService = {
    getTradingReports: async (userId: string = 'TAI768273') => {
        return mockApiResponse<TradingReportItem[]>(`reports?id=${userId}&type=trading_activity`);
    },

    getIncomeReports: async (type: 'TRADING' | 'REFERRAL' | 'BINARY' | 'REWARDS' | 'UPLINE', userId: string = 'TAI768273') => {
        const typeParam = type.toLowerCase();
        return mockApiResponse<IncomeReportItem[]>(`reports?id=${userId}&type=${typeParam}`);
    },

    getMarketData: async (): Promise<{ data: MarketDataPoint[], status: number, message: string }> => {
        // Market data is usually external. Keeping it mock/simulated via service is fine.
        return {
            data: MOCK_DB.MARKET_DATA,
            status: 200,
            message: 'Success'
        };
    }
};
