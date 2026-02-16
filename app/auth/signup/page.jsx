 'use client'
 
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/components/auth-context'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import api from '@/utils/axiosinstance'
import { toast } from '@/hooks/use-toast'

const schema = z
  .object({
    name: z.string().min(2, { message: 'Enter your full name' }),
    email: z.string().email({ message: 'Enter a valid email' }),
    password: z.string().min(6, { message: 'Minimum 6 characters' }),
    confirmPassword: z.string().min(6),
  })
  .refine((vals) => vals.password === vals.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

export default function SignupPage() {
  const router = useRouter()
  const { user, signup } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [step, setStep] = useState('form') // 'form' or 'otp'
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(null)

  useEffect(() => {
    if (user) {
      router.replace('/')
    }
  }, [user, router])

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  })

  const onSubmit = async (values) => {
    setLoading(true)
    try {
      // Send OTP to email
      const response = await api.post('/auth/send-otp', {
        email: values.email,
        name: values.name,
      })
      
      if (response.data.ok) {
        setEmail(values.email)
        setFormData(values)
        setStep('otp')
        toast({
          title: 'OTP Sent',
          description: `Verification code sent to ${values.email}`,
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
      const response = await api.post('/auth/verify-otp', {
        email,
        otp,
      })

      if (response.data.ok) {
        // Sign up user
        const res = await signup({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })
        if (res.ok) {
          router.push('/')
        }
      }
    } catch (error) {
      toast({
        title: 'Invalid OTP',
        description: error?.response?.data?.message || 'OTP verification failed',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  if (step === 'otp') {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
          <div className="text-center mb-6">
            <span className="text-gold uppercase tracking-widest text-xs font-medium">Verify</span>
            <h1 className="font-serif text-2xl sm:text-3xl text-primary mt-2">Enter OTP</h1>
            <p className="text-sm text-muted-foreground mt-2">
              We sent a code to <strong>{email}</strong>
            </p>
          </div>

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
              {loading ? 'Verifying...' : 'Verify OTP'}
            </Button>

            <button
              type="button"
              onClick={() => {
                setStep('form')
                setOtp('')
              }}
              className="w-full text-center text-sm text-primary hover:text-gold transition-colors"
            >
              Back to Sign Up
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md mx-auto bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
          <div className="text-center mb-6">
            <span className="text-gold uppercase tracking-widest text-xs font-medium">Join us</span>
            <h1 className="font-serif text-2xl sm:text-3xl text-primary mt-2">Create your account</h1>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
                        >
                          <i className={`fas fa-eye${showPassword ? '-slash' : ''}`}></i>
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
                        >
                          <i className={`fas fa-eye${showConfirmPassword ? '-slash' : ''}`}></i>
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full rounded-xl" disabled={loading}>
                {loading ? 'Sending OTP...' : 'Create Account'}
              </Button>
              <p className="text-center text-sm text-muted-foreground mt-4">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-primary hover:text-gold transition-colors">
                  Sign in
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
