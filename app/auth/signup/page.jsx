 'use client'
 
 import { useEffect } from 'react'
 import { useRouter } from 'next/navigation'
 import { z } from 'zod'
 import { useForm } from 'react-hook-form'
 import { zodResolver } from '@hookform/resolvers/zod'
 import { useAuth } from '@/components/auth-context'
 import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
 import { Input } from '@/components/ui/input'
 import { Button } from '@/components/ui/button'
 import Link from 'next/link'
 
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
     const res = await signup({
       name: values.name,
       email: values.email,
       password: values.password,
     })
     if (res.ok) {
       router.push('/')
     }
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
                       <Input type="password" placeholder="••••••••" {...field} />
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
                       <Input type="password" placeholder="••••••••" {...field} />
                     </FormControl>
                     <FormMessage />
                   </FormItem>
                 )}
               />
               <Button type="submit" className="w-full rounded-xl">Create Account</Button>
             </form>
           </Form>
           <p className="text-center text-sm text-muted-foreground mt-4">
             Already have an account?{' '}
             <Link href="/auth/login" className="text-primary hover:text-gold transition-colors">
               Sign in
             </Link>
           </p>
         </div>
       </div>
     </div>
   )
 }
