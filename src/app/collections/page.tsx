"use client";

import FixedNavigation from "@/components/FixedNavigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";

const collections = [
  {
    title: "The Cinematic Edit",
    slug: "cinematic-edit",
    video: "/2video.mp4",
    aspect: "aspect-video",
    subtitle: "A documentary approach to your biggest moments"
  },
  {
    title: "Candid Series",
    slug: "candid-series",
    video: "/1video.mp4",
    aspect: "aspect-[3/4]",
    subtitle: "Unfiltered emotion, completely natural"
  },
  {
    title: "Golden Hour Portraits",
    slug: "golden-hour-portraits",
    video: "/3video.mp4",
    aspect: "aspect-square",
    subtitle: "Ethereal light, timeless aesthetic"
  }
];

export default function CollectionsPage() {
  return (
    <main className="bg-[#ECE8DC] text-[#111111] min-h-screen">
      <FixedNavigation />

      <section className="pt-40 md:pt-56 pb-24 px-6 md:px-16">
        {/* Title Section */}
        <div className="max-w-7xl mx-auto w-full mb-20 md:mb-32 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#111111]/40 mb-8">
              Curated Work
            </p>
            <h1
              className="text-6xl md:text-8xl lg:text-[9rem] font-bold uppercase tracking-tighter leading-[0.85]"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              COLLECTIONS
            </h1>
          </motion.div>
        </div>

        {/* Collections Grid */}
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-32">
          {collections.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Media Container */}
              <Link href={`/collections/${item.slug}`} className={`w-full md:w-1/2 ${item.aspect} rounded-xl overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] relative group block`}>
                <video
                  src={item.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover scale-105 transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
              </Link>
              
              {/* Text Container */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#111111]/50 mb-4">
                  0{index + 1}
                </p>
                <Link href={`/collections/${item.slug}`} className="group inline-block w-fit">
                  <h2 className="text-4xl md:text-5xl font-light leading-tight mb-4 group-hover:text-[#111111]/70 transition-colors">
                    {item.title}
                  </h2>
                </Link>
                <p className="text-lg text-[#111111]/70 font-light mb-8 max-w-sm">
                  {item.subtitle}
                </p>
                <Link 
                  href={`/collections/${item.slug}`}
                  className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#111111] pb-1 border-b border-[#111111]/30 hover:border-[#111111] transition-colors w-fit"
                >
                  View Collection
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
