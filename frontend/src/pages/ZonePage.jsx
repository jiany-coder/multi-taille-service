import { Link } from "react-router-dom";
import { Phone, MapPin } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Reveal, FadeIn } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SITE, breadcrumbSchema, localBusinessSchema } from "@/data/site";
import { SERVICES_BY_SLUG } from "@/data/services";
import { LOCAL_PAGES } from "@/data/localPages";

const BANDS = [
  { max: 5, label: "Autour de Lisieux, moins de 5 km" },
  { max: 12, label: "De 5 à 12 km de Lisieux" },
  { max: 20, label: "De 12 à 20 km de Lisieux" },
  { max: 30, label: "De 20 à 30 km de Lisieux" },
  { max: 60, label: "De 30 à 40 km, côte et vallées voisines" },
];

const ORDER = ["elagage", "taille-de-haie", "jardinier", "entretien-de-jardin", "tonte-de-pelouse", "debroussaillage", "paysagiste"];

function groupByCity() {
  const map = new Map();
  for (const p of LOCAL_PAGES) {
    if (!map.has(p.citySlug)) map.set(p.citySlug, { city: p.city, slug: p.citySlug, km: p.km ?? null, pages: [] });
    const e = map.get(p.citySlug);
    if (p.km != null) e.km = p.km;
    e.pages.push(p);
  }
  return [...map.values()].filter((e) => e.km != null).sort((a, b) => a.km - b.km || a.city.localeCompare(b.city, "fr"));
}

export default function ZonePage() {
  const cities = groupByCity();
  const bands = BANDS.map((b, i) => {
    const min = i === 0 ? -1 : BANDS[i - 1].max;
    return { ...b, items: cities.filter((c) => c.km > min && c.km <= b.max) };
  }).filter((b) => b.items.length);

  const title = "Zone d'intervention autour de Lisieux | Multi Taille";
  const description = `Élagueur, jardinier et entretien de jardin dans un rayon d'environ 40 km autour de Lisieux : ${cities.length} communes du Pays d'Auge et de la côte. Appelez le ${SITE.phoneDisplay}.`;

  return (
    <>
      <Seo
        title={title}
        description={description}
        path="/zone-d-intervention"
        schemas={[localBusinessSchema(), breadcrumbSchema([{ label: "Accueil", to: "/" }, { label: "Zone d'intervention" }])]}
      />

      <section className="mx-auto max-w-7xl px-6 pt-12 sm:px-10 sm:pt-16">
        <Breadcrumbs items={[{ label: "Accueil", to: "/" }, { label: "Zone d'intervention" }]} />
        <FadeIn>
          <p className="overline-tag mb-5">Où intervenons-nous ?</p>
        </FadeIn>
        <h1 className="max-w-4xl font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-forest sm:text-5xl lg:text-6xl">
          Une zone d'intervention de 40 km autour de Lisieux
        </h1>
        <FadeIn delay={0.25}>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-charcoal/75 sm:text-lg">
            Multi Taille Services est basé à Lisieux. Nous intervenons dans les communes du Pays d'Auge, de la vallée de la Touques, de la Côte Fleurie, de la plaine de Caen et de l'Eure voisine : élagage, taille de haie, entretien de jardin, tonte, débroussaillage et récupération de chat dans un arbre. Les distances ci-dessous sont à vol d'oiseau, donc approximatives. Dans le doute, appelez-nous au {SITE.phoneDisplay} : nous vous répondons directement.
          </p>
        </FadeIn>
        <a href={SITE.tel} className="mt-8 inline-flex items-center gap-2 rounded-full bg-ember px-6 py-3 font-semibold text-white">
          <Phone className="h-4 w-4" aria-hidden="true" /> {SITE.phoneDisplay}
        </a>
      </section>

      {bands.map((b) => (
        <section key={b.label} className="mx-auto max-w-7xl px-6 pt-14 sm:px-10 sm:pt-20">
          <Reveal>
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-forest sm:text-3xl">{b.label}</h2>
          </Reveal>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {b.items.map((c) => {
              const links = [...c.pages].sort((x, y) => ORDER.indexOf(x.serviceSlug) - ORDER.indexOf(y.serviceSlug));
              return (
                <div key={c.slug} className="rounded-lg border border-charcoal/10 bg-bone p-5">
                  <h3 className="flex items-center gap-2 font-serif text-xl font-semibold text-forest">
                    <MapPin className="h-4 w-4 text-ember" aria-hidden="true" /> {c.city}
                  </h3>
                  <p className="mt-1 text-xs text-charcoal/60">{c.km === 0 ? "Notre ville de base" : `Environ ${c.km} km de Lisieux`}</p>
                  <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-sm">
                    {links.map((p) => (
                      <li key={p.slug}>
                        <Link to={`/${p.slug}`} className="text-forest underline decoration-ember/50 underline-offset-2 hover:text-ember">
                          {SERVICES_BY_SLUG[p.serviceSlug]?.name || p.shortName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-4xl px-6 pt-16 sm:px-10">
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-forest sm:text-3xl">Votre commune n'est pas dans la liste ?</h2>
        <p className="mt-4 text-base leading-relaxed text-charcoal/75">
          La liste n'est pas exhaustive : nous nous déplaçons aussi dans les communes voisines de celles-ci. Un appel suffit pour savoir si nous pouvons intervenir chez vous. Pour les gros chantiers (élagage de grands arbres, remise en état de grands terrains), nous étudions toute demande au cas par cas.
        </p>
      </section>

      <div className="mt-16">
        <CtaBand />
      </div>
    </>
  );
}
