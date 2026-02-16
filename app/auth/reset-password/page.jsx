'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/components/auth-context'
import api from '@/utils/axiosinstance'
import { toast } from '@/hooks/use-toast'

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const emailParam = searchParams.get('email')
    const otpParam = searchParams.get('otp')

    if (!emailParam || !otpParam) {
      toast({
        title: 'Error',
        description: 'Invalid reset link',
        variant: 'destructive',
      })
      router.push('/auth/forgot-password')
      return
    }

    setEmail(decodeURIComponent(emailParam))
    setOtp(otpParam)
  }, [searchParams, router])

  const handleResetPassword = async (e) => {
    e.preventDefault()

    if (!password.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a new password',
        variant: 'destructive',
      })
      return
    }

    if (password.length < 6) {
      toast({
        title: 'Error',
        description: 'Password must be at least 6 characters',
        variant: 'destructive',
      })
      return
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)
    try {
      // Verify OTP with backend
      const response = await api.post('/auth/reset-password', {
        email,
        otp,
        newPassword: password,
      })

      if (response.data.ok) {
        // Update password in local auth context
        await resetPassword({ email, newPassword: password })
        
        toast({
          title: 'Success',
          description: 'Your password has been reset successfully',
        })
        router.push('/auth/login')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error?.response?.data?.message || 'Failed to reset password',
        variant: 'destructive',
      })
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md mx-auto bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
          <div className="text-center mb-6">
            <span className="text-gold uppercase tracking-widest text-xs font-medium">Create new password</span>
            <h1 className="font-serif text-2xl sm:text-3xl text-primary mt-2">Reset your password</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Enter your new password below
            </p>
          </div>

          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Email
              </label>
              <Input
                type="email"
                value={email}
                disabled
                className="bg-gray-100"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                New Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
                >
                  <i className={`fas fa-eye${showPassword ? '-slash' : ''}`}></i>
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
                >
                  <i className={`fas fa-eye${showConfirmPassword ? '-slash' : ''}`}></i>
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full rounded-xl" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Remember your password?{' '}
            <Link href="/auth/login" className="text-primary hover:text-gold transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
