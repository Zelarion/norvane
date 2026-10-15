"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Wraps a section so it slides up and overlaps the previous section on scroll.
 * Use sparingly (a couple of sections per page) for a curtain-reveal effect.
 */
export function OverlapSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [90, 0]);

  return (
    <motion.div
      ref={ref}
      style={reduce ? undefined : { y }}
      className={cn("overlap-section overflow-hidden bg-background", className)}
    >
      {children}
    </motion.div>
  );
}
