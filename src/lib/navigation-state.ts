/** Navigation order differs from page order (offers comes before services). */
export function activeNavigation(items:{id:string;top:number}[], threshold=130) {
  return items.flatMap(item=>{
    if(typeof document==='undefined')return [item];
    // The extracted component panel belongs to the unchanged Services navigation entry.
    const component=item.id==='services'?document.getElementById('components'):null;
    if(component&&!component.closest('[inert]')){const r=component.getBoundingClientRect();if(r.top<=threshold&&r.bottom>threshold)return [{...item,top:r.top}];}
    return document.getElementById(item.id)?.closest('[inert]')?[]:[item];
  }).filter(item=>item.top<=threshold).sort((a,b)=>b.top-a.top)[0]?.id??'';
}
