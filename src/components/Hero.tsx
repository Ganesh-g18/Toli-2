import poster from '@/assets/hero/toli-sports-campaign-960.webp';
import posterLarge from '@/assets/hero/toli-sports-campaign-1440.webp';
import HeroVehicleLineup from '@/components/journey/HeroVehicleLineup';
import ServiceRequestLink from '@/components/ServiceRequestLink';
import { ArrowDownRight, Phone, MessageCircle } from 'lucide-react';
import { prefersReducedMotion } from '@/lib/motion';

export default function Hero() {
 const explore=()=>document.getElementById('services')?.scrollIntoView({behavior:prefersReducedMotion()?'auto':'smooth'});
 return <section id="hero" data-experience-chapter="hero" className="journey-section cinematic-hero" data-journey-section="hero" aria-labelledby="hero-title">
  <div className="cinematic-hero-inner entry-composition">
   <div className="hero-copy"><p className="system-label entry-index">01 / TOLI MOTORS</p>
    <p className="hero-brand">TOLI MOTORS <span>ANANTAPUR</span></p>
    <h1 id="hero-title">Expert car care.<br/><span>You can trust.</span></h1>
    <p className="hero-description">Professional servicing, genuine parts and skilled technicians to keep your car running at its best.</p>
    <div className="hero-primary-actions" role="group" aria-label="Quick actions"><button type="button" className="hero-explore" aria-label="Explore Services — enter experience" onClick={explore}>Explore Services <ArrowDownRight size={17}/></button></div>
    <div className="hero-contact-actions"><a href="tel:+918074946335"><Phone size={15}/>Call Us</a><a href="https://wa.me/918074946335?text=Hi%2C%20I%20would%20like%20to%20enquire%20about%20your%20services."><MessageCircle size={15}/>WhatsApp</a><ServiceRequestLink><button type="button" className="hero-enquiry">Service Enquiry</button></ServiceRequestLink></div>
   </div>
   <div className="hero-visual journey-dock" data-component="0" data-technical="false">
    <HeroVehicleLineup fallback={<picture className="hero-vehicle-poster hero-campaign-graphic" aria-hidden="true"><source srcSet={`${poster} 960w, ${posterLarge} 1440w`} sizes="(max-width:767px) 115vw, 85vw"/><img src={poster} alt="" width="1440" height="618" decoding="async" {...{fetchpriority:'high'}}/></picture>}/>
   </div>
   <div className="hero-journey-link"><span>01 / EXPLORE YOUR CAR’S CARE</span><span>SERVICES → REQUEST → CONTACT <ArrowDownRight size={16}/></span></div>
  </div>
 </section>;
}
