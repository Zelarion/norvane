import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/lib/site";

export function CtaSection() {
  return (
    <section className="bg-background py-20 lg:py-24">
      <div className="container-page">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-14 text-center text-primary-foreground sm:px-16 sm:py-20">
          <div className="bg-grid animate-grid-pan absolute inset-0 opacity-10" aria-hidden />
          <div
            className="animate-aurora absolute -right-20 -top-24 size-72 rounded-full bg-brand/30 blur-[100px]"
            aria-hidden
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Let&apos;s talk about your cold-chain needs
            </h2>
            <p className="mt-4 text-lg text-white/75">
              Have a question about equipment, installation, or a service plan? Reach our
              team directly — by phone or email — and we&apos;ll point you to the
              right solution.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-brand text-brand-foreground hover:bg-brand/90"
              >
                <Link href="/contact">
                  Contact Us
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <a href={`mailto:${site.contact.email}`}>Email Us Directly</a>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
      </div>
    </section>
  );
}
