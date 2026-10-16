import type { Intent } from './types';
const aliases: Record<string,string> = {batery:'battery',detaling:'detailing',servce:'service',inspecion:'inspection'};
export function normalize(text: string) {
 return text.toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9\s]/g,' ').split(/\s+/).map(word=>aliases[word]??word).join(' ').trim();
}
const rules: [Intent,RegExp][] = [
 ['SERVICES_OVERVIEW',/\b(what services|which services|services (do|you|available|offer)|what do you (guys )?do|all services)\b|^services$/],
 ['LOCATION',/\b(where|location|address|directions|located)\b/],
 ['CONTACT',/\b(contact|phone|call|email|number)\b/],
 ['BOOK_SERVICE',/\b(book|booking|appointment|request|enquire|enquiry)\b/],
 ['DOORSTEP_PICKUP',/\b(pickup|pick up|doorstep|delivery)\b/],
 ['AMC',/\b(amc|annual maintenance)\b/],
 ['BATTERY',/\b(battery|batteries|wont start|not starting|doesnt start|cannot start|cant start)\b/],
 ['SPARE_PARTS',/\b(spare parts?|replacement parts?)\b/],
 ['DETAILING',/\b(detailing|detail|polish|clean|cleaned|cleaning|wash|washing)\b/],
 ['VEHICLE_INSPECTION',/\b(inspection|inspect|check my (car|vehicle)|vehicle check)\b/],
 ['CONSULTATION',/\b(consultation|consult|advice)\b/],
 ['INSTALLATION',/\b(installation|install|fit|fitting|accessories)\b/],
 ['REPAIR',/\b(repairs?|brakes?|noise|engine|overheating|smoke|steering|tyres?|tires?)\b/],
 ['AUTOMOBILE_SERVICE',/\b(service|servicing|maintenance)\b/],
 ['GREETING',/^(hello|hi|hey|good morning|good evening)( there)?$/],
 ['HELP',/^(help|help me|what can you do)$/],
];
export function recognize(text: string): Intent {
 const query=normalize(text);
 // Business facts absent from verified knowledge must not become generic service replies.
 if (/\b(price|cost|hours|open|close|warranty|guarantee|rating|certification|weather|tomorrow|discount|how much)\b/.test(query)) return 'UNKNOWN';
 return rules.find(([,pattern])=>pattern.test(query))?.[0]??'UNKNOWN';
}
