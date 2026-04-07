"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";


export default function AnimatedHero() {
    const line1P1 = "WEDD".split("");
    const line1P2 = "ING".split("");

    const line2P1 = "CAN".split("");
    const line2P2 = "DID".split("");

    const controls = useAnimation();
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile(); // Check on mount
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (!mounted) return; // Completely wait to fire the orchestrator until the heavily loaded mobile DOM safely hydrates!

        const sequence = async () => {
            // Phase 1: Bounce letters up into the center
            await controls.start("visible");

            // Phase 2: Split Rows vertically
            await new Promise((r) => setTimeout(r, 600));
            controls.start("rowSplit");

            // Phase 3: Split horizontally AND simultaneously reveal videos!
            await new Promise((r) => setTimeout(r, 1000));
            controls.start("letterSplitX");
        };
        sequence();
    }, [controls, mounted]);

    // Safe viewport offsets evaluated conditionally per React render payload instead of raw CSS variables
    // Gentle horizontal splits calibrated to perfectly fit edge-to-edge without overflowing off-canvas boundaries
    const splitXLarge = isMobile ? "5vw" : "14vw";
    const splitXLargeNeg = isMobile ? "-5vw" : "-14vw";

    // Custom right-heavy shift constraint specifically for the CANDID row
    const candidSplitLeft = isMobile ? "2vw" : "10vw";
    const candidSplitRight = isMobile ? "8vw" : "24vw";

    const splitY = isMobile ? "38vh" : "38vh"; // Pushed completely towards the bottom floor
    const splitYNeg = isMobile ? "-38vh" : "-38vh"; // Pushed completely towards the top ceiling boundary

    const letterVariants = {
        hidden: { y: "110%", opacity: 0 },
        visible: {
            y: "0%",
            opacity: 1,
            transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
        },
        rowSplit: { y: "0%", opacity: 1 },
        letterSplitX: { y: "0%", opacity: 1 },
    };

    const wrapperLeftVariants = {
        hidden: { x: "0vw" },
        visible: { x: "0vw" },
        rowSplit: { x: "0vw" },
        letterSplitX: {
            x: splitXLargeNeg,
            transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
        },
    };

    const wrapperRightVariants = {
        hidden: { x: "0vw" },
        visible: { x: "0vw" },
        rowSplit: { x: "0vw" },
        letterSplitX: {
            x: splitXLarge,
            transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
        },
    };

    const wrapperBottomLeftVariants = {
        hidden: { x: "0vw" },
        visible: { x: "0vw" },
        rowSplit: { x: "0vw" },
        letterSplitX: {
            x: candidSplitLeft,
            transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
        },
    };

    const wrapperBottomRightVariants = {
        hidden: { x: "0vw" },
        visible: { x: "0vw" },
        rowSplit: { x: "0vw" },
        letterSplitX: {
            x: candidSplitRight,
            transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
        },
    };

    const containerLeftVariants = {
        hidden: { opacity: 1 },
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
        rowSplit: {},
        letterSplitX: { transition: { staggerChildren: 0.05 } },
    };

    const containerRightVariants = {
        hidden: { opacity: 1 },
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 + 0.08 * 4 } },
        rowSplit: {},
        letterSplitX: { transition: { staggerChildren: 0.05 } },
    };

    const containerBottomLeftVariants = {
        hidden: { opacity: 1 },
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
        rowSplit: {},
        letterSplitX: { transition: { staggerChildren: 0.05 } },
    };

    const containerBottomRightVariants = {
        hidden: { opacity: 1 },
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 + 0.08 * 3 } },
        rowSplit: {},
        letterSplitX: { transition: { staggerChildren: 0.05 } },
    };

    // Video reveals using absolute geometry masks (Clip Path) so the card container ITSELF is revealed out of thin air.
    const centerReveal = {
        hidden: { clipPath: "inset(0% 50% 0% 50%)" },
        visible: { clipPath: "inset(0% 50% 0% 50%)" },
        rowSplit: { clipPath: "inset(0% 50% 0% 50%)" },
        letterSplitX: {
            clipPath: "inset(0% 0% 0% 0%)",
            transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
        }
    };

    const leftReveal = {
        hidden: { clipPath: "inset(0% 100% 0% 0%)" },
        visible: { clipPath: "inset(0% 100% 0% 0%)" },
        rowSplit: { clipPath: "inset(0% 100% 0% 0%)" },
        letterSplitX: {
            clipPath: "inset(0% 0% 0% 0%)",
            transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
        }
    };



    return (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html: `
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap');
      `,
                }}
            />
            <section className="relative flex min-h-screen flex-col items-center justify-center overflow-visible bg-[#ECE8DC] text-[#111111]">

                {/* Customized Geometric Video Layer - Fully Adaptive to Mobile via Responsive Classes */}
                <motion.div
                    animate={controls}
                    initial="hidden"
                    variants={{
                        hidden: {},
                        visible: {},
                        rowSplit: {},
                        letterSplitX: {
                            transition: { staggerChildren: 0.15 }
                        }
                    }}
                    className="absolute inset-0 z-0 pointer-events-none"
                >
                    {/* Video 2: Center - Unmasks from origin center, scales width conditionally for smartphones */}
                    <motion.div variants={centerReveal} className="absolute top-[38vh] md:top-[28vh] left-1/2 -translate-x-1/2 ml-[15px] md:ml-[50px] -translate-y-1/2 w-[90vw] sm:w-[50vw] md:w-[45vw] aspect-video rounded-xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] brightness-95">
                        <video src="/2video.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover scale-105" />
                    </motion.div>

                    {/* Video 1: Left Pillar - Switches to a smaller block height on narrow screens so it doesn't crush text */}
                    <motion.div variants={leftReveal} className="absolute top-[52vh] md:top-[60vh] left-[15vw] md:left-[18vw] -translate-x-1/2 -translate-y-1/2 w-[35vw] md:w-[25vw] lg:w-[15vw] h-[30vh] md:h-[58vh] rounded-xl overflow-hidden shadow-[0_20px_50px_-10px_rgba(0,0,0,0.25)] brightness-95">
                        <video src="/1video.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover scale-105" />
                    </motion.div>

                    {/* Video 3: Bottom Right - Maintains square architecture but slides offsets around for tight phone sizes */}
                    <motion.div variants={leftReveal} className="absolute top-[75vh] md:top-[85vh] left-[78vw] md:left-[68vw] -translate-x-1/2 -translate-y-1/2 w-[45vw] sm:w-[35vw] md:w-[22vw] aspect-square rounded-xl overflow-hidden shadow-[0_20px_50px_-10px_rgba(0,0,0,0.25)] brightness-95">
                        <video src="/3video.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover scale-105" />
                    </motion.div>
                </motion.div>



                <div
                    className="relative z-10 flex flex-col items-center justify-center w-full uppercase"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                    {/* WEDDING ROW */}
                    <motion.div
                        animate={controls}
                        variants={{
                            visible: { y: "0vh" },
                            rowSplit: {
                                y: splitYNeg,
                                transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
                            },
                            letterSplitX: { y: splitYNeg },
                        }}
                        className="flex items-center justify-center w-full"
                    >
                        {/* WEDD */}
                        <motion.div
                            initial="hidden"
                            animate={controls}
                            variants={containerLeftVariants}
                            className="flex"
                        >
                            {line1P1.map((char, i) => (
                                <motion.div key={`w1Outer-${i}`} variants={wrapperLeftVariants} className="inline-block">
                                    <div className="overflow-hidden flex leading-none py-2 px-0.5">
                                        <motion.span
                                            variants={letterVariants}
                                            className="inline-block text-[13vw] sm:text-[11vw] md:text-[10vw] lg:text-[9vw] font-bold tracking-tight"
                                        >
                                            {char}
                                        </motion.span>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* ING */}
                        <motion.div
                            initial="hidden"
                            animate={controls}
                            variants={containerRightVariants}
                            className="flex"
                        >
                            {line1P2.map((char, i) => (
                                <motion.div key={`w2Outer-${i}`} variants={wrapperRightVariants} className="inline-block">
                                    <div className="overflow-hidden flex leading-none py-2 px-0.5">
                                        <motion.span
                                            variants={letterVariants}
                                            className="inline-block text-[13vw] sm:text-[11vw] md:text-[10vw] lg:text-[9vw] font-bold tracking-tight"
                                        >
                                            {char}
                                        </motion.span>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* CANDID ROW */}
                    <motion.div
                        animate={controls}
                        variants={{
                            visible: { y: "0vh" },
                            rowSplit: {
                                y: splitY,
                                transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
                            },
                            letterSplitX: { y: splitY },
                        }}
                        className="flex items-center justify-center w-full"
                    >
                        {/* CAN */}
                        <motion.div
                            initial="hidden"
                            animate={controls}
                            variants={containerBottomLeftVariants}
                            className="flex"
                        >
                            {line2P1.map((char, i) => (
                                <motion.div key={`botLeftOuter-${i}`} variants={wrapperBottomLeftVariants} className="inline-block">
                                    <div className="overflow-hidden flex leading-none py-2 px-0.5">
                                        <motion.span
                                            variants={letterVariants}
                                            className="inline-block text-[13vw] sm:text-[11vw] md:text-[10vw] lg:text-[9vw] font-bold tracking-tight"
                                        >
                                            {char}
                                        </motion.span>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* DID */}
                        <motion.div
                            initial="hidden"
                            animate={controls}
                            variants={containerBottomRightVariants}
                            className="flex"
                        >
                            {line2P2.map((char, i) => (
                                <motion.div key={`botRightOuter-${i}`} variants={wrapperBottomRightVariants} className="inline-block">
                                    <div className="overflow-hidden flex leading-none py-2 px-0.5">
                                        <motion.span
                                            variants={letterVariants}
                                            className="inline-block text-[13vw] sm:text-[11vw] md:text-[10vw] lg:text-[9vw] font-bold tracking-tight"
                                        >
                                            {char}
                                        </motion.span>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
