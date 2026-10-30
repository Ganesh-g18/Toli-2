import { useState } from 'react';
import WhatsAppButton from '@/components/WhatsAppButton';
import AIChatWidget from '@/components/AIChatWidget';
import BackToTop from '@/components/BackToTop';
export default function SupportTools(){const [open,setOpen]=useState(false);return <><button type="button" aria-expanded={open} aria-label={open?'Close support tools':'Open support tools'} onClick={()=>setOpen(v=>!v)}>{open?'HELP −':'HELP +'}</button>{open&&<><WhatsAppButton/><AIChatWidget/><BackToTop/></>}</>;}
