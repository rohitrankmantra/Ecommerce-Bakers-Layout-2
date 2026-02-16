 'use client'
 
 import Link from 'next/link'
 
 export default function ShippingPolicyPage() {
   return (
     <div className="min-h-screen bg-cream">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
         <div className="max-w-3xl mx-auto bg-card rounded-2xl border border-border p-6 sm:p-8">
           <div className="text-center mb-8">
             <span className="text-gold uppercase tracking-widest text-xs font-medium">Policy</span>
             <h1 className="font-serif text-3xl sm:text-4xl text-primary mt-3">Shipping & Delivery Policy</h1>
             <p className="text-muted-foreground mt-2 text-sm">Effective date: {new Date().getFullYear()}</p>
           </div>
 
           <div className="space-y-8 text-foreground/90 leading-relaxed">
             <section>
               <h2 className="font-serif text-2xl text-primary">Service Coverage</h2>
               <p className="mt-3">
                 We deliver within designated serviceable areas in and around Dehradun. Availability may vary by product type and destination.
               </p>
             </section>
 
             <section>
               <h2 className="font-serif text-2xl text-primary">Delivery Timelines</h2>
               <ul className="mt-3 space-y-2 list-disc pl-6">
                 <li>Standard delivery: typically same day or next day depending on order time and location.</li>
                 <li>Custom or large orders: scheduled in advance; timelines shared during confirmation.</li>
               </ul>
             </section>
 
             <section>
               <h2 className="font-serif text-2xl text-primary">Fees and Minimums</h2>
               <p className="mt-3">
                 Delivery fees and minimum order values may apply based on distance and order size. Details are shown at checkout.
               </p>
             </section>
 
             <section>
               <h2 className="font-serif text-2xl text-primary">Tracking and Notifications</h2>
               <p className="mt-3">
                 We provide order status updates and notifications. For assistance, contact our support team with your order number.
               </p>
             </section>
 
             <section>
               <h2 className="font-serif text-2xl text-primary">Delays and Exceptions</h2>
               <p className="mt-3">
                 Delays may occur due to weather, traffic, or other external factors. We will make reasonable efforts to communicate updates promptly.
               </p>
             </section>
 
             <section>
               <h2 className="font-serif text-2xl text-primary">Damaged or Missing Items</h2>
               <p className="mt-3">
                 If items arrive damaged or are missing, notify us within 24 hours of delivery with photos and details for resolution.
               </p>
             </section>
 
             <section>
               <h2 className="font-serif text-2xl text-primary">Address Accuracy</h2>
               <p className="mt-3">
                 Please ensure accurate delivery address and contact details. Failed deliveries due to inaccurate information may incur additional charges.
               </p>
             </section>
 
             <section>
               <h2 className="font-serif text-2xl text-primary">Contact</h2>
               <p className="mt-3">
                 For delivery questions, email{' '}
                 <Link href="mailto:navrajjolly@gmail.com" className="text-primary hover:text-gold transition-colors">
                   navrajjolly@gmail.com
                 </Link>{' '}
                 or call{' '}
                 <Link href="tel:+919068664222" className="text-primary hover:text-gold transition-colors">
                   +91 9068664222
                 </Link>.
               </p>
             </section>
           </div>
         </div>
       </div>
     </div>
   )
 }
