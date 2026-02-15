import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ThreePhases from "@/components/ThreePhases";
import Services from "@/components/Services";
import Packages from "@/components/Packages";
import ExtrasSection from "@/components/ExtrasSection";
import Gallery from "@/components/Gallery";
import FAQ from "@/components/FAQ";
import HowItWorks from "@/components/HowItWorks";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import PackageReplaceModal from "@/components/PackageReplaceModal";
import BubbleReplaceModal from "@/components/BubbleReplaceModal";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <CartDrawer />
      <PackageReplaceModal />
      <BubbleReplaceModal />
      <main>
        <Hero />
        <ThreePhases />
        <Services />
        <Packages />
        <section id="extras">
          <ExtrasSection />
        </section>
        <Gallery />
        <FAQ />
        <HowItWorks />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
