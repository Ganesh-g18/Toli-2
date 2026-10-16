import { services } from '@/lib/service-catalog';
// Source: existing service-catalog.ts and Contact.tsx. No inferred hours/prices.
export const knowledge = services.map(({title,desc}) => ({title,desc}));
export const contact = 'Call +91-8074946335 or email tolimotorsatp@gmail.com.';
export const location = '6-2-806, Ram Nagar, Kovur Nagar, Anantapur, Andhra Pradesh 515004.';
export const greeting = 'Hi. I can help you find TOLI Motors services or start a service request. What do you need help with?';
