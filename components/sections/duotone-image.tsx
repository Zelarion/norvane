import { cn } from "@/lib/utils";

/**
 * Navy/blue duotone image wrapper. When `src` is provided, renders the real
 * image tinted to the brand so photography reads as cohesive/industrial. When
 * no `src` is available, renders a deterministic, purely CSS branded
 * industrial graphic keyed off `seed` — no external network requests, no
 * <img> tag, and no randomness (same seed always renders identically).
 */
function hashSeed(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h += s.charCodeAt(i);
  return h;
}

export function DuotoneImage({
  seed,
  src,
  alt,
  width = 900,
  height = 700,
  className,
  rounded = true,
}: {
  seed?: string;
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  rounded?: boolean;
}) {
  const resolvedSeed = seed ?? "norvane";
  const hash = hashSeed(resolvedSeed);
  const hue = (hash * 37) % 360;
  const top = (hash % 60) + 20;
  const left = ((hash * 7) % 60) + 20;

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        rounded && "rounded-3xl",
        className
      )}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {src ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="img-duotone size-full object-cover"
          />
        </>
      ) : (
        <>
          {/* navy base */}
          <div className="absolute inset-0 bg-primary" />
          {/* grid pattern */}
          <div className="absolute inset-0 bg-grid opacity-[0.12]" />
          {/* deterministic brand glow, positioned/hued from the seed hash */}
          <div
            className="absolute size-[70%] rounded-full bg-brand blur-[80px]"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              filter: `hue-rotate(${hue}deg)`,
            }}
          />
          {/* diagonal sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
          {/* ghost ring */}
          <div className="absolute -right-1/4 -bottom-1/4 size-[140%] rounded-full border border-white/10" />
        </>
      )}
      {/* duotone colorize */}
      <div className="absolute inset-0 bg-brand/60 mix-blend-color" />
      {/* depth + brand wash */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/75 via-primary/20 to-transparent mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/35 to-transparent" />
      {/* subtle inner ring */}
      <div className="absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10" />
    </div>
  );
}
