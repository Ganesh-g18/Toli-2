import { lazy, Suspense, useRef, useState } from 'react';
import { Bot } from 'lucide-react';
import { useServiceRequestDialog } from './service-request-dialog-context';
import { useLocation } from 'react-router-dom';
import './ToliAI/toli-ai.css';
const Panel=lazy(()=>import('./ToliAI/ToliAIPanel'));
export default function AIChatWidget(){
 const [open,setOpen]=useState(false),[loaded,setLoaded]=useState(false);
 const launcher=useRef<HTMLButtonElement>(null), request=useServiceRequestDialog(), location=useLocation();
 const hidden=request?.isOpen||location.pathname!=='/';
 return <div className="toli-ai" hidden={hidden}>
  <button ref={launcher} className="toli-ai-launcher" aria-haspopup="dialog" aria-expanded={open} onClick={()=>{setLoaded(true);setOpen(true);}}><Bot size={18} aria-hidden="true"/>TOLI AI</button>
  {loaded&&<Suspense fallback={<span className="toli-ai-loading" role="status">Opening TOLI AI…</span>}><Panel open={open&&!hidden} onClose={()=>setOpen(false)} onReturnFocus={()=>launcher.current?.focus()} onRequest={service=>{setOpen(false);request?.open(service,launcher.current!);}}/></Suspense>}
 </div>;
}
