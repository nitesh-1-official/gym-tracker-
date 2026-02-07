import React from 'react';
import { 
  Users, 
  UserX, 
  Clock, 
  CreditCard, 
  AlertCircle, 
  TrendingUp 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import StatCard from '../components/StatCard';
import { MOCK_MEMBERS, DASHBOARD_STATS_MOCK } from '../constants.ts';
import { MemberStatus } from '../types.ts';

const Dashboard: React.FC = () => {
  // Calculate real-time stats from mock data
  const totalMembers = MOCK_MEMBERS.length;
  const activeMembers = MOCK_MEMBERS.filter(m => m.status === MemberStatus.ACTIVE).length;
  const expiredMembers = MOCK_MEMBERS.filter(m => m.status === MemberStatus.EXPIRED).length;
  
  // Calculate expiring soon (next 7 days)
  const today = new Date();
  const expiringSoon = MOCK_MEMBERS.filter(m => {
    const expiry = new Date(m.expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7 && m.status === MemberStatus.ACTIVE;
  }).length;

  const unpaidMembers = MOCK_MEMBERS.filter(m => m.balanceDue > 0).length;

  // Simple revenue calc (just sum of mock payments would be better, but using static mock for trend chart)
  const currentMonthRevenue = "$4,250";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <div className="text-sm text-slate-400">Last updated: Just now</div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard 
          label="Total Members" 
          value={totalMembers} 
          icon={Users} 
          color="text-blue-400"
        />
        <StatCard 
          label="Active Members" 
          value={activeMembers} 
          icon={TrendingUp} 
          trend="up" 
          trendValue="12% vs last month"
          color="text-emerald-400"
        />
        <StatCard 
          label="Monthly Revenue" 
          value={currentMonthRevenue} 
          icon={CreditCard} 
          trend="up" 
          trendValue="5%"
          color="text-purple-400"
        />
        <StatCard 
          label="Expiring Soon" 
          value={expiringSoon} 
          icon={Clock} 
          color="text-yellow-400"
        />
        <StatCard 
          label="Expired" 
          value={expiredMembers} 
          icon={UserX} 
          color="text-red-400"
        />
        <StatCard 
          label="Unpaid Dues" 
          value={unpaidMembers} 
          icon={AlertCircle} 
          color="text-orange-400"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <div className="p-6 bg-gym-800 border border-gym-700 rounded-xl shadow-lg">
          <h3 className="mb-6 text-lg font-semibold text-white">Revenue Analytics</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DASHBOARD_STATS_MOCK}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#94a3b8" 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#94a3b8" 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `$${value}`} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                  itemStyle={{ color: '#10b981' }}
                  cursor={{fill: '#334155', opacity: 0.4}}
                />
                <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions / Recent Activity */}
        <div className="p-6 bg-gym-800 border border-gym-700 rounded-xl shadow-lg">
          <h3 className="mb-6 text-lg font-semibold text-white">Expiring Soon (Action Required)</h3>
          <div className="space-y-4">
             {MOCK_MEMBERS
               .filter(m => {
                 const expiry = new Date(m.expiryDate);
                 const diffTime = expiry.getTime() - today.getTime();
                 const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                 return diffDays >= 0 && diffDays <= 30 && m.status === MemberStatus.ACTIVE;
               })
               .slice(0, 5)
               .map(member => (
                 <div key={member.id} className="flex items-center justify-between p-3 rounded-lg bg-gym-900/50 border border-gym-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 font-bold">
                        {member.fullName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-white">{member.fullName}</p>
                        <p className="text-xs text-slate-400">Expires: {member.expiryDate}</p>
                      </div>
                    </div>
                    <button className="px-3 py-1 text-xs font-medium text-gym-accent border border-gym-accent rounded hover:bg-gym-accent hover:text-white transition-colors">
                      Remind
                    </button>
                 </div>
               ))
             }
             {MOCK_MEMBERS.filter(m => activeMembers === 0).length > 0 && <p className="text-slate-500 text-center py-4">No members expiring soon.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;