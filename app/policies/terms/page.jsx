 'use client'
 
 import Link from 'next/link'
 
 export default function TermsPage() {
   return (
     <div className="min-h-screen bg-cream">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
         <div className="max-w-3xl mx-auto bg-card rounded-2xl border border-border p-6 sm:p-8">
           <div className="text-center mb-8">
             <span className="text-gold uppercase tracking-widest text-xs font-medium">Policy</span>
             <h1 className="font-serif text-3xl sm:text-4xl text-primary mt-3">Terms & Conditions</h1>
             <p className="text-muted-foreground mt-2 text-sm">Effective date: {new Date().getFullYear()}</p>
           </div>
 
           <div className="space-y-8 text-foreground/90 leading-relaxed">
             <section>
               <h2 className="font-serif text-2xl text-primary">Acceptance of Terms</h2>
               <p className="mt-3">
                 By accessing or using the BakeMasters website, you agree to be bound by these Terms & Conditions and our related policies. If you do not agree, please discontinue use of the site.
               </p>
             </section>
 
             <section>
               <h2 className="font-serif text-2xl text-primary">Products and Availability</h2>
               <p className="mt-3">
                 Product descriptions, images, and pricing are provided for guidance and may vary due to artisanal production. Availability is subject to daily inventory. We reserve the right to limit quantities or discontinue products at any time.
               </p>
             </section>
 
             <section>
               <h2 className="font-serif text-2xl text-primary">Orders and Payment</h2>
               <ul className="mt-3 space-y-2 list-disc pl-6">
                 <li>Orders are confirmed upon successful payment and acknowledgement.</li>
                 <li>We accept standard payment methods displayed at checkout.</li>
                 <li>Prices are inclusive/exclusive of applicable taxes as indicated at checkout.</li>
               </ul>
             </section>
 
             <section>
               <h2 className="font-serif text-2xl text-primary">Shipping and Delivery</h2>
               <p className="mt-3">
                 Delivery timelines and fees are detailed in our Shipping & Delivery Policy. Unexpected delays may occur due to logistics or external factors. We will make reasonable efforts to keep you informed.
               </p>
             </section>
 
             <section>
               <h2 className="font-serif text-2xl text-primary">Returns, Refunds, and Cancellations</h2>
               <p className="mt-3">
                 Please refer to our Refund & Cancellation Policy for eligibility, timelines, and procedures. Perishable products may have special conditions.
               </p>
             </section>
 
             <section>
               <h2 className="font-serif text-2xl text-primary">Intellectual Property</h2>
               <p className="mt-3">
                 All content on the website, including text, images, graphics, and logos, is the property of BakeMasters or its licensors and is protected by applicable laws. Unauthorized use is prohibited.
               </p>
             </section>
 
             <section>
               <h2 className="font-serif text-2xl text-primary">Limitation of Liability</h2>
               <p className="mt-3">
                 To the maximum extent permitted by law, BakeMasters will not be liable for indirect, incidental, or consequential damages arising from the use of our products or services.
               </p>
             </section>
 
             <section>
               <h2 className="font-serif text-2xl text-primary">Governing Law</h2>
               <p className="mt-3">
                 These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Dehradun, Uttarakhand.
               </p>
             </section>
 
             <section>
               <h2 className="font-serif text-2xl text-primary">Changes to Terms</h2>
               <p className="mt-3">
                 We may update these Terms to reflect operational or legal changes. The latest version will be posted on this page with an effective date.
               </p>
             </section>
 
             <section>
               <h2 className="font-serif text-2xl text-primary">Contact</h2>
               <p className="mt-3">
                 For questions about these Terms, contact us at{' '}
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
