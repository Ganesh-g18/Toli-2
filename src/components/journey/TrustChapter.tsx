import { lazy, Suspense } from 'react';
const About=lazy(()=>import('@/components/About'));
const Stats=lazy(()=>import('@/components/Stats'));
const BrandPartners=lazy(()=>import('@/components/BrandPartners'));
const WhyUs=lazy(()=>import('@/components/WhyUs'));
const ServiceArea=lazy(()=>import('@/components/ServiceArea'));
const BeforeAfter=lazy(()=>import('@/components/BeforeAfter'));
const Testimonials=lazy(()=>import('@/components/Testimonials'));
const OffersStrip=lazy(()=>import('@/components/OffersStrip'));
export default function TrustChapter(){return <section id="trust" className="experience-chapter trust-chapter" data-experience-chapter="trust" aria-labelledby="trust-title"><header className="chapter-heading"><p className="system-label">04 / TOLI MOTORS</p><h2 id="trust-title">Built on care.<br/>Backed by people.</h2><p>Explore the workshop, the team’s approach and the areas we serve.</p></header><div className="trust-index"><Suspense fallback={<p>Loading workshop information…</p>}><details open><summary>01 / The workshop & our approach <span>↗</span></summary><About/><Stats/><WhyUs/></details><details><summary>02 / Multi-brand care & service areas <span>↗</span></summary><BrandPartners/><ServiceArea/></details><details><summary>03 / Before / after <span>↗</span></summary><BeforeAfter/></details><details><summary>04 / Customer feedback & current offers <span>↗</span></summary><Testimonials/><OffersStrip/></details></Suspense></div></section>;}
