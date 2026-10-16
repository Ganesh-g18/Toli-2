import { useServiceRequestDialog } from './service-request-dialog-context';
import { JourneyContext } from '@/components/journey/journey-context';
import { useContext, type ReactElement, type ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { serviceRequestDestination, recordRequestReturn } from '@/lib/service-request';
/** In-app CTAs share one popup; standalone consumers retain the canonical URL fallback. */
export default function ServiceRequestLink({children,defaultService}:{children:ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>;defaultService?:string}) {
 const dialog=useServiceRequestDialog();
 const journey=useContext(JourneyContext);
 const {className,children:content,'aria-label':label,title}=children.props;
 if(dialog)return <button type="button" data-service-request className={className} aria-label={label} title={title} onClick={event=>dialog.open(defaultService,event.currentTarget,journey)}>{content}</button>;
 return <Link data-service-request onClick={e=>{if(!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&e.button===0)recordRequestReturn(e.currentTarget,journey);}} className={className} aria-label={label} title={title} to={serviceRequestDestination(defaultService)} state={{serviceRequestEntry:true}}>{content}</Link>;
}
