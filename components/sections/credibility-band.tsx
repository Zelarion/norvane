import { Factory, Globe2, Handshake, MapPin } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { site } from "@/lib/site";

export function CredibilityBand() {
  return (
    <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground lg:py-28">
      <div className="bg-grid animate-grid-pan absolute inset-0 opacity-10" aria-hidden />
      <div
        className="animate-aurora absolute -left-20 -top-24 size-96 rounded-full bg-brand/30 blur-[100px]"
        aria-hidden
      />
      <div className="container-page relative z-10">
        <Reveal>
          <div className="mb-12 lg:mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Why Norvane
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">
              A specialist cold-chain partner you can rely on
            </h2>
          </div>
        </Reveal>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          <Reveal delay={0.1} className="lg:w-2/5">
            <div className="flex items-center gap-5">
              <div className="flex size-28 shrink-0 items-center justify-center rounded-2xl bg-white p-4 shadow-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brand/norvane-mark.svg"
                  alt="Norvane Cold Systems"
                  className="size-full object-contain"
                />
              </div>
              <div>
                <p className="text-2xl font-bold font-heading">
                  NORVANE
                </p>
                <p className="mt-1 text-sm text-white/70">
                  Commercial refrigeration specialists
                </p>
                <p className="mt-3 text-sm font-medium text-white/85">{site.tagline}</p>
              </div>
            </div>
          </Reveal>
          <div className="lg:w-3/5">
            <Stagger className="grid grid-cols-2 gap-4 sm:grid-cols-2">
              <StaggerItem className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="mb-3 inline-flex size-10 items-center justify-center rounded-xl bg-brand/15 text-brand">
                  <Factory className="size-5" />
                </div>
                <p className="font-semibold text-white">3 Industries Served</p>
                <p className="mt-1 text-sm text-white/65">
                  Food Processing · Retail & Hospitality · Healthcare & Pharma
                </p>
              </StaggerItem>
              <StaggerItem className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="mb-3 inline-flex size-10 items-center justify-center rounded-xl bg-brand/15 text-brand">
                  <Globe2 className="size-5" />
                </div>
                <p className="font-semibold text-white">Global Sourcing</p>
                <p className="mt-1 text-sm text-white/65">
                  {site.sourcingCountries.join(" · ")}
                </p>
              </StaggerItem>
              <StaggerItem className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="mb-3 inline-flex size-10 items-center justify-center rounded-xl bg-brand/15 text-brand">
                  <Handshake className="size-5" />
                </div>
                <p className="font-semibold text-white">Authorised Equipment Partner</p>
                <p className="mt-1 text-sm text-white/65">
                  Direct local partner for leading refrigeration manufacturers
                </p>
              </StaggerItem>
              <StaggerItem className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="mb-3 inline-flex size-10 items-center justify-center rounded-xl bg-brand/15 text-brand">
                  <MapPin className="size-5" />
                </div>
                <p className="font-semibold text-white">Head Office</p>
                <p className="mt-1 text-sm text-white/65">{site.contact.addressShort}</p>
              </StaggerItem>
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
