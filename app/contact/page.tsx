import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { SectionBg } from "@/components/sections/section-bg";
import { DecorShapes } from "@/components/sections/decor-shapes";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Norvane Cold Systems for cold rooms, display refrigeration, monitored cold storage and service plans.",
};

type ContactLine = { value: string; href?: string };
type ContactCard = {
  icon: typeof Phone;
  label: string;
  lines: ContactLine[];
};

const cards: ContactCard[] = [
  {
    icon: Phone,
    label: "Call us",
    lines: [
      { value: site.contact.phone, href: `tel:${site.contact.phone.replace(/\s/g, "")}` },
      { value: site.contact.phone2, href: `tel:${site.contact.phone2.replace(/\s/g, "")}` },
    ],
  },
  {
    icon: Mail,
    label: "Email us",
    lines: [
      { value: site.contact.email, href: `mailto:${site.contact.email}` },
      { value: site.contact.email2, href: `mailto:${site.contact.email2}` },
    ],
  },
  {
    icon: Clock,
    label: "Business hours",
    lines: [{ value: "Mon–Fri, 8:00 AM – 5:00 PM (PHT)" }],
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact Us"
        title="Let's talk about your cold-chain needs"
        description="Reach us directly by phone or email — our team will get back to you with a tailored solution. No obligation, just straight answers."
      />

      <section className="relative overflow-hidden bg-background py-20 lg:py-28">
        <SectionBg variant="aurora" />
        <DecorShapes variant="a" tone="light" />
        <div className="container-page relative z-10">
          <Stagger className="grid gap-5 sm:grid-cols-3">
            {cards.map((c) => {
              const Icon = c.icon;
              return (
                <StaggerItem key={c.label}>
                  <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg sm:p-8">
                    <span className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-muted text-brand">
                      <Icon className="size-6" />
                    </span>
                    <h2 className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {c.label}
                    </h2>
                    <div className="mt-2 space-y-1.5">
                      {c.lines.map((l) =>
                        l.href ? (
                          <a
                            key={l.value}
                            href={l.href}
                            className="group flex items-center gap-1.5 break-all text-sm font-semibold text-primary transition-colors hover:text-brand sm:text-base"
                          >
                            {l.value}
                            <ArrowUpRight className="size-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                          </a>
                        ) : (
                          <p
                            key={l.value}
                            className="text-sm font-semibold text-primary sm:text-base"
                          >
                            {l.value}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>

          {/* Address band */}
          <Reveal delay={0.1}>
            <div className="relative mt-6 overflow-hidden rounded-3xl bg-primary p-7 text-primary-foreground sm:p-10">
              <div className="bg-grid animate-grid-pan absolute inset-0 opacity-10" aria-hidden />
              <div
                className="animate-aurora absolute -right-16 -top-20 size-64 rounded-full bg-brand/25 blur-[90px]"
                aria-hidden
              />
              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand">
                  <MapPin className="size-6" />
                </span>
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-white/60">
                    Company address
                  </h2>
                  <p className="mt-2 max-w-2xl text-base font-medium leading-relaxed text-white sm:text-lg">
                    {site.contact.address}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-brand">
                    {site.tagline}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
