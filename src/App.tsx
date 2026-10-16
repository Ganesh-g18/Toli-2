import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ServiceRequestDialogProvider from "@/components/ServiceRequestDialog";
import ServiceRequest from "./pages/ServiceRequest";
import { SERVICE_REQUEST_ROUTE } from "@/lib/service-request";
import Index from "./pages/Index.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import TermsAndConditions from "./pages/TermsAndConditions.tsx";
import CookiePolicy from "./pages/CookiePolicy.tsx";
import NotFound from "./pages/NotFound.tsx";
import PageTransition from "@/components/motion/PageTransition";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <ServiceRequestDialogProvider><PageTransition>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path={SERVICE_REQUEST_ROUTE} element={<ServiceRequest />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition></ServiceRequestDialogProvider>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
