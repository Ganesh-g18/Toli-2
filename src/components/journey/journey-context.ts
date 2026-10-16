import type {SolidModelState} from '@/lib/vehicle-model/contract';
import { createContext, useContext } from 'react';
type JourneyContextValue={solidState:SolidModelState;selected:number;hasSelection:boolean;componentFocus:boolean;setComponentFocus(value:boolean):void;choose(index:number):void;technical:boolean;toggleTechnical():void;state:string;processStep:number;chooseStep(index:number):void};
export const JourneyContext=createContext<JourneyContextValue|undefined>(undefined);
export function useJourney(){const context=useContext(JourneyContext);if(!context)throw new Error('JourneyProvider required');return context;}

