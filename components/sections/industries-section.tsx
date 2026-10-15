import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { industries } from "@/lib/content";
import { SectionHeading } from "./section-heading";
import { SectionBg } from "./section-bg";
import { DecorShapes } from "./decor-shapes";
import { DuotoneImage } from "./duotone-image";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

export function IndustriesSection() {
  return (
    <section
      id="industries"
      className="relative overflow-hidden bg-background py-20 lg:py-0 lg:min-h-screen lg:flex lg:flex-col lg:justify-center"
    >
      <SectionBg variant="aurora" />
      <DecorShapes variant="b" tone="light" />
      {/* On desktop, content shifts right to make room for the traveling 3D object on the left */}
      <div className="container-page relative z-10 lg:pl-[30%]">
      <SectionHeading
        eyebrow="Industries We Serve"
        title="Solutions tailored to your industry"
        description="From the processing line to the shop floor to the pharmacy shelf, we keep what matters at the right temperature."
      />

      <Stagger className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {industries.map((ind, i) => {
          const Icon = ind.icon;
          return (
            <StaggerItem
              key={ind.slug}
              className={i === 2 ? "col-span-2 md:col-span-1" : ""}
            >
              <Link
                href={`/industries/${ind.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="relative aspect-[12/10] overflow-hidden sm:aspect-[16/10]">
                  <DuotoneImage
                    seed={ind.heroSeed}
                    alt={ind.name}
                    width={600}
                    height={375}
                    rounded={false}
                    className="size-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute bottom-4 left-4 inline-flex size-9 items-center justify-center rounded-lg bg-white/95 text-primary shadow-lg backdrop-blur sm:size-11 sm:rounded-xl">
                    <Icon className="size-4.5 sm:size-5" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-4 sm:p-7">
                  <h3 className="text-base font-semibold text-primary sm:text-xl">
                    {ind.name}
                  </h3>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground hidden sm:block">
                    {ind.overview}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-brand sm:mt-5 sm:text-sm">
                    Learn more
                    <ArrowUpRight className="size-3.5 sm:size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          );
        })}
      </Stagger>
      </div>
    </section>
  );
}
