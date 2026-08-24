import { Link } from "react-router-dom";
import { Check, MapPin, ArrowRight, Phone } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Reveal, FadeIn } from "@/components/Reveal";
import { CallButton } from "@/components/CallButton";
import { CtaBand } from "@/components/CtaBand";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { SITE, CITIES, breadcrumbSchema, faqSchema, serviceSchema, localBusinessSchema } from "@/data/site";
import { SERVICES } from "@/data/services";

export default function ServicePage({ service }) {
  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 4);
  const schemas = [
    localBusinessSchema(),
    serviceSchema(service.name, service.meta, `/${service.slug}`),
    breadcrumbSchema([{ label: "Accueil", to: "/" }, { label: service.name }]),
    faqSchema(service.faq),
  ];

  return (
    <>
      <Seo title={service.title} description={service.meta} path={`/${service.slug}`} schemas={schemas} />

      {/* HERO SERVICE */}
      <section data-testid={`service-hero-${service.slug}`} className="mx-auto max-w-7xl px-6 pt-12 sm:px-10 sm:pt-16">
        <Breadcrumbs items={[{ label: "Accueil", to: "/" }, { label: service.name }]} />
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <FadeIn>
              <p className="overline-tag mb-5">{service.overline}</p>
            </FadeIn>
            <h1 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-forest sm:text-5xl lg:text-6xl">
              {service.h1}
            </h1>
            <FadeIn delay={0.25}>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-charcoal/75 sm:text-lg">{service.intro}</p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="mt-8">
                <CallButton size="lg" sub testid={`call-cta-service-${service.slug}`} />
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <div className="clip-frame shadow-[0_30px_60px_rgba(10,42,26,0.18)]">
              <img src={service.image} alt={service.imageAlt} width="1400" height="788" className="h-72 w-full object-cover sm:h-96" loading="lazy" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PRESTATIONS */}
      <section data-testid={`service-prestations-${service.slug}`} className="mt-20 grain bg-forest sm:mt-28">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-24">
          <Reveal>
            <p className="overline-tag mb-4">Ce que nous faisons</p>
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-bone sm:text-4xl">
              Nos prestations de {service.name.toLowerCase()}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.prestations.map((p, i) => (
              <Reveal key={p} delay={i * 0.05}>
                <p data-testid={`prestation-${service.slug}-${i}`} className="flex items-start gap-3 text-base font-medium text-bone/85">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-ember" strokeWidth={3} /> {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENU EXPERT */}
      <section data-testid={`service-content-${service.slug}`} className="mx-auto max-w-4xl px-6 py-20 sm:px-10 sm:py-28">
        {service.sections.map((sec, i) => (
          <Reveal key={sec.h2} className={i > 0 ? "mt-16" : ""}>
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-forest sm:text-4xl">{sec.h2}</h2>
            {sec.paras.map((p, j) => (
              <p key={j} className="mt-5 text-base leading-relaxed text-charcoal/75">{p}</p>
            ))}
            {sec.list && (
              <ul className="mt-6 space-y-4">
                {sec.list.map((li, j) => (
                  <li key={j} className="flex gap-3 border-l-2 border-ember/60 pl-4 text-base leading-relaxed text-charcoal/75">
                    {li}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        ))}
      </section>

      {/* DÉROULEMENT */}
      <section data-testid={`service-steps-${service.slug}`} className="border-y border-charcoal/10 bg-cream/60">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-24">
          <Reveal>
            <p className="overline-tag mb-4">Comment ça se passe</p>
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-forest sm:text-4xl">
              Le déroulement d'une intervention
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {service.steps.map((st, i) => (
              <Reveal key={st.t} delay={i * 0.08}>
                <div data-testid={`step-${service.slug}-${i}`}>
                  <span className="font-serif text-6xl font-semibold text-forest/15">0{i + 1}</span>
                  <h3 className="mt-2 font-serif text-2xl font-semibold text-forest">{st.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{st.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PAGES LOCALES */}
      {service.cities.length > 0 && (
        <section data-testid={`service-local-links-${service.slug}`} className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-24">
          <Reveal>
            <p className="overline-tag mb-4">Près de chez vous</p>
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-forest sm:text-4xl">
              {service.name} à Lisieux, Orbec, Vimoutiers et Falaise
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-charcoal/70">
              Nous intervenons dans tout le Pays d'Auge. Retrouvez nos prestations de {service.name.toLowerCase()} ville par ville :
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.cities.map((citySlug) => {
              const city = CITIES.find((c) => c.slug === citySlug);
              return (
                <Reveal key={citySlug} delay={0.05}>
                  <Link
                    to={`/${service.slug}-${citySlug}`}
                    data-testid={`local-link-${service.slug}-${citySlug}`}
                    className="group flex h-full flex-col justify-between rounded-lg border border-charcoal/10 bg-bone p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-ember/40 hover:shadow-[0_16px_40px_rgba(10,42,26,0.12)]"
                  >
                    <span>
                      <MapPin className="h-5 w-5 text-ember" />
                      <span className="mt-3 block font-serif text-2xl font-semibold text-forest group-hover:text-ember">
                        {service.name} {city.name}
                      </span>
                    </span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-charcoal/50 group-hover:text-ember">
                      Voir la page locale <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </section>
      )}

      {/* AVANTAGES */}
      <section className="mx-auto max-w-4xl px-6 pb-4 sm:px-10">
        <Reveal>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-forest sm:text-4xl">
            Pourquoi confier vos extérieurs à Multi Taille Services
          </h2>
        </Reveal>
        <div className="mt-8 space-y-5">
          {service.avantages.map((a, i) => (
            <Reveal key={a} delay={i * 0.05}>
              <p data-testid={`advantage-${service.slug}-${i}`} className="flex items-start gap-3 border-b border-charcoal/10 pb-5 text-base font-medium text-charcoal/80">
                <span className="font-serif text-xl font-semibold text-ember">0{i + 1}</span> {a}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <Faq items={service.faq} testid={`faq-service-${service.slug}`} />

      {/* MAILLAGE AUTRES SERVICES */}
      <section data-testid={`service-other-${service.slug}`} className="mx-auto max-w-7xl px-6 pb-20 sm:px-10">
        <Reveal>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-forest">Découvrir aussi</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((o) => (
            <Link key={o.slug} to={`/${o.slug}`} data-testid={`other-service-${o.slug}`} className="group rounded-lg border border-charcoal/10 bg-bone p-5 transition-colors hover:border-ember/40">
              <span className="block font-serif text-xl font-semibold text-forest group-hover:text-ember">{o.name}</span>
              <span className="mt-1.5 block text-xs leading-relaxed text-charcoal/60">{o.short}</span>
            </Link>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="mt-8 flex items-center gap-2 text-sm text-charcoal/60">
            <Phone className="h-4 w-4 text-ember" /> Une question sur {service.name.toLowerCase()} ? Appelez le{" "}
            <a href={SITE.tel} data-testid={`inline-call-${service.slug}`} className="font-bold text-ember link-underline">{SITE.phoneDisplay}</a>
          </p>
        </Reveal>
      </section>

      <CtaBand testid={`cta-band-${service.slug}`} />
    </>
  );
}
