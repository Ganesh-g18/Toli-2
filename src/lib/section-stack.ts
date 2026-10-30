/** Tall panels and phones retain natural flow. Values are actual measured content sizes. */
export function stackFits(height:number,viewportHeight:number,top:number,width:number) {
 return width>=768&&height>0&&height<=viewportHeight-top-12;
}
export function stackCovered(nextTop:number,nextStickyTop:number,sticky:boolean) {
 return sticky&&nextTop<=nextStickyTop+4;
}
