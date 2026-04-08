import axios from 'axios'
import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const SessionContext = createContext(null)

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
})

export function SessionProvider({ children }) {
  const [session, setSession] = useState(() => {
    const stored = localStorage.getItem('session')
    if (!stored) {
      return { token: '', user: null, isAdmin: false }
    }

    const parsed = JSON.parse(stored)
    return {
      token: parsed.token || '',
      user: parsed.user || null,
      isAdmin: parsed.isAdmin ?? parsed.user?.role === 'Admin' ?? false,
    }
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Initialize API client with token
  if (session.token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${session.token}`
  }

  const handleSessionChange = useCallback((newSession) => {
    const normalizedSession = {
      token: newSession.token || '',
      user: newSession.user || null,
      isAdmin: newSession.isAdmin ?? newSession.user?.role === 'Admin' ?? false,
    }

    setSession(normalizedSession)
    if (normalizedSession.token) {
      localStorage.setItem('session', JSON.stringify(normalizedSession))
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${normalizedSession.token}`
    } else {
      localStorage.removeItem('session')
      delete apiClient.defaults.headers.common['Authorization']
    }
  }, [])

  const signup = useCallback(async (name, email, password) => {
    setLoading(true)
    setError('')
    try {
      const response = await apiClient.post('/users/signup', { name, email, password })
      const { token, user } = response.data
      handleSessionChange({ token, user, isAdmin: user?.role === 'Admin' })
      return { success: true, data: response.data }
    } catch (err) {
      const message = err.response?.data?.message || 'Signup failed. Please try again.'
      setError(message)
      return { success: false, message }
    } finally {
      setLoading(false)
    }
  }, [handleSessionChange])

  const login = useCallback(async (email, password) => {
    setLoading(true)
    setError('')
    try {
      const response = await apiClient.post('/users/login', { email, password })
      const { token, user } = response.data
      handleSessionChange({ token, user, isAdmin: user?.role === 'Admin' })
      return { success: true, data: response.data }
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please try again.'
      setError(message)
      return { success: false, message }
    } finally {
      setLoading(false)
    }
  }, [handleSessionChange])

  const logout = useCallback(() => {
    handleSessionChange({ token: '', user: null })
  }, [handleSessionChange])

  const value = useMemo(
    () => ({
      session,
      setSession: handleSessionChange,
      loading,
      error,
      signup,
      login,
      logout,
      apiClient,
    }),
    [session, loading, error, signup, login, logout, handleSessionChange],
  )

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export function useSession() {
  const context = useContext(SessionContext)

  if (!context) {
    throw new Error('useSession must be used within SessionProvider')
  }

  return context
}