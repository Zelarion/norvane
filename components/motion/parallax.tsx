"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Scroll-driven parallax wrapper. The inner content is scaled slightly larger
 * than the frame so the vertical drift never reveals edges.
 */
export function Parallax({
  children,
  className,
  distance = 50,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(max-width: 768px)");
    const onChange = () => setIsMobile(mql.matches);
    mql.addEventListener("change", onChange);
    setIsMobile(mql.matches);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const rawY = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useTransform(rawY, (val) => val * (isMobile ? 0.25 : 1));

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div
        style={reduce ? undefined : { y }}
        className="h-[118%] w-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
