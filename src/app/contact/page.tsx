"use client";

import FixedNavigation from "@/components/FixedNavigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <main className="bg-[#ECE8DC] text-[#111111] min-h-screen">
      <FixedNavigation />

      <section className="pt-40 md:pt-56 pb-32 px-6 md:px-16 min-h-screen flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-start">
          
          {/* Left Column: Text */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#111111]/40 mb-8">
                Inquiries
              </p>
              <h1
                className="text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-[0.85] mb-12"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                LET'S <br /> CREATE <br /> TOGETHER
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex flex-col gap-8 max-w-sm"
            >
              <p className="text-lg font-light leading-relaxed">
                We accept a limited number of commissions each year to ensure the highest level of dedication for our clients. 
              </p>
              
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#111111]/40">
                  Email
                </p>
                <a href="mailto:hello@studio2.com" className="text-xl hover:text-[#111111]/60 transition-colors tracking-wide">
                  hello@studio2.com
                </a>
              </div>
              
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#111111]/40">
                  Location
                </p>
                <p className="text-xl tracking-wide">
                  Available Worldwide
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col w-full"
          >
            <form className="flex flex-col gap-12 w-full pt-8 md:pt-16" onSubmit={(e) => e.preventDefault()}>
              <div className="relative group">
                <input 
                  type="text" 
                  id="name"
                  placeholder="Your Name"
                  className="w-full bg-transparent border-b border-[#111111]/30 py-4 text-xl outline-none placeholder:text-[#111111]/30 hover:border-[#111111]/60 focus:border-[#111111] transition-colors focus:placeholder:text-transparent"
                />
              </div>

              <div className="relative group">
                <input 
                  type="email" 
                  id="email"
                  placeholder="Your Email Address"
                  className="w-full bg-transparent border-b border-[#111111]/30 py-4 text-xl outline-none placeholder:text-[#111111]/30 hover:border-[#111111]/60 focus:border-[#111111] transition-colors focus:placeholder:text-transparent"
                />
              </div>

              <div className="relative group">
                <input 
                  type="text" 
                  id="date"
                  placeholder="Event Date & Location"
                  className="w-full bg-transparent border-b border-[#111111]/30 py-4 text-xl outline-none placeholder:text-[#111111]/30 hover:border-[#111111]/60 focus:border-[#111111] transition-colors focus:placeholder:text-transparent"
                />
              </div>

              <div className="relative group">
                <textarea 
                  id="details"
                  placeholder="Tell us about your vision..."
                  rows={4}
                  className="w-full bg-transparent border-b border-[#111111]/30 py-4 text-xl outline-none placeholder:text-[#111111]/30 hover:border-[#111111]/60 focus:border-[#111111] transition-colors resize-none focus:placeholder:text-transparent"
                />
              </div>

              <button 
                type="submit"
                className="ui-btn mt-4"
              >
                <span>
                  Submit Inquiry
                </span>
              </button>
            </form>
          </motion.div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
