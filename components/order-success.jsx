'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

export function OrderSuccessOverlay({ visible, onDone }) {
  const shouldReduceMotion = useReducedMotion()
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    if (!visible) {
      setStatus('loading')
      return
    }

    const processTimer = setTimeout(() => {
      setStatus('success')
    }, 3000)
    
    const finishTimer = setTimeout(() => {
      onDone?.()
    }, shouldReduceMotion ? 4000 : 5500)

    return () => {
      clearTimeout(processTimer)
      clearTimeout(finishTimer)
    }
  }, [visible, onDone, shouldReduceMotion])

  if (!visible) return null

  const truckBuzz = {
    loading: {
      y: [0, -1.8, 0],
      transition: { repeat: Infinity, duration: 0.12, ease: "linear" }
    }
  }

  const SpeedLine = ({ top, delay }) => (
    <motion.div
      initial={{ x: 200, opacity: 0 }}
      animate={{ x: -800, opacity: [0, 1, 0] }}
      transition={{ repeat: Infinity, duration: 0.4, delay, ease: "linear" }}
      className="absolute h-[3px] bg-slate-300 rounded-full"
      style={{ top, width: Math.random() * 150 + 50 }}
    />
  )

  const ExhaustPuff = ({ delay }) => (
    <motion.div
      initial={{ scale: 0, opacity: 0, x: 0 }}
      animate={{ scale: [1, 2.5], opacity: [0, 0.4, 0], x: -80, y: -20 }}
      transition={{ repeat: Infinity, duration: 0.6, delay }}
      className="absolute left-0 bottom-6 w-6 h-6 bg-gray-400 rounded-full blur-md"
    />
  )

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-[#FAF7EF] flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="relative w-full max-w-lg flex flex-col items-center">
          
          <AnimatePresence mode="wait">
            {status === 'loading' ? (
              <motion.div
                key="truck-container"
                initial={{ x: "-120vw" }}
                animate={{ x: 0 }}
                exit={{ x: "120vw", opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 100 }}
                className="relative"
              >
                {/* Motion Effects */}
                <div className="absolute inset-0 -z-10">
                  <SpeedLine top="15%" delay={0} />
                  <SpeedLine top="45%" delay={0.15} />
                  <SpeedLine top="75%" delay={0.3} />
                </div>

                <ExhaustPuff delay={0} />
                <ExhaustPuff delay={0.2} />

                {/* THE TRUCK */}
                <motion.div
                  variants={!shouldReduceMotion ? truckBuzz : {}}
                  animate="loading"
                  className="relative w-80 h-48"
                >
                  {/* Body - Orange */}
                  <div className="absolute left-0 top-0 w-60 h-40 bg-[#C85B24] rounded-2xl shadow-2xl border-b-[8px] border-black/20 overflow-hidden z-10">
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      <img 
                        src="/new-logo.png" 
                        alt="Logo" 
                        className="w-full h-full object-contain select-none"
                      />
                    </div>
                  </div>

                  {/* Cabin - Off-White */}
                  <div className="absolute right-2 bottom-[8px] w-28 h-32 bg-[#FAF7EF] rounded-tr-[45px] rounded-br-xl border-2 border-black/10 shadow-xl z-20">
                    <div className="absolute top-4 right-3 w-16 h-14 bg-gray-900 rounded-tr-[30px] rounded-tl-md" />
                    <div className="absolute bottom-10 right-0 w-3 h-8 bg-yellow-300 rounded-l-full shadow-[6px_0_20px_#fde047]" />
                  </div>

                  {/* Wheels */}
                  {[40, 210].map((leftPos) => (
                    <motion.div 
                      key={leftPos}
                      style={{ left: leftPos }}
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.3, ease: "linear" }}
                      className="absolute -bottom-4 w-14 h-14 bg-gray-900 rounded-full border-[4px] border-gray-800 flex items-center justify-center z-30 shadow-lg"
                    >
                      <div className="w-6 h-6 border-2 border-dashed border-gray-600 rounded-full" />
                    </motion.div>
                  ))}
                </motion.div>

                <motion.p 
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="text-center mt-20 font-black text-gray-800 text-[11px] tracking-[0.5em] uppercase"
                >
                  Speeding to you...
                </motion.p>
              </motion.div>
            ) : (
              <motion.div
                key="success-prompt"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center"
              >
                {/* --- GREEN SUCCESS UI --- */}
                <div className="w-28 h-28 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(16,185,129,0.4)]">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-white">
                    <motion.path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6 }}
                    />
                  </svg>
                </div>
                
                <h2 className="text-4xl font-black text-emerald-600 mt-10 tracking-tight text-center">ORDER PLACED!</h2>
                
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 rounded-full bg-[#C85B24] animate-pulse" />
                  <p className="text-gray-600 font-bold">Your treats are being prepared.</p>
                </div>
                {/* ------------------------- */}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}