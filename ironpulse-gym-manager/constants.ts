import { Member, MemberStatus, PlanDuration, Payment } from './types';

// Helper to add days to a date
const addDays = (dateStr: string, days: number): string => {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

const TODAY = new Date().toISOString().split('T')[0];

export const MOCK_MEMBERS: Member[] = [
  {
    id: 'm1',
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1 555-0101',
    joinDate: '2023-01-15',
    planDuration: PlanDuration.TWELVE_MONTHS,
    lastPaymentDate: '2023-01-15',
    expiryDate: addDays(TODAY, 120),
    status: MemberStatus.ACTIVE,
    balanceDue: 0,
  },
  {
    id: 'm2',
    fullName: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 555-0102',
    joinDate: '2023-06-10',
    planDuration: PlanDuration.THREE_MONTHS,
    lastPaymentDate: '2023-06-10',
    expiryDate: addDays(TODAY, -5), // Expired
    status: MemberStatus.EXPIRED,
    balanceDue: 0,
  },
  {
    id: 'm3',
    fullName: 'Robert Johnson',
    email: 'rob@example.com',
    phone: '+1 555-0103',
    joinDate: '2023-08-01',
    planDuration: PlanDuration.SIX_MONTHS,
    lastPaymentDate: '2023-08-01',
    expiryDate: addDays(TODAY, 2), // Expiring Soon
    status: MemberStatus.ACTIVE,
    balanceDue: 0,
  },
  {
    id: 'm4',
    fullName: 'Emily Davis',
    email: 'emily@example.com',
    phone: '+1 555-0104',
    joinDate: '2023-09-15',
    planDuration: PlanDuration.ONE_MONTH,
    lastPaymentDate: '2023-09-15',
    expiryDate: addDays(TODAY, 20),
    status: MemberStatus.ACTIVE,
    balanceDue: 50,
  },
  {
    id: 'm5',
    fullName: 'Michael Brown',
    email: 'mike@example.com',
    phone: '+1 555-0105',
    joinDate: '2023-05-20',
    planDuration: PlanDuration.TWELVE_MONTHS,
    lastPaymentDate: '2023-05-20',
    expiryDate: addDays(TODAY, 200),
    status: MemberStatus.ACTIVE,
    balanceDue: 0,
  },
  {
    id: 'm6',
    fullName: 'Sarah Wilson',
    email: 'sarah@example.com',
    phone: '+1 555-0106',
    joinDate: '2023-10-01',
    planDuration: PlanDuration.THREE_MONTHS,
    lastPaymentDate: '2023-10-01',
    expiryDate: addDays(TODAY, 1), // Expiring tomorrow
    status: MemberStatus.ACTIVE,
    balanceDue: 0,
  },
];

export const MOCK_PAYMENTS: Payment[] = [
  { id: 'p1', memberId: 'm1', amount: 500, date: '2023-01-15', method: 'Card' },
  { id: 'p2', memberId: 'm2', amount: 150, date: '2023-06-10', method: 'Cash' },
  { id: 'p3', memberId: 'm3', amount: 280, date: '2023-08-01', method: 'UPI' },
  { id: 'p4', memberId: 'm4', amount: 50, date: '2023-09-15', method: 'Cash' },
  { id: 'p5', memberId: 'm5', amount: 500, date: '2023-05-20', method: 'Card' },
];

export const DASHBOARD_STATS_MOCK = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 2000 },
  { name: 'Apr', revenue: 2780 },
  { name: 'May', revenue: 1890 },
  { name: 'Jun', revenue: 2390 },
  { name: 'Jul', revenue: 3490 },
];