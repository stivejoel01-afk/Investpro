'use client'

import { useState } from 'react'
import DashboardLayout from '@/app/components/DashboardLayout'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { FiCheckCircle, FiAlertCircle, FiInfo, FiTrash2 } from 'react-icons/fi'
import { useNotificationStore } from '@/lib/store'

export default function Notifications() {
  const addNotification = useNotificationStore((state) => state.addNotification)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Dépôt confirmé',
      message: 'Votre dépôt de 10,000 FCFA a été confirmé',
      date: new Date('2024-01-15'),
      read: false,
    },
    {
      id: 2,
      type: 'info',
      title: 'Revenu quotidien',
      message: 'Vous avez reçu 1,500 FCFA de revenu aujourd\'hui',
      date: new Date('2024-01-14'),
      read: false,
    },
    {
      id: 3,
      type: 'success',
      title: 'Bonus de parrainage',
      message: 'Vous avez reçu 500 FCFA pour un nouveau filleul',
      date: new Date('2024-01-13'),
      read: true,
    },
    {
      id: 4,
      type: 'warning',
      title: 'KYC en attente',
      message: 'Veuillez compléter votre vérification KYC',
      date: new Date('2024-01-10'),
      read: true,
    },
  ])

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="text-green-600" size={24} />
      case 'warning':
        return <FiAlertCircle className="text-yellow-600" size={24} />
      case 'error':
        return <FiAlertCircle className="text-red-600" size={24} />
      default:
        return <FiInfo className="text-blue-600" size={24} />
    }
  }

  const getTypeClass = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      default:
        return 'bg-blue-50 border-blue-200'
    }
  }

  const handleMarkAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
    addNotification('Notification marquée comme lue', 'success')
  }

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id))
    addNotification('Notification supprimée', 'success')
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <>
      <Header />
      <DashboardLayout>
        <div className="space-y-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-primary mb-2">Notifications</h1>
              <p className="text-gray-600">
                {unreadCount > 0
                  ? `Vous avez ${unreadCount} notification${unreadCount > 1 ? 's' : ''} non lue${unreadCount > 1 ? 's' : ''}`
                  : 'Toutes les notifications ont été lues'}
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={() =>
                  setNotifications(
                    notifications.map((n) => ({ ...n, read: true }))
                  )
                }
                className="btn-outline"
              >
                Marquer tout comme lu
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`card p-6 border-l-4 ${
                    notification.type === 'success'
                      ? 'border-l-green-600'
                      : notification.type === 'warning'
                      ? 'border-l-yellow-600'
                      : notification.type === 'error'
                      ? 'border-l-red-600'
                      : 'border-l-blue-600'
                  } ${!notification.read ? 'bg-gray-50' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="mt-1">{getIcon(notification.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-primary">
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-2">{notification.message}</p>
                        <p className="text-sm text-gray-500">
                          {notification.date.toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {!notification.read && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="px-3 py-1 bg-primary text-white rounded text-sm hover:bg-blue-900 transition"
                        >
                          Lire
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(notification.id)}
                        className="p-2 hover:bg-gray-100 rounded transition"
                      >
                        <FiTrash2 className="text-red-600" size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="card p-12 text-center">
                <p className="text-gray-600 text-lg">Aucune notification</p>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
      <Footer />
    </>
  )
}
