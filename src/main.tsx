import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./components/journey/journey.css";
import "./components/journey/technology.css";
import "./components/journey/hero.css";
import "./theme.css";
import "./components/journey/experience.css";
import "./themes.css";
import "./brand-environments.css";
import "./dark-system.css";
import "./components/toli-logo-pill.css";
import { initializeTheme } from "./lib/site-theme";
const disposeTheme=initializeTheme();
if(import.meta.hot)import.meta.hot.dispose(disposeTheme);
if(import.meta.env.VITE_PERFORMANCE_AUDIT==='1')import('./lib/performance-audit').then(({observePerformance})=>observePerformance());

import { installSectionLinks } from "./lib/section-links";

import { applyBrandPalette } from "./lib/brand-palette";
applyBrandPalette(document.documentElement);

const disposeSectionLinks = installSectionLinks();
if (import.meta.hot) import.meta.hot.dispose(disposeSectionLinks);

createRoot(document.getElementById("root")!).render(<App />);
