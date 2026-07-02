'use client'

import { useEffect } from 'react'
import { useNotificationStore } from '@/lib/store'
import { FiX, FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi'

export default function Toast() {
  const { notifications, removeNotification } = useNotificationStore()

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {notifications.map((notif) => (
        <ToastItem
          key={notif.id}
          notification={notif}
          onClose={() => removeNotification(notif.id)}
        />
      ))}
    </div>
  )
}

function ToastItem({
  notification,
  onClose,
}: {
  notification: any
  onClose: () => void
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000)
    return () => clearTimeout(timer)
  }, [onClose])

  const getBgColor = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      case 'info':
        return 'bg-blue-50 border-blue-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <FiCheckCircle className="text-green-600" size={20} />
      case 'error':
        return <FiAlertCircle className="text-red-600" size={20} />
      default:
        return <FiInfo className="text-blue-600" size={20} />
    }
  }

  return (
    <div className={`flex items-start space-x-3 p-4 rounded-lg border ${getBgColor()} shadow-lg animate-slide-in-up`}>
      {getIcon()}
      <p className="flex-1 text-sm font-medium">{notification.message}</p>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
        <FiX size={16} />
      </button>
    </div>
  )
}
