import AnimatedHero from "@/components/AnimatedHero";
import FixedNavigation from "@/components/FixedNavigation";
import PhotoGallery from "@/components/PhotoGallery";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      {/* Global fixed navigation — stays visible across all sections */}
      <FixedNavigation logoDelay={2.2} />
      {/* Hero section with cinematic animation */}
      <AnimatedHero />
      {/* Scrollable photo gallery below the hero */}
      <PhotoGallery />
      {/* Footer component */}
      <Footer />
    </main>
  );
}
