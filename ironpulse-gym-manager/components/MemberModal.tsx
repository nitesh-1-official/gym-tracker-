import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { Member, PlanDuration, MemberStatus } from '../types';

interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member?: Member | null;
  onSave: (member: Partial<Member>) => void;
}

const MemberModal: React.FC<MemberModalProps> = ({ isOpen, onClose, member, onSave }) => {
  const [formData, setFormData] = useState<Partial<Member>>(
    member || {
      fullName: '',
      email: '',
      phone: '',
      planDuration: PlanDuration.THREE_MONTHS,
      status: MemberStatus.ACTIVE,
      balanceDue: 0
    }
  );

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-gym-800 border border-gym-700 rounded-xl shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gym-700">
          <h2 className="text-xl font-bold text-white">
            {member ? 'Edit Member' : 'Add New Member'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gym-900 border border-gym-700 rounded-lg focus:outline-none focus:border-gym-accent text-white placeholder-slate-500"
              placeholder="John Doe"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gym-900 border border-gym-700 rounded-lg focus:outline-none focus:border-gym-accent text-white placeholder-slate-500"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gym-900 border border-gym-700 rounded-lg focus:outline-none focus:border-gym-accent text-white placeholder-slate-500"
                placeholder="+1 234 567 8900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Plan Duration (Months)</label>
              <select
                name="planDuration"
                value={formData.planDuration}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gym-900 border border-gym-700 rounded-lg focus:outline-none focus:border-gym-accent text-white"
              >
                <option value={1}>1 Month</option>
                <option value={3}>3 Months</option>
                <option value={6}>6 Months</option>
                <option value={12}>12 Months</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gym-900 border border-gym-700 rounded-lg focus:outline-none focus:border-gym-accent text-white"
              >
                <option value={MemberStatus.ACTIVE}>Active</option>
                <option value={MemberStatus.EXPIRED}>Expired</option>
                <option value={MemberStatus.PENDING}>Pending</option>
              </select>
            </div>
          </div>

           <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Balance Due ($)</label>
              <input
                type="number"
                name="balanceDue"
                min="0"
                value={formData.balanceDue}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gym-900 border border-gym-700 rounded-lg focus:outline-none focus:border-gym-accent text-white placeholder-slate-500"
              />
            </div>

          <div className="flex justify-end pt-4 mt-4 border-t border-gym-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mr-3 text-sm font-medium text-slate-300 transition-colors rounded-lg hover:text-white hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center px-6 py-2 text-sm font-medium text-white transition-all bg-gym-accent rounded-lg hover:bg-gym-accentHover focus:ring-2 focus:ring-offset-2 focus:ring-gym-accent focus:ring-offset-gym-800"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberModal;