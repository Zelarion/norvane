import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { SectionHeading } from "@/components/sections/section-heading";
import { SectionBg } from "@/components/sections/section-bg";
import { DecorShapes } from "@/components/sections/decor-shapes";
import { DuotoneImage } from "@/components/sections/duotone-image";
import { CtaSection } from "@/components/sections/cta-section";
import { OverlapSection } from "@/components/sections/overlap-section";
import { Parallax } from "@/components/motion/parallax";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { industries, industryProcess } from "@/lib/content";

export function generateStaticParams() {
  return industries.map((ind) => ({ sector: ind.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sector: string }>;
}): Promise<Metadata> {
  const { sector } = await params;
  const ind = industries.find((i) => i.slug === sector);
  if (!ind) return {};
  return { title: ind.name, description: ind.overview };
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ sector: string }>;
}) {
  const { sector } = await params;
  const ind = industries.find((i) => i.slug === sector);
  if (!ind) notFound();

  const Icon = ind.icon;
  const others = industries.filter((i) => i.slug !== sector);

  return (
    <>
      <PageHeader eyebrow="Industry" title={ind.name} description={ind.tagline} />

      {/* Overview + hero image */}
      <section className="relative overflow-hidden bg-background py-20 lg:py-28">
        <SectionBg variant="aurora" />
        <DecorShapes variant="a" tone="light" />
        <div className="container-page relative z-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Parallax className="aspect-[4/3] rounded-3xl shadow-2xl shadow-primary/20">
              <DuotoneImage
                seed={ind.heroSeed}
                src={ind.image}
                alt={`${ind.name} operations`}
                className="size-full"
                rounded={false}
              />
            </Parallax>
          </Reveal>

          <div>
            <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Icon className="size-7" />
            </span>
            <h2 className="mt-6 text-3xl font-bold text-primary sm:text-4xl">
              Overview
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {ind.overview}
            </p>
            <Stagger className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-2">
              {ind.offerings.map((o) => (
                <StaggerItem key={o}>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-muted text-brand">
                      <Check className="size-3.5" />
                    </span>
                    <span className="text-sm font-medium text-primary">{o}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="bg-brand text-brand-foreground hover:bg-brand/90">
                <Link href="/contact">
                  Contact Us
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/industries">
                  <ArrowLeft className="size-4" />
                  All Industries
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights band (overlaps) */}
      <OverlapSection>
        <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground">
          <div className="bg-grid animate-grid-pan absolute inset-0 opacity-10" aria-hidden />
          <DecorShapes variant="b" tone="dark" />
          <Stagger className="container-page relative z-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {ind.highlights.map((h) => (
              <StaggerItem key={h.label} className="text-center">
                <div className="text-4xl font-bold text-white sm:text-5xl">{h.value}</div>
                <p className="mt-2 text-sm text-white/65">{h.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      </OverlapSection>

      {/* Applications gallery */}
      <section className="relative overflow-hidden bg-background py-20 lg:py-28">
        <SectionBg variant="dots" />
        <div className="container-page relative z-10">
          <SectionHeading
            eyebrow="Where We Help"
            title="Applications across your operation"
            description={`How Norvane supports ${ind.name.toLowerCase()} teams, from the first survey to the next service visit.`}
          />
          <Stagger className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ind.applications.map((app) => (
              <StaggerItem key={app.title}>
                <div className="group h-full overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <Parallax className="aspect-[4/3]" distance={28}>
                    <DuotoneImage
                      seed={app.seed}
                      alt={app.title}
                      width={600}
                      height={450}
                      rounded={false}
                      className="size-full transition-transform duration-500 group-hover:scale-105"
                    />
                  </Parallax>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-sm font-semibold text-primary sm:text-lg">{app.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground hidden sm:block">
                      {app.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Process */}
      <section className="relative overflow-hidden border-y border-border bg-muted py-20 lg:py-28">
        <DecorShapes variant="a" tone="light" />
        <div className="container-page relative z-10">
          <SectionHeading
            eyebrow="How We Work"
            title="A clear path from inquiry to delivery"
          />
          <div className="relative mt-14 grid gap-8 md:grid-cols-4">
            <div className="absolute left-0 right-0 top-7 hidden h-px bg-[linear-gradient(to_right,transparent,var(--color-border),transparent)] md:block" />
            <Stagger className="contents">
              {industryProcess.map((p) => (
                <StaggerItem key={p.step}>
                  <div className="relative text-center">
                    <span className="relative z-10 mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary font-heading text-lg font-bold text-primary-foreground shadow-lg">
                      {p.step}
                    </span>
                    <h3 className="mt-5 text-lg font-semibold text-primary">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {p.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Other industries */}
      <section className="relative overflow-hidden bg-background py-16">
        <div className="container-page relative z-10">
          <h2 className="text-center text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Explore other industries
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6">
            {others.map((o) => {
              const OIcon = o.icon;
              return (
                <Link
                  key={o.slug}
                  href={`/industries/${o.slug}`}
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-brand/40 sm:gap-4 sm:p-5"
                >
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-colors group-hover:bg-brand sm:size-12">
                    <OIcon className="size-5 sm:size-6" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs font-semibold text-primary sm:text-base">{o.name}</h3>
                    <p className="hidden text-sm text-muted-foreground sm:block sm:mt-0.5">{o.tagline}</p>
                  </div>
                  <ArrowRight className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <OverlapSection>
        <CtaSection />
      </OverlapSection>
    </>
  );
}
