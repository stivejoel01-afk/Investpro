'use client'

import { useState } from 'react'
import DashboardLayout from '@/app/components/DashboardLayout'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { useNotificationStore } from '@/lib/store'
import { formatCurrency } from '@/lib/utils'

export default function Withdraw() {
  const addNotification = useNotificationStore((state) => state.addNotification)
  const [network, setNetwork] = useState('mtn')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)

  const networks = [
    { id: 'mtn', name: 'MTN Mobile Money', prefix: '+228' },
    { id: 'orange', name: 'Orange Money', prefix: '+228' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!phoneNumber || !amount) {
      addNotification('Veuillez remplir tous les champs', 'error')
      return
    }

    if (parseFloat(amount) < 1000) {
      addNotification('Montant minimum: 1000 FCFA', 'error')
      return
    }

    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      addNotification('Demande de retrait soumise avec succès !', 'success')
      setPhoneNumber('')
      setAmount('')
    } catch (error) {
      addNotification('Erreur lors du retrait', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <DashboardLayout>
        <div className="max-w-2xl space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Retrait</h1>
            <p className="text-gray-600">Retirez vos revenus en toute sécurité</p>
          </div>

          <div className="card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Network Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Choisissez un réseau
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {networks.map((net) => (
                    <button
                      key={net.id}
                      type="button"
                      onClick={() => setNetwork(net.id)}
                      className={`p-4 rounded-lg border-2 transition font-semibold ${
                        network === net.id
                          ? 'border-secondary bg-green-50 text-primary'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {net.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Numéro Mobile Money
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="input-field"
                  placeholder="+228 XX XXX XXXX"
                  required
                />
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Montant à retirer (FCFA)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="input-field"
                  placeholder="Montant minimum: 1000 FCFA"
                  min="1000"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50"
              >
                {loading ? 'Traitement en cours...' : 'Demander le retrait'}
              </button>
            </form>

            {/* Withdrawal History */}
            <div className="mt-8 pt-8 border-t">
              <h3 className="font-bold text-primary mb-4">Historique des retraits</h3>
              <div className="space-y-3">
                {[
                  { date: '2024-01-15', amount: 5000, status: 'Complété', network: 'MTN' },
                  { date: '2024-01-10', amount: 3000, status: 'Complété', network: 'Orange' },
                  { date: '2024-01-05', amount: 2000, status: 'En attente', network: 'MTN' },
                ].map((withdrawal, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-lightbg rounded-lg">
                    <div>
                      <p className="font-semibold text-primary">{withdrawal.network}</p>
                      <p className="text-sm text-gray-600">{withdrawal.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{formatCurrency(withdrawal.amount)}</p>
                      <p className={`text-sm ${
                        withdrawal.status === 'Complété'
                          ? 'text-green-600'
                          : 'text-yellow-600'
                      }`}>
                        {withdrawal.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
      <Footer />
    </>
  )
}
