 'use client'
 
 import { useEffect } from 'react'
 import { useRouter, useSearchParams } from 'next/navigation'
 import { z } from 'zod'
 import { useForm } from 'react-hook-form'
 import { zodResolver } from '@hookform/resolvers/zod'
 import { useAuth } from '@/components/auth-context'
 import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
 import { Input } from '@/components/ui/input'
 import { Button } from '@/components/ui/button'
 import Link from 'next/link'
 
 const schema = z.object({
   email: z.string().email({ message: 'Enter a valid email' }),
   password: z.string().min(6, { message: 'Minimum 6 characters' }),
 })
 
 export default function LoginPage() {
   const router = useRouter()
   const params = useSearchParams()
   const { user, login } = useAuth()
 
   useEffect(() => {
     if (user) {
       router.replace('/')
     }
   }, [user, router])
 
   const form = useForm({
     resolver: zodResolver(schema),
     defaultValues: { email: '', password: '' },
   })
 
   const onSubmit = async (values) => {
     const res = await login(values)
     if (res.ok) {
       const redirectTo = params.get('from') || '/'
       router.push(redirectTo)
     }
   }
 
   return (
     <div className="min-h-screen bg-cream">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
         <div className="max-w-md mx-auto bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
           <div className="text-center mb-6">
             <span className="text-gold uppercase tracking-widest text-xs font-medium">Welcome back</span>
             <h1 className="font-serif text-2xl sm:text-3xl text-primary mt-2">Sign in to your account</h1>
           </div>
           <Form {...form}>
             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                       <Input type="password" placeholder="••••••••" {...field} />
                     </FormControl>
                     <FormMessage />
                   </FormItem>
                 )}
               />
               <Button type="submit" className="w-full rounded-xl">Sign In</Button>
             </form>
           </Form>
           <p className="text-center text-sm text-muted-foreground mt-4">
             New here?{' '}
             <Link href="/auth/signup" className="text-primary hover:text-gold transition-colors">
               Create an account
             </Link>
           </p>
         </div>
       </div>
     </div>
   )
 }
