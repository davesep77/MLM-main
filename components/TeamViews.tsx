import React, { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import { teamService } from '../services/teamService';
import { TeamMember } from '../types';

const TableContainer = ({ title, children, isLoading }: { title: string, children?: React.ReactNode, isLoading?: boolean }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>

    {/* Filter Section */}
    <div className="bg-[#1a0b2e] border border-nexus-primary/20 rounded-2xl overflow-hidden shadow-2xl relative">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/hud-futuristic-interface-screen-design_1017-26694.jpg')] bg-cover opacity-5 pointer-events-none"></div>

      <div className="relative z-10 p-6 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative group">
              <input
                type="text"
                placeholder="mm/dd/yyyy"
                onFocus={(e) => e.target.type = 'date'}
                onBlur={(e) => e.target.type = 'text'}
                className="bg-white text-gray-900 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none w-full md:w-48"
              />
              <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
            <div className="relative group">
              <input
                type="text"
                placeholder="mm/dd/yyyy"
                onFocus={(e) => e.target.type = 'date'}
                onBlur={(e) => e.target.type = 'text'}
                className="bg-white text-gray-900 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none w-full md:w-48"
              />
              <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
            <button className="bg-[#b02dad] hover:bg-[#c03eae] text-white font-bold py-2 px-8 rounded-lg shadow-lg transition-colors text-sm">
              Search
            </button>
          </div>

          <div className="w-full md:w-auto">
            <input
              type="number"
              defaultValue={10}
              className="bg-white text-gray-900 rounded-lg px-2 py-2 text-sm text-center font-bold focus:outline-none w-16"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-nexus-primary/10">
          {isLoading ? (
            <div className="text-center py-8 text-white">Loading data...</div>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  </div>
);

const TableHeader = ({ children }: { children?: React.ReactNode }) => (
  <thead className="bg-[#9d3a9d] text-white">
    <tr>{children}</tr>
  </thead>
);

const Th = ({ children }: { children?: React.ReactNode }) => (
  <th className="px-4 py-4 font-semibold whitespace-nowrap border-r border-white/20 last:border-r-0 text-sm">{children}</th>
);

const Td = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
  <td className={`px-4 py-3 whitespace-nowrap border-r border-nexus-primary/10 last:border-r-0 text-xs md:text-sm ${className}`}>{children}</td>
);

const StatusBadge = ({ status }: { status: string }) => (
  <span className={`px-3 py-1 rounded text-[10px] font-bold uppercase ${status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
    {status}
  </span>
);

export const TeamDirectReferral: React.FC = () => {
  const [data, setData] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    teamService.getDirectTeam()
      .then(res => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <TableContainer title="Direct Referral" isLoading={loading}>
      <table className="w-full text-left border-collapse">
        <TableHeader>
          <Th>Sr No</Th>
          <Th>UserID</Th>
          <Th>Username</Th>
          <Th>Country</Th>
          <Th>Contact</Th>
          <Th>Email</Th>
          <Th>Position</Th>
          <Th>Total Active</Th>
          <Th>Total Purchase</Th>
          <Th>Joining Date</Th>
        </TableHeader>
        <tbody className="divide-y divide-nexus-primary/10">
          {data.map((member) => (
            <tr key={member.id} className="hover:bg-white/5 transition-colors text-white border-b border-nexus-primary/10">
              <Td>{member.slNo}</Td>
              <Td>{member.userId}</Td>
              <Td>{member.name}</Td>
              <Td>{member.country}</Td>
              <Td>{member.contact}</Td>
              <Td>{member.email}</Td>
              <Td>{member.position}</Td>
              <Td>{member.totalActive}</Td>
              <Td>{member.totalPurchase}</Td>
              <Td>{member.joinDate}</Td>
            </tr>
          ))}
          {data.length === 0 && !loading && (
            <tr>
              <td colSpan={10} className="text-center py-8 text-nexus-muted">No records found</td>
            </tr>
          )}
        </tbody>
      </table>
    </TableContainer>
  );
};

export const TeamDownlineMember: React.FC = () => {
  const [data, setData] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    teamService.getDownlineTeam()
      .then(res => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <TableContainer title="Downline Member" isLoading={loading}>
      <table className="w-full text-left border-collapse">
        <TableHeader>
          <Th>Sr No</Th>
          <Th>UserID</Th>
          <Th>Username</Th>
          <Th>Sponsor ID</Th>
          <Th>Country</Th>
          <Th>Contact</Th>
          <Th>Email</Th>
          <Th>Position</Th>
          <Th>Total Active</Th>
          <Th>Total Purchase</Th>
          <Th>Joining Date</Th>
        </TableHeader>
        <tbody className="divide-y divide-nexus-primary/10">
          {data.map((member) => (
            <tr key={member.id} className="hover:bg-white/5 transition-colors text-white border-b border-nexus-primary/10">
              <Td>{member.slNo}</Td>
              <Td>{member.userId}</Td>
              <Td>{member.name}</Td>
              <Td>{member.sponsorId}</Td>
              <Td>{member.country}</Td>
              <Td>{member.contact}</Td>
              <Td>{member.email}</Td>
              <Td>{member.position}</Td>
              <Td>{member.totalActive}</Td>
              <Td>{member.totalPurchase}</Td>
              <Td>{member.joinDate}</Td>
            </tr>
          ))}
          {data.length === 0 && !loading && (
            <tr>
              <td colSpan={11} className="text-center py-8 text-nexus-muted">No records found</td>
            </tr>
          )}
        </tbody>
      </table>
    </TableContainer>
  );
};