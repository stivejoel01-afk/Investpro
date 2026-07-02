'use client'

import { useParams } from 'next/navigation'
import DashboardLayout from '@/app/components/DashboardLayout'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import Link from 'next/link'
import { INVESTMENT_PLANS, formatCurrency } from '@/lib/utils'
import { FiArrowLeft } from 'react-icons/fi'

export default function InvestPlan() {
  const params = useParams()
  const planId = params.planId as string
  const plan = INVESTMENT_PLANS.find((p) => p.id === planId)

  if (!plan) {
    return (
      <>
        <Header />
        <DashboardLayout>
          <div className="text-center">Plan non trouvé</div>
        </DashboardLayout>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <DashboardLayout>
        <div className="max-w-2xl">
          <Link href="/dashboard/plans" className="flex items-center space-x-2 text-primary hover:underline mb-6">
            <FiArrowLeft size={20} />
            <span>Retour aux plans</span>
          </Link>

          <div className="card p-8">
            <h1 className="text-4xl font-bold text-primary mb-2">{plan.name}</h1>
            <p className="text-gray-600 mb-8">{plan.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <p className="text-sm text-gray-600 mb-1">Montant d'investissement</p>
                <p className="text-3xl font-bold text-primary">{formatCurrency(plan.price)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Revenu quotidien</p>
                <p className="text-3xl font-bold text-secondary">{formatCurrency(plan.dailyRevenue)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Durée</p>
                <p className="text-3xl font-bold text-blue-600">{plan.duration} jours</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Revenu total</p>
                <p className="text-3xl font-bold text-purple-600">
                  {formatCurrency(plan.dailyRevenue * plan.duration)}
                </p>
              </div>
            </div>

            <div className="bg-lightbg p-6 rounded-lg mb-8">
              <h3 className="font-semibold text-primary mb-4">Ce qui est inclus :</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-secondary rounded-full"></span>
                  <span>Revenus automatiques chaque jour</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-secondary rounded-full"></span>
                  <span>Accès au tableau de bord en temps réel</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-secondary rounded-full"></span>
                  <span>Bonus de parrainage</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-secondary rounded-full"></span>
                  <span>Support client 24/7</span>
                </li>
              </ul>
            </div>

            <Link
              href="/dashboard/deposit"
              className="btn-primary w-full text-center block mb-4"
            >
              Procéder au dépôt
            </Link>
            <Link
              href="/dashboard/plans"
              className="btn-outline w-full text-center block"
            >
              Voir d'autres plans
            </Link>
          </div>
        </div>
      </DashboardLayout>
      <Footer />
    </>
  )
}
