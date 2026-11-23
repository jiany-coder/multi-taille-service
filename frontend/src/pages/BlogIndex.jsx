import { Seo } from "@/components/Seo";
import { Reveal, FadeIn } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SITE, BLOG_CATEGORIES, localBusinessSchema, breadcrumbSchema } from "@/data/site";
import { ARTICLES } from "@/data/articles";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const GROUPS = BLOG_CATEGORIES
  .map((c) => ({ ...c, items: ARTICLES.filter((a) => a.category === c.slug) }))
  .filter((g) => g.items.length > 0);

export default function BlogIndex() {
  return (
    <>
      <Seo
        title="Conseils jardin et élagage | Multi Taille Services"
        description="Conseils de professionnels pour vos arbres, haies et jardins dans le Pays d'Auge : élagage, jardinage, taille de haie, paysagisme. Appelez le 07 67 23 41 23 pour un devis."
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

      <section data-testid="blog-categories" className="mx-auto max-w-7xl px-6 pt-12 sm:px-10 sm:pt-16">
        <nav aria-label="Rubriques du blog" className="flex flex-wrap gap-3">
          {GROUPS.map((g) => (
            <a key={g.slug} href={`#rubrique-${g.slug}`} data-testid={`blog-category-${g.slug}`} className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 bg-bone px-4 py-2 text-sm font-bold text-forest transition-colors hover:border-ember hover:text-ember">
              {g.name} <span className="text-xs font-semibold text-charcoal/45">{g.items.length}</span>
            </a>
          ))}
        </nav>
      </section>

      {GROUPS.map((g) => (
        <section key={g.slug} id={`rubrique-${g.slug}`} data-testid={`blog-articles-${g.slug}`} className="mx-auto max-w-7xl scroll-mt-24 px-6 pt-14 sm:px-10 sm:pt-20">
          <Reveal>
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-forest sm:text-4xl">{g.name}</h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-charcoal/65">{g.desc}</p>
          </Reveal>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {g.items.map((a) => (
              <Link key={a.slug} to={`/conseils/${a.slug}`} data-testid={`article-card-${a.slug}`} className="group flex h-full flex-col rounded-lg border border-charcoal/10 bg-bone p-7 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(10,42,26,0.12)]">
                <span className="overline-tag">{a.categoryName}</span>
                <span className="mt-3 block font-serif text-2xl font-semibold leading-snug text-forest group-hover:text-ember">{a.h1}</span>
                <span className="mt-3 block flex-1 text-sm leading-relaxed text-charcoal/65">{a.excerpt}</span>
                <span className="mt-5 flex items-center justify-between text-xs font-semibold text-charcoal/45">
                  <span>{a.dateLabel} · lecture {a.readTime}</span>
                  <span className="inline-flex items-center gap-1.5 font-bold text-ember">Lire <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" /></span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-24">
        <Reveal>
          <p className="max-w-2xl rounded-lg border border-ember/25 bg-ember/5 p-6 text-sm leading-relaxed text-charcoal/75">
            <span className="font-bold text-forest">Une question en attendant ?</span> Rien ne remplace un diagnostic sur place : appelez-nous au{" "}
            <a href={SITE.tel} data-testid="blog-call-link" className="font-bold text-ember link-underline">{SITE.phoneDisplay}</a>{" "}
            , appel direct, réponse rapide, devis gratuit.
          </p>
        </Reveal>
      </section>

      <CtaBand testid="cta-band-conseils" />
    </>
  );
}
