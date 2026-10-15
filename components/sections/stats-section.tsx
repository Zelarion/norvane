import { stats } from "@/lib/content";
import { CountUp } from "@/components/motion/count-up";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

export function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground">
      <div className="bg-grid animate-grid-pan absolute inset-0 opacity-10" aria-hidden />
      <div
        className="animate-aurora pointer-events-none absolute left-1/2 top-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/15 blur-[120px]"
        aria-hidden
      />
      <div className="container-page relative">
        <Stagger className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s) => (
            <StaggerItem key={s.label} className="text-center">
              <div className="text-4xl font-bold text-white sm:text-5xl">
                <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <p className="mt-2 text-sm text-white/65">{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
