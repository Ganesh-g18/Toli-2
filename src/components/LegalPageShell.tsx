import ToliLogoPill from '@/components/ToliLogoPill';
import { Link } from "react-router-dom";
import { ReactNode } from "react";

type LegalPageShellProps = {
  kicker: string;
  title: string;
  children: ReactNode;
  lastUpdated?: string;
};

const LegalPageShell = ({ kicker, title, children, lastUpdated }: LegalPageShellProps) => {
  return (
    <div className="toli-content-page min-h-dvh bg-background page-enter">
      <header className="toli-shared-header border-b border-border bg-background/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 min-[360px]:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="premium-interactive flex items-center rounded-md" aria-label="Toli Motors — home">
            <ToliLogoPill size="compact"/>
          </Link>
          <Link
            to="/"
            className="luxury-button inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-border bg-background/80 font-display text-xs sm:text-sm tracking-wider text-foreground hover:border-primary hover:text-primary transition-all duration-300"
          >
            ← BACK TO HOME
          </Link>
        </div>
      </header>

      <main className="section-padding">
        <div className="max-w-3xl mx-auto">
          <p className="luxury-kicker text-primary font-medium uppercase text-sm mb-3">{kicker}</p>
          <h1 className="luxury-heading font-display text-4xl min-[360px]:text-5xl sm:text-6xl mb-2">{title}</h1>
          {lastUpdated && (
            <p className="text-sm text-muted-foreground mb-8">Last updated: {lastUpdated}</p>
          )}

          <div className="luxury-panel rounded-2xl px-5 py-8 sm:px-10 sm:py-10">
            <div className="prose prose-sm sm:prose-base max-w-none prose-headings:font-display prose-headings:tracking-wider prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-primary prose-a:underline">
              {children}
            </div>
          </div>

          <nav className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="Legal links">
            <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="text-primary hover:underline">Terms &amp; Conditions</Link>
            <Link to="/cookie-policy" className="text-primary hover:underline">Cookie Policy</Link>
          </nav>
        </div>
      </main>

      <footer className="border-t border-border py-6">
        <div className="max-w-5xl mx-auto px-6 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="font-display text-xl text-foreground tracking-wider">TOLI MOTORS</span>
          <p>&copy; {new Date().getFullYear()} Toli Motors (Multi-brand Car Workshop). All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LegalPageShell;