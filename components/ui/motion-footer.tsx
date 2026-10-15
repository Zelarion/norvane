"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { site, mainNav } from "@/lib/site";

// Register ScrollTrigger safely for React
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES
// -------------------------------------------------------------------------
const STYLES = `
.cinematic-footer-wrapper {
  -webkit-font-smoothing: antialiased;

  --pill-bg-1: color-mix(in oklch, var(--foreground) 3%, transparent);
  --pill-bg-2: color-mix(in oklch, var(--foreground) 1%, transparent);
  --pill-shadow: color-mix(in oklch, var(--background) 50%, transparent);
  --pill-highlight: color-mix(in oklch, var(--foreground) 10%, transparent);
  --pill-inset-shadow: color-mix(in oklch, var(--background) 80%, transparent);
  --pill-border: color-mix(in oklch, var(--foreground) 8%, transparent);

  --pill-bg-1-hover: color-mix(in oklch, var(--foreground) 8%, transparent);
  --pill-bg-2-hover: color-mix(in oklch, var(--foreground) 2%, transparent);
  --pill-border-hover: color-mix(in oklch, var(--foreground) 20%, transparent);
  --pill-shadow-hover: color-mix(in oklch, var(--background) 70%, transparent);
  --pill-highlight-hover: color-mix(in oklch, var(--foreground) 20%, transparent);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}
@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.animate-footer-breathe { animation: footer-breathe 8s ease-in-out infinite alternate; }
.animate-footer-scroll-marquee { animation: footer-scroll-marquee 40s linear infinite; }

.footer-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, color-mix(in oklch, var(--foreground) 4%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 4%, transparent) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    color-mix(in oklch, var(--brand) 22%, transparent) 0%,
    color-mix(in oklch, var(--secondary) 18%, transparent) 40%,
    transparent 70%
  );
}

.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow:
      0 10px 30px -10px var(--pill-shadow),
      inset 0 1px 1px var(--pill-highlight),
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow:
      0 20px 40px -10px var(--pill-shadow-hover),
      inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--foreground);
}

.footer-giant-bg-text {
  font-size: 18vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in oklch, var(--foreground) 6%, transparent);
  background: linear-gradient(180deg, color-mix(in oklch, var(--foreground) 10%, transparent) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

.footer-text-glow {
  background: linear-gradient(180deg, var(--foreground) 0%, color-mix(in oklch, var(--foreground) 45%, transparent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px color-mix(in oklch, var(--brand) 25%, transparent));
}

@media (prefers-reduced-motion: reduce) {
  .animate-footer-breathe,
  .animate-footer-scroll-marquee { animation: none !important; }
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
    href?: string;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;
          gsap.to(element, {
            x: x * 0.4,
            y: y * 0.4,
            rotationX: -y * 0.15,
            rotationY: x * 0.15,
            scale: 1.05,
            ease: "power2.out",
            duration: 0.4,
          });
        };
        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };
        element.addEventListener("mousemove", handleMouseMove as EventListener);
        element.addEventListener("mouseleave", handleMouseLeave);
        return () => {
          element.removeEventListener("mousemove", handleMouseMove as EventListener);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    const setRef = (node: HTMLElement | null) => {
      (localRef as React.MutableRefObject<HTMLElement | null>).current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef)
        (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
    };

    return React.createElement(
      Component,
      { ref: setRef, className: cn("cursor-pointer", className), ...props },
      children
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. MAIN COMPONENT
// -------------------------------------------------------------------------
const marqueeWords = [
  "Dependability",
  "Precision",
  "Care",
  "Food Processing",
  "Retail & Hospitality",
  "Healthcare & Pharma",
  "Global Sourcing",
  "Trusted Partners",
];

const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    {marqueeWords.map((w, i) => (
      <React.Fragment key={w}>
        <span>{w}</span>
        <span className={i % 2 === 0 ? "text-brand/70" : "text-secondary-foreground/40"}>
          ✦
        </span>
      </React.Fragment>
    ))}
  </div>
);

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 1024) return; // Skip GSAP reveal on mobile viewports
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.8, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 40%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  // Recalculate scroll positions after client-side navigation (page height changes)
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 350);
    return () => clearTimeout(id);
  }, [pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const year = new Date().getFullYear();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div
        ref={wrapperRef}
        className="dark relative w-full overflow-hidden h-auto bg-background lg:h-screen lg:min-h-[640px] lg:[clip-path:polygon(0%_0,_100%_0%,_100%_100%,_0_100%)]"
      >
        <footer
          className="cinematic-footer-wrapper flex w-full flex-col justify-between bg-background font-sans text-foreground overflow-hidden relative h-auto py-16 gap-12 lg:fixed lg:bottom-0 lg:left-0 lg:h-screen lg:min-h-[640px] lg:py-0 lg:gap-0"
        >
          {/* Ambient light & grid */}
          <div className="footer-aurora pointer-events-none absolute left-1/2 top-1/2 z-0 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px]" />
          <div className="footer-bg-grid pointer-events-none absolute inset-0 z-0" />

          {/* Giant background wordmark */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text pointer-events-none absolute -bottom-[4vh] left-1/2 z-0 -translate-x-1/2 select-none whitespace-nowrap"
          >
            NORVANE
          </div>

          {/* Marquee */}
          <div className="absolute left-0 top-12 z-10 w-full -rotate-2 scale-110 overflow-hidden border-y border-border/50 bg-background/60 py-4 shadow-2xl backdrop-blur-md">
            <div className="flex w-max animate-footer-scroll-marquee text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground md:text-sm">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* Center content */}
          <div
            className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 mt-28 mb-10 lg:mt-20 lg:mb-0"
          >
            <h2
              ref={headingRef}
              className="footer-text-glow mb-10 text-center text-4xl font-black tracking-tighter md:text-7xl"
            >
              Dependability. Precision. Care.
            </h2>

            <div ref={linksRef} className="flex w-full flex-col items-center gap-6">
              {/* Primary CTAs */}
              <div className="flex w-full flex-wrap justify-center gap-4">
                <MagneticButton
                  as={Link}
                  href="/contact"
                  className="footer-glass-pill group flex items-center gap-3 rounded-full px-9 py-5 text-sm font-bold text-foreground md:text-base"
                >
                  Contact Us
                  <ArrowRight className="size-5 text-muted-foreground transition-colors group-hover:text-foreground" />
                </MagneticButton>

                <MagneticButton
                  as="a"
                  href={`mailto:${site.contact.email}`}
                  className="footer-glass-pill group flex items-center gap-3 rounded-full px-9 py-5 text-sm font-bold text-foreground md:text-base"
                >
                  <Mail className="size-5 text-muted-foreground transition-colors group-hover:text-foreground" />
                  Email Us
                </MagneticButton>

                <MagneticButton
                  as="a"
                  href={`tel:${site.contact.phone}`}
                  className="footer-glass-pill group flex items-center gap-3 rounded-full px-9 py-5 text-sm font-bold text-foreground md:text-base"
                >
                  <Phone className="size-5 text-muted-foreground transition-colors group-hover:text-foreground" />
                  Call Us
                </MagneticButton>
              </div>

              {/* Nav pills */}
              <nav className="mt-2 flex w-full flex-wrap justify-center gap-3 md:gap-4">
                {mainNav.map((item) => (
                  <MagneticButton
                    key={item.href}
                    as={Link}
                    href={item.href}
                    className="footer-glass-pill rounded-full px-6 py-3 text-xs font-medium text-muted-foreground hover:text-foreground md:text-sm"
                  >
                    {item.label}
                  </MagneticButton>
                ))}
              </nav>

              {/* Contact line */}
              <div className="mt-2 flex items-center gap-2 text-center text-xs text-muted-foreground">
                <MapPin className="size-4 shrink-0 text-brand" />
                {site.contact.addressShort}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="relative z-20 flex w-full flex-col items-center justify-between gap-6 px-6 pb-8 md:flex-row md:px-12">
            <div className="order-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground md:order-1 md:text-xs">
              © {year} {site.name}. All rights reserved.
              <span className="mt-1 block max-w-md text-[10px] font-normal normal-case tracking-normal opacity-80">
                {site.conceptNote}
              </span>
            </div>

            <div className="footer-glass-pill order-1 flex cursor-default items-center gap-2 rounded-full border-border/50 px-6 py-3 md:order-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground md:text-xs">
                Cold Chain Partner
              </span>
              <span className="ml-1 text-xs font-black tracking-normal text-brand md:text-sm">
                {site.shortName}
              </span>
            </div>

            <MagneticButton
              as="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="footer-glass-pill group order-3 flex size-12 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
            >
              <ArrowUp className="size-5 transition-transform duration-300 group-hover:-translate-y-1.5" />
            </MagneticButton>
          </div>
        </footer>
      </div>
    </>
  );
}
