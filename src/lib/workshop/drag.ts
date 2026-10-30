/** Native vertical/diagonal scroll and pinch take priority; only deliberate horizontal intent orbits. */
export function bindWorkshopDrag(canvas:HTMLElement,allowed:()=>boolean,turn:(delta:number)=>void){
 const original=canvas.style.touchAction;canvas.style.touchAction='pan-y pinch-zoom';
 const pointers=new Set<number>();let gesture:{id:number;x:number;y:number;last:number;horizontal:boolean}|undefined;
 const finish=()=>{const id=gesture?.id;gesture=undefined;if(id!==undefined&&canvas.hasPointerCapture?.(id))canvas.releasePointerCapture(id);};
 const down=(e:PointerEvent)=>{pointers.add(e.pointerId);if(pointers.size>1){finish();return;}if(!allowed()||e.button!==0)return;gesture={id:e.pointerId,x:e.clientX,y:e.clientY,last:e.clientX,horizontal:false};};
 const move=(e:PointerEvent)=>{if(!allowed()){finish();return;}if(!gesture||e.pointerId!==gesture.id||pointers.size!==1)return;const dx=e.clientX-gesture.x,dy=e.clientY-gesture.y;
  if(!gesture.horizontal){if(Math.abs(dy)>6&&Math.abs(dy)>=Math.abs(dx)*.75){finish();return;}if(Math.abs(dx)<10||Math.abs(dx)<Math.abs(dy)*1.5)return;gesture.horizontal=true;canvas.setPointerCapture?.(e.pointerId);}
  e.preventDefault();turn((gesture.last-e.clientX)*.003);gesture.last=e.clientX;
 };
 const up=(e:PointerEvent)=>{pointers.delete(e.pointerId);if(gesture?.id===e.pointerId)finish();};
 canvas.addEventListener('pointerdown',down);canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',up);
 return ()=>{finish();pointers.clear();canvas.style.touchAction=original;canvas.removeEventListener('pointerdown',down);canvas.removeEventListener('pointermove',move);canvas.removeEventListener('pointerup',up);canvas.removeEventListener('pointercancel',up);};
}
