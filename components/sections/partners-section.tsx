import { Globe2 } from "lucide-react";
import { suppliers } from "@/lib/content";
import { SectionHeading } from "./section-heading";
import { SectionBg } from "./section-bg";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

export function PartnersSection() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-muted py-20 lg:py-24">
      <SectionBg variant="dots" />
      <div className="container-page relative z-10">
        <SectionHeading
          eyebrow="Our Equipment Partners"
          title="Built on world-class equipment"
          description="Norvane works directly with leading refrigeration manufacturers across Italy, Japan, Germany, Denmark and South Korea."
        />

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {suppliers.map((s) => (
            <StaggerItem key={s.name}>
              <div className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg sm:p-7">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-colors duration-300 group-hover:bg-brand">
                    <Globe2 className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-bold leading-tight text-primary">
                      {s.name}
                    </h3>
                    <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-brand">
                      {s.origin}
                    </p>
                  </div>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {s.productLines}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
