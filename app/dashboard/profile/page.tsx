'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/app/components/DashboardLayout'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { useAuthStore } from '@/lib/store'
import { getUserData } from '@/lib/auth'
import { useNotificationStore } from '@/lib/store'
import { FiEdit2, FiLock } from 'react-icons/fi'
import { UserData } from '@/types/index'

export default function Profile() {
  const { user } = useAuthStore()
  const addNotification = useNotificationStore((state) => state.addNotification)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  useEffect(() => {
    const loadUserData = async () => {
      if (user) {
        const data = await getUserData(user.uid)
        setUserData(data)
        setFormData({
          fullName: data?.fullName || '',
          phone: data?.phone || '',
        })
      }
      setLoading(false)
    }

    loadUserData()
  }, [user])

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      addNotification('Profil mis à jour avec succès !', 'success')
      setIsEditing(false)
    } catch (error) {
      addNotification('Erreur lors de la mise à jour', 'error')
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      addNotification('Les mots de passe ne correspondent pas', 'error')
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      addNotification('Mot de passe modifié avec succès !', 'success')
      setShowPasswordForm(false)
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    } catch (error) {
      addNotification('Erreur lors du changement de mot de passe', 'error')
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <DashboardLayout>
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </DashboardLayout>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <DashboardLayout>
        <div className="max-w-4xl space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Mon Profil</h1>
            <p className="text-gray-600">Gérez les informations de votre compte</p>
          </div>

          {/* Profile Information */}
          <div className="card p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary">Informations personnelles</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2 text-primary hover:text-blue-900"
              >
                <FiEdit2 size={20} />
                <span>{isEditing ? 'Annuler' : 'Modifier'}</span>
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="input-field"
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Enregistrer les modifications
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Nom complet</p>
                    <p className="font-semibold text-primary">{userData?.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p className="font-semibold text-primary">{userData?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Téléphone</p>
                    <p className="font-semibold text-primary">{userData?.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Statut KYC</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        userData?.kycStatus === 'verified'
                          ? 'bg-green-100 text-green-800'
                          : userData?.kycStatus === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {userData?.kycStatus === 'verified'
                        ? 'Vérifié'
                        : userData?.kycStatus === 'rejected'
                        ? 'Rejeté'
                        : 'En attente'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Security */}
          <div className="card p-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <FiLock className="text-primary" size={24} />
                <h2 className="text-2xl font-bold text-primary">Sécurité</h2>
              </div>
            </div>

            {showPasswordForm ? (
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mot de passe actuel
                  </label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmer le mot de passe
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="input-field"
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <button type="submit" className="btn-primary flex-1">
                    Modifier le mot de passe
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPasswordForm(false)}
                    className="btn-outline flex-1"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setShowPasswordForm(true)}
                className="btn-outline w-full"
              >
                Modifier le mot de passe
              </button>
            )}
          </div>

          {/* Account Info */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Informations du compte</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Code de parrainage</p>
                <p className="font-mono font-semibold text-primary">{userData?.referralCode}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Date d'inscription</p>
                <p className="font-semibold text-primary">
                  {userData?.createdAt
                    ? new Date(userData.createdAt).toLocaleDateString('fr-FR')
                    : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Statut du compte</p>
                <p className="font-semibold text-green-600">
                  {userData?.blocked ? 'Bloqué' : 'Actif'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
      <Footer />
    </>
  )
}
