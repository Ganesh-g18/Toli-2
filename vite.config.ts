import { defineConfig, loadEnv } from "vite";
import { publicSiteUrl } from "./seo.config";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/Toli-2/",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [{
    name:'public-site-metadata',
    transformIndexHtml() {
      const site=publicSiteUrl(loadEnv(mode,process.cwd(),'VITE_SITE_URL').VITE_SITE_URL);
      return site?[{tag:'link',attrs:{rel:'canonical',href:site},injectTo:'head' as const},{tag:'meta',attrs:{property:'og:url',content:site},injectTo:'head' as const},{tag:'meta',attrs:{property:'og:image',content:site+'favicon.png'},injectTo:'head' as const},{tag:'meta',attrs:{name:'twitter:image',content:site+'favicon.png'},injectTo:'head' as const}]:[];
    },
    generateBundle(this: import('rollup').PluginContext) {
      const site=publicSiteUrl(loadEnv(mode,process.cwd(),'VITE_SITE_URL').VITE_SITE_URL);
      if(site)this.emitFile({type:'asset',fileName:'sitemap.xml',source:'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>'+site.replaceAll('&','&amp;').replaceAll('<','&lt;')+'</loc></url></urlset>'});
    }
  },react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          animejs: ["animejs"],
          markdown: ["react-markdown"],
        },
      },
    },
  },
}));
