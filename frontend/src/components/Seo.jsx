import { Helmet } from "react-helmet-async";
import { SITE } from "@/data/site";

export const Seo = ({ title, description, path, schemas = [] }) => {
  const url = `${SITE.baseUrl}${path}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${SITE.baseUrl}/images/logo.webp`} />
      <meta property="og:locale" content="fr_FR" />
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
};
