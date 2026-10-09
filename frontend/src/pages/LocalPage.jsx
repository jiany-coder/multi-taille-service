import { Link } from "react-router-dom";
import { Check, MapPin, ArrowRight } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Reveal, FadeIn } from "@/components/Reveal";
import { CallButton } from "@/components/CallButton";
import { CtaBand } from "@/components/CtaBand";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { breadcrumbSchema, faqSchema, serviceSchema, localBusinessSchema } from "@/data/site";
import { SERVICES_BY_SLUG, SERVICES } from "@/data/services";
import { LOCAL_PAGES } from "@/data/localPages";

export default function LocalPage({ page }) {
  const service = SERVICES_BY_SLUG[page.serviceSlug];
  const sameCity = LOCAL_PAGES.filter((p) => p.citySlug === page.citySlug && p.slug !== page.slug);
  const sameService = LOCAL_PAGES.filter((p) => p.serviceSlug === page.serviceSlug && p.slug !== page.slug);

  const schemas = [
    localBusinessSchema(),
    serviceSchema(`${page.shortName} ${page.city}`, page.meta, `/${page.slug}`),
    breadcrumbSchema([
      { label: "Accueil", to: "/" },
      { label: service.name, to: `/${service.slug}` },
      { label: `${page.shortName} ${page.city}` },
    ]),
    faqSchema(page.faq),
  ];

  return (
    <>
      <Seo title={page.title} description={page.meta} path={`/${page.slug}`} schemas={schemas} />

      {/* HERO LOCAL */}
      <section data-testid={`local-hero-${page.slug}`} className="grain bg-forest">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 sm:py-20">
          <nav aria-label="Fil d'Ariane" data-testid="breadcrumbs" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-bone/50">
              <li><Link to="/" data-testid="breadcrumb-link-0" className="link-underline hover:text-bone">Accueil</Link></li>
              <li className="flex items-center gap-1.5">
                <span>/</span>
                <Link to={`/${service.slug}`} data-testid="breadcrumb-link-1" className="link-underline hover:text-bone">{service.name}</Link>
              </li>
              <li className="flex items-center gap-1.5">
                <span>/</span>
                <span aria-current="page" className="font-semibold text-bone/80">{page.shortName} {page.city}</span>
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <FadeIn>
                <p className="overline-tag mb-5">{page.overline}</p>
              </FadeIn>
              <h1 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-bone sm:text-5xl lg:text-6xl">
                {page.h1}
              </h1>
              <FadeIn delay={0.25}>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-bone/75 sm:text-lg">{page.intro}</p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <div className="mt-8">
                  <CallButton size="lg" sub dark testid={`call-cta-local-${page.slug}`} />
                </div>
              </FadeIn>
            </div>
            <FadeIn delay={0.2}>
              <div className="clip-frame shadow-[0_30px_60px_rgba(0,0,0,0.35)]">
                <img src={service.image} alt={`${page.shortName} ${page.city}, intervention Multi Taille Services`} width="1400" height="788" className="h-64 w-full object-cover sm:h-80" loading="lazy" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* BESOINS LOCAUX */}
      <section data-testid={`local-content-${page.slug}`} className="mx-auto max-w-4xl px-6 py-16 sm:px-10 sm:py-24">
        <Reveal>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-forest sm:text-4xl">{page.besoins.h2}</h2>
          {page.besoins.paras.map((p, i) => (
            <p key={i} className="mt-5 text-base leading-relaxed text-charcoal/75">{p}</p>
          ))}
        </Reveal>
      </section>

      {/* PRESTATIONS LOCALES */}
      <section data-testid={`local-prestations-${page.slug}`} className="border-y border-charcoal/10 bg-cream/60">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-20">
          <Reveal>
            <p className="overline-tag mb-4">Nos interventions à {page.city}</p>
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-forest sm:text-4xl">
              {page.shortName} {page.city} : nos prestations
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {page.prestations.map((p, i) => (
              <Reveal key={p} delay={i * 0.05}>
                <p data-testid={`local-prestation-${page.slug}-${i}`} className="flex items-start gap-3 text-base font-medium text-charcoal/80">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-ember" strokeWidth={3} /> {p}
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15}>
            <p className="mt-8 text-sm text-charcoal/60">
              Pour en savoir plus sur notre métier, consultez notre page{" "}
              <Link to={`/${service.slug}`} data-testid={`link-service-${page.slug}`} className="font-bold text-ember link-underline">
                {service.name} dans le Pays d'Auge
              </Link>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* DÉROULEMENT */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-20">
        <Reveal>
          <p className="overline-tag mb-4">Simple et direct</p>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-forest sm:text-4xl">
            Comment se passe une intervention à {page.city} ?
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {service.steps.map((st, i) => (
            <Reveal key={st.t} delay={i * 0.08}>
              <div data-testid={`local-step-${page.slug}-${i}`}>
                <span className="font-serif text-6xl font-semibold text-forest/15">0{i + 1}</span>
                <h3 className="mt-2 font-serif text-2xl font-semibold text-forest">{st.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{st.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* COMMUNES PROCHES */}
      <section data-testid={`local-communes-${page.slug}`} className="mx-auto max-w-7xl px-6 pb-16 sm:px-10">
        <Reveal>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-forest">
            Nous intervenons également autour de {page.city}
          </h2>
        </Reveal>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {page.communes.map((c) => (
            <span key={c} data-testid={`commune-chip-${c.toLowerCase().replace(/[^a-z]/g, "-")}`} className="rounded-full border border-charcoal/15 bg-bone px-4 py-1.5 text-sm font-medium text-charcoal/70">
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* MAILLAGE : MÊME VILLE + MÊME SERVICE */}
      <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-10">
        <div className="grid gap-10 lg:grid-cols-2">
          {sameCity.length > 0 && (
            <Reveal>
              <h2 className="font-serif text-2xl font-semibold tracking-tight text-forest">
                Nos autres services à {page.city}
              </h2>
              <div className="mt-5 space-y-3">
                {sameCity.map((p) => (
                  <Link key={p.slug} to={`/${p.slug}`} data-testid={`same-city-${p.slug}`} className="group flex items-center justify-between rounded-lg border border-charcoal/10 bg-bone px-5 py-4 transition-colors hover:border-ember/40">
                    <span className="font-sans text-base font-bold text-forest group-hover:text-ember">{p.shortName} {p.city}</span>
                    <ArrowRight className="h-4 w-4 text-charcoal/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ember" />
                  </Link>
                ))}
              </div>
            </Reveal>
          )}
          {sameService.length > 0 && (
            <Reveal delay={0.1}>
              <h2 className="font-serif text-2xl font-semibold tracking-tight text-forest">
                {page.shortName} dans nos autres secteurs
              </h2>
              <div className="mt-5 space-y-3">
                {sameService.map((p) => (
                  <Link key={p.slug} to={`/${p.slug}`} data-testid={`same-service-${p.slug}`} className="group flex items-center justify-between rounded-lg border border-charcoal/10 bg-bone px-5 py-4 transition-colors hover:border-ember/40">
                    <span className="flex items-center gap-2 font-sans text-base font-bold text-forest group-hover:text-ember">
                      <MapPin className="h-4 w-4 text-ember" /> {p.shortName} {p.city}
                    </span>
                    <ArrowRight className="h-4 w-4 text-charcoal/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ember" />
                  </Link>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <Faq items={page.faq} title={`${page.shortName} à ${page.city} : vos questions`} testid={`faq-local-${page.slug}`} />

      <CtaBand
        title={`${page.shortName} ${page.city} : parlons de votre projet`}
        text={`Un appel suffit : nous passons voir votre terrain à ${page.city} et ses environs, et vous recevez un devis gratuit et ferme.`}
        testid={`cta-band-${page.slug}`}
      />
    </>
  );
}

export { SERVICES };
