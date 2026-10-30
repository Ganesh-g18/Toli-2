import { type ReactElement, type ButtonHTMLAttributes } from 'react';
import ServiceRequestLink from '@/components/ServiceRequestLink';
/** Generic booking starts the canonical request without a suggested service. */
export default function BookServiceAction({children}:{children:ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>}) {
 return <ServiceRequestLink>{children}</ServiceRequestLink>;
}
