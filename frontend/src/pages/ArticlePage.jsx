import { Link, useParams } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Reveal, FadeIn } from "@/components/Reveal";
import { CallButton } from "@/components/CallButton";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { SITE, localBusinessSchema, breadcrumbSchema, faqSchema } from "@/data/site";
import { ARTICLES_BY_SLUG } from "@/data/articles";
import NotFound from "@/pages/NotFound";

export default function ArticlePage() {
  const { slug } = useParams();
  const article = ARTICLES_BY_SLUG[slug];
  if (!article) return <NotFound />;

  const schemas = [
    localBusinessSchema(),
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.h1,
      description: article.meta,
      datePublished: article.date,
      author: { "@type": "Organization", name: SITE.name },
      publisher: { "@type": "Organization", name: SITE.name },
      mainEntityOfPage: `${SITE.baseUrl}/conseils/${article.slug}`,
    },
    breadcrumbSchema([
      { label: "Accueil", to: "/" },
      { label: "Conseils jardin", to: "/conseils" },
      { label: article.h1 },
    ]),
    ...(article.faq ? [faqSchema(article.faq)] : []),
  ];

  return (
    <>
      <Seo title={article.title} description={article.meta} path={`/conseils/${article.slug}`} schemas={schemas} />

      <section data-testid={`article-hero-${article.slug}`} className="grain bg-forest">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-10 sm:py-20">
          <nav aria-label="Fil d'Ariane" data-testid="breadcrumbs" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-bone/50">
              <li><Link to="/" data-testid="breadcrumb-link-0" className="link-underline hover:text-bone">Accueil</Link></li>
              <li className="flex items-center gap-1.5"><span>/</span><Link to="/conseils" data-testid="breadcrumb-link-1" className="link-underline hover:text-bone">Conseils jardin</Link></li>
              <li className="flex items-center gap-1.5"><span>/</span><span aria-current="page" className="font-semibold text-bone/80">{article.categoryName}</span></li>
            </ol>
          </nav>
          <FadeIn>
            <p className="overline-tag mb-5">Conseils — {article.categoryName}</p>
          </FadeIn>
          <h1 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-bone sm:text-5xl">
            {article.h1}
          </h1>
          <FadeIn delay={0.2}>
            <p className="mt-5 flex flex-wrap items-center gap-5 text-sm text-bone/60">
              <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-ember" /> {article.dateLabel}</span>
              <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-ember" /> Lecture {article.readTime}</span>
              <span className="flex items-center gap-2">Par l'équipe {SITE.name}, Lisieux</span>
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-bone/75 sm:text-lg">{article.intro}</p>
          </FadeIn>
        </div>
      </section>

      <article data-testid={`article-content-${article.slug}`} className="mx-auto max-w-3xl px-6 py-16 sm:px-10 sm:py-20">
        {article.sections.map((sec, i) => (
          <Reveal key={sec.h2} className={i > 0 ? "mt-14" : ""}>
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-forest sm:text-4xl">{sec.h2}</h2>
            {sec.paras.map((p, j) => (
              <p key={j} className="mt-5 text-base leading-relaxed text-charcoal/75">{p}</p>
            ))}
            {sec.list && (
              <ul className="mt-6 space-y-4">
                {sec.list.map((li, j) => (
                  <li key={j} className="flex gap-3 border-l-2 border-ember/60 pl-4 text-base leading-relaxed text-charcoal/75">{li}</li>
                ))}
              </ul>
            )}
          </Reveal>
        ))}

        <Reveal className="mt-14">
          <div className="flex flex-col items-start gap-5 rounded-lg border border-ember/30 bg-ember/5 p-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-serif text-2xl font-semibold text-forest">Un arbre ou une haie concernés chez vous ?</p>
              <p className="mt-1 text-sm text-charcoal/65">Diagnostic gratuit à domicile, partout dans le Pays d'Auge.</p>
            </div>
            <CallButton size="md" testid={`call-cta-article-${article.slug}`} />
          </div>
        </Reveal>

        <Reveal className="mt-14">
          <h2 className="font-serif text-2xl font-semibold tracking-tight text-forest">Pour aller plus loin</h2>
          <div className="mt-5 space-y-3">
            {article.links.map((l) => (
              <Link key={l.to} to={l.to} data-testid={`article-link-${l.to.replace(/\//g, "")}`} className="group flex items-center justify-between rounded-lg border border-charcoal/10 bg-bone px-5 py-4 transition-colors hover:border-ember/40">
                <span className="font-sans text-base font-bold text-forest group-hover:text-ember">{l.label}</span>
                <ArrowRight className="h-4 w-4 shrink-0 text-charcoal/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ember" />
              </Link>
            ))}
          </div>
        </Reveal>
      </article>

      {article.faq && <Faq items={article.faq} title="Vos questions sur le sujet" testid={`faq-article-${article.slug}`} />}

      <CtaBand testid={`cta-band-article-${article.slug}`} />
    </>
  );
}
