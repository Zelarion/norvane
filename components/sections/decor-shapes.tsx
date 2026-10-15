import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

/**
 * Decorative "engineered/blueprint" motion graphics: morphing blobs +
 * technical geometric accents (rings, crosshair, dashed arc). CSS-animated,
 * pointer-events-none, server-safe.
 */
export function DecorShapes({
  variant = "a",
  tone = "light",
  className,
}: {
  variant?: "a" | "b";
  tone?: Tone;
  className?: string;
}) {
  const stroke = tone === "dark" ? "rgba(255,255,255,0.18)" : "rgba(15,118,110,0.22)";
  const strokeStrong =
    tone === "dark" ? "rgba(45,212,191,0.35)" : "rgba(15,118,110,0.32)";

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      {/* morphing blob */}
      <div
        className={cn(
          "animate-blob absolute size-64 opacity-60 blur-2xl",
          variant === "a" ? "-left-16 top-10" : "-right-20 bottom-0",
          tone === "dark"
            ? "bg-gradient-to-tr from-brand/30 to-teal-400/10"
            : "bg-gradient-to-tr from-brand/15 to-teal-300/10"
        )}
      />

      {/* rotating dashed ring */}
      <svg
        className={cn(
          "animate-spin-slow absolute size-40",
          variant === "a" ? "right-[8%] top-[14%]" : "left-[6%] bottom-[12%]"
        )}
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke={stroke}
          strokeWidth="1"
          strokeDasharray="6 8"
        />
        <circle cx="50" cy="4" r="2.5" fill={strokeStrong} />
      </svg>

      {/* crosshair */}
      <svg
        className={cn(
          "animate-float-y absolute size-12",
          variant === "a" ? "left-[12%] bottom-[18%]" : "right-[14%] top-[20%]"
        )}
        viewBox="0 0 40 40"
        fill="none"
        stroke={strokeStrong}
        strokeWidth="1.5"
      >
        <circle cx="20" cy="20" r="6" />
        <path d="M20 0v10M20 30v10M0 20h10M30 20h10" />
      </svg>

      {/* dashed arc */}
      <svg
        className="animate-spin-slow-rev absolute right-[20%] bottom-[8%] size-28"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M10 50 A40 40 0 0 1 90 50"
          stroke={stroke}
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />
      </svg>

      {/* floating square */}
      <div
        className={cn(
          "animate-float-y-soft absolute size-3 rotate-45",
          variant === "a" ? "right-[28%] top-[30%]" : "left-[22%] top-[24%]",
          tone === "dark" ? "bg-teal-400/50" : "bg-brand/40"
        )}
      />
    </div>
  );
}
