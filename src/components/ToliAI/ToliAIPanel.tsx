import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Send } from 'lucide-react';
import { answer } from '@/ai/assistant';
import { greeting } from '@/ai/knowledge';
import type { AssistantContext, Message } from '@/ai/types';
const quick=['Services','Battery Services','Spare Parts & Repairs','Premium Detailing','Vehicle Inspection','Book Service'];
export default function ToliAIPanel({open,onClose,onRequest,onReturnFocus}:{open:boolean;onClose():void;onReturnFocus():void;onRequest(service?:string):void}) {
 const [messages,setMessages]=useState<Message[]>([{role:'assistant',text:greeting}]),[input,setInput]=useState('');
 const context=useRef<AssistantContext>({}),history=useRef<HTMLDivElement>(null),inputRef=useRef<HTMLInputElement>(null);
 const [viewport,setViewport]=useState({height:window.visualViewport?.height??innerHeight,top:window.visualViewport?.offsetTop??0});
 useEffect(()=>{const visual=window.visualViewport;if(!visual)return;const update=()=>setViewport({height:visual.height,top:visual.offsetTop});visual.addEventListener('resize',update);visual.addEventListener('scroll',update);return()=>{visual.removeEventListener('resize',update);visual.removeEventListener('scroll',update);};},[]);
 useEffect(()=>{const el=history.current;if(el)el.scrollTop=el.scrollHeight;},[messages,open]);
 const send=(text:string)=>{const value=text.trim().slice(0,500);if(!value)return;const response=answer(value,context.current);context.current=response.context;setMessages(previous=>[...previous.slice(-98),{role:'user',text:value},{role:'assistant',text:response.text,service:response.service,action:response.action}]);setInput('');inputRef.current?.focus();};
 return createPortal(<Dialog.Root open={open} onOpenChange={value=>{if(!value)onClose();}}><Dialog.Portal><Dialog.Overlay className="toli-ai-overlay"/><Dialog.Content className="toli-ai-panel" data-compact={viewport.height<500} style={{'--ai-height':`${viewport.height}px`,'--ai-top':`${viewport.top}px`} as React.CSSProperties} onOpenAutoFocus={event=>{event.preventDefault();inputRef.current?.focus();}} onCloseAutoFocus={event=>{event.preventDefault();onReturnFocus();}}>
  <header><div><Dialog.Title>TOLI AI</Dialog.Title><span>SERVICE ASSISTANT</span></div><Dialog.Close aria-label="Close TOLI AI"><X size={20}/></Dialog.Close></header>
  <Dialog.Description className="toli-ai-disclosure">Basic local service guidance. Messages stay in this tab.</Dialog.Description>
  <div ref={history} className="toli-ai-history" role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions">
   {messages.map((message,index)=><article key={index} className={`toli-ai-message ${message.role}`}><span>{message.role==='user'?'YOU':'TOLI AI'}</span><p>{message.text}</p>{message.action&&<button type="button" onClick={()=>onRequest(message.service)}>{message.action} ↗</button>}</article>)}
  </div>
  <div className="toli-ai-quick" aria-label="Suggested questions">{quick.map(text=><button key={text} type="button" onClick={()=>send(text)}>{text}</button>)}</div>
  <form onSubmit={event=>{event.preventDefault();send(input);}}><label className="sr-only" htmlFor="toli-ai-input">Ask about a service</label><input id="toli-ai-input" ref={inputRef} value={input} onChange={event=>setInput(event.target.value)} maxLength={500} placeholder="Ask about a service..." autoComplete="off"/><button type="submit" aria-label="Send message" disabled={!input.trim()}><Send size={18}/></button></form>
 </Dialog.Content></Dialog.Portal></Dialog.Root>,document.body);
}
