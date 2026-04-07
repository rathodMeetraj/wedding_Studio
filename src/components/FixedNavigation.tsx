"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const PremiumNavItem = ({ label, href }: { label: string; href: string }) => {
  return (
    <Link 
      href={href} 
      className="scale-90 md:scale-100 tracking-[0.15em] text-xs md:text-sm font-medium uppercase py-2"
    >
      <span>{label}</span>
    </Link>
  );
};


export default function FixedNavigation({ logoDelay = 0.2 }: { logoDelay?: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* We keep an empty z-50 wrapper if needed, but everything clickable is now in the z-60 Difference layer */}
      <div className="fixed inset-0 z-50 pointer-events-none"></div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[55] bg-[rgb(15,15,15)] flex flex-col justify-center overflow-hidden pointer-events-auto"
          >
            <div className="flex flex-col justify-center w-full font-black uppercase tracking-tighter mix-blend-normal pl-4 md:pl-12 lg:pl-16">
              {[
                { name: "home", href: "/" },
                { name: "work", href: "/collections" },
                { name: "info", href: "/about" },
                { name: "contact", href: "/contact" },
              ].map((link, i) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-[20vw] md:text-[16vw] leading-[0.8] text-[rgb(253,249,237)]/10 hover:text-[rgb(253,249,237)] transition-colors duration-500 cursor-pointer text-left w-full"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 z-[60] pointer-events-none mix-blend-difference text-[rgb(253,249,237)]">
        {/* Top Left — Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: logoDelay, duration: 1.5 }}
          className="absolute top-0 md:-top-6 left-6 md:left-7 -ml-[5px] pointer-events-auto"
        >
          <Link href="/">
            <img
              src="/logo/wc logo-3.png"
              alt="Wedding Candid Logo"
              className="h-20 md:h-[130px] w-auto object-contain opacity-90 cursor-pointer invert opacity-100"
            />
          </Link>
        </motion.div>

        {/* Left Side — WORK + */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.8 }}
          className={`absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-center hidden md:flex items-center whitespace-nowrap ${isOpen ? "pointer-events-none" : "pointer-events-auto"}`}
        >
          <PremiumNavItem label="WORK +" href="/collections" />
        </motion.div>

        {/* Right Side — INFO + */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.8 }}
          className={`absolute right-6 top-1/2 -translate-y-1/2 rotate-90 origin-center hidden md:flex items-center whitespace-nowrap ${isOpen ? "pointer-events-none" : "pointer-events-auto"}`}
        >
          <PremiumNavItem label="INFO +" href="/about" />
        </motion.div>

        {/* Top Right — Hamburger Menu */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: logoDelay, duration: 1.5 }}
          className="absolute top-6 right-6 md:top-8 md:right-8 pointer-events-auto cursor-pointer flex flex-col justify-center gap-2 w-10 h-10 items-end z-50 group"
          aria-label="Toggle Navigation"
        >
          <span className={`block h-[2px] bg-current transition-all duration-300 ${isOpen ? "w-8 rotate-45 translate-y-[5px]" : "w-8 group-hover:w-6"}`}></span>
          <span className={`block h-[2px] bg-current transition-all duration-300 ${isOpen ? "w-8 -rotate-45 -translate-y-[5px]" : "w-6 group-hover:w-8"}`}></span>
        </motion.button>
      </div>
    </>
  );
}
