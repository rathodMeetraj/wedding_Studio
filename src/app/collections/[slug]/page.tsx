"use client";

import FixedNavigation from "@/components/FixedNavigation";
import Footer from "@/components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { use, useRef } from "react";

export default function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  
  // Basic mock mapping
  const titleMap: Record<string, string> = {
    "cinematic-edit": "THE CINEMATIC EDIT",
    "candid-series": "CANDID SERIES",
    "golden-hour-portraits": "GOLDEN HOUR",
  };
  
  const title = titleMap[slug] || "COLLECTION";

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <main className="bg-[#ECE8DC] text-[#111111] min-h-screen">
      <FixedNavigation />

      {/* Hero Header */}
      <section ref={containerRef} className="relative h-screen flex flex-col justify-end pb-24 overflow-hidden bg-[#111111]">
        <motion.div style={{ y: headerY }} className="absolute inset-0 z-0">
          <video
            src="/2video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60 scale-105"
          />
        </motion.div>
        
        <div className="relative z-10 px-6 md:px-16 w-full max-w-7xl mx-auto flex flex-col">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#ECE8DC]/60 mb-6"
          >
            Client Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-5xl md:text-8xl lg:text-[10rem] font-bold uppercase tracking-tighter leading-[0.85] text-[#ECE8DC]"
            style={{ opacity: headerOpacity, fontFamily: "'Oswald', sans-serif" }}
          >
            {title}
          </motion.h1>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-32 px-6 md:px-16 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-2xl relative group">
            <video src="/1video.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover scale-105 transition-transform duration-1000 group-hover:scale-110" />
          </div>
          <div className="aspect-[3/4] md:translate-y-32 rounded-xl overflow-hidden shadow-2xl relative group">
            <video src="/3video.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover scale-105 transition-transform duration-1000 group-hover:scale-110" />
          </div>
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2 }}
            className="mt-32 md:mt-64 max-w-3xl mx-auto text-center"
        >
            <p className="text-xl md:text-3xl font-light leading-relaxed">
               "This collection emphasizes the unscripted beauty of a wedding day. The small glances, the unexpected laughter, the tears – we frame them exactly as they happened, without ever intruding."
            </p>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
