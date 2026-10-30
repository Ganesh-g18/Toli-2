export type Intent = 'GREETING' | 'SERVICES_OVERVIEW' | 'AUTOMOBILE_SERVICE' | 'REPAIR' | 'SPARE_PARTS' | 'BATTERY' | 'DETAILING' | 'VEHICLE_INSPECTION' | 'CONSULTATION' | 'INSTALLATION' | 'DOORSTEP_PICKUP' | 'AMC' | 'BOOK_SERVICE' | 'CONTACT' | 'LOCATION' | 'HELP' | 'UNKNOWN';
export interface AssistantContext { service?: string }
export interface AssistantReply { intent: Intent; text: string; service?: string; action?: string; context: AssistantContext }
export interface Message { role: 'user' | 'assistant'; text: string; service?: string; action?: string }
