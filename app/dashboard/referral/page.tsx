'use client'

import { useState } from 'react'
import DashboardLayout from '@/app/components/DashboardLayout'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { FiCopy, FiCheck } from 'react-icons/fi'
import { useNotificationStore } from '@/lib/store'
import { formatCurrency } from '@/lib/utils'

export default function Referral() {
  const addNotification = useNotificationStore((state) => state.addNotification)
  const [copied, setCopied] = useState(false)

  const referralCode = 'INVESTOR2024'
  const referralLink = `https://investpro.com/signup?ref=${referralCode}`

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    addNotification('Copié dans le presse-papiers !', 'success')
    setTimeout(() => setCopied(false), 2000)
  }

  const referrals = [
    { name: 'Kofi Mensah', date: '2024-01-15', earnings: 500 },
    { name: 'Ama Boateng', date: '2024-01-10', earnings: 500 },
    { name: 'Nii Ayirebi', date: '2024-01-05', earnings: 500 },
  ]

  return (
    <>
      <Header />
      <DashboardLayout>
        <div className="max-w-4xl space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Programme de parrainage</h1>
            <p className="text-gray-600">Gagnez 500 FCFA pour chaque ami parrainé</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-6">
              <p className="text-gray-600 text-sm mb-2">Total de filleuls</p>
              <p className="text-4xl font-bold text-primary">12</p>
            </div>
            <div className="card p-6">
              <p className="text-gray-600 text-sm mb-2">Bonus gagnés</p>
              <p className="text-4xl font-bold text-secondary">{formatCurrency(6000)}</p>
            </div>
            <div className="card p-6">
              <p className="text-gray-600 text-sm mb-2">En attente de validation</p>
              <p className="text-4xl font-bold text-blue-600">2</p>
            </div>
          </div>

          {/* Referral Links */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Votre lien de parrainage</h2>

            <div className="space-y-4">
              {/* Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Code de parrainage
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={referralCode}
                    readOnly
                    className="input-field flex-1 bg-gray-50"
                  />
                  <button
                    onClick={() => handleCopy(referralCode)}
                    className="p-3 hover:bg-gray-100 rounded-lg transition"
                  >
                    {copied ? (
                      <FiCheck className="text-secondary" size={20} />
                    ) : (
                      <FiCopy className="text-gray-600" size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lien de parrainage
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={referralLink}
                    readOnly
                    className="input-field flex-1 bg-gray-50 text-sm"
                  />
                  <button
                    onClick={() => handleCopy(referralLink)}
                    className="p-3 hover:bg-gray-100 rounded-lg transition"
                  >
                    {copied ? (
                      <FiCheck className="text-secondary" size={20} />
                    ) : (
                      <FiCopy className="text-gray-600" size={20} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* How it works */}
            <div className="mt-8 pt-8 border-t">
              <h3 className="font-bold text-primary mb-4">Comment ça fonctionne</h3>
              <ol className="space-y-3 text-sm">
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center font-bold text-xs">
                    1
                  </span>
                  <span>Partagez votre lien de parrainage avec vos amis</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center font-bold text-xs">
                    2
                  </span>
                  <span>Vos amis s'inscrivent et font leur premier dépôt</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center font-bold text-xs">
                    3
                  </span>
                  <span>Vous recevez 500 FCFA de bonus pour chaque filleul actif</span>
                </li>
              </ol>
            </div>
          </div>

          {/* Referral List */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Mes filleuls actifs</h2>
            <div className="space-y-3">
              {referrals.map((referral, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-lightbg rounded-lg">
                  <div>
                    <p className="font-semibold text-primary">{referral.name}</p>
                    <p className="text-sm text-gray-600">{referral.date}</p>
                  </div>
                  <p className="font-bold text-secondary">+{formatCurrency(referral.earnings)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
      <Footer />
    </>
  )
}
