import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Send } from "lucide-react";

interface EnquireDialogProps {
  children: React.ReactNode;
}

const vehicleBrands = [
  "Maruti Suzuki",
  "Hyundai",
  "Tata",
  "Toyota",
  "Mahindra",
  "Kia",
  "Honda",
  "MG",
  "Renault",
  "Nissan",
  "Volkswagen",
  "Skoda",
  "Ford",
  "Chevrolet",
  "Other",
];

const EnquireDialog = ({ children }: EnquireDialogProps) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", brand: "", service: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const name = form.name.trim();
    const phone = form.phone.trim();
    if (!name || !phone) {
      toast.error("Please fill in your name and phone number.");
      return;
    }
    if (!/^[0-9]{10}$/.test(phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    const brand = form.brand ? `Vehicle: ${form.brand}.` : "";
    const text = `Hi, I'm ${encodeURIComponent(name)}. Phone: ${encodeURIComponent(phone)}. ${brand} Service: ${encodeURIComponent(form.service.trim() || "General Enquiry")}. ${encodeURIComponent(form.message.trim())}`;
    window.open(`https://wa.me/918074946335?text=${text}`, "_blank");

    toast.success("Redirecting to WhatsApp...");
    setForm({ name: "", phone: "", brand: "", service: "", message: "" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl tracking-wider">ENQUIRE NOW</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              className="field-premium"
              id="name"
              placeholder="Your full name"
              maxLength={100}
              value={form.name}
              onChange={(e) => setForm((current) => ({ ...current, name: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <div className="flex gap-2">
              <div className="flex items-center px-3 rounded-md border border-input bg-muted text-sm text-muted-foreground select-none">
                +91
              </div>
              <Input
                id="phone"
                placeholder="10-digit mobile number"
                maxLength={10}
                value={form.phone}
                onChange={(e) => setForm((current) => ({ ...current, phone: e.target.value.replace(/\D/g, "") }))}
                required
                className="field-premium flex-1"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="brand">Vehicle Brand</Label>
            <select
              id="brand"
              value={form.brand}
              onChange={(e) => setForm((current) => ({ ...current, brand: e.target.value }))}
              className="field-premium flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="">Select your vehicle brand</option>
              {vehicleBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="service">Service Needed</Label>
            <Input
              className="field-premium"
              id="service"
              placeholder="e.g. General Service, Denting & Painting"
              maxLength={200}
              value={form.service}
              onChange={(e) => setForm((current) => ({ ...current, service: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              className="field-premium"
              id="message"
              placeholder="Any additional details..."
              maxLength={500}
              rows={3}
              value={form.message}
              onChange={(e) => setForm((current) => ({ ...current, message: e.target.value }))}
            />
          </div>
          <Button type="submit" className="luxury-button w-full font-display text-lg tracking-wider gap-2">
            <Send className="w-4 h-4" /> SEND VIA WHATSAPP
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EnquireDialog;
