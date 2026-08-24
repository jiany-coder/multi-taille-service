import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { SITE, CITIES } from "@/data/site";
import { SERVICES } from "@/data/services";
import { LOCAL_PAGES } from "@/data/localPages";

const Drop = ({ label, testid, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        data-testid={testid}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-charcoal/80 transition-colors hover:text-forest"
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        className={`absolute left-0 top-full z-50 pt-2 transition-[opacity,transform] duration-200 ${open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"}`}
      >
        <div className="min-w-72 rounded-lg border border-charcoal/10 bg-white p-3 shadow-[0_20px_50px_rgba(10,42,26,0.15)]">
          {children}
        </div>
      </div>
    </div>
  );
};

const DropLink = ({ to, children, testid }) => (
  <Link to={to} data-testid={testid} className="block rounded-md px-3 py-2 text-sm font-medium text-charcoal/75 transition-colors hover:bg-bone hover:text-forest">
    {children}
  </Link>
);

const MobileMenu = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div data-testid="mobile-menu" className="grain fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-forest px-6 pb-28 pt-5">
      <div className="flex items-center justify-between">
        <span className="font-serif text-2xl font-semibold text-bone">Multi Taille Services</span>
        <button type="button" onClick={onClose} data-testid="mobile-menu-close" aria-label="Fermer le menu" className="rounded-full border border-white/20 p-2 text-bone">
          <X className="h-6 w-6" />
        </button>
      </div>
      <nav className="mt-10 flex flex-col gap-1">
        <Link to="/" onClick={onClose} data-testid="mobile-nav-accueil" className="border-b border-white/10 py-3 font-serif text-3xl font-semibold text-bone">
          Accueil
        </Link>
        <p className="overline-tag mt-8">Nos services</p>
        {SERVICES.map((s) => (
          <Link key={s.slug} to={`/${s.slug}`} onClick={onClose} data-testid={`mobile-nav-${s.slug}`} className="border-b border-white/10 py-2.5 text-lg font-medium text-bone/85">
            {s.name}
          </Link>
        ))}
        <p className="overline-tag mt-8">Nos secteurs</p>
        {CITIES.map((c) => (
          <div key={c.slug} className="border-b border-white/10 py-2.5">
            <span className="text-lg font-semibold text-bone">{c.name}</span>
            <span className="ml-3 flex-inline gap-3 text-sm text-bone/60">
              {LOCAL_PAGES.filter((p) => p.citySlug === c.slug).map((p) => (
                <Link key={p.slug} to={`/${p.slug}`} onClick={onClose} data-testid={`mobile-nav-${p.slug}`} className="mr-3 link-underline">
                  {p.shortName}
                </Link>
              ))}
            </span>
          </div>
        ))}
        <Link to="/conseils" onClick={onClose} data-testid="mobile-nav-conseils" className="py-3 font-serif text-2xl font-semibold text-bone">
          Conseils jardin
        </Link>
      </nav>
    </div>
  );
};

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <header data-testid="site-header" className="sticky top-0 z-50 border-b border-charcoal/10 bg-bone/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/" data-testid="header-logo" className="flex items-center gap-3" aria-label="Multi Taille Services — Accueil">
            <img src="/images/logo.webp" alt="Logo Multi Taille Services — élagueur jardinier paysagiste Lisieux" width="40" height="59" className="h-12 w-auto rounded-sm" />
            <span className="leading-none">
              <span className="block font-sans text-sm font-extrabold tracking-[0.14em] text-forest">MULTI TAILLE</span>
              <span className="mt-0.5 block text-[11px] font-bold tracking-[0.34em] text-ember">SERVICES</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
            <NavLink to="/" data-testid="nav-accueil" className="px-3 py-2 text-sm font-semibold text-charcoal/80 transition-colors hover:text-forest">
              Accueil
            </NavLink>
            <Drop label="Nos services" testid="nav-services-dropdown">
              <div className="grid grid-cols-2 gap-x-2">
                {SERVICES.map((s) => (
                  <DropLink key={s.slug} to={`/${s.slug}`} testid={`nav-service-${s.slug}`}>{s.name}</DropLink>
                ))}
              </div>
            </Drop>
            <Drop label="Nos secteurs" testid="nav-secteurs-dropdown">
              {CITIES.map((c) => (
                <div key={c.slug} className="mb-1 border-b border-charcoal/5 pb-1 last:border-0">
                  <span className="block px-3 pt-1 text-[11px] font-bold uppercase tracking-widest text-charcoal/40">{c.name}</span>
                  {LOCAL_PAGES.filter((p) => p.citySlug === c.slug).map((p) => (
                    <DropLink key={p.slug} to={`/${p.slug}`} testid={`nav-local-${p.slug}`}>{p.shortName}</DropLink>
                  ))}
                </div>
              ))}
            </Drop>
            <NavLink to="/conseils" data-testid="nav-conseils" className="px-3 py-2 text-sm font-semibold text-charcoal/80 transition-colors hover:text-forest">
              Conseils
            </NavLink>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={SITE.tel}
              data-testid="call-cta-header"
              aria-label={`Appeler Multi Taille Services au ${SITE.phoneDisplay}`}
              className="hidden items-center gap-2.5 rounded-full bg-ember px-5 py-2.5 text-sm font-bold text-white shadow-[0_6px_18px_rgba(255,90,0,0.35)] transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-ember-dark md:inline-flex"
            >
              <Phone className="h-4 w-4" strokeWidth={2.5} />
              {SITE.phoneDisplay}
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              data-testid="mobile-menu-open"
              aria-label="Ouvrir le menu"
              className="rounded-full border border-charcoal/15 p-2.5 text-forest lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};
