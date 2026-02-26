 'use client'
 
 import { FaWhatsapp } from 'react-icons/fa'
 import { FiPhone } from 'react-icons/fi'
 
 const whatsappNumber = '919997766661'
 const dialNumber = '+919997766661'
 
 export function FloatingContact() {
   return (
     <div className="fixed bottom-6 right-6 z-10 flex flex-col gap-3">
       <a
         href={`https://wa.me/${whatsappNumber}`}
         aria-label="WhatsApp"
         target="_blank"
         rel="noopener noreferrer"
         className="w-14 h-14 rounded-full bg-green-500 text-white shadow-lg grid place-items-center hover:bg-green-600 transition"
       >
         <FaWhatsapp size={24} />
       </a>
       <a
         href={`tel:${dialNumber}`}
         aria-label="Call"
         className="w-14 h-14 rounded-full bg-primary text-white shadow-lg grid place-items-center hover:opacity-90 transition"
       >
         <FiPhone size={24} />
       </a>
     </div>
   )
 }
