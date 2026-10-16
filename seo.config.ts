/** Deployment-owned public URL; omit metadata rather than publishing a placeholder. */
export function publicSiteUrl(value?:string):string|undefined {
 if(!value)return;
 try {const url=new URL(value);if(url.protocol!=='https:'||url.username||url.password||['localhost','127.0.0.1'].includes(url.hostname)||url.search||url.hash)return;return url.href.endsWith('/')?url.href:url.href+'/';}
 catch {return;}
}
