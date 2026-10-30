import { useState, type ImgHTMLAttributes } from 'react';
/** A failed optional photograph retains its reserved slot, without fake imagery. */
export default function GalleryImage({alt,width,height,...props}:ImgHTMLAttributes<HTMLImageElement> & {alt:string;width:number;height:number}) {
 const [failed,setFailed]=useState(false);
 if(failed)return <span role="img" aria-label={alt} className="gallery-image-unavailable" style={{aspectRatio:`${width} / ${height}`}}>Photo unavailable</span>;
 return <img {...props} alt={alt} width={width} height={height} onError={()=>setFailed(true)}/>;
}
