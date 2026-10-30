/** Loaded only by the DEV query branch. No telemetry, persistence or personal data. */
const panels=new WeakMap<HTMLElement,ReturnType<typeof createDebug>>();
export function workshopDebug(host:HTMLElement){const existing=panels.get(host);if(existing)return existing;const value=createDebug(host);panels.set(host,value);return value;}
function createDebug(host:HTMLElement){
 const panel=document.createElement('details');panel.dataset.workshopDebug='';panel.style.cssText='position:fixed;bottom:8px;left:8px;z-index:100;background:#17191fee;color:#eee;padding:8px;max-width:min(460px,95vw);max-height:45vh;overflow:auto;font:11px monospace';
 const summary=document.createElement('summary');summary.textContent='Workshop diagnostics';const output=document.createElement('pre');output.style.whiteSpace='pre-wrap';const copy=document.createElement('button');copy.type='button';copy.textContent='Copy Diagnostics';panel.append(summary,copy,output);document.body.append(panel);
 const events:{event:string;time:number}[]=[];let state:Record<string,unknown>={};
 const snapshot=()=>JSON.stringify({state,events},null,2);copy.onclick=()=>{void navigator.clipboard?.writeText(snapshot());};
 return {update(event:string,value:Record<string,unknown>={}){events.push({event,time:Math.round(performance.now())});if(events.length>40)events.shift();state={...state,...value,document:document.hidden?'hidden':'visible',registered:host.isConnected};if(output.firstChild)output.firstChild.nodeValue=snapshot();else output.append(document.createTextNode(snapshot()));},dispose(){panel.remove();panels.delete(host);}};
}
