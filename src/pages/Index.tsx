import AIChatWidget from '@/components/AIChatWidget';
import SkipToMainContent from '@/components/SkipToMainContent';
import { takeRequestReturn } from '@/lib/service-request';
import { JourneyProvider } from "@/components/journey/JourneyProvider";
import { lazy, Suspense, useEffect, useState } from "react";

import SectionStack from "@/components/journey/SectionStack";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import TrustChapter from "@/components/journey/TrustChapter";
import ExperienceNavigation from "@/components/journey/ExperienceNavigation";

import ScrollProgress from "@/components/ScrollProgress";

// Lazy load below-fold components for faster initial load
const Services = lazy(() => import("@/components/Services"));
const ComponentExperience = lazy(() => import("@/components/journey/ComponentExperience"));
const HowItWorks = lazy(() => import("@/components/HowItWorks"));
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
  const [requestReturn]=useState(takeRequestReturn);
  useEffect(()=>{
    if(!requestReturn)return;
    const restore=()=>{const link=document.querySelectorAll<HTMLElement>('[data-service-request]')[requestReturn.index];if(!link)return;window.scrollTo(0,requestReturn.scrollY);link.focus({preventScroll:true});observer.disconnect();};
    const observer=new MutationObserver(restore);observer.observe(document.body,{childList:true,subtree:true});const frame=requestAnimationFrame(restore);
    return()=>{observer.disconnect();cancelAnimationFrame(frame);};
  },[requestReturn]);
  return (
    <JourneyProvider skipHeroIntro={!!requestReturn} restoreState={requestReturn?.state}>
      <SkipToMainContent/>
      <ExperienceNavigation/>
      <AIChatWidget/>
      <main id="main-content" tabIndex={-1} className="min-h-screen overflow-x-clip phase9-experience">
        <ScrollProgress />
        <Hero />
        <Suspense fallback={<LoadingFallback />}>
          <SectionStack>
            <Services separateVehicle />
            <ComponentExperience />
            <HowItWorks />
            <TrustChapter />
          </SectionStack>
        </Suspense>
        <Gallery />
        <Suspense fallback={<LoadingFallback />}>
          <CtaBanner />
          <div className="experience-connect" id="connect" data-experience-chapter="connect"><p className="system-label">06 / CONNECT WITH TOLI</p><Contact /><details className="direct-message"><summary>Send a direct WhatsApp message ↗</summary><WhatsAppSender /></details></div>
          <Footer />
        </Suspense>
      </main>
    </JourneyProvider>
  );
};

export default Index;
