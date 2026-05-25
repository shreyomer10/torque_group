"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, brand } from "@/content";
import { ArrowIcon } from "@/components/ui/Button";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="nav-tg">
      <div className="container-tg nav-inner">
        <Link href="/" className="brand" aria-label={`${brand.name} — home`}>
          <div className="brand-mark" aria-hidden="true">T</div>
          <div className="brand-text">
            <div className="name">{brand.shortName}</div>
            <div className="sub">{brand.sub}</div>
          </div>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {nav.links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              data-active={isActive(l.href) ? "true" : "false"}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link href={nav.cta.href} className="btn btn-accent btn-sm hidden-mobile" style={{ display: "inline-flex" }}>
          {nav.cta.label}
          <ArrowIcon />
        </Link>

        <button
          className="drawer-toggle"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <Menu size={20} />
        </button>
      </div>

      {open && (
        <>
          <div className="drawer-backdrop" onClick={() => setOpen(false)} aria-hidden="true" />
          <aside className="mobile-drawer" data-open="true" aria-label="Mobile navigation">
            <button
              className="drawer-close"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <X size={20} />
            </button>
            {nav.links.map((l) => (
              <Link key={l.href} href={l.href} data-active={isActive(l.href) ? "true" : "false"}>
                {l.label}
              </Link>
            ))}
            <Link href={nav.cta.href} className="btn btn-accent drawer-cta">
              {nav.cta.label}
              <ArrowIcon />
            </Link>
          </aside>
        </>
      )}
    </header>
  );
}
