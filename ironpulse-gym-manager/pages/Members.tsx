import React, { useState, useMemo } from 'react';
import { Search, Plus, Filter, MoreVertical, Edit, Trash } from 'lucide-react';
import { MOCK_MEMBERS } from '../constants.ts';
import { Member, MemberStatus } from '../types.ts';
import MemberModal from '../components/MemberModal';

const Members: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | MemberStatus>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  
  // Local state for members to simulate CRUD
  const [members, setMembers] = useState<Member[]>(MOCK_MEMBERS);

  const filteredMembers = useMemo(() => {
    return members.filter(member => {
      const matchesSearch = member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            member.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || member.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [members, searchTerm, statusFilter]);

  const handleAddMember = (newMemberData: Partial<Member>) => {
    const newMember: Member = {
      id: `m${Date.now()}`,
      fullName: newMemberData.fullName || '',
      email: newMemberData.email || '',
      phone: newMemberData.phone || '',
      joinDate: new Date().toISOString().split('T')[0],
      planDuration: newMemberData.planDuration || 3,
      lastPaymentDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + (newMemberData.planDuration || 3) * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: newMemberData.status || MemberStatus.ACTIVE,
      balanceDue: newMemberData.balanceDue || 0,
    };
    setMembers([newMember, ...members]);
  };

  const handleEditMember = (updatedData: Partial<Member>) => {
    if (!editingMember) return;
    setMembers(members.map(m => m.id === editingMember.id ? { ...m, ...updatedData } : m));
    setEditingMember(null);
  };

  const openEditModal = (member: Member) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMember(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Members Directory</h1>
          <p className="text-slate-400">Manage your gym members and subscriptions</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center px-4 py-2 bg-gym-accent text-white rounded-lg hover:bg-gym-accentHover transition-colors shadow-lg shadow-gym-accent/20"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Member
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-gym-800 border border-gym-700 rounded-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gym-900 border border-gym-700 rounded-lg text-white focus:outline-none focus:border-gym-accent"
          />
        </div>
        <div className="flex items-center space-x-2 overflow-x-auto">
          <Filter className="w-5 h-5 text-slate-400" />
          {['ALL', MemberStatus.ACTIVE, MemberStatus.EXPIRED, MemberStatus.PENDING].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status as any)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                statusFilter === status 
                  ? 'bg-gym-accent text-white' 
                  : 'bg-gym-900 text-slate-400 hover:text-white'
              }`}
            >
              {status === 'ALL' ? 'All Members' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden bg-gym-800 border border-gym-700 rounded-xl shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gym-900/50 border-b border-gym-700 text-slate-400 text-sm uppercase tracking-wider">
                <th className="p-4 font-medium">Member</th>
                <th className="p-4 font-medium">Plan</th>
                <th className="p-4 font-medium">Joined</th>
                <th className="p-4 font-medium">Expiry</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Dues</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gym-700">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gym-700/30 transition-colors text-sm">
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold mr-3">
                        {member.fullName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-white">{member.fullName}</div>
                        <div className="text-slate-500 text-xs">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-300">{member.planDuration} Months</td>
                  <td className="p-4 text-slate-400">{member.joinDate}</td>
                  <td className="p-4 text-slate-300 font-medium">{member.expiryDate}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      member.status === MemberStatus.ACTIVE ? 'bg-emerald-500/10 text-emerald-400' :
                      member.status === MemberStatus.EXPIRED ? 'bg-red-500/10 text-red-400' :
                      'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {member.balanceDue > 0 ? (
                      <span className="text-red-400 font-medium">${member.balanceDue}</span>
                    ) : (
                      <span className="text-emerald-400">Paid</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => openEditModal(member)}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredMembers.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    No members found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <MemberModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        member={editingMember}
        onSave={editingMember ? handleEditMember : handleAddMember}
      />
    </div>
  );
};

export default Members;