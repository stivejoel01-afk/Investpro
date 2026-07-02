import { create } from 'zustand'
import { User, UserData, Investment } from '@/types/index'

interface AuthStore {
  user: User | null
  userData: UserData | null
  loading: boolean
  setUser: (user: User | null) => void
  setUserData: (data: UserData | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
}

interface NotificationStore {
  notifications: Array<{
    id: string
    message: string
    type: 'success' | 'error' | 'info'
  }>
  addNotification: (message: string, type: 'success' | 'error' | 'info') => void
  removeNotification: (id: string) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  userData: null,
  loading: true,
  setUser: (user) => set({ user }),
  setUserData: (data) => set({ userData: data }),
  setLoading: (loading) => set({ loading }),
  logout: () => set({ user: null, userData: null }),
}))

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (message, type) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { id: Date.now().toString(), message, type },
      ],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}))
