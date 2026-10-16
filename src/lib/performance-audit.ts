/** Opt-in local production audit only. Excluded from normal builds. No network reporting. */
export function observePerformance() {
 if(typeof PerformanceObserver==='undefined')return;
 const root=document.documentElement;
 root.dataset.auditSupported=PerformanceObserver.supportedEntryTypes.join(',');
 if(PerformanceObserver.supportedEntryTypes.includes('layout-shift'))root.dataset.auditCls='0';
 if(PerformanceObserver.supportedEntryTypes.includes('longtask'))root.dataset.auditLongTasks='0';
 if(PerformanceObserver.supportedEntryTypes.includes('event'))root.dataset.auditMaxEvent='0';
 let session=0,first=0,last=0,cls=0,longTasks=0,maxEvent=0;
 const observe=(type:string,callback:(entries:PerformanceEntry[])=>void)=>{
  try {const observer=new PerformanceObserver(list=>callback(list.getEntries()));observer.observe({type,buffered:true,durationThreshold:16} as PerformanceObserverInit);}
  catch { /* This browser may not implement the selected entry type. */ }
 };
 observe('largest-contentful-paint',entries=>{const last=entries.at(-1);if(last)root.dataset.auditLcp=last.startTime.toFixed(1);});
 observe('layout-shift',entries=>entries.forEach(entry=>{const e=entry as PerformanceEntry & {value:number;hadRecentInput:boolean};if(e.hadRecentInput)return;if(e.startTime-last>1000||e.startTime-first>5000){session=0;first=e.startTime;}session+=e.value;last=e.startTime;cls=Math.max(cls,session);root.dataset.auditCls=cls.toFixed(5);}));
 observe('longtask',entries=>{longTasks+=entries.length;root.dataset.auditLongTasks=String(longTasks);});
 observe('event',entries=>entries.forEach(e=>{maxEvent=Math.max(maxEvent,e.duration);root.dataset.auditMaxEvent=maxEvent.toFixed(1);}));
 root.dataset.auditEnabled='true';
}
