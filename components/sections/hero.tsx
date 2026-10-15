"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldCheck, Globe2, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import FloatingLines from "@/components/FloatingLines";

const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
  loading: () => <HeroSceneFallback />,
});

function HeroSceneFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="size-56 rounded-full bg-brand/20 blur-3xl sm:size-72" />
    </div>
  );
}

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section className="relative -mt-16 flex min-h-dvh flex-col justify-center overflow-hidden bg-primary text-primary-foreground lg:-mt-18">
      {/* Desktop: animated WebGL FloatingLines. Mobile: lightweight CSS aurora
          (avoids a heavy full-screen shader competing for the main thread, so
          the menu opens instantly and WebGL contexts don't thrash). */}
      {!reduce && isDesktop && (
        <div className="absolute inset-0 z-0" aria-hidden>
          <FloatingLines
            linesGradient={["#134e4a", "#0f766e", "#2dd4bf"]}
            animationSpeed={1}
            interactive
            bendRadius={5}
            bendStrength={-0.5}
            mouseDamping={0.05}
            parallax
            parallaxStrength={0.2}
          />
        </div>
      )}
      {!isDesktop && (
        <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
          <div className="animate-aurora absolute -right-16 top-1/4 size-72 rounded-full bg-brand/30 blur-[90px]" />
          <div className="animate-aurora absolute -left-16 bottom-4 size-64 rounded-full bg-teal-500/20 blur-[90px] [animation-delay:-6s]" />
        </div>
      )}

      {/* decorative overlays (never capture pointer) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-grid opacity-[0.1]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-32 right-0 z-0 size-[34rem] rounded-full bg-brand/15 blur-[130px]"
        aria-hidden
      />
      {/* legibility scrim so lines never wash out the headline */}
      <div
        className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-r from-primary via-primary/40 to-transparent lg:via-primary/15"
        aria-hidden
      />

      <div className="container-page pointer-events-none relative z-10 grid w-full items-center gap-10 py-20 sm:py-24 lg:grid-cols-2 lg:gap-8 lg:py-28">
        <div>
          <motion.span
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80 backdrop-blur"
          >
            <span className="size-1.5 rounded-full bg-brand" />
            {site.tagline}
          </motion.span>

          <motion.h1
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease }}
            className="mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl"
          >
            Your dependable partner in{" "}
            <span className="text-gradient-brand">cold-chain equipment</span>
          </motion.h1>

          <motion.p
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/75"
          >
            Norvane Cold Systems supplies, installs and services commercial
            refrigeration for food processors, restaurants, retailers and
            healthcare providers, with equipment from trusted partners in Italy,
            Japan, Germany and Denmark.
          </motion.p>

          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="pointer-events-auto mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="bg-brand text-brand-foreground hover:bg-brand/90"
            >
              <Link href="/contact">
                Contact Us
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/industries">Explore Industries</Link>
            </Button>
          </motion.div>

          <motion.ul
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease }}
            className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/70"
          >
            <li className="flex items-center gap-2">
              <Gauge className="size-4 text-brand" /> Dependable service
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-brand" /> Precision-sized
            </li>
            <li className="flex items-center gap-2">
              <Globe2 className="size-4 text-brand" /> Global sourcing
            </li>
          </motion.ul>
        </div>

        {/* 3D scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="pointer-events-auto relative z-10 h-[320px] w-full sm:h-[420px] lg:hidden"
        >
          {/* Mobile/tablet: inline scene. Desktop: the TravelingScene object covers this. */}
          {!isDesktop && (
            <div className="h-full w-full lg:hidden">
              {reduce ? <HeroSceneFallback /> : <HeroScene />}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
