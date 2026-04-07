"use client";

import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform, useSpring } from "framer-motion";
import { useState, useRef } from "react";
import Link from "next/link";

const collections = [
  {
    id: 2,
    src: "/2video.mp4",
    title: "The Golden Hour",
    slug: "golden-hour-portraits"
  },
  {
    id: 3,
    src: "/3video.mp4",
    title: "Pure Emotion",
    slug: "cinematic-edit"
  },
  {
    id: 1,
    src: "/1video.mp4",
    title: "Candid Moments",
    slug: "candid-series"
  },
];

export default function PhotoGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    mass: 1.5,
  });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    // V1 completely covers V0 halfway at exactly 0.30
    if (latest < 0.30) setActiveIndex(0);
    // V2 completely covers V1 halfway at exactly 0.70
    else if (latest >= 0.30 && latest < 0.70) setActiveIndex(1);
    else setActiveIndex(2);
  });

  // Mathematically defined "Cover Stack Reveal" mechanic for each layer:
  // Video 0 is always at the bottom sitting still.
  // Video 1 slides up from 100% to 0% between 0.15 and 0.45.
  const y1 = useTransform(smoothProgress, [0, 0.15, 0.45, 1], ["100%", "100%", "0%", "0%"]);
  // Video 2 slides up from 100% to 0% between 0.55 and 0.85.
  const y2 = useTransform(smoothProgress, [0, 0.55, 0.85, 1], ["100%", "100%", "0%", "0%"]);

  const getSlideY = (index: number) => {
    if (index === 0) return "0%";
    if (index === 1) return y1;
    return y2;
  };
  
  // Parallax applied generically to all videos to give them sluggish depth regardless of their box movement
  const parallaxY = useTransform(smoothProgress, [0, 1], ["-12%", "12%"]);

  return (
    // Runway increased to 400vh for a massively long, smooth scrub length
    <section ref={containerRef} className="relative w-full bg-[#ECE8DC] h-[400vh] text-[#111111]">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap');
          `,
        }}
      />
      
      {/* Sticky Checkpoint */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center p-6 md:p-16 overflow-hidden">
        
        {/* The Frame Window */}
        <div className="relative w-full max-w-6xl h-[80vh] overflow-hidden bg-[#111111]/5 z-10">
          {collections.map((item, index) => (
            <motion.div 
              key={item.id} 
              className="absolute inset-0 w-full h-full overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.4)]"
              // The critical "Stack" calculation: Layers sit physically atop each other (z-index)
              style={{ 
                top: getSlideY(index),
                zIndex: index * 10
              }}
            >
              <motion.div 
                className="absolute left-0 w-full h-[150%] -top-[25%]"
                style={{ y: parallaxY }}
              >
                <video
                  src={item.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover saturate-0 brightness-110 contrast-125"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Title Crossfader */}
        <div className="absolute bottom-8 md:bottom-12 z-20 flex flex-col items-center justify-center w-full pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="pointer-events-auto"
            >
              <Link 
                href={`/collections/${collections[activeIndex].slug}`}
                className="group relative inline-flex items-center text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-[#111111] transition-all duration-500 hover:tracking-[0.5em] py-2"
                style={{ fontFamily: "'Menlo', 'Roboto Mono', monospace" }}
              >
                <span>{collections[activeIndex].title}</span>
                
                {/* Animated Underline (slides out right, slides in left) */}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#111111] transform scale-x-100 group-hover:scale-x-0 origin-right transition-transform duration-500 ease-out" />
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#111111] transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
