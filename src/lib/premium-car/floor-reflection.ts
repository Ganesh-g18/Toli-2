import * as THREE from 'three';
/** Reuses selected coachwork/wheel buffers for a faint, depth-faded virtual image.
 * No second renderer, render target, full-scene pass or postprocessing. */
export function createFloorReflection(vehicle:THREE.Group,compact:boolean,select?:(mesh:THREE.Mesh)=>boolean){
 const root=new THREE.Group();root.name='restrained-floor-reflection';
 const material=new THREE.MeshBasicMaterial({color:0x728097,transparent:true,opacity:.08,depthWrite:false,side:THREE.DoubleSide});
 material.onBeforeCompile=shader=>{
  shader.vertexShader='varying float vFloorDepth;\n'+shader.vertexShader;
  shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvFloorDepth = -(modelMatrix * vec4(position, 1.0)).y;');
  shader.fragmentShader='varying float vFloorDepth;\n'+shader.fragmentShader;
  shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\ndiffuseColor.a *= exp(-max(0.0, vFloorDepth) * 5.5);');
 };
 const pairs:{source:THREE.Mesh;copy:THREE.Mesh}[]=[];
 vehicle.traverse(node=>{if(!(node instanceof THREE.Mesh))return;
  if(select?!select(node):!node.name.includes('sculpted-body-with-open-wheel-arches')&&!(node.name.includes('sculpted-tire')&&!compact))return;
  const copy=new THREE.Mesh(node.geometry,material);copy.matrixAutoUpdate=false;copy.renderOrder=-2;root.add(copy);pairs.push({source:node,copy});
 });
 const mirror=new THREE.Matrix4().makeScale(1,-1,1);
 return {root,update(alpha:number,light:boolean,tint?:number){root.visible=alpha>.01;if(!root.visible)return;if(tint!==undefined)material.color.setHex(tint);material.opacity=(light?.055:.075)*alpha;vehicle.updateWorldMatrix(true,true);for(const {source,copy} of pairs)copy.matrix.multiplyMatrices(mirror,source.matrixWorld);},dispose(){material.dispose();root.clear();}};
}
