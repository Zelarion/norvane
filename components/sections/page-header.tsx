import { Reveal } from "@/components/motion/reveal";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative -mt-16 overflow-hidden border-b border-border bg-primary text-primary-foreground lg:-mt-18">
      <div className="bg-grid animate-grid-pan absolute inset-0 opacity-[0.12]" aria-hidden />
      <div
        className="animate-aurora absolute -right-20 -top-24 size-80 rounded-full bg-brand/25 blur-[110px]"
        aria-hidden
      />
      <div className="container-page relative pb-20 pt-32 lg:pb-28 lg:pt-40">
        <Reveal className="max-w-3xl">
          {eyebrow && (
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              <span className="h-px w-6 bg-brand" />
              {eyebrow}
            </span>
          )}
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">{title}</h1>
          {description && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
              {description}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
