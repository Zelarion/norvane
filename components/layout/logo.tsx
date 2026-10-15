import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "light";
}) {
  const wordColor = variant === "light" ? "text-white" : "text-primary";
  const subColor = variant === "light" ? "text-white/70" : "text-muted-foreground";

  return (
    <Link
      href="/"
      aria-label="Norvane Cold Systems — home"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span className="inline-flex size-10 items-center justify-center overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/norvane-mark.svg"
          alt="Norvane Cold Systems"
          className="size-9 object-contain"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-heading text-lg font-bold tracking-tight",
            wordColor
          )}
        >
          NORVANE
        </span>
        <span
          className={cn(
            "text-[10px] font-medium uppercase tracking-[0.18em]",
            subColor
          )}
        >
          Cold Systems
        </span>
      </span>
    </Link>
  );
}
