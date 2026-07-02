'use client'

import { useState } from 'react'
import DashboardLayout from '@/app/components/DashboardLayout'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { formatCurrency, formatDate } from '@/lib/utils'
import { FiFilter } from 'react-icons/fi'

export default function History() {
  const [filter, setFilter] = useState('all')

  const transactions = [
    { id: 1, type: 'deposit', amount: 10000, date: new Date('2024-01-15'), status: 'completed' },
    { id: 2, type: 'revenue', amount: 1500, date: new Date('2024-01-14'), status: 'completed' },
    { id: 3, type: 'withdrawal', amount: 5000, date: new Date('2024-01-13'), status: 'completed' },
    { id: 4, type: 'revenue', amount: 1500, date: new Date('2024-01-12'), status: 'completed' },
    { id: 5, type: 'referral_bonus', amount: 500, date: new Date('2024-01-10'), status: 'completed' },
    { id: 6, type: 'deposit', amount: 25000, date: new Date('2024-01-05'), status: 'completed' },
  ]

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      deposit: 'Dépôt',
      withdrawal: 'Retrait',
      revenue: 'Revenu',
      referral_bonus: 'Bonus de parrainage',
    }
    return labels[type] || type
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'bg-blue-50 text-blue-700'
      case 'withdrawal':
        return 'bg-red-50 text-red-700'
      case 'revenue':
        return 'bg-green-50 text-green-700'
      case 'referral_bonus':
        return 'bg-purple-50 text-purple-700'
      default:
        return 'bg-gray-50 text-gray-700'
    }
  }

  const filteredTransactions = transactions.filter((t) => {
    if (filter === 'all') return true
    return t.type === filter
  })

  return (
    <>
      <Header />
      <DashboardLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Historique</h1>
            <p className="text-gray-600">Consultez tous vos dépôts, retraits et revenus</p>
          </div>

          {/* Filter */}
          <div className="card p-6">
            <div className="flex items-center space-x-2 mb-4">
              <FiFilter size={20} className="text-primary" />
              <h3 className="font-semibold text-primary">Filtrer par type</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'all', label: 'Tous' },
                { value: 'deposit', label: 'Dépôts' },
                { value: 'withdrawal', label: 'Retraits' },
                { value: 'revenue', label: 'Revenus' },
                { value: 'referral_bonus', label: 'Bonus' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilter(option.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    filter === option.value
                      ? 'bg-primary text-white'
                      : 'bg-lightbg text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Transactions List */}
          <div className="space-y-3">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <div key={transaction.id} className="card p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getTypeColor(
                          transaction.type
                        )}`}
                      >
                        {getTypeLabel(transaction.type)}
                      </div>
                      <div>
                        <p className="font-semibold text-primary">
                          {getTypeLabel(transaction.type)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatDate(transaction.date)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-xl font-bold ${
                        transaction.type === 'withdrawal'
                          ? 'text-red-600'
                          : 'text-green-600'
                      }`}>
                        {transaction.type === 'withdrawal' ? '-' : '+'}
                        {formatCurrency(transaction.amount)}
                      </p>
                      <p className="text-sm text-green-600 font-semibold">
                        ✓ {transaction.status === 'completed' ? 'Complété' : 'En attente'}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="card p-12 text-center">
                <p className="text-gray-600">Aucune transaction trouvée</p>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
      <Footer />
    </>
  )
}
