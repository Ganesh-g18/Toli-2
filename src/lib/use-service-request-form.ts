import { useEffect, useRef, useState } from 'react';
import { requestDrafts, type RequestForm } from './service-request';
import { services } from './service-catalog';
import { canonicalBrand, normalizeBrand } from './vehicle-brands';
import { openEnquiryDraft } from './enquiry-handoff';
export type RequestErrors={name?:string;phone?:string;consent?:string;handoff?:string};
export const emptyRequest:RequestForm={name:'',phone:'',brand:'',model:'',service:'',message:''};
export function validateRequest(form:RequestForm,consent:boolean,review=false):RequestErrors {
 const errors:RequestErrors={};
 if(!form.name.trim())errors.name='Enter your name.';
 if(!form.phone.trim())errors.phone='Enter your phone number.';
 else if(!/^[0-9]{10}$/.test(form.phone.trim()))errors.phone='Enter a 10-digit mobile number.';
 if(review&&!consent)errors.consent='Accept the privacy terms to continue.';
 return errors;
}
/** One in-memory draft and original synchronous WhatsApp contract for either presentation. */
export function useServiceRequestForm(defaultService?:string) {
 const key=services.find(s=>s.title===defaultService)?.title??'',saved=requestDrafts.get(key);
 const [form,setForm]=useState(()=>({...emptyRequest,...saved?.form,service:saved?.form.service??key}));
 const [consent,setConsent]=useState(saved?.consent??false),[step,setStep]=useState(saved?.step??0),[errors,setErrors]=useState<RequestErrors>({});
 const [validationAttempt,setValidationAttempt]=useState(0);
 const [status,setStatus]=useState<'editing'|'opening'|'handoff'|'preview'>('editing');const busy=useRef(false);
 useEffect(()=>{requestDrafts.set(key,{form,consent,step});},[key,form,consent,step]);
 const update=(name:keyof RequestForm,value:string)=>{setForm(f=>({...f,[name]:value,...(name==='brand'&&normalizeBrand(f.brand)!==normalizeBrand(value)?{model:''}:{})}));setErrors(e=>({...e,[name]:undefined,handoff:undefined}));};
 const advance=()=>{if(step===0){const next=validateRequest(form,consent);setErrors(next);if(Object.keys(next).length){setValidationAttempt(v=>v+1);return;}}setStep(s=>Math.min(3,s+1));};
 const submit=()=>{
  if(busy.current||status!=='editing'||step!==3)return;
  const next=validateRequest(form,consent,true);setErrors(next);if(Object.keys(next).length){setValidationAttempt(v=>v+1);if(next.name||next.phone)setStep(0);return;}
  busy.current=true;setStatus('opening');
  const brandValue=canonicalBrand(form.brand);
  const brand=brandValue?`Vehicle: ${encodeURIComponent(brandValue)}.`:'';
  const model=form.model?.trim()?`Model: ${encodeURIComponent(form.model.trim())}.`:'';
  const text=`Hi, I'm ${encodeURIComponent(form.name.trim())}. Phone: ${encodeURIComponent(form.phone.trim())}. ${brand}${model?` ${model}`:''} Service: ${encodeURIComponent(form.service.trim()||'General Enquiry')}. ${encodeURIComponent(form.message.trim())}`;
  try {const result=openEnquiryDraft(`https://wa.me/918074946335?text=${text}`);
   if(result==='blocked'){setErrors({handoff:'WhatsApp could not open. Allow pop-ups, then try again. Your details are still here.'});setStatus('editing');busy.current=false;return;}
   setStatus(result==='preview'?'preview':'handoff');
  }catch {setErrors({handoff:'WhatsApp could not open. Please try again. Your details are still here.'});setStatus('editing');busy.current=false;}
 };
 const done=()=>requestDrafts.clear();
 return {form,consent,setConsent,step,setStep,errors,setErrors,validationAttempt,status,update,advance,submit,done};
}
