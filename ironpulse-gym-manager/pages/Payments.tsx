import React from 'react';
import { CreditCard, Download } from 'lucide-react';
import { MOCK_PAYMENTS, MOCK_MEMBERS } from '../constants.ts';

const Payments: React.FC = () => {
  // Enrich payment data with member names
  const enrichedPayments = MOCK_PAYMENTS.map(payment => {
    const member = MOCK_MEMBERS.find(m => m.id === payment.memberId);
    return { ...payment, memberName: member?.fullName || 'Unknown' };
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Payment History</h1>
          <p className="text-slate-400">Track all recent transactions</p>
        </div>
        <button className="flex items-center px-4 py-2 text-sm font-medium text-slate-300 bg-gym-800 border border-gym-700 rounded-lg hover:bg-gym-700 transition-colors">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </button>
      </div>

      <div className="overflow-hidden bg-gym-800 border border-gym-700 rounded-xl shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gym-900/50 border-b border-gym-700 text-slate-400 text-sm uppercase tracking-wider">
                <th className="p-4 font-medium">Transaction ID</th>
                <th className="p-4 font-medium">Member</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Method</th>
                <th className="p-4 font-medium text-right">Amount</th>
                <th className="p-4 font-medium text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gym-700">
              {enrichedPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gym-700/30 transition-colors text-sm">
                  <td className="p-4 text-slate-400 font-mono">#{payment.id.toUpperCase()}</td>
                  <td className="p-4 text-white font-medium">{payment.memberName}</td>
                  <td className="p-4 text-slate-400">{payment.date}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-700 text-slate-300">
                      <CreditCard className="w-3 h-3 mr-1" />
                      {payment.method}
                    </span>
                  </td>
                  <td className="p-4 text-right text-emerald-400 font-bold">
                    ${payment.amount.toFixed(2)}
                  </td>
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400">
                      Completed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payments;