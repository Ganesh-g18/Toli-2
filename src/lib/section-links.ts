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
  navigate(); window.addEventListener("hashchange", navigate);
  return () => { observer?.disconnect(); clearTimeout(timer); window.removeEventListener("hashchange", navigate); };
}
