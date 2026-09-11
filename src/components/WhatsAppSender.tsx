import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Send, MessageCircle } from "lucide-react";
import { animate, stagger } from "animejs";
import { prefersReducedMotion } from "@/lib/motion";

const PRESET_MESSAGES = [
  "I'm interested in your car service.",
  "I'd like to book a general service appointment.",
  "Can I get a quote for denting & painting?",
  "I need roadside assistance, please help.",
];

const WhatsAppSender = () => {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = sectionRef.current;
    if (!el) return;

    let raf: number;
    let kickerAnim: ReturnType<typeof animate> | null = null;
    let headingAnim: ReturnType<typeof animate> | null = null;
    let subtitleAnim: ReturnType<typeof animate> | null = null;
    let panelAnim: ReturnType<typeof animate> | null = null;
    let presetAnim: ReturnType<typeof animate> | null = null;

    const setup = () => {
      const kicker = el.querySelector<HTMLElement>(".wa-kicker");
      const heading = el.querySelector<HTMLElement>(".wa-heading");
      const subtitle = el.querySelector<HTMLElement>(".wa-subtitle");
      const panel = el.querySelector<HTMLElement>(".wa-panel");
      const presets = el.querySelectorAll<HTMLElement>(".wa-preset");

      if (kicker) { kicker.style.opacity = ""; kicker.style.transform = ""; }
      if (heading) { heading.style.opacity = ""; heading.style.transform = ""; }
      if (subtitle) subtitle.style.opacity = "";
      if (panel) { panel.style.opacity = ""; panel.style.transform = ""; }
      presets.forEach((p) => { p.style.opacity = ""; p.style.transform = ""; });

      if (kicker) {
        kickerAnim = animate(kicker, {
          opacity: [0, 1],
          translateY: [-20, 0],
          duration: 1000,
          ease: "linear",
          autoplay: false,
        });
      }
      if (heading) {
        headingAnim = animate(heading, {
          opacity: [0, 1],
          translateY: [30, 0],
          scale: [0.95, 1],
          duration: 1000,
          ease: "linear",
          autoplay: false,
        });
      }
      if (subtitle) {
        subtitleAnim = animate(subtitle, {
          opacity: [0, 1],
          duration: 1000,
          ease: "linear",
          autoplay: false,
        });
      }
      if (panel) {
        panelAnim = animate(panel, {
          opacity: [0, 1],
          scale: [0.92, 1],
          translateY: [40, 0],
          duration: 1000,
          ease: "linear",
          autoplay: false,
        });
      }
      if (presets.length) {
        presetAnim = animate(presets, {
          opacity: [0, 1],
          scale: [0.8, 1],
          translateY: [10, 0],
          duration: 1000,
          ease: "linear",
          delay: stagger(40, { start: 300 }),
          autoplay: false,
        });
      }
    };

    setup();

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const raw = 1 - rect.top / (vh + rect.height);
        const progress = Math.min(Math.max(raw, 0), 1);
        if (kickerAnim) try { kickerAnim.seek(progress * kickerAnim.duration); } catch {}
        if (headingAnim) try { headingAnim.seek(progress * headingAnim.duration); } catch {}
        if (subtitleAnim) try { subtitleAnim.seek(progress * subtitleAnim.duration); } catch {}
        if (panelAnim) try { panelAnim.seek(progress * panelAnim.duration); } catch {}
        if (presetAnim) try { presetAnim.seek(progress * presetAnim.duration); } catch {}
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      [kickerAnim, headingAnim, subtitleAnim, panelAnim, presetAnim].forEach((a) => { if (a) try { a.pause(); } catch {} });
    };
  }, []);

  const handlePhoneChange = (value: string) => {
    setPhone(value.replace(/[^0-9+]/g, ""));
  };

  const validatePhone = (num: string): boolean => {
    const cleaned = num.replace(/\s/g, "");
    return /^\+?[1-9]\d{7,14}$/.test(cleaned);
  };

  const handleSend = () => {
    const trimmedPhone = phone.trim();
    const trimmedMessage = message.trim();

    if (!trimmedPhone) {
      toast.error("Please enter a phone number.");
      return;
    }
    if (!validatePhone(trimmedPhone)) {
      toast.error("Please enter a valid phone number with country code (e.g. +919876543210).");
      return;
    }
    if (!trimmedMessage) {
      toast.error("Please enter a message.");
      return;
    }

    const cleanNumber = trimmedPhone.replace(/^\+/, "");
    const encoded = encodeURIComponent(trimmedMessage);
    window.open(`https://wa.me/${cleanNumber}?text=${encoded}`, "_blank");
    toast.success("Opening WhatsApp...");
  };

  return (
    <section ref={sectionRef} id="whatsapp" className="section-padding luxury-section bg-background">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <p className="wa-kicker text-primary font-medium tracking-widest uppercase text-sm mb-3">
            Quick Message
          </p>
          <h2 className="wa-heading font-display text-4xl min-[360px]:text-5xl sm:text-6xl mb-4">
            SEND VIA WHATSAPP
          </h2>
          <p className="wa-subtitle text-muted-foreground max-w-md mx-auto">
            Enter a phone number and message to start a WhatsApp conversation instantly.
          </p>
        </div>

        <div className="wa-panel luxury-panel rounded-xl p-6 sm:p-8 space-y-5">
          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="wa-phone">Phone Number (with country code) *</Label>
            <Input
              id="wa-phone"
              className="field-premium"
              placeholder="+919876543210"
              maxLength={16}
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
            />
          </div>

          {/* Preset Templates */}
          <div className="space-y-2">
            <Label>Quick Templates</Label>
            <div className="flex flex-wrap gap-2">
              {PRESET_MESSAGES.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setMessage(preset)}
                  className="wa-preset text-xs px-3 py-1.5 rounded-full border border-border bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground hover:-translate-y-0.5 transition-all duration-200 ease-out"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="wa-message">Message *</Label>
            <Textarea
              id="wa-message"
              className="field-premium"
              placeholder="Type your message here..."
              maxLength={1000}
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {/* Send Button */}
          <Button
            onClick={handleSend}
            className="luxury-button w-full font-display text-lg tracking-wider gap-2"
            size="lg"
          >
            <MessageCircle className="w-5 h-5" />
            SEND VIA WHATSAPP
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppSender;
