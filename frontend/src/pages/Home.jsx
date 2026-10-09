import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { TreeDeciduous, Axe, Shovel, Scissors, Sprout, Leaf, Flower2, Sun, Trees, Layers, Home as HomeIcon, MapPin, Check, ArrowRight, ShieldCheck, Clock, Sparkles } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Reveal, MaskLines, FadeIn } from "@/components/Reveal";
import { CallButton } from "@/components/CallButton";
import { CtaBand } from "@/components/CtaBand";
import { Marquee } from "@/components/Marquee";
import { Faq } from "@/components/Faq";
import { SITE, CITIES, ZONES, localBusinessSchema, faqSchema } from "@/data/site";
import { SERVICES } from "@/data/services";
import { LOCAL_PAGES } from "@/data/localPages";

const ICONS = {
  "elagage": TreeDeciduous, "abattage-arbres": Axe, "dessouchage": Shovel,
  "taille-de-haie": Scissors, "debroussaillage": Sprout, "jardinier": Leaf,
  "paysagiste": Flower2, "entretien-de-jardin": Sun, "entretien-espaces-verts": Trees,
  "tonte-de-pelouse": Layers, "entretien-exterieur": HomeIcon, "recuperation-chat-arbre": TreeDeciduous,
};

const FEATURED = ["elagage", "jardinier", "paysagiste"];

const HOME_FAQ = [
  { q: "Quelle zone couvre Multi Taille Services ?", a: `Nous sommes basés à Lisieux et intervenons dans tout le Pays d'Auge : Lisieux, Orbec, Vimoutiers, Falaise, mais aussi Livarot-Pays-d'Auge, Saint-Pierre-en-Auge, Mézidon Vallée d'Auge, Cambremer, Pont-l'Évêque, Cormeilles, et jusqu'à Cabourg et Dives-sur-Mer pour les résidences secondaires. Un doute sur votre commune ? Appelez-nous.` },
  { q: "Le devis est-il vraiment gratuit ?", a: "Oui, entièrement. Nous nous déplaçons pour voir vos arbres, votre haie ou votre jardin, nous échangeons sur vos besoins, et vous recevez un devis ferme et détaillé. Sans engagement : vous décidez ensuite, en toute liberté." },
  { q: "Évacuez-vous les déchets verts après les travaux ?", a: "Toujours. Branches, feuilles, déchets de taille : tout est chargé et évacué, ou broyé sur place si vous souhaitez conserver les copeaux en paillage. Nous ne quittons un chantier que lorsque le terrain est propre." },
  { q: "Intervenez-vous en urgence après une tempête ?", a: "Oui. Branche menaçante, arbre penché sur une toiture : appelez-nous, nous passons évaluer et sécuriser en priorité. Étant basés à Lisieux, nous sommes rapidement sur place dans tout le Pays d'Auge." },
  { q: "Peut-on vous confier l'entretien complet de l'extérieur ?", a: "C'est même ce que nous vous conseillons : un seul interlocuteur pour la tonte, les haies, les arbres et les massifs. Nous construisons un programme d'entretien à l'année, adapté à votre terrain et à votre budget." },
];

