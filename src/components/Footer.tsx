"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-[#ECE8DC] pt-24 pb-12 px-6 md:px-16 flex flex-col justify-between">
      <div className="flex flex-col md:flex-row justify-between items-start gap-16 md:gap-0">
        
        {/* Brand Side */}
        <div className="flex flex-col max-w-sm">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-6"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            WEDDING CANDID
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-sm text-[#ECE8DC]/70 leading-relaxed font-light"
          >
            Capturing the golden moments. An exclusive cinematic and candid experience crafted for those who value timeless memories.
          </motion.p>
        </div>

        {/* Links Side */}
        <div className="flex flex-col sm:flex-row gap-16 md:gap-32 w-full md:w-auto">
          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#ECE8DC]/40 mb-2"
            >
              Navigation
            </motion.p>
            <FooterLink href="/about" label="Info" delay={0.1} />
            <FooterLink href="/collections" label="Work" delay={0.2} />
            <FooterLink href="/contact" label="Contact" delay={0.3} />
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-4">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#ECE8DC]/40 mb-2"
            >
              Socials
            </motion.p>
            <FooterLink href="#" label="Instagram" delay={0.1} />
            <FooterLink href="#" label="Vimeo" delay={0.2} />
            <FooterLink href="#" label="Pinterest" delay={0.3} />
          </div>
        </div>
      </div>

      {/* Bottom Separator & Copyright */}
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="mt-24 h-[1px] bg-[#ECE8DC]/15 origin-left"
      />
      
      <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light tracking-wide text-[#ECE8DC]/50">
        <p>© {new Date().getFullYear()} WEDDING CANDID. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-[#ECE8DC] transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-[#ECE8DC] transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label, delay }: { href: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Link 
        href={href} 
        className="text-sm font-light uppercase tracking-widest text-[#ECE8DC]/80 hover:text-white transition-colors relative group"
      >
        {label}
        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
      </Link>
    </motion.div>
  );
}
