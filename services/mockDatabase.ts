import {
    MarketDataPoint,
    Transaction,
    Rank,
    DepositHistoryItem,
    PurchaseReportItem,
    GenealogyNode,
    TeamMember,
    TransferHistoryItem,
    WithdrawalHistoryItem,
    IncomeReportItem,
    TradingReportItem
} from '../types';

// Purely synthetic data generator
const generateMockMarketData = (days: number): MarketDataPoint[] => {
    const data: MarketDataPoint[] = [];
    let currentPrice = 150 + Math.random() * 50;

    const now = new Date();

    for (let i = days; i > 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);

        // Random walk simulation
        const change = (Math.random() - 0.5) * 5;
        currentPrice += change;
        const volume = Math.floor(Math.random() * 10000) + 5000;

        data.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            price: parseFloat(currentPrice.toFixed(2)),
            volume: volume,
            sentiment: Math.random() // 0 to 1
        });
    }

    return data;
};

// Helper to generate consistent trading report data
const createTradingReportItem = (
    id: string,
    slNo: number,
    dateStr: string,
    pair: string,
    buyPrice: number,
    sellPrice: number,
    investment: number
): TradingReportItem => {
    const isProfit = sellPrice > buyPrice;
    const diff = Math.abs(sellPrice - buyPrice);
    const percent = (diff / buyPrice) * 100;
    // Assume entire investment is used for simplicity: Profit = Investment * (percent/100)
    const dollarAmount = investment * (percent / 100);

    return {
        id,
        slNo,
        date: dateStr,
        pair,
        low: Math.min(buyPrice, sellPrice) - (diff * 0.1),
        high: Math.max(buyPrice, sellPrice) + (diff * 0.1),
        purchasePrice: buyPrice,
        sellingPrice: sellPrice,
        profitPercent: isProfit ? parseFloat(percent.toFixed(10)) : undefined,
        lossPercent: !isProfit ? parseFloat((-percent).toFixed(10)) : undefined,
        profitAmount: isProfit ? parseFloat(dollarAmount.toFixed(8)) : undefined,
        lossAmount: !isProfit ? parseFloat(dollarAmount.toFixed(8)) : undefined,
        prediction: isProfit ? 'Bullish Trend ↗' : 'Correction ↘'
    };
};

