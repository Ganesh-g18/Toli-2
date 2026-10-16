/** Original TOLI sports GT. World units are approximately metres; +X is forward. */
export const GT_DIMENSIONS={
 length:4.96,width:2.17,height:1.46,wheelbase:3.12,
 frontAxle:1.57,rearAxle:-1.55,track:1.91,axleHeight:.46,
 wheelRadius:.45,wheelWidth:.261,wheelScale:.9,archRadius:.485,
 linerRadius:.478,linerInner:.76,groundClearance:.245,
 hoodHeight:1.12,roofHeight:1.46,cabinHalfWidth:.62,beltHeight:1.13,
 doorRear:-.99,doorFront:.70,handleX:-.67,
} as const;
export const GT_AXLES=[GT_DIMENSIONS.rearAxle,GT_DIMENSIONS.frontAxle] as const;
export type BodyStation={name:string;x:number;halfWidth:number;shoulder:number;rocker:number;crown:number};
/** Dense around axle crowns and fascia; broad spans across the long coupe door. */
export const BODY_STATIONS:readonly BodyStation[]=[
 ['tail',-2.48,.79,.87,.30,.026],['rear-bumper',-2.30,.96,1.01,.28,.035],
 ['rear-deck',-2.08,1.04,1.09,.27,.042],['rear-arch-entry',-1.94,1.075,1.13,.27,.045],
 ['rear-axle',-1.55,1.085,1.175,.27,.047],['rear-haunch',-1.22,1.065,1.155,.26,.046],
 ['rear-cabin',-.99,1.025,1.12,.25,.042],['door-rear',-.70,.995,1.095,.245,.039],
 ['door-center',-.22,.985,1.08,.245,.038],['door-front',.40,.995,1.09,.245,.041],
 ['cowl',.88,1.025,1.115,.25,.045],['hood-rear',1.16,1.055,1.14,.26,.047],
 ['front-axle',1.57,1.075,1.16,.27,.048],['hood-front',1.87,1.045,1.10,.27,.043],
 ['lamp-shoulder',2.10,1.005,1.025,.28,.037],['nose-shoulder',2.30,.93,.94,.28,.030],
 ['nose',2.48,.78,.84,.28,.024],
].map(([name,x,halfWidth,shoulder,rocker,crown])=>({name,x,halfWidth,shoulder,rocker,crown})) as BodyStation[];
/** Cubic Hermite interpolation in physical longitudinal distance, not uneven curve parameter. */
export function stationAt(x:number){
 const stations=BODY_STATIONS,x0=Math.max(stations[0].x,Math.min(stations.at(-1)!.x,x));
 let i=0;while(i<stations.length-2&&stations[i+1].x<x0)i++;
 const a=stations[i],b=stations[i+1],span=b.x-a.x,t=(x0-a.x)/span;
 const field=(key:'halfWidth'|'shoulder'|'rocker'|'crown')=>{
  const prev=stations[Math.max(0,i-1)],next=stations[Math.min(stations.length-1,i+2)];
  const ma=(b[key]-prev[key])/(b.x-prev.x),mb=(next[key]-a[key])/(next.x-a.x);
  return (2*t**3-3*t*t+1)*a[key]+(t**3-2*t*t+t)*span*ma+(-2*t**3+3*t*t)*b[key]+(t**3-t*t)*span*mb;
 };
 return {x:x0,halfWidth:field('halfWidth'),shoulder:field('shoulder'),rocker:field('rocker'),crown:field('crown')};
}

export const CABIN_STATIONS:readonly (readonly [number,number,number])[]=[
 [-1.70,.69,1.12],[-1.35,.66,1.27],[-.95,.625,1.38],
 [-.55,GT_DIMENSIONS.cabinHalfWidth,GT_DIMENSIONS.roofHeight-.035],
 [.02,.62,1.405],[.32,.65,1.345],[.79,.70,1.215],[1.20,.73,1.135],
];
