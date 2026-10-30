import ToliLogoPill from '@/components/ToliLogoPill';
import ThemeToggle from '@/components/ThemeToggle';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ServiceRequestSteps from '@/components/ServiceRequestSteps';
import { requestServiceFromSearch } from '@/lib/service-request';
import '@/components/enquiry.css';
/** Shareable/refresh-safe fallback, using the identical four-step form and handler. */
export default function ServiceRequest() {
 const [params]=useSearchParams(),navigate=useNavigate(),location=useLocation();
 const service=requestServiceFromSearch(params),back=()=>location.state?.serviceRequestEntry?navigate(-1):navigate('/');
 useEffect(()=>{const previous=document.title;document.title='Service Request — Toli Motors';window.scrollTo(0,0);return()=>{document.title=previous;};},[]);
 return <main className="service-request-page"><header className="request-page-header toli-shared-header"><Link to="/" aria-label="Toli Motors — Home"><ToliLogoPill size="navigation"/></Link><ThemeToggle/><button type="button" onClick={back}><ArrowLeft size={15} aria-hidden="true"/>Back to Toli Motors</button></header><section className="request-direct" aria-labelledby="service-request-title"><header className="request-dialog-header"><div><ToliLogoPill size="compact"/><h1 id="service-request-title">Service request.</h1></div></header><ServiceRequestSteps key={service??''} defaultService={service} onDone={back}/></section><footer className="request-page-footer">TOLI MOTORS · ANANTAPUR</footer></main>;
}
