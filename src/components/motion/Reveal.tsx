import { ElementType, ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

export type RevealVariant = "fade" | "fade-up" | "fade-left" | "fade-right" | "scale" | "mask" | "media";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Motion variant applied on reveal. */
  variant?: RevealVariant;
  /** Delay in ms before this element animates. */
  delay?: number;
  /** Stagger direct children by this many ms each. */
  stagger?: number;
  as?: ElementType;
  id?: string;
  threshold?: number;
};

/**
 * Explicit, opt-in scroll reveal. Wraps content and animates it into view once.
 */
const Reveal = ({
  children,
  className,
  variant = "fade-up",
  delay = 0,
  stagger,
  as,
  id,
  threshold,
}: RevealProps) => {
  const Tag = (as ?? "div") as ElementType;
  const ref = useReveal<HTMLElement>({ threshold });

  return (
    <Tag
      ref={ref}
      id={id}
      data-motion={variant}
      data-stagger={stagger ? "" : undefined}
      className={cn(className)}
      style={
        {
          "--motion-delay": `${delay}ms`,
          ...(stagger ? { "--stagger-step": `${stagger}ms` } : {}),
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
};

export default Reveal;
