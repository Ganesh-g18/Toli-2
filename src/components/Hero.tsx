import ToliLogoPill from '@/components/ToliLogoPill';
import workshop from '@/assets/gallery-responsive/gallery-2.webp.960.webp';
import BrandCaption from '@/components/journey/BrandCaption';
import HeroVehicleLineup from '@/components/journey/HeroVehicleLineup';
import ServiceRequestLink from '@/components/ServiceRequestLink';
import { ArrowDownRight, Phone, MessageCircle, ShieldCheck, Wrench, Paintbrush, ClipboardCheck, MapPin } from 'lucide-react';
import { prefersReducedMotion } from '@/lib/motion';

export default function Hero() {
 const explore=()=>document.getElementById('services')?.scrollIntoView({behavior:prefersReducedMotion()?'auto':'smooth'});
 return <section id="hero" data-experience-chapter="hero" className="journey-section cinematic-hero reference-hero" data-journey-section="hero" aria-labelledby="hero-title">
   <div className="hero-workshop-atmosphere" aria-hidden="true"><img src={workshop} alt="" width="960" height="723" decoding="async"/></div>
  <div className="cinematic-hero-inner entry-composition">
   <div className="hero-copy"><div className="hero-reference-brand">
    <ToliLogoPill size="hero"/>
    <p className="hero-workshop-subtitle">MULTI BRAND CAR WORKSHOP</p>
   </div><p className="system-label entry-index">01 / TOLI MOTORS</p>
    <div className="hero-corner-info"><div className="hero-brand hero-location"><p className="hero-location-text"><strong>ANANTAPUR</strong><span> / SERVICE · REPAIR · CARE</span></p></div><div className="hero-brand-phones"><Phone size={15} aria-hidden="true"/><a href="tel:+919908303888">99083 03888</a><span aria-hidden="true">/</span><a href="tel:+918074946335">80749 46335</a></div></div>
    <h1 id="hero-title">Expert car care.<br/>{' '}<span>You can trust.</span></h1>
    <BrandCaption className="hero-brand-caption"/>
    <p className="hero-description">Professional servicing, genuine parts and skilled technicians to keep your car running at its best.</p>
    <div className="hero-primary-actions" role="group" aria-label="Quick actions"><button type="button" className="hero-explore" aria-label="Explore Services — enter experience" onClick={explore}>Explore Services <ArrowDownRight size={17}/></button></div>
    <div className="hero-contact-actions"><a href="tel:+918074946335"><Phone size={15}/>Call Us</a><a href="https://wa.me/918074946335?text=Hi%2C%20I%20would%20like%20to%20enquire%20about%20your%20services."><MessageCircle size={15}/>WhatsApp</a><ServiceRequestLink><button type="button" className="hero-enquiry">Service Enquiry</button></ServiceRequestLink></div>
   </div>
   <div className="hero-visual journey-dock" data-component="0" data-technical="false">
    <HeroVehicleLineup/>
   </div>
   <div className="hero-reference-services" role="group" aria-label="Workshop services — illustrative images">
    {[
     {label:'Insurance claim enquiries',note:'Ask our team about eligibility',Icon:ShieldCheck,service:'Consultation'},
     {label:'Electrical & Mechanical',note:'Diagnostics, servicing & repairs',Icon:Wrench,service:'Automobile Services'},
     {label:'Denting & Painting',note:'Discuss bodywork with our team',Icon:Paintbrush,service:'Spare Parts & Repairs'},
     {label:'Complete Vehicle Inspection',note:'Ask about your vehicle',Icon:ClipboardCheck,service:'Vehicle Inspection'},
    ].map(({label,note,Icon,service},index)=><ServiceRequestLink key={label} defaultService={service}><button type="button" className="hero-reference-service" aria-label={`Enquire about ${label}`}><span className={`hero-service-photo hero-service-photo-${index}`} aria-hidden="true"/><span className="hero-service-label"><Icon size={28} strokeWidth={1.6} aria-hidden="true"/><span>{label}<small>{note}</small></span></span><ArrowDownRight className="hero-service-arrow" size={16} aria-hidden="true"/></button></ServiceRequestLink>)}
   </div>
   <div className="hero-reference-location"><MapPin size={20} aria-hidden="true"/><p><strong>TOLI MOTORS</strong><span>6-2-806, Ram Nagar, Kovur Nagar, Anantapur, Andhra Pradesh 515004</span></p><a href="tel:+919908303888"><Phone size={16} aria-hidden="true"/>99083 03888</a></div>
   <div className="hero-journey-link"><span>01 / EXPLORE YOUR CAR’S CARE</span><span>SERVICES → REQUEST → CONTACT <ArrowDownRight size={16}/></span></div>
  </div>
 </section>;
}
