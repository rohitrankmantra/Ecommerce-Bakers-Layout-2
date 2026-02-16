'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import api from '@/utils/axiosinstance'
import { toast } from '@/hooks/use-toast'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState('email') // 'email' or 'otp'
  const [loading, setLoading] = useState(false)

  const handleSendOtp = async (e) => {
    e.preventDefault()
    if (!email.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter your email',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)
    try {
      const response = await api.post('/auth/forgot-password', { email })
      if (response.data.ok) {
        setStep('otp')
        toast({
          title: 'OTP Sent',
          description: `Verification code sent to ${email}`,
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error?.response?.data?.message || 'Failed to send OTP',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter the OTP',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)
    try {
      // Redirect to reset password page with email and otp
      router.push(`/auth/reset-password?email=${encodeURIComponent(email)}&otp=${otp}`)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
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
            <span className="text-gold uppercase tracking-widest text-xs font-medium">Reset Password</span>
            <h1 className="font-serif text-2xl sm:text-3xl text-primary mt-2">Forgot your password?</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Enter your email to receive a verification code
            </p>
          </div>

          {step === 'email' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full rounded-xl" disabled={loading}>
                {loading ? 'Sending...' : 'Send OTP'}
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Verification Code
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit code"
                  maxLength="6"
                  className="w-full px-4 py-2.5 border border-border rounded-lg text-center text-xl tracking-widest focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                />
              </div>
              <Button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="w-full rounded-xl"
              >
                {loading ? 'Verifying...' : 'Verify & Continue'}
              </Button>
              <button
                type="button"
                onClick={() => {
                  setStep('email')
                  setOtp('')
                  setEmail('')
                }}
                className="w-full text-center text-sm text-primary hover:text-gold transition-colors"
              >
                Use different email
              </button>
            </div>
          )}

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
