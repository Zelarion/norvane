import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { differentiators } from "@/lib/content";
import { SectionHeading } from "./section-heading";
import { SectionBg } from "./section-bg";
import { DecorShapes } from "./decor-shapes";
import { Parallax } from "@/components/motion/parallax";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function WhyNorvaneSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-28">
      <SectionBg variant="aurora" />
      <DecorShapes variant="a" tone="light" />
      <div className="container-page relative z-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-3 -z-10 rounded-3xl bg-brand/10 blur-2xl" aria-hidden />
            <Parallax className="aspect-[4/3] rounded-3xl border border-border shadow-xl" distance={40}>
              <Image
                src="/images/cold-room.svg"
                alt="Norvane cold room installation"
                width={900}
                height={650}
                className="h-full w-full object-cover"
              />
            </Parallax>
            <div className="absolute -bottom-6 -right-4 z-10 hidden rounded-2xl border border-border bg-card p-5 shadow-lg sm:block">
              <p className="text-3xl font-bold text-brand">100%</p>
              <p className="text-xs text-muted-foreground">Commitment to quality</p>
            </div>
          </div>
        </Reveal>

        <div>
          <SectionHeading
            align="left"
            eyebrow="Why Norvane"
            title="A cold-chain partner you can build on"
            description="We go beyond selling equipment. We build long-term partnerships rooted in dependability, precision and care."
          />

          <Stagger className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-1 lg:gap-0 lg:space-y-5">
            {differentiators.map((d, i) => {
              const Icon = d.icon;
              return (
                <StaggerItem
                  key={d.title}
                  className={cn(i === 2 ? "col-span-2 lg:col-span-1" : "")}
                >
                  <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:shadow-md lg:flex-row lg:gap-4 lg:rounded-none lg:border-none lg:bg-transparent lg:p-0 lg:hover:shadow-none">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-muted text-brand sm:size-11">
                      <Icon className="size-4.5 sm:size-5" />
                    </span>
                    <div>
                      <h3 className="flex items-center gap-1.5 text-sm font-semibold text-primary sm:text-base">
                        {d.title}
                        <CheckCircle2 className="size-3.5 text-brand sm:size-4" />
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        {d.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
