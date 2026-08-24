export const SITE = {
  name: "Multi Taille Services",
  phoneDisplay: "07 67 23 41 23",
  tel: "tel:+33767234123",
  phoneIntl: "+33767234123",
  city: "Lisieux",
  region: "Pays d'Auge",
  slogan: "Appel direct, réponse rapide — Devis gratuit",
  baseUrl: process.env.REACT_APP_BACKEND_URL,
};

export const CITIES = [
  { slug: "lisieux", name: "Lisieux" },
  { slug: "orbec", name: "Orbec" },
  { slug: "vimoutiers", name: "Vimoutiers" },
  { slug: "falaise", name: "Falaise" },
];

export const ZONES = [
  "Lisieux", "Orbec", "Vimoutiers", "Falaise", "Livarot-Pays-d'Auge",
  "Saint-Pierre-en-Auge", "Mézidon Vallée d'Auge", "Cambremer", "Pont-l'Évêque",
  "Cormeilles", "Moyaux", "Thiberville", "Dozulé", "Cabourg", "Dives-sur-Mer",
];

export const BLOG_CATEGORIES = [
  { slug: "elagage", name: "Élagage", desc: "Techniques de taille, périodes idéales et soins aux arbres d'ornement et fruitiers." },
  { slug: "jardinage", name: "Jardinage", desc: "Conseils de jardinier pour un jardin beau et sain au fil des saisons." },
  { slug: "taille-de-haie", name: "Taille de haie", desc: "Haies libres ou taillées, essences, calendrier et règles de voisinage." },
  { slug: "arbres", name: "Arbres", desc: "Reconnaître les essences du Pays d'Auge et préserver vos sujets remarquables." },
  { slug: "paysagisme", name: "Paysagisme", desc: "Idées d'aménagement pour les jardins et propriétés du bocage augeron." },
  { slug: "entretien-de-jardin", name: "Entretien de jardin", desc: "Tonte, débroussaillage et gestion des espaces verts toute l'année." },
];

export const localBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE.name,
  description: "Élagueur, jardinier et paysagiste à Lisieux et dans le Pays d'Auge : élagage, abattage, dessouchage, taille de haie, entretien de jardin et d'espaces verts.",
  telephone: SITE.phoneIntl,
  url: `${SITE.baseUrl}/`,
  image: `${SITE.baseUrl}/images/logo.webp`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lisieux",
    addressRegion: "Normandie",
    addressCountry: "FR",
  },
  areaServed: ZONES.map((z) => ({ "@type": "City", name: z })),
  priceRange: "€€",
});

export const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.label,
    ...(it.to ? { item: `${SITE.baseUrl}${it.to}` } : {}),
  })),
});

export const faqSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const serviceSchema = (name, description, path) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: name,
  description,
  provider: { "@type": "LocalBusiness", name: SITE.name, telephone: SITE.phoneIntl },
  areaServed: ZONES.map((z) => ({ "@type": "City", name: z })),
  url: `${SITE.baseUrl}${path}`,
});
