'use client'

import { ReactNode, useState, useEffect } from 'react'
import { useAuthStore } from '@/lib/store'
import { setupAuthListener } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiLogOut, FiMenu, FiX, FiHome, FiTrendingUp, FiDownload, FiUpload, FiUsers, FiHistory, FiBell, FiUser } from 'react-icons/fi'
import { logout } from '@/lib/auth'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { user, loading, setUser, setLoading } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const unsubscribe = setupAuthListener((authUser) => {
      if (authUser) {
        setUser(authUser)
        setLoading(false)
      } else {
        setUser(null)
        setLoading(false)
        router.push('/login')
      }
    })

    return unsubscribe
  }, [router, setUser, setLoading])

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  const menuItems = [
    { icon: <FiHome size={20} />, label: 'Tableau de bord', href: '/dashboard' },
    { icon: <FiTrendingUp size={20} />, label: 'Plans d\'investissement', href: '/dashboard/plans' },
    { icon: <FiDownload size={20} />, label: 'Dépôt', href: '/dashboard/deposit' },
    { icon: <FiUpload size={20} />, label: 'Retrait', href: '/dashboard/withdraw' },
    { icon: <FiUsers size={20} />, label: 'Parrainage', href: '/dashboard/referral' },
    { icon: <FiHistory size={20} />, label: 'Historique', href: '/dashboard/history' },
    { icon: <FiBell size={20} />, label: 'Notifications', href: '/dashboard/notifications' },
    { icon: <FiUser size={20} />, label: 'Profil', href: '/dashboard/profile' },
  ]

  if (loading) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-lightbg">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-primary text-white shadow-lg transform transition-transform duration-300 z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0`}
      >
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center font-bold">
              IP
            </div>
            <span className="font-bold text-lg">InvestPro</span>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-900 transition group"
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-blue-800">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition"
          >
            <FiLogOut size={20} />
            <span className="text-sm font-medium">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed bottom-6 right-6 p-3 bg-primary text-white rounded-full shadow-lg md:hidden z-30"
      >
        {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-auto">{children}</main>
    </div>
  )
}
