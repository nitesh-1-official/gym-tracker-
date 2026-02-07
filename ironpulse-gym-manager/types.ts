import React from 'react';

export enum PlanDuration {
  ONE_MONTH = 1,
  THREE_MONTHS = 3,
  SIX_MONTHS = 6,
  TWELVE_MONTHS = 12,
}

export enum MemberStatus {
  ACTIVE = 'Active',
  EXPIRED = 'Expired',
  PENDING = 'Pending',
}

export interface Payment {
  id: string;
  memberId: string;
  amount: number;
  date: string; // ISO date string
  method: 'Cash' | 'Card' | 'UPI';
}

export interface Member {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  joinDate: string;
  planDuration: PlanDuration;
  lastPaymentDate: string;
  expiryDate: string;
  status: MemberStatus;
  balanceDue: number; // 0 means paid
  notes?: string;
}

export interface StatMetric {
  label: string;
  value: string | number;
  change?: string; // e.g. "+12%"
  trend?: 'up' | 'down' | 'neutral';
  icon: React.ComponentType<any>;
  color: string;
}