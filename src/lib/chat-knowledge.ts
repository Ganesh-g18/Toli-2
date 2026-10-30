import {services} from './service-catalog';
export interface KBEntry {
  keywords: string[];
  response: string;
}

export const knowledgeBase: KBEntry[] = [
  // Services
  {
    keywords: ["service", "services", "what do you do", "offer", "offers", "provide"],
    response: "Explore our existing services:\n\n" + services.map(service=>`**${service.title}** — ${service.desc}`).join("\n\n") + "\n\nService availability is confirmed by our team.",
  },
  {
    keywords: ["amc", "annual maintenance", "maintenance contract", "maintenance plan"],
    response: "Discuss an Annual Maintenance Contract for your vehicle. Ask our team about included work, eligibility, terms and pricing at +91-8074946335.",
  },
  {
    keywords: ["battery", "batteries", "amaron", "battery replacement", "battery repair"],
    response: "We provide **Amaron battery services** including:\n- Battery health check\n- Battery repair\n- Battery replacement\n- Battery maintenance\n\nBatteries generally carry the manufacturer's warranty — please confirm the exact warranty terms when booking. Call us at **+91-8074946335** for battery-related queries.",
  },
  {
    keywords: ["detailing", "polish", "interior", "exterior", "wash", "cleaning", "spa"],
    response: "Ask about exterior polishing and interior detailing. Describe the areas you want treated, and confirm inclusions, availability and pricing with our team at +91-8074946335.",
  },
  {
    keywords: ["inspection", "checkup", "check-up", "diagnostic", "diagnosis", "health check"],
    response: "Ask our team about Vehicle Inspection and the checks relevant to your concern. Confirm inspection scope and pricing directly with the workshop at +91-8074946335.",
  },
  {
    keywords: ["pickup", "drop", "doorstep", "home service", "pickup and drop", "delivery"],
    response: "Ask our team about pickup and delivery options for a workshop visit. Confirm coverage, availability, arrangements and any charges before proceeding. Call +91-8074946335.",
  },

  // Pricing
  {
    keywords: ["price", "pricing", "cost", "rate", "rates", "charge", "charges", "fee", "how much", "expensive", "cheap", "affordable", "budget"],
    response: "Our pricing is competitive and transparent with **no hidden costs**. The exact cost depends on:\n- Vehicle make and model\n- Type of service required\n- Parts needed (if any)\n\nFor an accurate quote, please:\n- Call us at **+91-8074946335**\n- WhatsApp us at **+91-9908303888**\n- Or use the enquiry form on our website\n\nWe'll provide a detailed estimate before starting any work.",
  },

  // Booking
  {
    keywords: ["book", "booking", "appointment", "schedule", "slot", "reserve", "enquiry", "enquire", "enquire now"],
    response: "Request service using the website form, call +91-8074946335 or +91-9908303888, or contact us on WhatsApp. The form opens a draft for you to send; appointments are confirmed directly with the workshop.",
  },

  // Process
  {
    keywords: ["process", "how", "work", "works", "step", "steps", "procedure"],
    response: "Choose a service, enter your contact details and review your request. The form opens a WhatsApp draft: review and send it in WhatsApp. Discuss availability, scope, pricing and arrangements with our team. Opening the draft does not confirm a booking.",
  },

  // Working Hours
  {
    keywords: ["hour", "hours", "time", "timing", "open", "close", "closed", "when", "work hours", "working hours", "business hours"],
    response: "We're open **Monday to Saturday**:\n\n- **Morning:** 9:00 AM\n- **Evening:** 8:00 PM\n\n**Sunday:** Closed\n\nCall us at **+91-8074946335** for any queries!",
  },

  // Location
  {
    keywords: ["location", "address", "where", "find", "map", "direction", "reach", "situated", "anantapur", "shop", "workshop"],
    response: "We're located at:\n\n**Toli Motors**\n6-2-806, Ram Nagar, Kovur Nagar, Anantapur, Andhra Pradesh 515004\n\n📞 Call: +91-8074946335\n📧 Email: tolimotorsatp@gmail.com\n\nYou can find us on Google Maps — just search \"Toli Motors Anantapur\"!",
  },

  // Contact
  {
    keywords: ["contact", "phone", "call", "number", "mobile", "email", "mail", "whatsapp", "reach you"],
    response: "Here are our contact details:\n\n📞 **Phone:** +91-8074946335\n📱 **WhatsApp:** +91-9908303888\n📧 **Email:** tolimotorsatp@gmail.com\n\n**Working Hours:** Mon–Sat, 9:00 AM – 8:00 PM\n\nFeel free to reach out anytime!",
  },

  // Reviews
  {
    keywords: ["review", "reviews", "feedback", "rating", "testimonial", "testimonials", "google review", "google reviews"],
    response: "We welcome genuine feedback! You can read and share reviews on our **Google Business Profile** — just search **\"Toli Motors Anantapur\"** on Google Maps.\n\nOr share your feedback with us directly on WhatsApp at **+91-9908303888**.",
  },

  // Brands
  {
    keywords: ["brand", "brands", "which car", "car brand", "multi-brand", "vehicle", "cars"],
    response: "We service **21+ multi-brand vehicles** including:\n\nMaruti Suzuki, Hyundai, Tata, Toyota, Mahindra, Kia, Honda, MG, Renault, Nissan, Volkswagen, Skoda, Ford, Jeep, Citroen, Isuzu, Volvo, Audi, BMW, Mercedes-Benz, and Lexus.\n\nAnd many more! We have expertise across all major car brands.",
  },
  {
    keywords: ["toyota", "hyundai", "maruti", "suzuki", "tata", "mahindra", "kia", "honda", "ford", "volkswagen", "vw", "skoda", "nissan", "renault", "mg", "jeep", "bmw", "audi", "mercedes", "volvo", "lexus"],
    response: "Share your vehicle make, model and the service you need. Our team will confirm availability for your vehicle. Call +91-8074946335.",
  },

  // Insurance
  {
    keywords: ["insurance", "claim", "cashless"],
    response: "For insurance-related queries, please contact us directly at **+91-8074946335**. We can help guide you through the process and work with your insurance provider for eligible services.",
  },

  // Greeting
  {
    keywords: ["hello", "hi", "hey", "good morning", "good evening", "good afternoon", "namaste", "namaskar"],
    response: "Hello! Welcome to **Toli Motors** — your trusted multi-brand car workshop in Anantapur. 👋\n\nHow can I help you today? You can ask me about:\n- Our services\n- Pricing\n- Booking an appointment\n- Working hours\n- Location",
  },
  {
    keywords: ["thank", "thanks", "thank you", "dhanyavad"],
    response: "You're welcome! 😊 Is there anything else I can help you with?\n\nIf you need immediate assistance, call us at **+91-8074946335**.",
  },

  // About
  {
    keywords: ["about", "who", "about toli", "tell me about", "company", "workshop"],
    response: "**Toli Motors** is a multi-brand car workshop with **20+ years of hands-on automotive experience**, situated in Anantapur, Andhra Pradesh.\n\nWe focus on:\n- Multi-brand service expertise across major car brands\n- Genuine parts and attention to quality\n- Affordable, transparent pricing\n- Doorstep pickup and delivery\n\nVisit us at 6-2-806, Ram Nagar, Kovur Nagar, Anantapur, Andhra Pradesh 515004.",
  },

  // Spare parts
  {
    keywords: ["spare part", "spare parts", "genuine parts", "parts", "original", "accessories", "accessory"],
    response: "We use only **genuine spare parts** for all repairs and replacements. We also offer professional installation of parts and accessories.\n\nFor specific part availability and pricing, call us at **+91-8074946335**.",
  },

  // Denting / Painting
  {
    keywords: ["dent", "denting", "paint", "painting", "scratch", "denting painting", "body work", "dent removal"],
    response: "We offer professional **Denting & Painting** services:\n- Dent removal and repair\n- Scratch removal\n- Full body painting\n- Bumper repair\n- Color matching\n\nFor a quote on denting and painting, call **+91-8074946335** or share photos on WhatsApp at **+91-9908303888**.",
  },

  // AC
  {
    keywords: ["ac", "air conditioning", "air conditioner", "cooling", "ac service", "ac repair", "gas"],
    response: "We provide complete **AC services**:\n- AC gas refill\n- AC performance check\n- AC compressor repair\n- Cabin filter replacement\n- Complete AC system diagnosis\n\nGet your AC serviced before the heat hits! Call **+91-8074946335**.",
  },

  // Oil change
  {
    keywords: ["oil", "oil change", "engine oil", "lubricant", "oil filter"],
    response: "We provide **engine oil change and filter replacement** services with premium quality oils suited for your vehicle.\n\nFor oil change pricing and recommendations for your car, call **+91-8074946335**.",
  },

  // Tyre
  {
    keywords: ["tyre", "tire", "tyres", "tires", "wheel", "alignment", "balancing", "rotation"],
    response: "We offer:\n- Tyre condition check\n- Wheel alignment\n- Wheel balancing\n- Tyre rotation\n- Tyre replacement (genuine brands)\n\nFor tyre services and pricing, call **+91-8074946335**.",
  },

  // Brake
  {
    keywords: ["brake", "brakes", "brake pad", "brake service", "braking"],
    response: "We provide complete **brake services**:\n- Brake pad replacement\n- Brake disc/rotor service\n- Brake fluid check and replacement\n- Complete brake system inspection\n\nDon't ignore brake issues! Call **+91-8074946335** for a brake check.",
  },

  // Clutch
  {
    keywords: ["clutch", "gear", "transmission", "gear oil"],
    response: "We offer **clutch and transmission services**:\n- Clutch plate replacement\n- Clutch bearing replacement\n- Gear oil change\n- Transmission system diagnosis\n\nIf you're facing gear or clutch issues, call **+91-8074946335**.",
  },

  // Default / fallback
  {
    keywords: [],
    response: "I'm not sure I understand that question. Here's what I can help with:\n\n- **Services** — What we offer\n- **Pricing** — How much things cost\n- **Booking** — How to schedule an appointment\n- **Working hours** — When we're open\n- **Location** — Where we're located\n- **Brands** — Which cars we service\n- **Contact** — Phone, WhatsApp, email\n\nOr call us directly at **+91-8074946335** for any queries!",
  },
];
