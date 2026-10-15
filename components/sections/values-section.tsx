import { values } from "@/lib/content";
import { SectionHeading } from "./section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import DotGrid from "@/components/DotGrid";
import { cn } from "@/lib/utils";

export function ValuesSection() {
  return (
    <section
      id="values-section"
      className="relative overflow-hidden border-y border-border bg-muted lg:bg-transparent py-20 lg:py-0 lg:min-h-screen lg:flex lg:flex-col lg:justify-center"
    >
      {/* Desktop background layer (z-0) drawn behind the z-[5] fixed 3D canvas */}
      <div className="absolute inset-0 bg-muted z-0 hidden lg:block" />

      {/* Interactive ReactBits DotGrid background */}
      <div
        id="values-anchor"
        className="pointer-events-none absolute inset-0 opacity-90 [mask-image:radial-gradient(ellipse_at_center,black,transparent_82%)]"
        aria-hidden
      >
        <DotGrid
          dotSize={4}
          gap={28}
          baseColor="#9cc0ef"
          activeColor="#1d6ef5"
          proximity={150}
          shockRadius={240}
          shockStrength={5}
        />
      </div>
      <div className="container-page relative z-10">
        <SectionHeading
          eyebrow="What We Stand For"
          title="Built on Dependability, Precision & Care"
          description="These aren't just words on a page — they're the standard we hold ourselves to on every job and every customer."
        />

        <Stagger className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <StaggerItem
                key={v.title}
                className={cn(i === 2 ? "col-span-2 md:col-span-1" : "")}
              >
                <div className="group h-full rounded-2xl border border-border bg-card p-5 text-center transition-shadow duration-300 hover:shadow-lg sm:p-8">
                  <span className="mx-auto inline-flex size-11 items-center justify-center rounded-xl bg-brand-muted text-brand transition-transform duration-300 group-hover:scale-110 sm:size-14 sm:rounded-2xl">
                    <Icon className="size-5.5 sm:size-7" />
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-primary sm:mt-5 sm:text-xl">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:mt-3 sm:text-sm">
                    {v.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
