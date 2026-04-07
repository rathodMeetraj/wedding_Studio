"use client";

import FixedNavigation from "@/components/FixedNavigation";
import Footer from "@/components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <main className="bg-[#ECE8DC] text-[#111111] min-h-screen">
      <FixedNavigation />

      <section className="pt-40 md:pt-56 pb-24 px-6 md:px-16 min-h-screen flex flex-col justify-center">
        {/* Title Section */}
        <div className="max-w-7xl mx-auto w-full mb-20 md:mb-40">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#111111]/40 mb-8">
              True Moments
            </p>
            <h1
              className="text-6xl md:text-8xl lg:text-[9rem] font-bold uppercase tracking-tighter leading-[0.85]"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              THE ART OF <br />
              <span className="text-transparent bg-clip-text text-stroke text-stroke-[#111111] text-[#ECE8DC] hover:text-[#111111] transition-colors duration-700">
                STORYTELLING
              </span>
            </h1>
          </motion.div>
        </div>

        {/* Content Section */}
        <div ref={containerRef} className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 items-start">
          {/* Left Text */}
          <div className="md:col-span-5 flex flex-col gap-12 mt-12 md:mt-24">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1 }}
              className="text-xl md:text-2xl font-light leading-relaxed"
            >
              We believe that the most powerful memories are those captured naturally. At Studio2, we don't just take photographs or record videos; we preserve the essence of who you are in your purest, most unscripted moments.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, delay: 0.1 }}
              className="text-base text-[#111111]/70 font-light leading-loose max-w-sm"
            >
              Our aesthetic is rooted in editorial elegance paired with a candid approach. We strip away the rigid staging and let the day unfold authentically. It’s the subtle glint in an eye, a brief touch of hands, or the unfiltered laughter that makes a visual story truly timeless.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="w-12 h-[1px] bg-[#111111]/30 mb-8" />
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#111111]/50">
                Founded 2018 — Global
              </p>
            </motion.div>
          </div>

          {/* Right Visual Parallax */}
          <div className="md:col-span-6 md:col-start-7 relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)]">
            <motion.div style={{ y: imgY }} className="absolute inset-0 w-full h-[140%] -top-[20%]">
              <video
                src="/1video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover scale-105"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision statement */}
      <section className="py-32 px-6 md:px-16 flex justify-center items-center bg-[#111111] text-[#ECE8DC]">
         <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-4xl"
         >
            <h2 className="text-3xl md:text-5xl font-light leading-tight">
               "To capture a moment is to stop time itself, turning fleeting seconds into an eternity of emotion."
            </h2>
         </motion.div>
      </section>

      <Footer />
      
      {/* Required for the text-stroke util if not in global css */}
      <style dangerouslySetInnerHTML={{ __html: `
        .text-stroke {
          -webkit-text-stroke: 1px currentColor;
        }
      ` }} />
    </main>
  );
}
