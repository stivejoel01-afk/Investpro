'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/app/components/DashboardLayout'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { INVESTMENT_PLANS, formatCurrency } from '@/lib/utils'
import { FiCheck } from 'react-icons/fi'
import Link from 'next/link'

export default function InvestmentPlans() {
  const plans = INVESTMENT_PLANS

  return (
    <>
      <Header />
      <DashboardLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Plans d'investissement</h1>
            <p className="text-gray-600">Choisissez le plan qui vous convient le mieux</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`card p-6 relative overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                  plan.id === '3' ? 'ring-2 ring-secondary' : ''
                }`}
              >
                {plan.id === '3' && (
                  <div className="absolute top-0 right-0 bg-secondary text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                    POPULAIRE
                  </div>
                )}

                <h3 className="text-2xl font-bold text-primary mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>

                <div className="mb-6">
                  <div className="text-4xl font-bold text-primary mb-1">
                    {formatCurrency(plan.price)}
                  </div>
                  <p className="text-sm text-gray-600">Investissement initial</p>
                </div>

                <div className="mb-6 space-y-3">
                  <div className="flex items-center space-x-2">
                    <FiCheck className="text-secondary" />
                    <span className="text-sm">
                      Revenu quotidien: <strong>{formatCurrency(plan.dailyRevenue)}</strong>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiCheck className="text-secondary" />
                    <span className="text-sm">
                      Durée: <strong>{plan.duration} jours</strong>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiCheck className="text-secondary" />
                    <span className="text-sm">
                      Revenu total: <strong>{formatCurrency(plan.dailyRevenue * plan.duration)}</strong>
                    </span>
                  </div>
                </div>

                <Link
                  href={`/dashboard/invest/${plan.id}`}
                  className={`block w-full py-3 rounded-lg font-semibold text-center transition ${
                    plan.id === '3'
                      ? 'btn-secondary'
                      : 'bg-gray-100 text-primary hover:bg-gray-200'
                  }`}
                >
                  Investir maintenant
                </Link>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
      <Footer />
    </>
  )
}
