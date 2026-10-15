import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { site, mainNav } from "@/lib/site";
import { industries } from "@/lib/content";
import { Logo } from "./logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-primary text-primary-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo variant="light" />
          <p className="max-w-xs text-sm leading-relaxed text-white/70">
            {site.tagline}. Commercial refrigeration and
            cold-chain equipment, installed and serviced.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
            Company
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
            Industries
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {industries.map((ind) => (
              <li key={ind.slug}>
                <Link
                  href={`/industries/${ind.slug}`}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {ind.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
            Get in touch
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-3 text-white/70">
              <Mail className="mt-0.5 size-4 shrink-0 text-brand" />
              <a href={`mailto:${site.contact.email}`} className="hover:text-white">
                {site.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-3 text-white/70">
              <Phone className="mt-0.5 size-4 shrink-0 text-brand" />
              <a href={`tel:${site.contact.phone}`} className="hover:text-white">
                {site.contact.phone}
              </a>
            </li>
            <li className="flex items-start gap-3 text-white/70">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
              <span>{site.contact.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/60 sm:flex-row">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>{site.conceptNote}</p>
        </div>
      </div>
    </footer>
  );
}
