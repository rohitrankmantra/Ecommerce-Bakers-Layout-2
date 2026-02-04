'use client'

import { useToast } from '@/hooks/use-toast'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider duration={3000}>
      <AnimatePresence mode="popLayout">
        {toasts.map(({ id, title, description, action, ...props }) => (
          <motion.div
            key={id}
            layout
            // Entrance: Elastic slide from top
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 400,
              mass: 0.8 
            }}
            className="flex justify-center w-full p-2"
          >
            <Toast
              {...props}
              className="group relative flex w-full max-w-[380px] items-center gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-[0_10px_40px_rgba(0,0,0,0.08)] backdrop-blur-md"
            >
              {/* --- PREMIUM CHECK ANIMATION --- */}
              <div className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center">
                {/* Continuous Soft Ripple */}
                <motion.div
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeOut" 
                  }}
                  className="absolute inset-0 rounded-full bg-emerald-400/40"
                />
                
                {/* Main Circle Pop */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    damping: 12, 
                    stiffness: 200, 
                    delay: 0.1 
                  }}
                  className="absolute inset-0 rounded-full bg-emerald-500 shadow-md shadow-emerald-100"
                />

                {/* Smooth Path Draw */}
                <svg
                  className="z-10 h-6 w-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ 
                      delay: 0.3, 
                      duration: 0.5, 
                      ease: [0.6, 0.01, -0.05, 0.95] // Custom smooth bezier
                    }}
                    d="M20 6L9 17L4 12"
                  />
                </svg>
              </div>

              {/* --- CONTENT SECTION --- */}
              <div className="flex flex-col flex-1 min-w-0">
                {title && (
                  <ToastTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600/90 mb-0.5">
                    {title}
                  </ToastTitle>
                )}
                <div className="flex flex-col">
                  <span className="text-[15px] font-semibold text-slate-900 leading-tight">
                    Freshly Prepared!
                  </span>
                  {description && (
                    <ToastDescription className="text-sm text-slate-500 line-clamp-1">
                      {description}
                    </ToastDescription>
                  )}
                </div>
              </div>

              {/* Smooth Vanishing Progress Bar */}
              <div className="absolute bottom-0 left-0 h-[3px] w-full bg-slate-100">
                <motion.div
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: 3, ease: "linear" }}
                  className="h-full w-full origin-left bg-emerald-500"
                />
              </div>

              {action}
              <ToastClose className="h-8 w-8 rounded-full border-none opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-100" />
            </Toast>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* FIXED TOP-CENTERED VIEWPORT */}
      <ToastViewport className="fixed top-4 left-1/2 z-[100] flex w-full max-w-[420px] -translate-x-1/2 flex-col gap-3 outline-none" />
    </ToastProvider>
  )
}