const GALLERY = [
  { src: "/images/elagage.webp", alt: "Élagueur en grimpe lors d'un élagage dans le Pays d'Auge", label: "Élagage en hauteur" },
  { src: "/images/abattage.webp", alt: "Abattage maîtrisé d'un arbre à Lisieux", label: "Abattage maîtrisé" },
  { src: "/images/taille-haie.webp", alt: "Taille précise d'une haie de jardin", label: "Taille de haie" },
  { src: "/images/paysagiste.webp", alt: "Aménagement paysager d'un jardin normand", label: "Aménagement paysager" },
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const schemas = [
    localBusinessSchema(),
    { "@context": "https://schema.org", "@type": "WebPage", name: "Multi Taille Services, Élagueur, jardinier et paysagiste à Lisieux, Pays d'Auge", url: `${SITE.baseUrl}/` },
    faqSchema(HOME_FAQ),
  ];

  return (
    <>
      <Seo
        title="Élagueur, jardinier et paysagiste à Lisieux | Multi Taille"
        description="Multi Taille Services : élagueur, jardinier et paysagiste à Lisieux et dans le Pays d'Auge. Élagage, abattage, taille de haie, entretien de jardin. Devis gratuit : 07 67 23 41 23."
        path="/"
        schemas={schemas}
      />

      {/* HERO */}
      <section ref={heroRef} data-testid="home-hero" className="grain relative overflow-hidden bg-forest">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-16 sm:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:pb-28 lg:pt-24">
          <div>
            <FadeIn>
              <p className="overline-tag mb-6">Lisieux, Pays d'Auge, Normandie</p>
            </FadeIn>
            <h1 className="font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-bone sm:text-6xl lg:text-7xl">
              <MaskLines
                lines={[
                  "Élagueur, jardinier",
                  <span key="l2">& paysagiste <span className="italic text-ember">à Lisieux</span>,</span>,
                  "dans le Pays d'Auge.",
                ]}
              />
            </h1>
            <FadeIn delay={0.6}>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-bone/75 sm:text-lg">
                Multi Taille Services entretient vos arbres, vos haies et vos jardins : élagage, abattage, taille de haie, tonte et aménagement paysager. Une entreprise locale, un travail soigné, un seul appel.
              </p>
            </FadeIn>
            <FadeIn delay={0.75}>
              <div className="mt-9 flex flex-wrap items-center gap-6">
                <CallButton size="lg" sub dark testid="call-cta-hero" />
                <a href="#services" data-testid="hero-discover-services" className="link-underline text-sm font-semibold text-bone/85">
                  Découvrir nos services
                </a>
              </div>
            </FadeIn>
            <FadeIn delay={0.9}>
              <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-bone/70">
                {["Devis gratuit", "Appel direct, réponse rapide", "Déchets évacués", "Basés à Lisieux"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-ember" strokeWidth={3} /> {t}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
          <FadeIn delay={0.4} className="relative">
            <motion.div style={{ y: imgY }} className="clip-frame relative shadow-[0_40px_80px_rgba(0,0,0,0.4)]">
              <img
                src="/images/elagage.webp"
                alt="Élagueur en grimpe avec matériel de sécurité lors d'un élagage d'arbre dans le Pays d'Auge"
                width="1400"
                height="788"
                className="h-[340px] w-full object-cover sm:h-[440px] lg:h-[520px]"
                fetchPriority="high"
              />
            </motion.div>
            <div className="absolute -bottom-6 -left-4 rounded-md border border-white/15 bg-forest-deep/90 px-5 py-4 backdrop-blur-md sm:-left-8">
              <p className="font-serif text-3xl font-semibold text-bone">{SITE.phoneDisplay}</p>
              <p className="text-xs font-semibold tracking-wide text-bone/60">Un appel, un diagnostic gratuit</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <Marquee />

      {/* SERVICES */}
      <section id="services" data-testid="home-services" className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-28">
        <Reveal>
          <p className="overline-tag mb-4">01, Nos services</p>
          <h2 className="max-w-3xl font-serif text-4xl font-semibold tracking-tight text-forest sm:text-5xl">
            Tout l'extérieur de votre propriété, une seule entreprise.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-charcoal/70">
            De la couronne du chêne au bord de la pelouse : nous prenons en charge l'intégralité de vos extérieurs, à Lisieux et dans tout le Pays d'Auge.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {SERVICES.filter((s) => FEATURED.includes(s.slug)).map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.1}>
              <Link to={`/${s.slug}`} data-testid={`service-card-${s.slug}`} className="group block">
                <div className="clip-frame relative mb-5 overflow-hidden">
                  <img src={s.image} alt={s.imageAlt} width="1400" height="788" loading="lazy" className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute left-4 top-4 rounded-full bg-forest-deep/85 px-3 py-1 text-xs font-bold tracking-widest text-bone backdrop-blur-sm">{s.num}</span>
                </div>
                <h3 className="font-serif text-3xl font-semibold text-forest transition-colors group-hover:text-ember">{s.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{s.short}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-ember">
                  Découvrir <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-charcoal/10 bg-charcoal/10 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.filter((s) => !FEATURED.includes(s.slug)).map((s) => {
            const Icon = ICONS[s.slug];
            return (
              <Link key={s.slug} to={`/${s.slug}`} data-testid={`service-tile-${s.slug}`} className="group flex items-start gap-4 bg-bone p-6 transition-colors hover:bg-cream">
                <span className="mt-0.5 rounded-full bg-forest p-2.5 text-bone">
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block font-sans text-base font-bold text-forest group-hover:text-ember">{s.name}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-charcoal/60">{s.short}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ZONES */}
      <section id="zones" data-testid="home-zones" className="border-y border-charcoal/10 bg-cream/60">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-28">
          <Reveal>
            <p className="overline-tag mb-4">02, Zones d'intervention</p>
            <h2 className="max-w-3xl font-serif text-4xl font-semibold tracking-tight text-forest sm:text-5xl">
              Basés à Lisieux, présents dans tout le Pays d'Auge.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CITIES.map((c, i) => {
              const pages = LOCAL_PAGES.filter((p) => p.citySlug === c.slug);
              return (
                <Reveal key={c.slug} delay={i * 0.08}>
                  <div data-testid={`zone-card-${c.slug}`} className="flex h-full flex-col rounded-lg border border-charcoal/10 bg-bone p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(10,42,26,0.12)]">
                    <p className="flex items-center gap-2 font-serif text-2xl font-semibold text-forest">
                      <MapPin className="h-5 w-5 text-ember" /> {c.name}
                    </p>
                    <ul className="mt-4 flex-1 space-y-2">
                      {pages.map((p) => (
                        <li key={p.slug}>
                          <Link to={`/${p.slug}`} data-testid={`zone-link-${p.slug}`} className="link-underline text-sm font-medium text-charcoal/70 hover:text-ember">
                            {p.shortName} {c.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-10 text-sm font-semibold uppercase tracking-widest text-charcoal/45">Nous intervenons également à</p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {ZONES.filter((z) => !CITIES.some((c) => c.name === z)).map((z) => (
                <span key={z} data-testid={`zone-chip-${z.toLowerCase().replace(/[^a-z]/g, "-")}`} className="rounded-full border border-charcoal/15 bg-bone px-4 py-1.5 text-sm font-medium text-charcoal/70">
                  {z}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* RÉALISATIONS */}
      <section data-testid="home-realisations" className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-28">
        <Reveal>
          <p className="overline-tag mb-4">03, Nos métiers en images</p>
          <h2 className="max-w-3xl font-serif text-4xl font-semibold tracking-tight text-forest sm:text-5xl">
            Des gestes précis, des chantiers propres.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {GALLERY.map((g, i) => (
            <Reveal key={g.src} delay={i * 0.08} className={i % 2 === 1 ? "sm:mt-10" : ""}>
              <figure data-testid={`gallery-item-${i}`} className="group">
                <div className="clip-frame overflow-hidden">
                  <img src={g.src} alt={g.alt} width="1400" height="788" loading="lazy" className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <figcaption className="mt-3 flex items-center gap-2 text-sm font-semibold text-charcoal/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-ember" /> {g.label}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* AVANTAGES */}
      <section data-testid="home-avantages" className="grain bg-forest">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-28">
          <Reveal>
            <p className="overline-tag mb-4">04, Pourquoi nous</p>
            <h2 className="max-w-3xl font-serif text-4xl font-semibold tracking-tight text-bone sm:text-5xl">
              Les raisons pour lesquelles on nous rappelle.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-2">
            {[
              { icon: ShieldCheck, t: "Un travail soigné, sans compromis", d: "Taille respectueuse des arbres, chantier sécurisé, terrain rendu impeccable. Nous traitons votre jardin comme le nôtre, et ça se voit." },
              { icon: Phone_icon, t: "Un seul appel, une réponse rapide", d: `Pas de formulaire, pas d'attente : vous appelez le ${SITE.phoneDisplay}, nous échangeons, nous passons voir. Simple et direct.` },
              { icon: MapPin, t: "Une entreprise vraiment locale", d: "Basés à Lisieux, nous connaissons les sols, les essences et les jardins du Pays d'Auge. Le diagnostic est gratuit, le déplacement rapide." },
              { icon: Clock, t: "De la ponctualité et de la clarté", d: "Devis ferme avant les travaux, dates tenues, déchets évacués. Ce qui est annoncé est ce qui est fait, rien de plus, rien de moins." },
            ].map((a, i) => (
              <Reveal key={a.t} delay={i * 0.08}>
                <div data-testid={`advantage-${i}`} className="flex gap-5">
                  <span className="mt-1 shrink-0 rounded-full border border-ember/40 bg-ember/10 p-3 text-ember">
                    <a.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-serif text-2xl font-semibold text-bone">
                      <span className="mr-3 text-sm font-bold tracking-widest text-ember">0{i + 1}</span>
                      {a.t}
                    </p>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-bone/65">{a.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Faq items={HOME_FAQ} title="Les questions qu'on nous pose souvent" testid="home-faq" />

      <CtaBand
        title="Votre jardin mérite un pro. Appelez-nous."
        text="Élagage, taille de haie, entretien de jardin ou aménagement paysager : un appel suffit pour lancer le diagnostic gratuit, à Lisieux et dans tout le Pays d'Auge."
        testid="cta-band-home"
      />
    </>
  );
}

const Phone_icon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
