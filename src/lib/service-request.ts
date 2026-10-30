import { services, serviceId } from '@/lib/service-catalog';
export const SERVICE_REQUEST_ROUTE='/enquire-now';
export function serviceRequestDestination(title?:string) {
 const service=services.find(s=>s.title===title);
 return service?`${SERVICE_REQUEST_ROUTE}?service=${serviceId(service.title)}`:SERVICE_REQUEST_ROUTE;
}
export function requestServiceFromSearch(params:URLSearchParams) {
 return services.find(s=>serviceId(s.title)===params.get('service'))?.title;
}

export type RequestReturnState={selected:number;hasSelection:boolean;technical:boolean;componentFocus:boolean};
let returnPosition:{index:number;scrollY:number;state?:RequestReturnState}|undefined;
export function recordRequestReturn(link:HTMLElement,state?:RequestReturnState,position?:{index:number;scrollY:number}) {
 returnPosition={index:position?.index??Array.from(document.querySelectorAll('[data-service-request]')).indexOf(link),scrollY:position?.scrollY??window.scrollY,state:state?{selected:state.selected,hasSelection:state.hasSelection,technical:state.technical,componentFocus:state.componentFocus}:undefined};
}
export function takeRequestReturn(){const position=returnPosition;returnPosition=undefined;return position;}

export type RequestForm={name:string;phone:string;brand:string;model?:string;service:string;message:string};
export const requestDrafts=new Map<string,{form:RequestForm;consent:boolean;entryKey?:string;step?:number}>();
export const resetRequestDrafts=()=>{requestDrafts.clear();returnPosition=undefined;};
