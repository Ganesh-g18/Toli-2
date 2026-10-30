/** Existing WhatsApp draft handoff; local opt-in QA never transmits form data. */
export function openEnquiryDraft(url:string):'opened'|'blocked'|'preview' {
 if(import.meta.env.VITE_ENQUIRY_AUDIT==='1')return import.meta.env.VITE_ENQUIRY_AUDIT_RESULT==='blocked'?'blocked':'preview';
 return window.open(url,'_blank')?'opened':'blocked';
}
