import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import OffersStrip from "@/components/OffersStrip";
import WhatsAppButton from "@/components/WhatsAppButton";
import AIChatWidget from "@/components/AIChatWidget";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";

// Lazy load below-fold components for faster initial load
const Services = lazy(() => import("@/components/Services"));
const HowItWorks = lazy(() => import("@/components/HowItWorks"));
const BrandPartners = lazy(() => import("@/components/BrandPartners"));
const About = lazy(() => import("@/components/About"));
const Stats = lazy(() => import("@/components/Stats"));
const BeforeAfter = lazy(() => import("@/components/BeforeAfter"));
const Gallery = lazy(() => import("@/components/Gallery"));
const WhyUs = lazy(() => import("@/components/WhyUs"));
const ServiceArea = lazy(() => import("@/components/ServiceArea"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const CtaBanner = lazy(() => import("@/components/CtaBanner"));
const WhatsAppSender = lazy(() => import("@/components/WhatsAppSender"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

const LoadingFallback = () => (
  <div className="h-32 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <>
      <main className="min-h-screen overflow-x-clip page-enter">
        <ScrollProgress />
        <Navbar />
        <OffersStrip />
        <Hero />
        <Suspense fallback={<LoadingFallback />}>
          <Services />
          <HowItWorks />
          <BrandPartners />
          <About />
          <Stats />
          <BeforeAfter />
          <Gallery />
          <WhyUs />
          <ServiceArea />
          <Testimonials />
          <CtaBanner />
          <WhatsAppSender />
          <Contact />
          <Footer />
        </Suspense>
      </main>
      <WhatsAppButton />
      <BackToTop />
      <AIChatWidget />
    </>
  );
};

export default Index;
