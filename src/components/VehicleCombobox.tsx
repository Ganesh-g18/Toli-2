import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { normalizeBrand } from '@/lib/vehicle-brands';
export default function VehicleCombobox({id,name,label,listLabel,placeholder,note,options,value,onChange,clearable=false}:{id:string;name:string;label:string;listLabel:string;placeholder:string;note:string;options:readonly string[];value:string;onChange:(value:string)=>void;clearable?:boolean}) {
 const [open,setOpen]=useState(false),[active,setActive]=useState(-1),[browsing,setBrowsing]=useState(true);
 const list=useRef<HTMLUListElement>(null);
 const query=normalizeBrand(value),matches=browsing?options:options.filter(brand=>normalizeBrand(brand).includes(query));
 const custom=value.trim()&&!options.some(brand=>normalizeBrand(brand)===query)?value.trim():undefined;
 const choices=[...matches,...(custom?[custom]:[])];
 useEffect(()=>{if(active>=0)list.current?.children[active]?.scrollIntoView?.({block:'nearest'});},[active]);
 // Keep the input and at least one suggestion visible as the phone keyboard reduces the pane.
 useEffect(()=>{
  if(!open)return;
  const pane=list.current?.closest<HTMLElement>('.request-step-content');
  const input=document.getElementById(id);
  if(!pane||!input)return;
  const fit=()=>{const first=list.current?.firstElementChild;if(!first)return;const p=pane.getBoundingClientRect(),i=input.getBoundingClientRect(),o=first.getBoundingClientRect();const delta=Math.min(o.bottom-p.bottom+8,i.top-p.top-8);if(delta>0)pane.scrollTo?.({top:pane.scrollTop+delta,behavior:'instant'});};
  fit();const observer=new ResizeObserver(fit);observer.observe(pane);pane.addEventListener('scroll',fit,{passive:true});return()=>{observer.disconnect();pane.removeEventListener('scroll',fit);};
 },[open,id]);
 const choose=(brand:string)=>{onChange(options.find(option=>normalizeBrand(option)===normalizeBrand(brand))??brand.trim());setOpen(false);setActive(-1);};
 return <div className="request-brand"><Label htmlFor={id}>{label}</Label><div className="request-brand-input"><Input id={id} name={name} role="combobox" autoComplete="off" aria-autocomplete="list" aria-expanded={open} aria-controls={open?`${id}-list`:undefined} aria-activedescendant={open&&active>=0?`${id}-option-${active}`:undefined} placeholder={placeholder} maxLength={100} value={value} onClick={()=>{if(!open)setBrowsing(true);setOpen(true);}} onFocus={()=>{setBrowsing(true);setOpen(true);setActive(-1);}} onChange={e=>{onChange(e.target.value);setBrowsing(false);setOpen(true);setActive(-1);}} onBlur={()=>{setOpen(false);setActive(-1);onChange(options.find(option=>normalizeBrand(option)===normalizeBrand(value))??value.trim());}} onKeyDown={e=>{
 if(e.key==='Escape'&&open){e.preventDefault();e.stopPropagation();setOpen(false);setActive(-1);}
 else if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();if(!open)setBrowsing(true);setOpen(true);setActive(index=>e.key==='ArrowDown'?Math.min(index+1,choices.length-1):index<=0?choices.length-1:index-1);}
 else if(e.key==='Enter'&&open){e.preventDefault();if(active>=0&&choices[active])choose(choices[active]);else if(value.trim())choose(value);}
 }} /><span className="request-dropdown-toggle" aria-hidden="true" onPointerDown={event=>{event.preventDefault();const input=document.getElementById(id);if(open){setOpen(false);setActive(-1);}else{input?.focus({preventScroll:true});setBrowsing(true);setOpen(true);setActive(-1);}}}><ChevronDown size={16}/></span></div>{open&&<ul ref={list} id={`${id}-list`} role="listbox" aria-label={listLabel} className="request-brand-results">{choices.map((brand,index)=><li key={brand} id={`${id}-option-${index}`} role="option" aria-selected={active===index} onPointerDown={e=>e.preventDefault()} onClick={()=>choose(brand)}>{custom&&index===matches.length?`+ Use “${brand}”`:brand}</li>)}</ul>}{clearable&&value&&<button type="button" className="request-model-clear" onClick={()=>{onChange('');setOpen(false);setActive(-1);document.getElementById(id)?.focus({preventScroll:true});}} aria-label="Clear vehicle model">Clear model</button>}<p className="request-field-note">{note}</p></div>;
}
