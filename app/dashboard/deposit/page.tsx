'use client'

import { useState } from 'react'
import DashboardLayout from '@/app/components/DashboardLayout'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { FiCopy, FiCheck } from 'react-icons/fi'
import { useNotificationStore } from '@/lib/store'
import { formatCurrency } from '@/lib/utils'

export default function Deposit() {
  const addNotification = useNotificationStore((state) => state.addNotification)
  const [method, setMethod] = useState('mtn')
  const [amount, setAmount] = useState('')
  const [copied, setCopied] = useState(false)

  const methods = [
    {
      id: 'mtn',
      name: 'MTN Mobile Money',
      icon: '📱',
      number: '+228 XX XXX XXXX',
      description: 'Transférez directement via MTN',
    },
    {
      id: 'orange',
      name: 'Orange Money',
      icon: '🟠',
      number: '+228 XX XXX XXXX',
      description: 'Transférez via Orange Money',
    },
    {
      id: 'card',
      name: 'Carte Bancaire',
      icon: '💳',
      number: 'Paiement sécurisé',
      description: 'Paiement par carte de crédit',
    },
  ]

  const selectedMethod = methods.find((m) => m.id === method)

  const handleCopy = () => {
    if (selectedMethod?.number) {
      navigator.clipboard.writeText(selectedMethod.number)
      setCopied(true)
      addNotification('Numéro copié !', 'success')
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount || parseFloat(amount) < 500) {
      addNotification('Le montant minimum est 500 FCFA', 'error')
      return
    }
    addNotification('Demande de dépôt envoyée. Vérification en cours...', 'info')
  }

  return (
    <>
      <Header />
      <DashboardLayout>
        <div className="max-w-2xl space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Dépôt</h1>
            <p className="text-gray-600">Ajoutez des fonds à votre compte</p>
          </div>

          <div className="card p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Choisissez une méthode de paiement</h2>

            {/* Payment Methods */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {methods.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`p-4 rounded-lg border-2 transition ${
                    method === m.id
                      ? 'border-secondary bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{m.icon}</div>
                  <h3 className="font-semibold text-primary">{m.name}</h3>
                  <p className="text-sm text-gray-600">{m.description}</p>
                </button>
              ))}
            </div>

            {/* Payment Details */}
            {selectedMethod && (
              <div className="bg-lightbg p-6 rounded-lg mb-8">
                <h3 className="font-semibold text-primary mb-4">Détails du paiement</h3>
                <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Numéro de destination</p>
                    <p className="font-mono font-semibold">{selectedMethod.number}</p>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                  >
                    {copied ? (
                      <FiCheck className="text-secondary" size={20} />
                    ) : (
                      <FiCopy className="text-gray-600" size={20} />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Amount Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Montant à déposer (FCFA)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="input-field"
                  placeholder="Montant minimum: 500 FCFA"
                  min="500"
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Confirmer le dépôt
              </button>
            </form>

            {/* Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-8">
              <h4 className="font-semibold text-blue-900 mb-2">ℹ️ Information importante</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Montant minimum: 500 FCFA</li>
                <li>• Les dépôts sont vérifiés dans les 5-10 minutes</li>
                <li>• Frais de transaction: 0%</li>
                <li>• Vos fonds seront crédités automatiquement</li>
              </ul>
            </div>
          </div>
        </div>
      </DashboardLayout>
      <Footer />
    </>
  )
}
