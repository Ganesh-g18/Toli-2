import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

/**
 * Lightweight route-level transition: re-keys on pathname so each route fades/lifts in.
 */
const PageTransition = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  return (
    <div key={pathname} className="route-transition">
      {children}
    </div>
  );
};

export default PageTransition;
