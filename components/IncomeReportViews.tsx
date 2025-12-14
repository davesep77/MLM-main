import React, { useEffect, useState } from 'react';
import { reportService } from '../services/reportService';
import { IncomeReportItem } from '../types';

// Reusable Table Container to maintain consistency
const TableContainer = ({ title, children, isLoading }: { title: string, children?: React.ReactNode, isLoading?: boolean }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>

    <div className="bg-[#1a0b2e] border border-nexus-primary/20 rounded-2xl overflow-hidden shadow-2xl relative min-h-[300px]">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/hud-futuristic-interface-screen-design_1017-26694.jpg')] bg-cover opacity-5 pointer-events-none"></div>

      <div className="bg-[#2d1b4e] px-8 py-4 border-b border-nexus-primary/20 relative z-10">
        <h3 className="text-lg font-bold text-white">Report Log</h3>
      </div>

      <div className="relative z-10 overflow-x-auto">
        {isLoading ? (
          <div className="text-center py-12 text-white">Loading reports...</div>
        ) : (
          children
        )}
      </div>
    </div>
  </div>
);

const Th = ({ children }: { children?: React.ReactNode }) => (
  <th className="px-6 py-4 font-semibold whitespace-nowrap text-left">{children}</th>
);

const Td = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
  <td className={`px-6 py-4 whitespace-nowrap text-sm ${className}`}>{children}</td>
);

const EmptyRow = ({ colSpan }: { colSpan: number }) => (
  <tr>
    <td colSpan={colSpan} className="text-center py-12 text-nexus-muted">No records found</td>
  </tr>
);

const useIncomeReport = (type: 'TRADING' | 'REFERRAL' | 'BINARY' | 'REWARDS' | 'UPLINE') => {
  const [data, setData] = useState<IncomeReportItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    reportService.getIncomeReports(type)
      .then(res => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [type]);

  return { data, loading };
};

export const TradingIncome: React.FC = () => {
  const { data, loading } = useIncomeReport('TRADING');

  return (
    <TableContainer title="Trading Income" isLoading={loading}>
      <table className="w-full text-left text-white">
        <thead className="bg-[#9d3a9d]">
          <tr>
            <Th>Sr No</Th>
            <Th>Date</Th>
            <Th>Description</Th>
            <Th>Amount</Th>
            <Th>Status</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-nexus-primary/10">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-white/5 transition-colors">
              <Td>{item.slNo}</Td>
              <Td>{item.date}</Td>
              <Td>{item.description}</Td>
              <Td className="font-bold text-green-400">${item.amount}</Td>
              <Td><span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-bold uppercase">{item.status}</span></Td>
            </tr>
          ))}
          {data.length === 0 && !loading && <EmptyRow colSpan={5} />}
        </tbody>
      </table>
    </TableContainer>
  );
};

export const ReferralIncome: React.FC = () => {
  const { data, loading } = useIncomeReport('REFERRAL');

  return (
    <TableContainer title="Referral Income" isLoading={loading}>
      <table className="w-full text-left text-white">
        <thead className="bg-[#9d3a9d]">
          <tr>
            <Th>Sr No</Th>
            <Th>Date</Th>
            <Th>From User</Th>
            <Th>Level</Th>
            <Th>Amount</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-nexus-primary/10">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-white/5 transition-colors">
              <Td>{item.slNo}</Td>
              <Td>{item.date}</Td>
              <Td>{item.fromUser}</Td>
              <Td>{item.level}</Td>
              <Td className="font-bold text-green-400">${item.amount}</Td>
            </tr>
          ))}
          {data.length === 0 && !loading && <EmptyRow colSpan={5} />}
        </tbody>
      </table>
    </TableContainer>
  );
};

export const BinaryIncome: React.FC = () => {
  const { data, loading } = useIncomeReport('BINARY');

  return (
    <TableContainer title="Binary Income" isLoading={loading}>
      <table className="w-full text-left text-white">
        <thead className="bg-[#9d3a9d]">
          <tr>
            <Th>Sr No</Th>
            <Th>Date</Th>
            <Th>Left Business</Th>
            <Th>Right Business</Th>
            <Th>Matching Amount</Th>
            <Th>Amount</Th>
            <Th>Status</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-nexus-primary/10">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-white/5 transition-colors">
              <Td>{item.slNo}</Td>
              <Td>{item.date}</Td>
              <Td>${item.leftBusiness}</Td>
              <Td>${item.rightBusiness}</Td>
              <Td>${item.matchingAmount}</Td>
              <Td className="font-bold text-green-400">${item.amount}</Td>
              <Td><span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-bold uppercase">{item.status}</span></Td>
            </tr>
          ))}
          {data.length === 0 && !loading && <EmptyRow colSpan={7} />}
        </tbody>
      </table>
    </TableContainer>
  );
};

export const RewardList: React.FC = () => {
  const { data, loading } = useIncomeReport('REWARDS');

  return (
    <TableContainer title="Reward List" isLoading={loading}>
      <table className="w-full text-left text-white">
        <thead className="bg-[#9d3a9d]">
          <tr>
            <Th>Sr No</Th>
            <Th>Date</Th>
            <Th>Reward Name</Th>
            <Th>Rank</Th>
            <Th>Amount/Value</Th>
            <Th>Status</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-nexus-primary/10">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-white/5 transition-colors">
              <Td>{item.slNo}</Td>
              <Td>{item.date}</Td>
              <Td>{item.rewardName}</Td>
              <Td>{item.rank}</Td>
              <Td className="font-bold text-yellow-400">${item.amount}</Td>
              <Td><span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-bold uppercase">{item.status}</span></Td>
            </tr>
          ))}
          {data.length === 0 && !loading && <EmptyRow colSpan={6} />}
        </tbody>
      </table>
    </TableContainer>
  );
};

export const UplineFranchise: React.FC = () => {
  const { data, loading } = useIncomeReport('UPLINE');

  return (
    <TableContainer title="Upline Franchise Income" isLoading={loading}>
      <table className="w-full text-left text-white">
        <thead className="bg-[#9d3a9d]">
          <tr>
            <Th>Sr No</Th>
            <Th>Date</Th>
            <Th>Description</Th>
            <Th>Amount</Th>
            <Th>Status</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-nexus-primary/10">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-white/5 transition-colors">
              <Td>{item.slNo}</Td>
              <Td>{item.date}</Td>
              <Td>{item.description}</Td>
              <Td className="font-bold text-green-400">${item.amount}</Td>
              <Td><span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-bold uppercase">{item.status}</span></Td>
            </tr>
          ))}
          {data.length === 0 && !loading && <EmptyRow colSpan={5} />}
        </tbody>
      </table>
    </TableContainer>
  );
};