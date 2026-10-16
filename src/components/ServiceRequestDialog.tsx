import ToliLogoPill from '@/components/ToliLogoPill';
import ThemeToggle from '@/components/ThemeToggle';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { ServiceRequestDialogContext } from './service-request-dialog-context';
import ServiceRequestSteps from './ServiceRequestSteps';
import { services } from '@/lib/service-catalog';
import { requestDrafts,recordRequestReturn,type RequestReturnState } from '@/lib/service-request';
import './enquiry.css';
export default function ServiceRequestDialogProvider({children}:{children:ReactNode}) {
 const location=useLocation();
 const [viewport,setViewport]=useState({height:window.visualViewport?.height??innerHeight,top:window.visualViewport?.offsetTop??0});
 useEffect(()=>{const visual=window.visualViewport;if(!visual)return;const update=()=>setViewport({height:visual.height,top:visual.offsetTop});visual.addEventListener('resize',update);visual.addEventListener('scroll',update);return()=>{visual.removeEventListener('resize',update);visual.removeEventListener('scroll',update);};},[]);
 const [isOpen,setOpen]=useState(false),[entry,setEntry]=useState({service:undefined as string|undefined,id:0});
 const trigger=useRef<HTMLElement>(),position=useRef({x:0,y:0}),origin=useRef(''),triggerIndex=useRef(0),triggerText=useRef(''),returnIndex=useRef(0),snapshot=useRef<RequestReturnState>(),resume=useRef(false);
 const open=(service:string|undefined,element:HTMLElement,state?:RequestReturnState)=>{
  const valid=services.find(s=>s.title===service)?.title;
  const saved=requestDrafts.get(valid??'');if(saved)requestDrafts.set(valid??'',{...saved,step:0});
  trigger.current=element;triggerText.current=element.textContent?.trim()??'';triggerIndex.current=Array.from(document.querySelectorAll('button[data-service-request]')).indexOf(element as HTMLButtonElement);returnIndex.current=element.closest('.experience-menu')?0:triggerIndex.current;snapshot.current=state?{selected:state.selected,hasSelection:state.hasSelection,technical:state.technical,componentFocus:state.componentFocus}:undefined;position.current={x:scrollX,y:scrollY};origin.current=location.key;resume.current=false;
  setEntry(e=>({service:valid,id:e.id+1}));setOpen(true);
 };
 // Legal-policy navigation may temporarily leave the originating page; history Back restores this draft.
 useEffect(()=>{
  if(isOpen&&location.key!==origin.current){if(trigger.current)recordRequestReturn(trigger.current,snapshot.current,{index:returnIndex.current,scrollY:position.current.y});resume.current=true;setOpen(false);}
  else if(resume.current&&location.key===origin.current){resume.current=false;setOpen(true);}
 },[location.key,isOpen]);
 const close=()=>{resume.current=false;setOpen(false);};
 return <ServiceRequestDialogContext.Provider value={{isOpen,open}}><div data-service-request-background aria-hidden={isOpen||undefined} {...(isOpen?{inert:''}:{})}>{children}</div><Dialog.Root open={isOpen} onOpenChange={value=>{if(!value)close();}}><Dialog.Portal><Dialog.Overlay className="request-dialog-overlay"/><Dialog.Content aria-modal="true" className="request-dialog" style={{'--request-viewport-height':`${viewport.height}px`,'--request-viewport-top':`${viewport.top}px`} as React.CSSProperties} onEscapeKeyDown={event=>{if(document.querySelector('.request-brand input[aria-expanded=true]'))event.preventDefault();}} onOpenAutoFocus={event=>{event.preventDefault();document.querySelector<HTMLElement>('[data-request-first]')?.focus({preventScroll:true});}} onCloseAutoFocus={event=>{event.preventDefault();if(location.key!==origin.current)return;const target=trigger.current?.isConnected?trigger.current:(Array.from(document.querySelectorAll<HTMLElement>('button[data-service-request]')).find(button=>button.textContent?.trim()===triggerText.current)??document.querySelector<HTMLElement>('.nav-book'));target?.focus({preventScroll:true});window.scrollTo({left:position.current.x,top:position.current.y,behavior:'instant'});}}><header className="request-dialog-header"><div><ToliLogoPill size="compact"/><Dialog.Title>Service request.</Dialog.Title><Dialog.Description className="sr-only">A four-step service enquiry. Your details, vehicle, service and review.</Dialog.Description></div><div className="request-header-tools"><ThemeToggle/><Dialog.Close className="request-close" aria-label="Close Service Request"><X size={20} aria-hidden="true"/><span>Close</span></Dialog.Close></div></header><ServiceRequestSteps key={entry.id} defaultService={entry.service} onDone={close}/></Dialog.Content></Dialog.Portal></Dialog.Root></ServiceRequestDialogContext.Provider>;
}
