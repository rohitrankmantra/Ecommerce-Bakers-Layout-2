 'use client'
 
 import { createContext, useContext, useEffect, useMemo, useState } from 'react'
 import { toast } from '@/hooks/use-toast'
 
 const AuthContext = createContext(undefined)
 
 const USERS_KEY = 'auth_users'
 const SESSION_KEY = 'auth_session'
 
 async function sha256(input) {
   const enc = new TextEncoder()
   const data = enc.encode(input)
   const digest = await crypto.subtle.digest('SHA-256', data)
   const bytes = Array.from(new Uint8Array(digest))
   return bytes.map((b) => b.toString(16).padStart(2, '0')).join('')
 }
 
 function loadUsers() {
   try {
     const raw = localStorage.getItem(USERS_KEY)
     return raw ? JSON.parse(raw) : []
   } catch {
     return []
   }
 }
 
 function saveUsers(users) {
   localStorage.setItem(USERS_KEY, JSON.stringify(users))
 }
 
 function loadSession() {
   try {
     const raw = localStorage.getItem(SESSION_KEY)
     return raw ? JSON.parse(raw) : null
   } catch {
     return null
   }
 }
 
 function saveSession(session) {
   localStorage.setItem(SESSION_KEY, JSON.stringify(session))
 }
 
 function clearSession() {
   localStorage.removeItem(SESSION_KEY)
 }
 
 export function AuthProvider({ children }) {
   const [user, setUser] = useState(null)
   const [loading, setLoading] = useState(true)
 
   useEffect(() => {
     const session = loadSession()
     if (session?.user) {
       setUser(session.user)
     }
     setLoading(false)
   }, [])
 
   const signup = async ({ name, email, password }) => {
     const users = loadUsers()
     const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
     if (exists) {
       toast({
         title: 'Signup failed',
         description: 'An account with this email already exists.',
       })
       return { ok: false, error: 'exists' }
     }
     const salt = Math.random().toString(36).slice(2)
     const passwordHash = await sha256(salt + ':' + password)
     const newUser = {
       id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
       name,
       email,
       passwordHash,
       salt,
       createdAt: Date.now(),
     }
     users.push(newUser)
     saveUsers(users)
     const session = { user: { id: newUser.id, name, email, createdAt: newUser.createdAt } }
     saveSession(session)
     setUser(session.user)
     toast({
       title: 'Welcome',
       description: 'Your account has been created successfully.',
     })
     return { ok: true }
   }
 
   const login = async ({ email, password }) => {
     const users = loadUsers()
     const match = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
     if (!match) {
       toast({
         title: 'Login failed',
         description: 'Invalid email or password.',
       })
       return { ok: false, error: 'invalid' }
     }
     const candidate = await sha256(match.salt + ':' + password)
     if (candidate !== match.passwordHash) {
       toast({
         title: 'Login failed',
         description: 'Invalid email or password.',
       })
       return { ok: false, error: 'invalid' }
     }
     const session = { user: { id: match.id, name: match.name, email: match.email, createdAt: match.createdAt } }
     saveSession(session)
     setUser(session.user)
     toast({
       title: 'Logged in',
       description: 'You have signed in successfully.',
     })
     return { ok: true }
   }
 
   const logout = () => {
     clearSession()
     setUser(null)
     toast({
       title: 'Logged out',
       description: 'You have signed out.',
     })
   }
 
   const resetPassword = async ({ email, newPassword }) => {
     const users = loadUsers()
     const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
     
     if (!user) {
       toast({
         title: 'Error',
         description: 'User not found.',
       })
       return { ok: false }
     }

     // Update password with new salt
     const salt = Math.random().toString(36).slice(2)
     const passwordHash = await sha256(salt + ':' + newPassword)
     
     user.passwordHash = passwordHash
     user.salt = salt
     
     saveUsers(users)
     
     toast({
       title: 'Success',
       description: 'Your password has been reset successfully.',
     })
     
     return { ok: true }
   }

   const value = useMemo(
     () => ({
       user,
       loading,
       signup,
       login,
       logout,
       resetPassword,
     }),
     [user, loading],
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
