import JourneyTrim from "@/components/journey/JourneyTrim";
import { useSectionEntrance } from "@/hooks/use-section-entrance";
import { useRef } from "react";
import { Users, Award, IndianRupee, ShieldCheck } from "lucide-react";
import Reveal from "@/components/motion/Reveal";

const reasons = [
  { icon: Users, title: "Exceptional Staff", desc: "Trained technicians with deep multi-brand expertise." },
  { icon: Award, title: "Premium Quality", desc: "Genuine parts and meticulous workmanship on every job." },
  { icon: IndianRupee, title: "Affordable Pricing", desc: "Transparent, competitive rates with no hidden costs." },
  { icon: ShieldCheck, title: "High Standards", desc: "Industry-grade processes and quality control." },
];

const WhyUs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useSectionEntrance(sectionRef, ".reason-card, .reason-icon", "depth");
  return (
    <section ref={sectionRef} id="why-us" className="journey-section journey-quality section-padding luxury-section" data-journey-section="quality">
      <JourneyTrim number="09" label="QUALITY & CARE" motif="scan" />
      <div className="max-w-7xl mx-auto">
        <Reveal variant="fade" className="text-center mb-16">
          <p className="luxury-kicker text-primary font-medium uppercase text-sm mb-3 text-reveal">The Difference</p>
          <h3
            className="luxury-heading font-display text-4xl min-[360px]:text-5xl sm:text-6xl text-reveal"
            style={{ "--motion-delay": "80ms" } as React.CSSProperties}
          >
            WHY CHOOSE US
          </h3>
        </Reveal>

        <Reveal variant="fade" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div ref={gridRef} className="contents">
            {reasons.map((r, i) => (
              <div
                key={r.title}
                className="reason-card cinematic-card luxury-panel rounded-2xl p-6 text-center"
                style={{ "--motion-delay": `${Math.min(i * 55, 220)}ms` } as React.CSSProperties}
              >
                <div className="reason-icon icon-luxury inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-5 transition-transform duration-200 ease-out hover:scale-[1.03]">
                  <r.icon className="w-7 h-7 text-primary" />
                </div>
                <h4 className="font-display text-2xl mb-2">{r.title}</h4>
                <p className="text-muted-foreground text-sm">{r.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default WhyUs;
