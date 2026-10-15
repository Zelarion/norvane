import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { SectionBg } from "@/components/sections/section-bg";
import { DecorShapes } from "@/components/sections/decor-shapes";
import { DuotoneImage } from "@/components/sections/duotone-image";
import { LogoMarquee } from "@/components/sections/logo-marquee";
import { CtaSection } from "@/components/sections/cta-section";
import { OverlapSection } from "@/components/sections/overlap-section";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { industries } from "@/lib/content";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Norvane serves food processors, retailers, restaurants and healthcare providers with commercial refrigeration and cold-chain equipment.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Industries We Serve"
        title="Cold-chain solutions for demanding industries"
        description="We understand the unique requirements of each industry we serve — and we specify the equipment that keeps your operation efficient and dependable."
      />

      <LogoMarquee />

      <section className="relative overflow-hidden bg-background py-20 lg:py-28">
        <SectionBg variant="aurora" />
        <DecorShapes variant="b" tone="light" />
        <Stagger className="container-page relative z-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <StaggerItem
                key={ind.slug}
                className={cn(i === 2 ? "col-span-2 md:col-span-1" : "")}
              >
                <Link
                  href={`/industries/${ind.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl"
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
                  <div className="flex flex-1 flex-col p-4 sm:p-8">
                    <h2 className="text-base font-semibold text-primary sm:text-xl">
                      {ind.name}
                    </h2>
                    <p className="mt-1 text-[11px] font-medium text-brand sm:mt-2 sm:text-sm">
                      {ind.tagline}
                    </p>
                    <p className="mt-2.5 flex-1 text-xs leading-relaxed text-muted-foreground hidden sm:block">
                      {ind.overview}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-brand sm:mt-5 sm:text-sm">
                      View details
                      <ArrowUpRight className="size-3.5 sm:size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      <OverlapSection>
        <CtaSection />
      </OverlapSection>
    </>
  );
}
