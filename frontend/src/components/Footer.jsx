import { Link } from "react-router-dom";
import { Phone, MapPin } from "lucide-react";
import { SITE, ZONES, CITIES } from "@/data/site";
import { SERVICES } from "@/data/services";
import { LOCAL_PAGES } from "@/data/localPages";

export const Footer = () => (
  <footer data-testid="site-footer" className="grain bg-forest-deep text-bone">
    <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
        <div>
          <div className="mb-6 inline-block rounded-md bg-white p-2.5">
            <img src="/images/logo.webp" alt="Multi Taille Services — élagage, jardinage et paysage dans le Pays d'Auge" width="120" height="176" className="h-28 w-auto" loading="lazy" />
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-bone/65">
            Élagueur, jardinier et paysagiste basé à Lisieux. Nous entretenons les arbres, les haies et les jardins de tout le Pays d'Auge, avec soin et ponctualité.
          </p>
        </div>
        <nav aria-label="Services">
          <h3 className="overline-tag mb-5">Nos services</h3>
          <ul className="space-y-2.5">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link to={`/${s.slug}`} data-testid={`footer-service-${s.slug}`} className="link-underline text-sm text-bone/75 hover:text-bone">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Secteurs">
          <h3 className="overline-tag mb-5">Nos secteurs</h3>
          <ul className="space-y-2.5">
            {LOCAL_PAGES.map((p) => (
              <li key={p.slug}>
                <Link to={`/${p.slug}`} data-testid={`footer-local-${p.slug}`} className="link-underline text-sm text-bone/75 hover:text-bone">
                  {p.shortName} {p.city}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h3 className="overline-tag mb-5">Contact direct</h3>
          <a href={SITE.tel} data-testid="call-cta-footer" aria-label={`Appeler le ${SITE.phoneDisplay}`} className="group flex items-center gap-3">
            <span className="rounded-full bg-ember p-3 transition-transform duration-300 group-hover:scale-110">
              <Phone className="h-5 w-5 text-white" strokeWidth={2.4} />
            </span>
            <span>
              <span className="block font-serif text-2xl font-semibold text-bone">{SITE.phoneDisplay}</span>
              <span className="block text-xs text-bone/60">{SITE.slogan}</span>
            </span>
          </a>
          <p className="mt-6 flex items-start gap-2 text-sm text-bone/65">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
            Basés à Lisieux — interventions dans tout le Pays d'Auge et la vallée de la Vie.
          </p>
          <p className="mt-5 text-xs leading-relaxed text-bone/45">
            {ZONES.join(" · ")}
          </p>
        </div>
      </div>
      <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-bone/45 sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 {SITE.name} — Lisieux, Pays d'Auge. Tous droits réservés.</span>
        <span className="flex gap-5">
          <Link to="/" data-testid="footer-home-link" className="link-underline hover:text-bone">Accueil</Link>
          <Link to="/conseils" data-testid="footer-conseils-link" className="link-underline hover:text-bone">Conseils jardin</Link>
        </span>
      </div>
    </div>
  </footer>
);
