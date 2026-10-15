import { cn } from "@/lib/utils";

type Variant = "aurora" | "dots" | "grid";

/** Lightweight CSS-only animated background layer (no extra canvas/WebGL). */
export function SectionBg({
  variant = "aurora",
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  if (variant === "dots") {
    return (
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden",
          className
        )}
      >
        <div className="bg-dots-pattern animate-pattern-drift absolute inset-0 opacity-100 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
        <div className="animate-aurora absolute -left-24 top-0 size-[26rem] rounded-full bg-brand/14 blur-[120px]" />
        <div className="animate-aurora absolute -right-24 bottom-0 size-[24rem] rounded-full bg-teal-400/14 blur-[120px] [animation-delay:-6s]" />
      </div>
    );
  }

  if (variant === "grid") {
    return (
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden",
          className
        )}
      >
        <div className="bg-grid animate-grid-pan absolute inset-0 opacity-[0.14] [mask-image:radial-gradient(ellipse_at_center,black,transparent_82%)]" />
      </div>
    );
  }

  // aurora
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <div className="animate-aurora absolute -left-24 -top-16 size-[32rem] rounded-full bg-brand/16 blur-[130px]" />
      <div className="animate-aurora absolute -bottom-20 -right-16 size-[28rem] rounded-full bg-teal-400/16 blur-[130px] [animation-delay:-6s]" />
    </div>
  );
}
