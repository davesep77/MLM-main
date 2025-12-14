import React, { useEffect, useState } from 'react';
import { reportService } from '../services/reportService';
import { TradingReportItem } from '../types';

const Th = ({ children }: { children?: React.ReactNode }) => (
  <th className="px-4 py-4 font-semibold whitespace-nowrap text-left border-r border-white/20 last:border-r-0 text-xs md:text-sm">{children}</th>
);

const Td = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
  <td className={`px-4 py-3 whitespace-nowrap border-r border-white/10 last:border-r-0 text-xs md:text-sm ${className}`}>{children}</td>
);

export const TradingReport: React.FC = () => {
  const [data, setData] = useState<TradingReportItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    reportService.getTradingReports()
      .then(res => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Trading Report</h2>
      </div>

      <div className="bg-[#1a0b2e] border border-nexus-primary/20 rounded-2xl overflow-hidden shadow-2xl relative min-h-[400px]">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/hud-futuristic-interface-screen-design_1017-26694.jpg')] bg-cover opacity-10 pointer-events-none"></div>

        <div className="relative z-10 overflow-x-auto">
          {loading ? (
            <div className="text-center py-12 text-white">Loading trading reports...</div>
          ) : (
            <table className="w-full text-left text-white border-collapse">
              <thead className="bg-[#9d3a9d]">
                <tr>
                  <Th>Sr No</Th>
                  <Th>Date</Th>
                  <Th>Pair</Th>
                  <Th>Low</Th>
                  <Th>High</Th>
                  <Th>Purchase Price</Th>
                  <Th>Selling Price</Th>
                  <Th>Profit (%)</Th>
                  <Th>Loss (%)</Th>
                  <Th>Profit ($)</Th>
                  <Th>Loss ($)</Th>
                  <Th>AI Prediction</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-nexus-primary/10">
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors border-b border-nexus-primary/10">
                    <Td>{item.slNo}</Td>
                    <Td>{item.date}</Td>
                    <Td>{item.pair}</Td>
                    <Td>{item.low.toFixed(4)}</Td>
                    <Td>{item.high.toFixed(4)}</Td>
                    <Td>{item.purchasePrice}</Td>
                    <Td>{item.sellingPrice}</Td>
                    <Td className="font-medium text-green-400">
                      {item.profitPercent ? item.profitPercent : '-'}
                    </Td>
                    <Td className="font-medium text-red-400">
                      {item.lossPercent ? item.lossPercent : '-'}
                    </Td>
                    <Td className="font-bold text-green-400">
                      {item.profitAmount ? item.profitAmount : '-'}
                    </Td>
                    <Td className="font-bold text-red-400">
                      {item.lossAmount ? item.lossAmount : '-'}
                    </Td>
                    <Td>
                      <span className={`px-2 py-1 rounded text-xs font-bold border ${item.lossAmount ? 'border-red-500/30 text-red-300 bg-red-900/20' : 'border-green-500/30 text-green-300 bg-green-900/20'}`}>
                        {item.prediction}
                      </span>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};