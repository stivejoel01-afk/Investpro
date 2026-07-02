export interface User {
  uid: string
  email: string
  displayName?: string
  createdAt: Date
}

export interface UserData {
  uid: string
  fullName: string
  email: string
  phone: string
  balance: number
  totalDeposits: number
  totalWithdrawals: number
  totalRevenue: number
  referralCode: string
  referralBonus: number
  referrals: string[]
  kycStatus: 'pending' | 'verified' | 'rejected'
  createdAt: Date
  updatedAt: Date
  blocked: boolean
}

export interface Investment {
  id: string
  uid: string
  planId: string
  amount: number
  dailyRevenue: number
  startDate: Date
  endDate: Date
  totalRevenue: number
  isActive: boolean
  createdAt: Date
}

export interface Plan {
  id: string
  name: string
  price: number
  dailyRevenue: number
  duration: number
  description?: string
  active: boolean
}

export interface Transaction {
  id: string
  uid: string
  type: 'deposit' | 'withdrawal'
  amount: number
  method: 'mtn' | 'orange' | 'card'
  status: 'pending' | 'completed' | 'rejected'
  reference: string
  createdAt: Date
  updatedAt: Date
}

export interface Notification {
  id: string
  uid: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: Date
}

export interface AdminStats {
  totalUsers: number
  totalDeposits: number
  totalWithdrawals: number
  totalRevenue: number
  activeInvestments: number
  pendingTransactions: number
}
