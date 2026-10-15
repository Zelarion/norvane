"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Menu,
  ArrowRight,
  X,
  Home,
  Building2,
  Layers,
  Package,
  Mail,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { site, mainNav } from "@/lib/site";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navIcons: Record<string, LucideIcon> = {
  "/": Home,
  "/about": Building2,
  "/industries": Layers,
  "/products": Package,
  "/contact": Mail,
};

const menuVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};
const menuItemVariants = {
  hidden: { opacity: 0, x: 24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { ease: [0.22, 1, 0.36, 1] as const, duration: 0.4 },
  },
};

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full">
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "w-full transition-all duration-300",
          scrolled
            ? "border-b border-white/10 bg-primary/80 backdrop-blur-md shadow-lg shadow-black/20"
            : "bg-transparent"
        )}
      >
        <nav className="container-page flex h-16 items-center justify-between lg:h-18">
        <Logo variant="light" />

        <ul className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "relative rounded-md px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                )}
              >
                {item.label}
                {isActive(item.href) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button
            asChild
            className="bg-brand text-brand-foreground hover:bg-brand/90"
          >
            <Link href="/contact">
              Contact Us
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        {/* Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              className="size-11 text-white hover:bg-white/10 hover:text-white"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            showCloseButton={false}
            className="w-[86%] max-w-sm overflow-hidden border-l border-white/10 bg-primary p-0 text-white"
          >
            <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            <SheetDescription className="sr-only">
              Browse the site and reach Norvane.
            </SheetDescription>

            {/* premium dark backdrop */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-[#0b1426] via-primary to-[#070b16]"
              aria-hidden
            />
            <div className="absolute inset-0 bg-grid opacity-[0.12]" aria-hidden />
            <div
              className="absolute -right-16 -top-24 size-64 rounded-full bg-brand/25 blur-[90px]"
              aria-hidden
            />

            <div className="relative z-10 flex h-full flex-col overflow-y-auto">
              {/* header */}
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <Logo variant="light" />
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Close menu"
                    className="size-11 rounded-xl text-white/80 hover:bg-white/10 hover:text-white"
                  >
                    <X className="size-5" />
                  </Button>
                </SheetClose>
              </div>

              {/* nav */}
              <motion.nav
                variants={menuVariants}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-1.5 px-4 py-6"
              >
                {mainNav.map((item) => {
                  const Icon = navIcons[item.href] ?? Home;
                  const active = isActive(item.href);
                  return (
                    <motion.div key={item.href} variants={menuItemVariants}>
                      <SheetClose asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "group flex items-center gap-4 rounded-2xl border px-4 py-3.5 text-base font-semibold transition-all",
                            active
                              ? "border-brand/40 bg-brand/15 text-white"
                              : "border-transparent text-white/70 hover:border-white/10 hover:bg-white/5 hover:text-white"
                          )}
                        >
                          <span
                            className={cn(
                              "inline-flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                              active
                                ? "bg-brand text-brand-foreground"
                                : "bg-white/10 text-white group-hover:bg-white/15"
                            )}
                          >
                            <Icon className="size-5" />
                          </span>
                          <span className="flex-1">{item.label}</span>
                          <ArrowRight
                            className={cn(
                              "size-4 transition-all",
                              active
                                ? "text-brand opacity-100"
                                : "-translate-x-1 text-white/40 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                            )}
                          />
                        </Link>
                      </SheetClose>
                    </motion.div>
                  );
                })}
              </motion.nav>

              {/* bottom: contact + CTA */}
              <div className="mt-auto space-y-5 border-t border-white/10 px-5 py-6">
                <div className="space-y-3">
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white"
                  >
                    <Mail className="size-4 shrink-0 text-brand" />
                    {site.contact.email}
                  </a>
                  <a
                    href={`tel:${site.contact.phone}`}
                    className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white"
                  >
                    <Phone className="size-4 shrink-0 text-brand" />
                    {site.contact.phone}
                  </a>
                </div>
                <SheetClose asChild>
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-brand text-brand-foreground hover:bg-brand/90"
                  >
                    <Link href="/contact">
                      Contact Us
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </SheetClose>
                <p className="text-center text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">
                  Dependability · Precision · Care
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        </nav>
      </motion.div>
    </header>
  );
}
