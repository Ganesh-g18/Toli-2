export interface KBEntry {
  keywords: string[];
  response: string;
}

export const knowledgeBase: KBEntry[] = [
  // Services
  {
    keywords: ["service", "services", "what do you do", "offer", "offers", "provide"],
    response: "We offer comprehensive multi-brand car services including:\n\n- **Automobile Services** — Expert diagnostics and repairs for all brands\n- **Spare Parts & Repairs** — Genuine parts and professional repairs\n- **Battery Services** — Amaron battery repair, replacement, and maintenance\n- **Premium Detailing** — Showroom-grade exterior polish and deep interior detailing\n- **Vehicle Inspection** — Thorough 30-point inspection\n- **Consultation** — Expert advice on maintenance and upgrades\n- **Installation** — Professional installation of parts and accessories\n- **Doorstep Pickup** — Convenient pickup and delivery service\n- **AMC Plans** — Annual maintenance contracts\n\nWould you like details on any specific service?",
  },
  {
    keywords: ["amc", "annual maintenance", "maintenance contract", "maintenance plan"],
    response: "We offer **Annual Maintenance Contracts (AMC)** customized to your vehicle's requirements and budget. This includes scheduled servicing, priority booking, and discounted rates throughout the year.\n\nContact us at **+91-8074946335** for AMC pricing and details.",
  },
  {
    keywords: ["battery", "batteries", "amaron", "battery replacement", "battery repair"],
    response: "We specialize in **Amaron battery services** including:\n- Battery health check\n- Battery repair\n- Battery replacement\n- Battery maintenance\n\nAll batteries come with manufacturer warranty. Call us at **+91-8074946335** for battery-related queries.",
  },
  {
    keywords: ["detailing", "polish", "interior", "exterior", "wash", "cleaning", "spa"],
    response: "Our **Premium Detailing** service includes:\n- Showroom-grade exterior polish\n- Deep interior cleaning and conditioning\n- Dashboard and trim restoration\n- Window and glass cleaning\n- Tyre dressing\n\nYour car will feel brand new! Call **+91-8074946335** for pricing.",
  },
  {
    keywords: ["inspection", "checkup", "check-up", "diagnostic", "diagnosis", "health check"],
    response: "Our **30-Point Vehicle Inspection** covers:\n- Engine and transmission check\n- Brake system inspection\n- Battery health check\n- Tire condition and alignment\n- Fluid levels check\n- Electrical systems check\n- AC performance test\n\nGet a detailed report of your car's condition. Book now at **+91-8074946335**.",
  },
  {
    keywords: ["pickup", "drop", "doorstep", "home service", "pickup and drop", "delivery"],
    response: "Yes! We offer **Doorstep Pickup & Delivery** service. Our team will:\n1. Arrive at your location at the scheduled time\n2. Pick up your car\n3. Take it to our workshop for service\n4. Deliver it back to you — clean, serviced, and road-ready\n\nYou only pay when you're satisfied! Call **+91-8074946335** to book.",
  },

  // Pricing
  {
    keywords: ["price", "pricing", "cost", "rate", "rates", "charge", "charges", "fee", "how much", "expensive", "cheap", "affordable", "budget"],
    response: "Our pricing is competitive and transparent with **no hidden costs**. The exact cost depends on:\n- Vehicle make and model\n- Type of service required\n- Parts needed (if any)\n\nFor an accurate quote, please:\n- Call us at **+91-8074946335**\n- WhatsApp us at **+91-9908303888**\n- Or use the enquiry form on our website\n\nWe'll provide a detailed estimate before starting any work.",
  },

  // Booking
  {
    keywords: ["book", "booking", "appointment", "schedule", "slot", "reserve", "enquiry", "enquire", "enquire now"],
    response: "You can book a service in 3 easy ways:\n\n1. **Call us** — +91-8074946335 or +91-9908303888\n2. **WhatsApp** — Send a message to +91-9908303888\n3. **Online** — Fill the enquiry form on our website\n\nPick a date that works for you, and we'll handle the rest!",
  },

  // Process
  {
    keywords: ["process", "how", "work", "works", "step", "steps", "procedure"],
    response: "Our service process is simple — **4 easy steps**:\n\n1. **Book a Service** — Call, WhatsApp, or fill the enquiry form\n2. **We Pick Up** — Our team arrives at your doorstep\n3. **Expert Service** — Certified care with genuine parts\n4. **Delivered Ready** — Clean, serviced, and road-ready. Pay only when satisfied!\n\nWant to start? Call **+91-8074946335**.",
  },

  // Working Hours
  {
    keywords: ["hour", "hours", "time", "timing", "open", "close", "closed", "when", "work hours", "working hours", "business hours"],
    response: "We're open **Monday to Saturday**:\n\n- **Morning:** 9:00 AM\n- **Evening:** 8:00 PM\n\n**Sunday:** Closed\n\nCall us at **+91-8074946335** for any queries!",
  },

  // Location
  {
    keywords: ["location", "address", "where", "find", "map", "direction", "reach", "situated", "anantapur", "shop", "workshop"],
    response: "We're located at:\n\n**Toli Motors**\nKamalanagar, Anantapur,\nAndhra Pradesh 515001\n\n📞 Call: +91-8074946335\n📧 Email: tolimotorsatp@gmail.com\n\nYou can find us on Google Maps — just search \"Toli Motors Anantapur\"!",
  },

  // Contact
  {
    keywords: ["contact", "phone", "call", "number", "mobile", "email", "mail", "whatsapp", "reach you"],
    response: "Here are our contact details:\n\n📞 **Phone:** +91-8074946335\n📱 **WhatsApp:** +91-9908303888\n📧 **Email:** tolimotorsatp@gmail.com\n\n**Working Hours:** Mon–Sat, 9:00 AM – 8:00 PM\n\nFeel free to reach out anytime!",
  },

  // Brands
  {
    keywords: ["brand", "brands", "which car", "car brand", "multi-brand", "vehicle", "cars"],
    response: "We service **21+ multi-brand vehicles** including:\n\nMaruti Suzuki, Hyundai, Tata, Toyota, Mahindra, Kia, Honda, MG, Renault, Nissan, Volkswagen, Skoda, Ford, Jeep, Citroen, Isuzu, Volvo, Audi, BMW, Mercedes-Benz, and Lexus.\n\nAnd many more! We have expertise across all major car brands.",
  },
  {
    keywords: ["toyota", "hyundai", "maruti", "suzuki", "tata", "mahindra", "kia", "honda", "ford", "volkswagen", "vw", "skoda", "nissan", "renault", "mg", "jeep", "bmw", "audi", "mercedes", "volvo", "lexus"],
    response: "Yes, we service **Toyota, Hyundai, Maruti Suzuki, and all other major brands**! Our certified technicians have deep multi-brand expertise.\n\nWhich car do you need serviced? Call **+91-8074946335** for a quick quote.",
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
    response: "**Toli Motors** is a trusted multi-brand car workshop situated in Anantapur, Andhra Pradesh.\n\nWe have **25+ years of experience** and have served **12,000+ happy customers**. Our strengths:\n- Expert technicians with multi-brand expertise\n- Genuine parts and premium quality\n- Affordable, transparent pricing\n- Doorstep pickup and delivery\n- 98% customer satisfaction rate\n\nVisit us at Kamalanagar, Anantapur, Andhra Pradesh 515001.",
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
