 'use client'
 
 import Link from 'next/link'
 
 export default function RefundPolicyPage() {
   return (
     <div className="min-h-screen bg-cream">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
         <div className="max-w-3xl mx-auto bg-card rounded-2xl border border-border p-6 sm:p-8">
           <div className="text-center mb-8">
             <span className="text-gold uppercase tracking-widest text-xs font-medium">Policy</span>
             <h1 className="font-serif text-3xl sm:text-4xl text-primary mt-3">Refund & Cancellation Policy</h1>
             <p className="text-muted-foreground mt-2 text-sm">Effective date: {new Date().getFullYear()}</p>
           </div>
 
           <div className="space-y-8 text-foreground/90 leading-relaxed">
             <section>
               <h2 className="font-serif text-2xl text-primary">Refund Eligibility</h2>
               <ul className="mt-3 space-y-2 list-disc pl-6">
                 <li>Refunds are considered for incorrect, damaged, or missing items.</li>
                 <li>Requests must be submitted within 24 hours of delivery with supporting details.</li>
                 <li>Perishable items may not be eligible if consumed or tampered with.</li>
               </ul>
             </section>
 
             <section>
               <h2 className="font-serif text-2xl text-primary">Refund Process</h2>
               <ul className="mt-3 space-y-2 list-disc pl-6">
                 <li>Contact our support team with your order number and issue details.</li>
                 <li>We may request photos/videos for verification.</li>
                 <li>Approved refunds are processed within 5–7 business days to the original payment method.</li>
               </ul>
             </section>
 
             <section>
               <h2 className="font-serif text-2xl text-primary">Cancellations</h2>
               <ul className="mt-3 space-y-2 list-disc pl-6">
                 <li>Orders can be cancelled before dispatch. Once shipped or prepared, cancellation may not be possible.</li>
                 <li>Custom or made-to-order items may not be eligible for cancellation.</li>
               </ul>
             </section>
 
             <section>
               <h2 className="font-serif text-2xl text-primary">Non-Refundable Items</h2>
               <ul className="mt-3 space-y-2 list-disc pl-6">
                 <li>Products consumed after delivery or mishandled by the recipient.</li>
                 <li>Items altered, repackaged, or not in their original condition.</li>
               </ul>
             </section>
 
             <section>
               <h2 className="font-serif text-2xl text-primary">Contact</h2>
               <p className="mt-3">
                 To initiate a refund or cancellation, email{' '}
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
