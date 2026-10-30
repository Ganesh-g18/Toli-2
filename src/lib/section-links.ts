import { navigateExperience } from "./experience-navigation";
const sections = new Set(["services", "offers", "about", "gallery", "why-us", "contact", "hero", "process", "trust", "booking", "connect"]);
export function canonicalSectionHash(hash: string) {
  const id = hash.slice(1);
  return sections.has(id) ? `#/#${id}` : hash;
}
/** Run before HashRouter reads the URL, including legacy new-tab links. */
export function installSectionLinks() {
  let observer: MutationObserver | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const navigate = () => {
    observer?.disconnect(); clearTimeout(timer);
    const hash = canonicalSectionHash(location.hash);
    if (hash !== location.hash) history.replaceState(history.state, "", location.pathname + location.search + hash);
    const id = location.hash.startsWith("#/#") ? location.hash.slice(3) : "";
    if (!sections.has(id)) return;
    const scroll = () => {
      const node = document.getElementById(id);
      if (!node) return false;
      navigateExperience(id);
      observer?.disconnect(); clearTimeout(timer); return true;
    };
    if (!scroll()) {
      observer = new MutationObserver(scroll);
      observer.observe(document.body, { childList: true, subtree: true });
      timer = setTimeout(() => observer?.disconnect(), 10000);
    }
  };
  // Clicking the current hash emits no hashchange; repeat anchors must still scroll.
  const repeat=(event:MouseEvent)=>{
    if(event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
    const link=event.target instanceof Element?event.target.closest<HTMLAnchorElement>('a[href]'):null;
    if(!link||link.download||link.target&&link.target!=='_self')return;
    const url=new URL(link.href,location.href);
    if(url.origin!==location.origin||url.pathname!==location.pathname||url.search!==location.search||url.hash!==location.hash)return;
    const id=url.hash.startsWith('#/#')?url.hash.slice(3):'';
    if(!sections.has(id))return;
    event.preventDefault();navigateExperience(id);
  };
  document.addEventListener('click',repeat,true);
  navigate(); window.addEventListener("hashchange", navigate);
  return () => { document.removeEventListener('click',repeat,true); observer?.disconnect(); clearTimeout(timer); window.removeEventListener("hashchange", navigate); };
}
