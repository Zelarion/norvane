import type { Metadata } from "next";
import Image from "next/image";
import { Target, Eye, Compass } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { SectionHeading } from "@/components/sections/section-heading";
import { SectionBg } from "@/components/sections/section-bg";
import { DecorShapes } from "@/components/sections/decor-shapes";
import { Parallax } from "@/components/motion/parallax";
import { LogoMarquee } from "@/components/sections/logo-marquee";
import { ValuesSection } from "@/components/sections/values-section";
import { CtaSection } from "@/components/sections/cta-section";
import { OverlapSection } from "@/components/sections/overlap-section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { site } from "@/lib/site";
import { vision, mission, story } from "@/lib/content";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Norvane Cold Systems supplies, installs and services commercial refrigeration for food, retail and healthcare businesses, built on dependability, precision and care.",
};

const pillars = [
  {
    icon: Eye,
    title: "Our Vision",
    body: vision,
  },
  {
    icon: Target,
    title: "Our Mission",
    body: mission,
  },
  {
    icon: Compass,
    title: "Our Approach",
    body: "Measure the load first, specify the right equipment, install it cleanly, and service it on a plan, so every customer's stock stays safe.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Norvane"
        title="A trusted name in cold-chain equipment"
        description={site.description}
      />

      <LogoMarquee />

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
                  alt="Norvane cold room illustration"
                  width={900}
                  height={650}
                  className="h-full w-full object-cover"
                />
              </Parallax>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              align="left"
              eyebrow="Who We Are"
              title="Quality equipment, dependable partnership"
              description="At Norvane, we supply and service the refrigeration that keeps food, medicine and fresh produce at the right temperature."
            />
            <div className="mt-6 space-y-4 text-muted-foreground">
              {story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        <Stagger className="container-page relative z-10 mt-20 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <StaggerItem
                key={p.title}
                className={cn(i === 2 ? "col-span-2 md:col-span-1" : "")}
              >
                <div className="h-full rounded-2xl border border-border bg-card p-5 sm:p-8">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-muted text-brand sm:size-12">
                    <Icon className="size-5 sm:size-6" />
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-primary sm:mt-5 sm:text-xl">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:mt-2.5 sm:text-sm">
                    {p.body}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      <ValuesSection />
      <OverlapSection>
        <CtaSection />
      </OverlapSection>
    </>
  );
}
