import JourneyTrim from "@/components/journey/JourneyTrim";
import { useSectionEntrance } from "@/hooks/use-section-entrance";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Send, MessageCircle } from "lucide-react";

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

  useSectionEntrance(sectionRef, ".wa-kicker, .wa-heading, .wa-subtitle, .wa-panel, .wa-preset");
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
    <section ref={sectionRef} id="whatsapp" className="journey-section journey-message section-padding luxury-section bg-background" data-journey-section="message">
      <JourneyTrim number="13" label="LET’S TALK" motif="frame" />
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
          <p className="text-xs leading-relaxed text-muted-foreground">
            Messages are sent through WhatsApp, which is operated by Meta and is subject to WhatsApp's own
            terms and privacy policy. Please do not include sensitive personal information. See our{" "}
            <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppSender;
