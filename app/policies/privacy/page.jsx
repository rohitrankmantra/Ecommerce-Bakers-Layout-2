 'use client'
 
 import Link from 'next/link'
 
 export default function PrivacyPolicyPage() {
   return (
     <div className="min-h-screen bg-cream">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
         <div className="max-w-3xl mx-auto bg-card rounded-2xl border border-border p-6 sm:p-8">
           <div className="text-center mb-8">
             <span className="text-gold uppercase tracking-widest text-xs font-medium">Policy</span>
             <h1 className="font-serif text-3xl sm:text-4xl text-primary mt-3">Privacy Policy</h1>
             <p className="text-muted-foreground mt-2 text-sm">Effective date: {new Date().getFullYear()}</p>
           </div>
 
           <div className="space-y-8 text-foreground/90 leading-relaxed">
             <section>
               <h2 className="font-serif text-2xl text-primary">Overview</h2>
               <p className="mt-3">
                 This Privacy Policy explains how BakeMasters collects, uses, discloses, and safeguards your information when you visit our website, make purchases, or interact with our services. By using our website, you consent to the practices described in this policy.
               </p>
             </section>
 
             <section>
               <h2 className="font-serif text-2xl text-primary">Information We Collect</h2>
               <ul className="mt-3 space-y-2 list-disc pl-6">
                 <li>Contact details such as name, email address, phone number, and delivery address.</li>
                 <li>Order information including products purchased, payment status, and transaction details.</li>
                 <li>Technical data such as IP address, device information, browser type, and usage analytics.</li>
                 <li>Preferences and interactions, including saved items, wish lists, and communications.</li>
               </ul>
             </section>
 
             <section>
               <h2 className="font-serif text-2xl text-primary">Use of Your Information</h2>
               <ul className="mt-3 space-y-2 list-disc pl-6">
                 <li>Process and fulfill orders, payments, and deliveries.</li>
                 <li>Provide customer support and respond to queries.</li>
                 <li>Improve site performance, content relevance, and user experience.</li>
                 <li>Send service-related communications and promotional updates (with opt-out options).</li>
               </ul>
             </section>
 
             <section>
               <h2 className="font-serif text-2xl text-primary">Cookies and Tracking</h2>
               <p className="mt-3">
                 We use cookies and similar technologies to remember preferences, analyze site traffic, and personalize content. You can adjust your browser settings to refuse cookies; however, some features may not function properly without them.
               </p>
             </section>
 
             <section>
               <h2 className="font-serif text-2xl text-primary">Data Sharing</h2>
               <p className="mt-3">
                 We do not sell your personal information. We may share limited data with trusted service providers (e.g., payment processors, delivery partners) strictly for operational purposes and under confidentiality obligations. We may disclose information where required by law.
               </p>
             </section>
 
             <section>
               <h2 className="font-serif text-2xl text-primary">Data Security</h2>
               <p className="mt-3">
                 We implement reasonable administrative, technical, and physical safeguards to protect your information. Although we strive to protect your data, no method of transmission or storage is completely secure.
               </p>
             </section>
 
             <section>
               <h2 className="font-serif text-2xl text-primary">Retention</h2>
               <p className="mt-3">
                 We retain personal data only as long as necessary to provide services, comply with legal obligations, resolve disputes, and enforce agreements.
               </p>
             </section>
 
             <section>
               <h2 className="font-serif text-2xl text-primary">Your Rights</h2>
               <ul className="mt-3 space-y-2 list-disc pl-6">
                 <li>Access, correct, or update your personal information.</li>
                 <li>Request deletion of your data subject to legal and operational requirements.</li>
                 <li>Opt out of marketing communications at any time.</li>
               </ul>
             </section>
 
             <section>
               <h2 className="font-serif text-2xl text-primary">Children’s Privacy</h2>
               <p className="mt-3">
                 Our services are not directed to children under 13. We do not knowingly collect data from minors. If you believe a child has provided us information, please contact us to remove it.
               </p>
             </section>
 
             <section>
               <h2 className="font-serif text-2xl text-primary">Updates to This Policy</h2>
               <p className="mt-3">
                 We may update this policy to reflect changes in our practices or legal requirements. The updated version will be posted on this page with an effective date.
               </p>
             </section>
 
             <section>
               <h2 className="font-serif text-2xl text-primary">Contact</h2>
               <p className="mt-3">
                 For questions, requests, or concerns about this policy, contact us at{' '}
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
