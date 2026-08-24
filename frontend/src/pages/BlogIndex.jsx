import { Leaf, TreeDeciduous, Scissors, Flower2, Sun, Sprout, Clock } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Reveal, FadeIn } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SITE, BLOG_CATEGORIES, localBusinessSchema, breadcrumbSchema } from "@/data/site";

const CAT_ICONS = {
  "elagage": TreeDeciduous,
  "jardinage": Leaf,
  "taille-de-haie": Scissors,
  "arbres": TreeDeciduous,
  "paysagisme": Flower2,
  "entretien-de-jardin": Sun,
};

export default function BlogIndex() {
  return (
    <>
      <Seo
        title="Conseils jardin, élagage et paysage | Multi Taille Services — Lisieux, Pays d'Auge"
        description="Conseils de professionnels pour vos arbres, haies et jardins dans le Pays d'Auge : élagage, jardinage, taille de haie, paysagisme. Les premiers articles arrivent bientôt."
        path="/conseils"
        schemas={[localBusinessSchema(), breadcrumbSchema([{ label: "Accueil", to: "/" }, { label: "Conseils jardin" }])]}
      />

      <section data-testid="blog-hero" className="grain bg-forest">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-24">
          <nav aria-label="Fil d'Ariane" data-testid="breadcrumbs" className="mb-8">
            <ol className="flex items-center gap-1.5 text-sm text-bone/50">
              <li><a href="/" data-testid="breadcrumb-link-0" className="link-underline hover:text-bone">Accueil</a></li>
              <li className="flex items-center gap-1.5"><span>/</span><span aria-current="page" className="font-semibold text-bone/80">Conseils jardin</span></li>
            </ol>
          </nav>
          <FadeIn>
            <p className="overline-tag mb-5">Le carnet de l'élagueur-jardinier</p>
          </FadeIn>
          <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-bone sm:text-5xl lg:text-6xl">
            Conseils jardin, élagage et paysage
          </h1>
          <FadeIn delay={0.25}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-bone/75 sm:text-lg">
              Des conseils de terrain, écrits par des professionnels du Pays d'Auge : quand tailler, comment soigner un pommier, quelle haie choisir. Les premiers articles arrivent prochainement.
            </p>
          </FadeIn>
        </div>
      </section>

      <section data-testid="blog-categories" className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-24">
        <Reveal>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-forest sm:text-4xl">Nos rubriques</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_CATEGORIES.map((cat, i) => {
            const Icon = CAT_ICONS[cat.slug] || Sprout;
            return (
              <Reveal key={cat.slug} delay={i * 0.06}>
                <div data-testid={`blog-category-${cat.slug}`} className="flex h-full flex-col rounded-lg border border-charcoal/10 bg-bone p-7 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(10,42,26,0.12)]">
                  <span className="mb-5 inline-flex w-fit rounded-full bg-forest p-3 text-bone">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-serif text-2xl font-semibold text-forest">{cat.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal/65">{cat.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-charcoal/40">
                    <Clock className="h-3.5 w-3.5" /> Bientôt disponible
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.2}>
          <p className="mt-12 max-w-2xl rounded-lg border border-ember/25 bg-ember/5 p-6 text-sm leading-relaxed text-charcoal/75">
            <span className="font-bold text-forest">Une question en attendant ?</span> Rien ne remplace un diagnostic sur place : appelez-nous au{" "}
            <a href={SITE.tel} data-testid="blog-call-link" className="font-bold text-ember link-underline">{SITE.phoneDisplay}</a>{" "}
            — appel direct, réponse rapide, devis gratuit.
          </p>
        </Reveal>
      </section>

      <CtaBand testid="cta-band-conseils" />
    </>
  );
}
