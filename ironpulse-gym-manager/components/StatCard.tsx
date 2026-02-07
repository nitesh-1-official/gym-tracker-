import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ComponentType<any>;
  trend?: 'up' | 'down';
  trendValue?: string;
  color?: string; // Hex or tailwind class text-color
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon, trend, trendValue, color = 'text-gym-accent' }) => {
  return (
    <div className="p-6 bg-gym-800 border border-gym-700 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">{label}</h3>
        <div className={`p-2 rounded-lg bg-slate-700/30 ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div className="text-3xl font-bold text-white">{value}</div>
        {trend && (
          <div className={`flex items-center text-sm font-medium ${trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
            <span>{trend === 'up' ? '↑' : '↓'}</span>
            <span className="ml-1">{trendValue}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;