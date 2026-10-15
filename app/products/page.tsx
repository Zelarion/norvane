import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { PartnersSection } from "@/components/sections/partners-section";
import { CtaSection } from "@/components/sections/cta-section";
import { SectionHeading } from "@/components/sections/section-heading";
import { SectionBg } from "@/components/sections/section-bg";
import { LogoMarquee } from "@/components/sections/logo-marquee";
import { OverlapSection } from "@/components/sections/overlap-section";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { productCategories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Products & Solutions",
  description:
    "Explore Norvane's range of cold rooms, display and kitchen refrigeration, ice and beverage cooling, and service plans.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Products & Solutions"
        title="Everything your operation needs to run"
        description="A wide range of refrigeration equipment and service plans, specified to your load and delivered with the dependability you can plan around."
      />

      <LogoMarquee />

      <section className="relative overflow-hidden bg-background py-20 lg:py-28">
        <SectionBg variant="aurora" />
        <div className="container-page relative z-10">
        <SectionHeading
          eyebrow="What We Offer"
          title="Everything the cold chain needs"
          description="From cold rooms to display cases and service plans, we cover the full spectrum of commercial refrigeration needs."
        />

        <Stagger className="mt-14 grid grid-cols-2 gap-4 sm:gap-6">
          {productCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <StaggerItem key={cat.title}>
                <div className="group flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg sm:flex-row sm:gap-5 sm:p-7">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-colors duration-300 group-hover:bg-brand sm:size-14 sm:rounded-2xl">
                    <Icon className="size-5.5 sm:size-7" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-primary sm:text-lg">
                      {cat.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:mt-2 sm:text-sm">
                      {cat.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <p className="mt-10 rounded-2xl border border-dashed border-border bg-muted/40 p-6 text-center text-sm text-muted-foreground">
          Looking for a specific unit or brand? We work with leading
          refrigeration manufacturers —{" "}
          <span className="font-medium text-brand">get in touch</span> and our
          team will point you to the right partner.
        </p>
        </div>
      </section>

      <PartnersSection />
      <OverlapSection>
        <CtaSection />
      </OverlapSection>
    </>
  );
}
