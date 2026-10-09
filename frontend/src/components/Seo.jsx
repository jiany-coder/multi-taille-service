import { Helmet } from "react-helmet-async";
import { SITE } from "@/data/site";

export const Seo = ({ title, description, path, schemas = [] }) => {
  const url = `${SITE.baseUrl}${path === "/" ? "/" : path}`;
  const img = `${SITE.baseUrl}/images/logo.webp`;

  // Prérendu (build) : on mémorise les balises de la page pour les écrire dans le HTML statique.
  if (typeof window === "undefined") {
    globalThis.__HEAD__ = { title, desc: description, url, img, type: "website", jsonLd: schemas };
    return null;
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="canonical" href={url} />
      <meta name="geo.region" content="FR-14" />
      <meta name="geo.placename" content="Lisieux, Calvados, Normandie" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content={SITE.name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
};
