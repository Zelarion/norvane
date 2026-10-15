"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { useEffect, useState, useRef } from "react";
import type { Group } from "three";
import { Core, Units } from "./hero-scene";
import { gsap } from "gsap";

/**
 * Rotates the 3D object IN 3D SPACE based on a scroll-driven MotionValue.
 * NOTE: never apply CSS rotateX/rotateY to the <Canvas> wrapper — rotating a
 * flat canvas in CSS 3D perspective-skews the whole render. Rotate the mesh.
 */
function ScrollSpin({
  spin,
  tilt,
  children,
}: {
  spin: MotionValue<number>;
  tilt: MotionValue<number>;
  children: React.ReactNode;
}) {
  const ref = useRef<Group>(null);
  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y = spin.get();
    ref.current.rotation.x = tilt.get();
  });
  return <group ref={ref}>{children}</group>;
}

/**
 * A single 3D object that travels on scroll across three stops:
 *  - Hero (right of center)  →  Industries (left, room is made for it)
 *  - →  Values section (center, behind the text, above the background)
 * Desktop-only (lg+) and disabled for reduced-motion. Pointer-events-none.
 */
export default function TravelingScene() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [stops, setStops] = useState({ b: 900, c: 2000 });
  const [isDesktop, setIsDesktop] = useState(false);
  const isTransitioning = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const measure = () => {
      const ind = document.getElementById("industries");
      const val = document.getElementById("values-section");
      if (!ind || !val) return;
      const b = ind.getBoundingClientRect().top + window.scrollY;
      const c = val.getBoundingClientRect().top + window.scrollY;
      if (b > 0 && c > 0) {
        setStops({ b, c });
      }
    };
    measure();
    // Re-measure after late layout shifts (images/fonts) so the values stop is accurate
    const t1 = setTimeout(measure, 600);
    const t2 = setTimeout(measure, 1500);

    // Use ResizeObserver to ensure stops are always consistent when page height changes
    let ro: ResizeObserver | null = null;
    if (typeof window !== "undefined" && "ResizeObserver" in window) {
      ro = new ResizeObserver(measure);
      ro.observe(document.body);
    }

    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (ro) ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Snap-scroll transitions lock/unlock management on desktop
  useEffect(() => {
    if (!isDesktop || reduce) return;

    const handleWheel = (e: WheelEvent) => {
      // If we are currently transitioning, block any user input
      if (isTransitioning.current) {
        e.preventDefault();
        return;
      }

      const lenis = (window as any).lenis;
      if (!lenis) return;

      const scrollYVal = window.scrollY;
      const threshold = 120; // px tolerance for snapping

      const ind = document.getElementById("industries");
      const val = document.getElementById("values-section");
      if (!ind || !val) return;

      const stop1 = ind.getBoundingClientRect().top + scrollYVal;
      const stop2 = val.getBoundingClientRect().top + scrollYVal;

      // Guard: If offsets aren't loaded or valid, don't lock/hijack the scroll
      if (stop1 <= 0 || stop2 <= 0) return;

      // Determine the section closest to viewport top
      let activeSec = 0;
      if (Math.abs(scrollYVal - 0) < threshold) {
        activeSec = 0;
      } else if (Math.abs(scrollYVal - stop1) < threshold) {
        activeSec = 1;
      } else if (Math.abs(scrollYVal - stop2) < threshold) {
        activeSec = 2;
      } else if (scrollYVal > 0 && scrollYVal < stop1) {
        activeSec = scrollYVal > stop1 / 2 ? 1 : 0;
      } else if (scrollYVal > stop1 && scrollYVal < stop2) {
        activeSec = scrollYVal > (stop1 + stop2) / 2 ? 2 : 1;
      } else {
        activeSec = 3;
      }

      // Past values section scroll normally
      if (activeSec === 3 && scrollYVal > stop2 + threshold) {
        return;
      }

      // Snap back up to values section if scrolling up and crossing threshold
      if (scrollYVal > stop2 + threshold && e.deltaY < 0) {
        if (scrollYVal + e.deltaY <= stop2 + threshold) {
          e.preventDefault();
          startTransition(2, stop2, lenis);
        }
        return;
      }

      // Intercept and prevent normal scrolling inside snap zones
      e.preventDefault();

      const isDown = e.deltaY > 0;
      if (isDown) {
        if (activeSec === 0) {
          startTransition(1, stop1, lenis);
        } else if (activeSec === 1) {
          startTransition(2, stop2, lenis);
        }
      } else {
        if (activeSec === 2) {
          startTransition(1, stop1, lenis);
        } else if (activeSec === 1) {
          startTransition(0, 0, lenis);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // If transitioning, block keys
      if (isTransitioning.current) {
        const keys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Space"];
        if (keys.includes(e.key)) {
          e.preventDefault();
        }
        return;
      }

      const lenis = (window as any).lenis;
      if (!lenis) return;

      const ind = document.getElementById("industries");
      const val = document.getElementById("values-section");
      if (!ind || !val) return;

      const stop1 = ind.getBoundingClientRect().top + window.scrollY;
      const stop2 = val.getBoundingClientRect().top + window.scrollY;
      const scrollYVal = window.scrollY;

      // Guard: If offsets aren't loaded or valid, don't lock/hijack the scroll
      if (stop1 <= 0 || stop2 <= 0) return;

      const threshold = 120;
      let activeSec = 0;
      if (Math.abs(scrollYVal - 0) < threshold) {
        activeSec = 0;
      } else if (Math.abs(scrollYVal - stop1) < threshold) {
        activeSec = 1;
      } else if (Math.abs(scrollYVal - stop2) < threshold) {
        activeSec = 2;
      } else if (scrollYVal > stop1 && scrollYVal < stop2) {
        activeSec = scrollYVal > (stop1 + stop2) / 2 ? 2 : 1;
      } else if (scrollYVal > 0 && scrollYVal < stop1) {
        activeSec = scrollYVal > stop1 / 2 ? 1 : 0;
      } else {
        activeSec = 3;
      }

      if (activeSec === 3) return;

      const keys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Space"];
      if (!keys.includes(e.key)) return;

      e.preventDefault();

      const isDown =
        ["ArrowDown", "PageDown", "Space"].includes(e.key) &&
        !(e.key === "Space" && e.shiftKey);

      if (isDown) {
        if (activeSec === 0) {
          startTransition(1, stop1, lenis);
        } else if (activeSec === 1) {
          startTransition(2, stop2, lenis);
        }
      } else {
        if (activeSec === 2) {
          startTransition(1, stop1, lenis);
        } else if (activeSec === 1) {
          startTransition(0, 0, lenis);
        }
      }
    };

    const startTransition = (targetIndex: number, targetScroll: number, lenis: any) => {
      isTransitioning.current = true;

      // Smooth programmatic scroll animation using GSAP
      const scrollObj = { y: window.scrollY };
      gsap.to(scrollObj, {
        y: targetScroll,
        duration: 1.6, // Slower travel duration as requested
        ease: "power2.inOut",
        onUpdate: () => {
          window.scrollTo(0, scrollObj.y);
          // Sync Lenis scroll offset on each frame
          lenis.scrollTo(scrollObj.y, { immediate: true });
        },
        onComplete: () => {
          isTransitioning.current = false;
        },
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDesktop, reduce]);

  // Horizontal travel between the three stops. Only translate/scale/opacity on
  // the wrapper (these never distort the canvas) — rotation happens in 3D below.
  const x = useTransform(
    scrollY,
    [0, stops.b, stops.c],
    ["27vw", "-30vw", "0vw"]
  );
  const scale = useTransform(scrollY, [0, stops.b, stops.c], [1, 1, 1.15]);
  const opacity = useTransform(
    scrollY,
    [0, stops.b, stops.c, stops.c + 900],
    [1, 1, 0.5, 0]
  );

  // Real 3D rotation driven by scroll (no CSS skew). A full turn by the last stop.
  const spin = useTransform(scrollY, [0, stops.c], [0, Math.PI * 2]);
  const tilt = useTransform(scrollY, [0, stops.b, stops.c], [0, 0.45, 0]);

  if (reduce || !isDesktop) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[5] flex items-center justify-center"
      aria-hidden
    >
      <motion.div
        style={{ x, scale, opacity }}
        className="h-[320px] w-[320px] will-change-transform sm:h-[420px] sm:w-[420px] lg:h-[540px] lg:w-[540px]"
      >
        <Canvas
          camera={{ position: [0, 0, 6.5], fov: 42 }}
          dpr={[1, 1.7]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.6} />
          <pointLight position={[-5, -3, -2]} intensity={40} color="#2dd4bf" />
          <ScrollSpin spin={spin} tilt={tilt}>
            <Core />
            <Units />
          </ScrollSpin>
        </Canvas>
      </motion.div>
    </div>
  );
}
