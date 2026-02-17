 'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { toast } from '@/hooks/use-toast'
import api from '@/utils/axiosinstance'

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Load user from session storage on mount (temporary, not persistent)
  useEffect(() => {
    const sessionUser = sessionStorage.getItem('user')
    if (sessionUser) {
      try {
        setUser(JSON.parse(sessionUser))
        setIsAuthenticated(true)
      } catch {
        sessionStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const signup = async ({ name, email, password }) => {
    try {
      setLoading(true)
      const response = await api.post('/auth/signup', { name, email, password })

      if (!response.data.ok) {
        toast({
          title: 'Signup failed',
          description: response.data.message || 'Failed to create account',
          variant: 'destructive',
        })
        return { ok: false, error: response.data.message }
      }

      // Store user in session storage (not persistent)
      sessionStorage.setItem('user', JSON.stringify(response.data.user))
      setUser(response.data.user)
      setIsAuthenticated(true)

      toast({
        title: 'Signup successful',
        description: response.data.message,
      })

      return { ok: true, user: response.data.user }
    } catch (error) {
      console.error('Signup error:', error)
      const errorMsg = error.response?.data?.message || 'Network error. Please try again.'
      toast({
        title: 'Error',
        description: errorMsg,
        variant: 'destructive',
      })
      return { ok: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  const login = async ({ email, password }) => {
    try {
      setLoading(true)
      const response = await api.post('/auth/login', { email, password })

      if (!response.data.ok) {
        toast({
          title: 'Login failed',
          description: response.data.message || 'Invalid email or password',
          variant: 'destructive',
        })
        return { ok: false, error: response.data.message }
      }

      // Store user in session storage (not persistent)
      sessionStorage.setItem('user', JSON.stringify(response.data.user))
      setUser(response.data.user)
      setIsAuthenticated(true)

      toast({
        title: 'Logged in',
        description: 'You have signed in successfully.',
      })

      return { ok: true, user: response.data.user }
    } catch (error) {
      console.error('Login error:', error)
      const errorMsg = error.response?.data?.message || 'Network error. Please try again.'
      toast({
        title: 'Error',
        description: errorMsg,
        variant: 'destructive',
      })
      return { ok: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      sessionStorage.removeItem('user')
      setUser(null)
      setIsAuthenticated(false)
      toast({
        title: 'Logged out',
        description: 'You have signed out.',
      })
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const sendOTP = async (email, name) => {
    try {
      const response = await api.post('/auth/send-otp', { email, name })

      if (!response.data.ok) {
        toast({
          title: 'Failed',
          description: response.data.message || 'Failed to send OTP',
          variant: 'destructive',
        })
        return { ok: false }
      }

      toast({
        title: 'OTP sent',
        description: 'Check your email for the verification code',
      })

      return { ok: true }
    } catch (error) {
      console.error('Send OTP error:', error)
      const errorMsg = error.response?.data?.message || 'Failed to send OTP'
      toast({
        title: 'Error',
        description: errorMsg,
        variant: 'destructive',
      })
      return { ok: false }
    }
  }

  const verifyOTP = async (email, otp) => {
    try {
      const response = await api.post('/auth/verify-otp', { email, otp })

      if (!response.data.ok) {
        toast({
          title: 'Failed',
          description: response.data.message || 'Invalid OTP',
          variant: 'destructive',
        })
        return { ok: false }
      }

      // Mark email as verified in backend
      await api.post('/auth/mark-email-verified', { email })

      toast({
        title: 'Verified',
        description: 'Your email has been verified successfully',
      })

      return { ok: true }
    } catch (error) {
      console.error('Verify OTP error:', error)
      const errorMsg = error.response?.data?.message || 'Failed to verify OTP'
      toast({
        title: 'Error',
        description: errorMsg,
        variant: 'destructive',
      })
      return { ok: false }
    }
  }

  const sendForgotPasswordOTP = async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email })

      if (!response.data.ok) {
        toast({
          title: 'Failed',
          description: response.data.message || 'Failed to send OTP',
          variant: 'destructive',
        })
        return { ok: false }
      }

      toast({
        title: 'OTP sent',
        description: 'Check your email for the reset code',
      })

      return { ok: true }
    } catch (error) {
      console.error('Forgot password error:', error)
      const errorMsg = error.response?.data?.message || 'Failed to send reset code'
      toast({
        title: 'Error',
        description: errorMsg,
        variant: 'destructive',
      })
      return { ok: false }
    }
  }

  const resetPassword = async (email, otp, newPassword) => {
    try {
      const response = await api.post('/auth/reset-password', { email, otp, newPassword })

      if (!response.data.ok) {
        toast({
          title: 'Failed',
          description: response.data.message || 'Failed to reset password',
          variant: 'destructive',
        })
        return { ok: false }
      }

      toast({
        title: 'Success',
        description: 'Your password has been reset successfully',
      })

      return { ok: true }
    } catch (error) {
      console.error('Reset password error:', error)
      const errorMsg = error.response?.data?.message || 'Failed to reset password'
      toast({
        title: 'Error',
        description: errorMsg,
        variant: 'destructive',
      })
      return { ok: false }
    }
  }

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated,
      signup,
      login,
      logout,
      sendOTP,
      verifyOTP,
      sendForgotPasswordOTP,
      resetPassword,
    }),
    [user, loading, isAuthenticated],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}
