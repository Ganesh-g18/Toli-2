/** One invalidation frame, never an idle animation loop. Shared by preview lifecycle/tests. */
export function demandFrames(draw:()=>void, allowed:()=>boolean, request= requestAnimationFrame, cancel=cancelAnimationFrame) {
  let frame=0,disposed=false;
  const pause=()=>{if(frame)cancel(frame);frame=0;};
  return {
    invalidate(){if(!disposed&&!frame&&allowed())frame=request(()=>{frame=0;if(!disposed&&allowed())draw();});},
    pause, dispose(){if(disposed)return;disposed=true;pause();},
    pending:()=>!!frame,
  };
}
