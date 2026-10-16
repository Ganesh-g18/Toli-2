import { normalize, recognize } from './intents';
import { knowledge, contact, location, greeting } from './knowledge';
import type { AssistantContext, AssistantReply, Intent } from './types';
const serviceFor: Partial<Record<Intent,string>> = {AUTOMOBILE_SERVICE:'Automobile Services',REPAIR:'Spare Parts & Repairs',SPARE_PARTS:'Spare Parts & Repairs',BATTERY:'Battery Services',DETAILING:'Premium Detailing',VEHICLE_INSPECTION:'Vehicle Inspection',CONSULTATION:'Consultation',INSTALLATION:'Installation',DOORSTEP_PICKUP:'Doorstep Pickup',AMC:'AMC Plans'};
export function answer(message: string, context: AssistantContext = {}): AssistantReply {
 const intent=recognize(message), query=normalize(message);
 const mentioned=knowledge.find(service=>normalize(service.title)===query)?.title;
 const service=serviceFor[intent]??mentioned;
 const next=service?{service}:context;
 const reply=(text:string,action?:string,selected=service):AssistantReply=>({intent,text,action,service:selected,context:selected?{service:selected}:next});
 if(service && intent!=='BOOK_SERVICE') {
  const entry=knowledge.find(item=>item.title===service)!;
  const starting=/\b(start|starting)\b/.test(query);
  const safety=/\b(brake|brakes|smoke|overheating|steering)\b/.test(query);
  return reply(`${starting?'Starting problems can have several causes. Battery Services may be relevant for battery or starting concerns. ':''}${entry.desc}${safety?' For safety-related concerns, avoid driving if the vehicle feels unsafe and seek professional inspection.':''} I cannot diagnose a vehicle or provide repair procedures.`, `Request ${service}`);
 }
 switch(intent) {
  case 'GREETING':return reply(greeting);
  case 'SERVICES_OVERVIEW':return reply(`Our service categories are: ${knowledge.map(item=>item.title).join('; ')}. Ask about one to see details and start a request.`);
  case 'BOOK_SERVICE': {
   const selected=Object.entries(serviceFor).find(([key])=>recognize(query.replace(/\b(book|booking|appointment|request|enquire|enquiry)\b/g,''))===key)?.[1]??context.service;
   return reply(`You can start ${selected?`a ${selected} enquiry`:'a service enquiry'} in our Service Request form. Our team confirms availability and arrangements; this does not confirm a booking.`,selected?`Request ${selected}`:'Request Service',selected);
  }
  case 'LOCATION':return reply(`TOLI Motors is at ${location}`);
  case 'CONTACT':return reply(contact);
  case 'HELP':return reply('I’m a basic local service assistant. Ask about services, battery concerns, repairs, detailing, inspection, consultation, installation, pickup, AMC, contact, location or requesting service.');
  default:return reply('I don’t have verified information for that question. I can help with TOLI Motors services and service requests. Try battery service, repairs, detailing, inspection, pickup, AMC or booking. For other details, contact our team.');
 }
}
