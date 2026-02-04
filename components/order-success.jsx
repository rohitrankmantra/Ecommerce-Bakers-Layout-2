'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

export function OrderSuccessOverlay({ visible, onDone }) {
  const shouldReduceMotion = useReducedMotion()
  const [status, setStatus] = useState('loading')

  // Stabilizing the effect to prevent the "array size changed" error
  useEffect(() => {
    if (!visible) {
      setStatus('loading')
      return
    }

    // Phase 1: The "Buzzing" Drive (Loading/Processing)
    const processTimer = setTimeout(() => {
      setStatus('success')
    }, 2500)
    
    // Phase 2: The "Arrival" (Transition to Success Page)
    const finishTimer = setTimeout(() => {
      onDone?.()
    }, shouldReduceMotion ? 3500 : 5000)

    return () => {
      clearTimeout(processTimer)
      clearTimeout(finishTimer)
    }
    // Fixed: All dependencies explicitly listed and constant
  }, [visible, onDone, shouldReduceMotion])

  if (!visible) return null

  // Engine Vibration Effect
  const truckBuzz = {
    loading: {
      y: [0, -1.5, 0],
      x: [0, 0.5, -0.5, 0],
      transition: { repeat: Infinity, duration: 0.1, ease: "linear" }
    }
  }

  // Steam/Exhaust Puffs
  const Puff = ({ delay }) => (
    <motion.div
      initial={{ scale: 0, opacity: 0, x: 0 }}
      animate={{ scale: [1, 2], opacity: [0, 0.5, 0], x: -40, y: -10 }}
      transition={{ repeat: Infinity, duration: 0.8, delay }}
      className="absolute left-0 bottom-6 w-4 h-4 bg-gray-200 rounded-full blur-sm"
    />
  )

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="relative w-full max-w-md flex flex-col items-center">
          
          <AnimatePresence mode="wait">
            {status === 'loading' ? (
              <motion.div
                key="truck-container"
                initial={{ x: "-100vw" }}
                animate={{ x: 0 }}
                exit={{ x: "100vw", opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="relative"
              >
                {/* Exhaust Puffs */}
                <Puff delay={0} />
                <Puff delay={0.3} />

                {/* Bakery Truck Body */}
                <motion.div
                  variants={!shouldReduceMotion ? truckBuzz : {}}
                  animate="loading"
                  className="relative w-64 h-40 bg-[#fdf5e6] border-b-4 border-gray-800 rounded-t-3xl rounded-br-lg flex items-center justify-center shadow-xl"
                >
                  {/* Cabin */}
                  <div className="absolute -right-12 bottom-0 w-16 h-24 bg-[#fdf5e6] rounded-tr-2xl border-l-4 border-gray-100">
                    <div className="absolute top-4 right-2 w-10 h-8 bg-blue-100 rounded-sm border-2 border-gray-800" />
                  </div>
                  
                  {/* Bakery Logo */}
                  <div className="flex flex-col items-center select-none">
                    <span className="text-[#8b4513] font-black text-2xl italic tracking-tighter">BAKERY</span>
                    <div className="h-0.5 w-16 bg-[#d2691e] mt-1" />
                    <span className="text-[#d2691e] text-[10px] font-bold uppercase mt-1">Fresh Express</span>
                  </div>

                  {/* Wheels */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.4, ease: "linear" }}
                    className="absolute -bottom-5 left-8 w-10 h-10 bg-gray-800 rounded-full border-4 border-gray-600 flex items-center justify-center"
                  >
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                  </motion.div>
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.4, ease: "linear" }}
                    className="absolute -bottom-5 right-4 w-10 h-10 bg-gray-800 rounded-full border-4 border-gray-600 flex items-center justify-center"
                  >
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                  </motion.div>
                </motion.div>

                <motion.p 
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="text-center mt-12 font-mono text-gray-400 text-xs tracking-[0.3em] uppercase"
                >
                  Starting the engine...
                </motion.p>
              </motion.div>
            ) : (
              <motion.div
                key="success-prompt"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center"
              >
                {/* Floating Bread/Cake Icons */}
                <div className="relative flex gap-4 mb-8">
                  {['🥐', '🍰', '🍞'].map((item, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: [0, -20, 0], opacity: 1 }}
                      transition={{ 
                        delay: i * 0.1, 
                        y: { repeat: Infinity, duration: 2, ease: "easeInOut" } 
                      }}
                      className="text-4xl"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>

                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-200">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-white">
                    <motion.path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </svg>
                </div>

                <h2 className="text-3xl font-black text-gray-900 mt-8 tracking-tight">Order Placed!</h2>
                <p className="text-gray-500 font-medium mt-2">Delivery is buzzing your way.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Detail */}
        <div className="absolute bottom-10 w-full flex justify-center opacity-30">
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-gray-400" />
            <span className="text-[10px] font-bold tracking-[0.5em] text-gray-500 uppercase">Premium Bakery Service</span>
            <div className="h-[1px] w-12 bg-gray-400" />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}