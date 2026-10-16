import JourneyTrim from "@/components/journey/JourneyTrim";
import { useSectionEntrance } from "@/hooks/use-section-entrance";
import { useRef } from "react";
import Reveal from "@/components/motion/Reveal";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useSectionEntrance(sectionRef, ".about-panel, .about-kicker, .about-heading, .about-paragraph", "depth");
  return (
    <section ref={sectionRef} id="about" className="journey-section journey-about section-padding luxury-section bg-card/80 relative overflow-hidden" data-journey-section="about">
      <JourneyTrim number="05" label="THE WORKSHOP" motif="ring" />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="about-kicker luxury-kicker text-primary font-medium uppercase text-sm mb-3">Who We Are</p>
          <h3 className="about-heading luxury-heading font-display text-4xl min-[360px]:text-5xl sm:text-6xl mb-8">
            ABOUT TOLI MOTORS
          </h3>
        </div>

        <div className="about-panel luxury-panel max-w-3xl mx-auto rounded-2xl px-5 py-8 sm:px-10 sm:py-10 text-center">
          <p className="about-paragraph text-muted-foreground text-lg leading-relaxed mb-6">
            Situated in <span className="text-foreground font-medium">Anantapur, Andhra Pradesh</span>, Toli Motors is a multi-brand car workshop with <span className="text-foreground font-medium">over 20 years of experience</span> providing hands-on automotive care.
          </p>
          <p className="about-paragraph text-muted-foreground text-lg leading-relaxed">
            We strengthen every customer relationship through proactive service, timely delivery, and an unwavering commitment to premium quality — at prices that make sense.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
