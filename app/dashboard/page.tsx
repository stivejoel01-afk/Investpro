'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '@/lib/store'
import { setupAuthListener, getUserData } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import DashboardLayout from '@/app/components/DashboardLayout'
import { FiTrendingUp, FiDownload, FiUpload, FiUsers } from 'react-icons/fi'
import { formatCurrency, formatDate } from '@/lib/utils'
import { UserData } from '@/types/index'

export default function Dashboard() {
  const router = useRouter()
  const { user, loading, setUser, setLoading } = useAuthStore()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = setupAuthListener(async (authUser) => {
      if (authUser) {
        setUser(authUser)
        const data = await getUserData(authUser.uid)
        setUserData(data)
        setLoading(false)
      } else {
        setUser(null)
        setLoading(false)
        router.push('/login')
      }
      setDataLoading(false)
    })

    return unsubscribe
  }, [router, setUser, setLoading])

  if (loading || dataLoading) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </>
    )
  }

  if (!user || !userData) {
    return null
  }

  const stats = [
    {
      title: 'Solde principal',
      value: formatCurrency(userData.balance),
      icon: <FiTrendingUp size={24} />,
      color: 'text-primary',
    },
    {
      title: 'Revenus du jour',
      value: formatCurrency(Math.floor(userData.totalRevenue / 30)),
      icon: <FiTrendingUp size={24} />,
      color: 'text-secondary',
    },
    {
      title: 'Revenus totaux',
      value: formatCurrency(userData.totalRevenue),
      icon: <FiTrendingUp size={24} />,
      color: 'text-blue-600',
    },
    {
      title: 'Filleuls',
      value: userData.referrals.length.toString(),
      icon: <FiUsers size={24} />,
      color: 'text-purple-600',
    },
  ]

  return (
    <>
      <Header />
      <DashboardLayout>
        <div className="space-y-8">
          {/* Welcome Section */}
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Bienvenue, {userData.fullName}!</h1>
            <p className="text-gray-600">Voici un aperçu de votre portefeuille d'investissement</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="card p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  </div>
                  <div className={`${stat.color}`}>{stat.icon}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="/dashboard/deposit" className="card p-6 text-center hover:shadow-lg transition cursor-pointer">
              <FiDownload className="text-secondary text-3xl mx-auto mb-3" />
              <h3 className="font-semibold text-primary mb-1">Dépôt</h3>
              <p className="text-sm text-gray-600">Ajouter des fonds</p>
            </a>
            <a href="/dashboard/withdraw" className="card p-6 text-center hover:shadow-lg transition cursor-pointer">
              <FiUpload className="text-primary text-3xl mx-auto mb-3" />
              <h3 className="font-semibold text-primary mb-1">Retrait</h3>
              <p className="text-sm text-gray-600">Retirer vos revenus</p>
            </a>
            <a href="/dashboard/referral" className="card p-6 text-center hover:shadow-lg transition cursor-pointer">
              <FiUsers className="text-blue-600 text-3xl mx-auto mb-3" />
              <h3 className="font-semibold text-primary mb-1">Parrainage</h3>
              <p className="text-sm text-gray-600">Gagnez des bonus</p>
            </a>
          </div>

          {/* Account Info */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold text-primary mb-4">Informations du compte</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Email</p>
                <p className="font-semibold">{userData.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Téléphone</p>
                <p className="font-semibold">{userData.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Code de parrainage</p>
                <p className="font-semibold">{userData.referralCode}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Statut KYC</p>
                <span className={`badge-${userData.kycStatus === 'verified' ? 'success' : userData.kycStatus === 'rejected' ? 'danger' : 'warning'}`}>
                  {userData.kycStatus === 'verified' ? 'Vérifié' : userData.kycStatus === 'rejected' ? 'Rejété' : 'En attente'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
      <Footer />
    </>
  )
}
