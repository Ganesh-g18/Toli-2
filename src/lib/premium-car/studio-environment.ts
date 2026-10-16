import * as THREE from 'three';
const gaussian=(value:number,width:number)=>Math.exp(-.5*(value/width)**2);
const angular=(a:number,b:number)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));
/** Original HDR radiance: broad studio softboxes and a restrained burgundy floor bounce.
 * Linear half-float values retain highlight headroom. This contains no vehicle artwork. */
export function createStudioRadiance(){
 const width=256,height=128,pixels=new Uint16Array(width*height*4);
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){
  const azimuth=(x/width-.5)*Math.PI*2,elevation=(y/height-.5)*Math.PI;
  const key=gaussian(angular(azimuth,-.95),.65)*gaussian(elevation-.69,.13)*3.4;
  const roof=gaussian(angular(azimuth,.65),1.15)*gaussian(elevation-1.18,.17)*2.8;
  const side=gaussian(angular(azimuth,-1.85),.15)*gaussian(elevation-.18,.48)*1.7;
  const far=gaussian(angular(azimuth,1.6),.42)*gaussian(elevation-.42,.25)*1.35;
  const bounce=gaussian(elevation+.25,.19)*(.5+gaussian(angular(azimuth,-1.4),.9))*.3;
  const neutral=.035+gaussian(elevation-.4,.85)*.095+key+roof+side+far;
  const values=[neutral+bounce,neutral*.985+bounce*.055,neutral*.98+bounce*.085,1];
  for(let c=0;c<4;c++)pixels[(y*width+x)*4+c]=THREE.DataUtils.toHalfFloat(values[c]);
 }
 const texture=new THREE.DataTexture(pixels,width,height,THREE.RGBAFormat,THREE.HalfFloatType);
 texture.name='Original HDR automotive studio';texture.mapping=THREE.EquirectangularReflectionMapping;texture.colorSpace=THREE.LinearSRGBColorSpace;texture.needsUpdate=true;
 return texture;
}
/** Prefilter once with the scene's existing renderer, not another WebGL context. */
export function prefilterStudioEnvironment(renderer:THREE.WebGLRenderer,source:THREE.Texture){
 const generator=new THREE.PMREMGenerator(renderer);
 try{const target=generator.fromEquirectangular(source);target.texture.name='Prefiltered TOLI studio';return {texture:target.texture,dispose:()=>target.dispose()};}
 finally{generator.dispose();}
}
export function createContactFalloff(){
 const size=64,pixels=new Uint8Array(size*size*4);
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){
  const radius=((x+.5)/size*2-1)**2+((y+.5)/size*2-1)**2,i=(y*size+x)*4;
  pixels[i]=pixels[i+1]=pixels[i+2]=255;pixels[i+3]=Math.round(Math.max(0,1-radius)**3*255);
 }
 const texture=new THREE.DataTexture(pixels,size,size);texture.needsUpdate=true;return texture;
}
