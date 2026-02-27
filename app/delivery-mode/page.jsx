'use client'

import { useRouter } from 'next/navigation'

export default function DeliverySelectionPage() {
  const router = useRouter()

  const handleSelection = (scope) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('deliveryScope', scope)
      router.push('/shop')
    }
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white py-20">
      <div className="w-full max-w-md space-y-4 px-4">
        <button
          onClick={() => handleSelection('city')}
          className="w-full py-5 text-lg font-serif tracking-wide text-primary border border-primary/20 rounded-2xl bg-white shadow-sm hover:bg-primary hover:text-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
        >
          Delivery in Dehradun
        </button>

        <button
          onClick={() => handleSelection('panIndia')}
          className="w-full py-5 text-lg font-serif tracking-wide text-primary border border-primary/20 rounded-2xl bg-white shadow-sm hover:bg-primary hover:text-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
        >
          Pan-India Delivery
        </button>
      </div>
    </div>
  )
}