export const MOCK_DB = {
    MARKET_DATA: generateMockMarketData(30),

    TRANSACTIONS: [
        { id: '1', slNo: 1, date: '10/12/2025 00:00:00', wallet: 'Evolentra Yield Wallet', incomeType: 'Trading Income', amount: '+$1.47' },
        { id: '2', slNo: 2, date: '09/12/2025 00:00:00', wallet: 'Evolentra Yield Wallet', incomeType: 'Trading Income', amount: '+$1.47' },
        { id: '3', slNo: 3, date: '08/12/2025 00:00:00', wallet: 'Evolentra Yield Wallet', incomeType: 'Trading Income', amount: '+$1.47' },
        { id: '4', slNo: 4, date: '05/12/2025 00:00:00', wallet: 'Evolentra Yield Wallet', incomeType: 'Trading Income', amount: '+$1.47' },
        { id: '5', slNo: 5, date: '04/12/2025 00:00:00', wallet: 'Evolentra Yield Wallet', incomeType: 'Trading Income', amount: '+$1.47' },
        { id: '6', slNo: 6, date: '03/12/2025 00:00:00', wallet: 'Evolentra Yield Wallet', incomeType: 'Trading Income', amount: '+$1.47' },
        { id: '7', slNo: 7, date: '02/12/2025 00:00:00', wallet: 'Evolentra Yield Wallet', incomeType: 'Trading Income', amount: '+$1.47' },
        { id: '8', slNo: 8, date: '01/12/2025 00:00:00', wallet: 'Evolentra Yield Wallet', incomeType: 'Trading Income', amount: '+$1.47' },
    ] as Transaction[],

    DEPOSITS: [
        {
            id: '1',
            slNo: 1,
            appliedDate: '8/15/2025 1:17:21 PM',
            usd: 93,
            coinType: 'USDT.TRC20',
            coinValue: 99,
            approveDate: '15/08/2025',
            status: 'Approve'
        },
        {
            id: '2',
            slNo: 2,
            appliedDate: '8/15/2025 1:16:02 PM',
            usd: 100,
            coinType: 'USDT.TRC20',
            coinValue: 106.1185,
            approveDate: '15/08/2025',
            status: 'Reject'
        },
    ] as DepositHistoryItem[],

    PURCHASES: [
        {
            id: '1',
            slNo: 1,
            packageId: 'TT0001160983',
            startDate: '2025-08-15',
            endDate: '2026-02-27',
            packageName: 'Evolentra Premium',
            botName: 'Evolentra AI',
            amount: 105,
            wallet: 'Deposit-Wallet'
        }
    ] as PurchaseReportItem[],

    RANKS: [
        { id: 1, name: 'Rank 1', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=300' },
        { id: 2, name: 'Rank 2', image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=300' },
        { id: 3, name: 'Rank 3', image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&q=80&w=300' },
        { id: 4, name: 'Rank 4', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=300' },
        { id: 5, name: 'Rank 5', image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=300' },
        { id: 6, name: 'Rank 6', image: 'https://images.unsplash.com/photo-1621504450168-38f6470b9098?auto=format&fit=crop&q=80&w=300' },
        { id: 7, name: 'Rank 7', image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&q=80&w=300' },
        { id: 8, name: 'Rank 8', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=300' },
        { id: 9, name: 'Rank 9', image: 'https://images.unsplash.com/photo-1560518883-ce09059ee971?auto=format&fit=crop&q=80&w=300' },
        { id: 10, name: 'Rank 10', image: 'https://images.unsplash.com/photo-1512418490979-92798cec1380?auto=format&fit=crop&q=80&w=300' },
        { id: 11, name: 'Rank 11', image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=300' },
        { id: 12, name: 'Rank 12', image: 'https://images.unsplash.com/photo-1581337204873-ef36aa186caa?auto=format&fit=crop&q=80&w=300' },
    ] as Rank[],

    GENEALOGY: {
        id: 'TAI768273',
        name: 'Gebeyehu Lanteyderu',
        status: 'active',
        children: [
            {
                id: 'TAI179880',
                name: 'Gebeyehu Asefa',
                status: 'inactive',
                children: [
                    {
                        id: 'TAI483984',
                        name: 'Mak Nahi',
                        status: 'inactive',
                        children: [
                            { id: 'TAI986165', name: 'Abebe Baylie', status: 'inactive' },
                            { id: 'TAI432777', name: 'Amenen Nahi', status: 'inactive' }
                        ]
                    },
                    {
                        id: 'NANA',
                        name: 'Join here',
                        status: 'open',
                        children: [
                            { id: 'NANA', name: 'NANA', status: 'close' },
                            { id: 'NANA', name: 'NANA', status: 'close' }
                        ]
                    }
                ]
            },
            {
                id: 'TAI635697',
                name: 'Gebeyehu Asefa',
                status: 'inactive',
                children: [
                    {
                        id: 'NANA',
                        name: 'Join here',
                        status: 'open',
                        children: [
                            { id: 'NANA', name: 'NANA', status: 'close' },
                            { id: 'NANA', name: 'NANA', status: 'close' }
                        ]
                    },
                    {
                        id: 'TAI586507',
                        name: 'Said Ereg',
                        status: 'inactive',
                        children: [
                            { id: 'TAI85421', name: 'hab ib aysin', status: 'inactive' },
                            { id: 'TAI751236', name: 'Best Man', status: 'inactive' }
                        ]
                    }
                ]
            }
        ]
    } as GenealogyNode,

    DIRECT_TEAM: [
        { id: '1', slNo: 1, userId: 'TAI116799', name: 'Melaku Mandefro', country: 'Ethiopia', contact: '0777078866', email: 'dreamyourhigherness@gmail.com', position: 'Right', totalActive: 0, totalPurchase: 0, joinDate: '24/08/2025' },
        { id: '2', slNo: 2, userId: 'TAI412988', name: 'Mezgebu Chere', country: 'Ethiopia', contact: '768273', email: 'mezgebuchere839@gmail.com', position: 'Right', totalActive: 0, totalPurchase: 0, joinDate: '22/08/2025' },
        { id: '3', slNo: 3, userId: 'TAI616045', name: 'Dave Tekeste', country: 'Ethiopia', contact: '768273', email: 'dawittekeste605@gmail.com', position: 'Right', totalActive: 0, totalPurchase: 0, joinDate: '22/08/2025' },
        { id: '4', slNo: 4, userId: 'TAI146109', name: 'Genet Mekonin', country: 'Ethiopia', contact: '768273', email: 'genetm407@gmail.com', position: 'Right', totalActive: 0, totalPurchase: 0, joinDate: '22/08/2025' },
        { id: '5', slNo: 5, userId: 'TAI815183', name: 'Lulseged Beyene', country: 'Ethiopia', contact: '0951096919', email: 'Ultrashinebusiness@gmail.com', position: 'Right', totalActive: 0, totalPurchase: 0, joinDate: '22/08/2025' },
        { id: '6', slNo: 6, userId: 'TAI986165', name: 'Abebe Baylie', country: 'Ethiopia', contact: '0913898728', email: 'abebebaylie1@gmail.com', position: 'Left', totalActive: 0, totalPurchase: 0, joinDate: '22/08/2025' },
        { id: '7', slNo: 7, userId: 'TAI756617', name: 'Yosef Wube', country: 'Ethiopia', contact: '0910765127', email: 'yosefwube13@gmail.com', position: 'Right', totalActive: 0, totalPurchase: 0, joinDate: '21/08/2025' },
        { id: '8', slNo: 8, userId: 'TAI751236', name: 'Best Man', country: 'Ethiopia', contact: '0715947494', email: 'makinahom4@gmail.com', position: 'Right', totalActive: 0, totalPurchase: 0, joinDate: '16/08/2025' },
        { id: '9', slNo: 9, userId: 'TAI483984', name: 'Mak Nahi', country: 'Ethiopia', contact: '251915947494', email: 'nahiasee@gmail.com', position: 'Left', totalActive: 0, totalPurchase: 0, joinDate: '16/08/2025' },
        { id: '10', slNo: 10, userId: 'TAI635697', name: 'Gebeyehu Asefa', country: 'Ethiopia', contact: '0911771387', email: 'gebeyehuasefa42@gmail.com', position: 'Right', totalActive: 0, totalPurchase: 0, joinDate: '15/08/2025' },
    ] as TeamMember[],

    DOWNLINE_TEAM: [
        { id: '1', slNo: 1, userId: 'TAI116799', name: 'Melaku Mandefro', sponsorId: 'TAI768273', country: 'Ethiopia', contact: '0777078866', email: 'dreamyourhigherness@gmail.com', position: 'Right', totalActive: 0, totalPurchase: 0, joinDate: '24/08/2025', status: 'Active' },
        { id: '2', slNo: 2, userId: 'TAI412988', name: 'Mezgebu Chere', sponsorId: 'TAI768273', country: 'Ethiopia', contact: '768273', email: 'mezgebuchere839@gmail.com', position: 'Right', totalActive: 0, totalPurchase: 0, joinDate: '22/08/2025', status: 'Inactive' },
        { id: '3', slNo: 3, userId: 'TAI616045', name: 'Dave Tekeste', sponsorId: 'TAI768273', country: 'Ethiopia', contact: '768273', email: 'dawittekeste605@gmail.com', position: 'Right', totalActive: 0, totalPurchase: 0, joinDate: '22/08/2025', status: 'Inactive' },
        { id: '4', slNo: 4, userId: 'TAI146109', name: 'Genet Mekonin', sponsorId: 'TAI768273', country: 'Ethiopia', contact: '768273', email: 'genetm407@gmail.com', position: 'Right', totalActive: 0, totalPurchase: 0, joinDate: '22/08/2025', status: 'Inactive' },
        { id: '5', slNo: 5, userId: 'TAI815183', name: 'Lulseged Beyene', sponsorId: 'TAI768273', country: 'Ethiopia', contact: '0951096919', email: 'Ultrashinebusiness@gmail.com', position: 'Right', totalActive: 0, totalPurchase: 0, joinDate: '22/08/2025', status: 'Inactive' },
        { id: '6', slNo: 6, userId: 'TAI986165', name: 'Abebe Baylie', sponsorId: 'TAI483984', country: 'Ethiopia', contact: '0913898728', email: 'abebebaylie1@gmail.com', position: 'Left', totalActive: 0, totalPurchase: 0, joinDate: '22/08/2025', status: 'Inactive' },
        { id: '7', slNo: 7, userId: 'TAI756617', name: 'Yosef Wube', sponsorId: 'TAI768273', country: 'Ethiopia', contact: '0910765127', email: 'yosefwube13@gmail.com', position: 'Right', totalActive: 0, totalPurchase: 0, joinDate: '21/08/2025', status: 'Inactive' },
        { id: '8', slNo: 8, userId: 'TAI751236', name: 'Best Man', sponsorId: 'TAI586507', country: 'Ethiopia', contact: '0715947494', email: 'makinahom4@gmail.com', position: 'Right', totalActive: 0, totalPurchase: 0, joinDate: '16/08/2025', status: 'Inactive' },
        { id: '9', slNo: 9, userId: 'TAI483984', name: 'Mak Nahi', sponsorId: 'TAI179880', country: 'Ethiopia', contact: '251915947494', email: 'nahiasee@gmail.com', position: 'Left', totalActive: 0, totalPurchase: 0, joinDate: '16/08/2025', status: 'Inactive' },
        { id: '10', slNo: 10, userId: 'TAI635697', name: 'Gebeyehu Asefa', sponsorId: 'TAI768273', country: 'Ethiopia', contact: '0911771387', email: 'gebeyehuasefa42@gmail.com', position: 'Right', totalActive: 0, totalPurchase: 0, joinDate: '15/08/2025', status: 'Inactive' },
    ] as TeamMember[],

    TRANSFERS: [
        { id: '1', slNo: 1, date: '10/12/2025', amount: 50, type: 'Internal', wallet: 'Evolentra Yield -> Deposit', status: 'Success', transactionId: 'TXN123456789' },
        { id: '2', slNo: 2, date: '05/12/2025', amount: 100, type: 'External', wallet: 'Deposit Wallet', status: 'Success', transactionId: 'TXN987654321' },
    ] as TransferHistoryItem[],

    WITHDRAWALS: [
        { id: '1', slNo: 1, date: '01/12/2025', amount: 100, adminCharge: 5, netAmount: 95, wallet: 'Evolentra Yield Wallet', status: 'Approved', transactionId: 'WTH5544332211' }
    ] as WithdrawalHistoryItem[],

    INCOME_REPORTS: {
        TRADING: [
            { id: '1', slNo: 1, date: '12/12/2025', amount: 1.47, description: 'Daily ROI - Evolentra AI', status: 'Success' },
            { id: '2', slNo: 2, date: '11/12/2025', amount: 1.47, description: 'Daily ROI - Evolentra AI', status: 'Success' },
            { id: '3', slNo: 3, date: '10/12/2025', amount: 1.47, description: 'Daily ROI - Evolentra AI', status: 'Success' },
        ] as IncomeReportItem[],
        REFERRAL: [
            { id: '1', slNo: 1, date: '15/08/2025', amount: 7.35, fromUser: 'TAI116799 (Melaku Mandefro)', level: 1, status: 'Success' },
        ] as IncomeReportItem[],
        BINARY: [
            { id: '1', slNo: 1, date: '30/11/2025', amount: 50, leftBusiness: 500, rightBusiness: 500, matchingAmount: 500, status: 'Paid' },
        ] as IncomeReportItem[],
        REWARDS: [
            { id: '1', slNo: 1, date: '01/10/2025', amount: 100, rewardName: 'Bronze Rank Reward', rank: 'Bronze', status: 'Achieved' },
        ] as IncomeReportItem[],
    },

    TRADING_REPORT: [
        createTradingReportItem('1', 1, '1/4/2025 12:00:00 AM', 'TRXUSDT', 0.23, 0.235, 8366000),
        createTradingReportItem('2', 2, '1/4/2025 12:00:00 AM', 'TRXUSDT', 0.23, 0.2342, 8350000),
        createTradingReportItem('3', 3, '1/4/2025 12:00:00 AM', 'TRXUSDT', 0.24, 0.237, 8400000),
        createTradingReportItem('4', 4, '31/03/2025', 'TRXUSDT', 0.23, 0.2351, 8380000),
        createTradingReportItem('5', 5, '31/03/2025', 'TRXUSDT', 0.24, 0.2373, 8420000),
        createTradingReportItem('6', 6, '31/03/2025', 'TRXUSDT', 0.23, 0.2356, 8360000),
        createTradingReportItem('7', 7, '28/03/2025', 'TRXUSDT', 0.23, 0.234, 8200000),
        createTradingReportItem('8', 8, '28/03/2025', 'TRXUSDT', 0.23, 0.227, 8250000),
        createTradingReportItem('9', 9, '28/03/2025', 'TRXUSDT', 0.23, 0.233, 8150000),
        createTradingReportItem('10', 10, '27/03/2025', 'TRXUSDT', 0.23, 0.2276, 8280000),
        createTradingReportItem('11', 11, '27/03/2025', 'TRXUSDT', 0.23, 0.2328, 8180000),
    ] as TradingReportItem[]
};
