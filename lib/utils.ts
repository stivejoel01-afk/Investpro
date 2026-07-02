import { Plan, Investment } from '@/types/index'

export const generateReferralCode = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
  }).format(amount)
}

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export const calculateDaysRemaining = (endDate: Date): number => {
  const now = new Date()
  const diff = new Date(endDate).getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export const calculateTotalRevenue = (investments: Investment[]): number => {
  return investments.reduce((total, inv) => total + inv.totalRevenue, 0)
}

export const INVESTMENT_PLANS: Plan[] = [
  {
    id: '1',
    name: 'Plan Bronze',
    price: 3500,
    dailyRevenue: 500,
    duration: 30,
    description: 'Parfait pour débuter',
    active: true,
  },
  {
    id: '2',
    name: 'Plan Argent',
    price: 10000,
    dailyRevenue: 1500,
    duration: 30,
    description: 'Bon retour sur investissement',
    active: true,
  },
  {
    id: '3',
    name: 'Plan Or',
    price: 25000,
    dailyRevenue: 4000,
    duration: 30,
    description: 'Rendement élevé',
    active: true,
  },
  {
    id: '4',
    name: 'Plan Platine',
    price: 50000,
    dailyRevenue: 8500,
    duration: 30,
    description: 'Maximum de rendement',
    active: true,
  },
]

export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  return phone.length >= 9
}

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}
