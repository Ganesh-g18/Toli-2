/** Horizontal inspection only. Unbounded yaw avoids a visible 360-degree seam. */
export function createVehicleRotation() {
 let yaw=0,velocity=0,dragging=false,resetting=false,goal=0;
 return {read:()=>({yaw,velocity,dragging,resetting}),reset(){dragging=false;velocity=0;yaw=((yaw+Math.PI)%(Math.PI*2)+Math.PI*2)%(Math.PI*2)-Math.PI;goal=0;resetting=true;},turn(){velocity=0;goal=yaw+Math.PI/4;resetting=true;},begin(){resetting=false;dragging=true;velocity=0;},
  drag(dx:number,dt:number){const delta=dx*.0065;yaw+=delta;velocity=Math.max(-.002,Math.min(.002,delta/Math.max(16,dt)));},
  end(reduced=false){dragging=false;if(reduced)velocity=0;},cancel(){dragging=false;velocity=0;},
  advance(dt:number,reduced=false){if(resetting){yaw+=(goal-yaw)*(1-Math.exp(-Math.min(64,dt)/(reduced?45:140)));if(Math.abs(yaw-goal)<.0001){yaw=goal;resetting=false;}return yaw;}if(!dragging){if(reduced)velocity=0;const elapsed=Math.min(64,Math.max(0,dt));yaw+=velocity*(1-Math.exp(-elapsed/90))*90;velocity*=Math.exp(-elapsed/90);if(Math.abs(velocity)<.00001)velocity=0;}return yaw;},
 };
}
export const rotationChapter=(chapter:string)=>['parts','completion'].includes(chapter);
export const rotationDegrees=(yaw:number)=>((yaw*180/Math.PI)%360+360)%360;
