'use client'

import { useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store'
import { setupAuthListener } from '@/lib/auth'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { user, loading, setUser, setLoading } = useAuthStore()

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
