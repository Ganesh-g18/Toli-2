import type { RequestReturnState } from '@/lib/service-request';
import { createContext, useContext } from 'react';
export type ServiceRequestDialogControl={isOpen:boolean;open(service:string|undefined,trigger:HTMLElement,state?:RequestReturnState):void};
export const ServiceRequestDialogContext=createContext<ServiceRequestDialogControl|undefined>(undefined);
export const useServiceRequestDialog=()=>useContext(ServiceRequestDialogContext);
