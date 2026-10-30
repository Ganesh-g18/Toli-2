import { useId } from 'react';
import { sceneService, type JourneyDockMode } from '@/lib/journey';

/** Illustrative technical service shell; never the solid hero vehicle. */
export default function VehicleIllustration({service=4,mode='studio',technical=false,focus=false}:{service?:number;mode?:JourneyDockMode;technical?:boolean;focus?:boolean}) {
 const id=useId().replace(/:/g,''),selected=sceneService(service);
 return <div className="journey-static" data-part={selected} data-mode={mode} data-technical={technical} aria-hidden="true"><svg viewBox={focus&&selected===1?'340 165 210 130':focus&&selected===2?'315 45 240 235':'0 0 640 340'} fill="none">
  <defs>
   <linearGradient id={`${id}-paint`} x1="280" y1="116" x2="305" y2="250" gradientUnits="userSpaceOnUse"><stop stopColor="var(--vehicle-highlight)"/><stop offset=".38" stopColor="var(--vehicle-body)"/><stop offset=".58" stopColor="var(--vehicle-highlight)"/><stop offset=".7" stopColor="var(--vehicle-body)"/><stop offset="1" stopColor="var(--vehicle-glass)"/></linearGradient>
   <linearGradient id={`${id}-nose`} x1="470" y1="173" x2="544" y2="254" gradientUnits="userSpaceOnUse"><stop stopColor="var(--vehicle-body)"/><stop offset="1" stopColor="var(--vehicle-glass)"/></linearGradient>
   <linearGradient id={`${id}-glass`} x1="290" y1="120" x2="310" y2="170" gradientUnits="userSpaceOnUse"><stop stopColor="var(--vehicle-highlight)"/><stop offset=".2" stopColor="var(--vehicle-glass)"/><stop offset="1" stopColor="var(--vehicle-glass)"/></linearGradient>
  </defs>
  <ellipse cx="335" cy="271" rx="216" ry="17" fill="var(--bg-primary)" opacity=".5"/>
  <ellipse cx="320" cy="280" rx="242" ry="34" stroke="var(--accent-red)" opacity=".4"/>
  <path d="M90 263H550M125 301H515M180 313L225 252M420 252L465 313" stroke="var(--surface-metal)" opacity=".6"/>
  <path d="M100 211Q103 182 131 174L186 163L233 122Q244 113 260 112L332 109Q354 111 377 128L417 155L520 169Q553 177 568 209L551 245L481 265L134 240Z" fill={technical?'var(--vehicle-technical)':`url(#${id}-paint)`} stroke="var(--vehicle-highlight)" strokeWidth="1.2"/>
  <path d="M247 116Q281 105 331 112L368 131L337 121L257 121Z" fill="var(--vehicle-body)" stroke="var(--vehicle-highlight)"/>
  <path d="M203 163L244 126Q251 121 265 121L325 120L350 158Z" fill={`url(#${id}-glass)`} stroke="var(--vehicle-highlight)"/>
  <path d="M337 121L370 137L410 161L357 163Z" fill={`url(#${id}-glass)`} stroke="var(--vehicle-highlight)"/>
  <path d="M291 122L296 160M243 125L220 162M333 122L350 158" stroke="var(--vehicle-body)" strokeWidth="4"/>
  <path d="M442 177L520 169Q553 177 568 209L551 245L481 265L463 232Z" fill={`url(#${id}-nose)`} stroke="var(--vehicle-highlight)" strokeWidth=".8"/>
  <path d="M419 158L442 177L513 179M438 162L484 177M457 162L511 174" stroke="var(--vehicle-highlight)" opacity=".6"/>
  <path d="M130 181L385 178L444 190M133 231L398 251M273 167L282 237M366 172L382 249M201 167L206 228" stroke="var(--vehicle-glass)" strokeWidth="1.2"/>
  <path d="M249 179L263 180M339 185L353 186" stroke="var(--vehicle-highlight)" strokeWidth="2"/>
  <path d="M349 162L363 160L376 169L356 170Z" fill="var(--vehicle-body)" stroke="var(--vehicle-highlight)"/>
  <path d="M478 224L551 213L545 234L488 251Z" fill="var(--vehicle-glass)"/>
  <path d="M476 202L492 202M535 191L552 190" stroke="var(--text-primary)" strokeWidth="3" strokeLinecap="round"/>
  <path d="M115 190L130 188" stroke="var(--accent-red)" strokeWidth="3"/>
  <path d="M190 240L399 256M488 255L542 237" stroke="var(--accent-red)" opacity=".38"/>
  {[[179,221,40,.79],[435,239,48,.79]].map(([x,y,r,sx])=><g key={x} transform={`translate(${x} ${y}) rotate(-12) scale(${sx} 1)`}><g className="vehicle-wheel">
   <circle r={r} fill="var(--vehicle-rubber)" stroke="var(--vehicle-highlight)" strokeWidth="1.5"/>
   <circle r={r*.79} fill="var(--vehicle-glass)" stroke={selected===1?'var(--accent-red-text)':'var(--vehicle-highlight)'} strokeWidth="2"/>
   <circle r={r*.57} fill="var(--vehicle-body)"/>
   <path d={`M${r*.45} -10V10`} stroke="var(--accent-red)" strokeWidth="4"/>
   {Array.from({length:10},(_,i)=><path key={i} d={`M-2 -5L-3 ${-r*.72}L2 ${-r*.77}L5 -6Z`} fill="var(--vehicle-highlight)" transform={`rotate(${i*36})`}/>)}
   <circle r="6" fill="var(--vehicle-body)" stroke="var(--vehicle-highlight)"/>
  </g></g>)}
  {technical&&<path d="M131 174L481 265M134 240L520 169M290 120L304 245M377 128L435 239M119 205L550 215" stroke="var(--accent-red-text)" strokeWidth="1" opacity=".5"/>}
  {selected===2&&<g><path d="M420 156V97" stroke="var(--accent-red)" strokeDasharray="4 5"/><rect x="398" y="66" width="48" height="31" rx="3" fill="var(--vehicle-body)" stroke="var(--accent-red-text)" strokeWidth="2"/><path d="M407 61V68M436 61V68" stroke="var(--vehicle-highlight)" strokeWidth="4"/></g>}
 </svg></div>;
}
