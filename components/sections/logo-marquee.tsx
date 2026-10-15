"use client";

import { Building2 } from "lucide-react";
import LogoLoop, { type LogoItem } from "@/components/LogoLoop";
import { clients } from "@/lib/content";

/** Sample clients for the concept project (fictional). */
const logos: LogoItem[] = clients.map((name) => ({
  node: (
    <span className="flex items-center gap-2.5 text-slate-500 transition-colors hover:text-primary">
      <Building2 className="size-5 shrink-0" strokeWidth={1.75} />
      <span className="font-heading text-lg font-bold tracking-tight whitespace-nowrap">
        {name}
      </span>
    </span>
  ),
  title: name,
}));

export function LogoMarquee() {
  return (
    <section className="relative z-10 border-y border-border bg-card py-10">
      <p className="container-page mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Trusted by food, retail and healthcare teams
      </p>
      <div className="relative h-12">
        <LogoLoop
          logos={logos}
          speed={55}
          direction="left"
          logoHeight={28}
          gap={72}
          fadeOut
          fadeOutColor="#ffffff"
          scaleOnHover
          ariaLabel="Partner and client companies"
        />
      </div>
    </section>
  );
}
