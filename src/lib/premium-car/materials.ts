import * as THREE from 'three';
/** Pigmented metallic base plus a dielectric clearcoat; presets are internal only. */
export const PAINT_PRESETS={
 gunmetal:{color:0x46515f,metalness:.62,roughness:.29,clearcoat:.88,clearcoatRoughness:.13,ior:1.5},
 black:{color:0x141a22,metalness:.5,roughness:.3,clearcoat:.88,clearcoatRoughness:.14,ior:1.5},
 silver:{color:0x8c96a3,metalness:.67,roughness:.3,clearcoat:.85,clearcoatRoughness:.15,ior:1.5},
 red:{color:0x7e1422,metalness:.5,roughness:.3,clearcoat:.88,clearcoatRoughness:.14,ior:1.5},
} as const;
/** Tiny static roughness variation. Mipmaps average it at hero distance: no glitter/shader animation. */
function metallicRoughness(){
 const size=128,data=new Uint8Array(size*size*4);let seed=1427;
 for(let i=0;i<size*size;i++){seed=(Math.imul(seed,1664525)+1013904223)>>>0;data[i*4]=255;data[i*4+1]=245+(seed%11);data[i*4+2]=255;data[i*4+3]=255;}
 const texture=new THREE.DataTexture(data,size,size);texture.name='Subtle paint micro-roughness';texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.repeat.set(24,24);texture.magFilter=THREE.LinearFilter;texture.minFilter=THREE.LinearMipmapLinearFilter;texture.generateMipmaps=true;texture.needsUpdate=true;return texture;
}
export function carMaterials(environment:THREE.Texture,preset:keyof typeof PAINT_PRESETS='gunmetal'){
 const paint=new THREE.MeshPhysicalMaterial({name:'Gunmetal paint',...PAINT_PRESETS[preset],roughnessMap:metallicRoughness(),envMap:environment,envMapIntensity:.85,side:THREE.DoubleSide});
 const glass=new THREE.MeshPhysicalMaterial({name:'Glass',color:0x283642,metalness:0,roughness:.115,clearcoat:.9,clearcoatRoughness:.1,ior:1.5,transparent:true,opacity:.7,depthWrite:false,envMap:environment,envMapIntensity:.95,side:THREE.DoubleSide});glass.forceSinglePass=true;
 const lens=new THREE.MeshPhysicalMaterial({name:'Lamp lens',color:0xe1e8ef,metalness:0,roughness:.075,clearcoat:1,clearcoatRoughness:.07,ior:1.5,transparent:true,opacity:.2,depthWrite:false,envMap:environment,envMapIntensity:.75});
 const trim=new THREE.MeshStandardMaterial({name:'Graphite trim',color:0x10151b,metalness:.12,roughness:.58,side:THREE.DoubleSide});
 const intake=new THREE.MeshStandardMaterial({name:'Intake shadow',color:0x030508,metalness:0,roughness:.95,side:THREE.DoubleSide});
 const rubber=new THREE.MeshStandardMaterial({name:'Performance rubber',color:0x101216,metalness:0,roughness:.94});
 const alloy=new THREE.MeshStandardMaterial({name:'Graphite alloy',color:0x3b4653,metalness:.83,roughness:.26,envMap:environment,envMapIntensity:.9});
 const machined=new THREE.MeshStandardMaterial({name:'Machined edge',color:0x7a8592,metalness:.86,roughness:.32,envMap:environment,envMapIntensity:.75});
 const mirror=new THREE.MeshPhysicalMaterial({name:'Mirror glass',color:0xaeb8c4,metalness:1,roughness:.12,envMap:environment,envMapIntensity:.85});
 const reflector=new THREE.MeshStandardMaterial({name:'Lamp reflector',color:0x939faa,metalness:.87,roughness:.24,envMap:environment,envMapIntensity:.7});
 const brake=new THREE.MeshStandardMaterial({name:'Brake disc',color:0x707983,metalness:.65,roughness:.57,envMap:environment,envMapIntensity:.35});
 const red=new THREE.MeshStandardMaterial({name:'Toli caliper',color:0x971c2c,metalness:.28,roughness:.36});
 const interior=new THREE.MeshStandardMaterial({name:'Charcoal interior',color:0x0f141b,metalness:.02,roughness:.86});
 const led=new THREE.MeshStandardMaterial({name:'White LED',color:0xdfe7ef,emissive:0xe4ecf6,emissiveIntensity:.65,roughness:.25});
 const tail=new THREE.MeshStandardMaterial({name:'Red signature',color:0x9c1828,emissive:0xbb1023,emissiveIntensity:.45,roughness:.28});
 const result={paint,glass,lens,trim,intake,rubber,alloy,machined,mirror,reflector,brake,red,interior,led,tail};
 for(const material of Object.values(result)){material.userData.baseOpacity=material.opacity;material.userData.envStrength=material.envMapIntensity;}
 return result;
}
export type CarMaterials=ReturnType<typeof carMaterials>;
