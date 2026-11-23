// Postbuild SEO : génère, après `craco build`, un HTML statique par page
// (title, meta, canonical, JSON-LD, contenu texte + liens) et le sitemap.xml.
// Sans ça, le site (React côté client) n'envoie qu'un <div id="root"> vide aux robots.
// Usage : node scripts/postbuild-seo.mjs [dossier-build]
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const frontend = path.resolve(here, "..");
const buildDir = path.resolve(process.argv[2] || path.join(frontend, "build"));
const SITE_URL = (process.env.SITE_URL || "https://multi-taille-services.online").replace(/\/$/, "");
process.env.REACT_APP_SITE_URL = SITE_URL; // utilisé par data/site.js pour les URLs absolues

if (!fs.existsSync(path.join(buildDir, "index.html"))) {
  console.error(`[postbuild-seo] ${buildDir}/index.html introuvable : lancez d'abord le build.`);
  process.exit(1);
}

// --- Copie des fichiers de données avec imports « @/data/x » résolus (Node pur) ---
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "mts-seo-"));
fs.writeFileSync(path.join(tmp, "package.json"), '{"type":"module"}');
for (const f of fs.readdirSync(path.join(frontend, "src/data"))) {
  if (!f.endsWith(".js")) continue;
  let src = fs.readFileSync(path.join(frontend, "src/data", f), "utf8");
  src = src.replace(/from "@\/data\/([A-Za-z0-9_-]+)"/g, 'from "./$1.js"');
  fs.writeFileSync(path.join(tmp, f), src);
}
const load = (f) => import(pathToFileURL(path.join(tmp, f)).href);
const site = await load("site.js");
const { SERVICES } = await load("services.js");
const { LOCAL_PAGES } = await load("localPages.js");
const { ARTICLES } = await load("articles.js");

const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const tel = site.SITE.tel;
const phone = site.SITE.phoneDisplay;

const callBlock = () =>
  `<p><a href="${tel}"><strong>Appeler maintenant : ${esc(phone)}</strong></a> — devis gratuit autour de Lisieux et dans le Pays d'Auge.</p>`;
const ul = (items = []) => (items.length ? `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>` : "");
const sectionsHtml = (secs = []) =>
  secs
    .map((s) => `<section><h2>${esc(s.h2)}</h2>${(s.paras || []).map((p) => `<p>${esc(p)}</p>`).join("")}${ul(s.list)}</section>`)
    .join("");
const faqHtml = (faq = []) =>
  faq.length
    ? `<section><h2>Questions fréquentes</h2>${faq.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join("")}</section>`
    : "";
const navHtml = `<nav aria-label="Navigation principale"><a href="/">Accueil</a> <a href="/elagage">Élagage</a> <a href="/taille-de-haie">Taille de haie</a> <a href="/abattage-arbres">Abattage</a> <a href="/entretien-espaces-verts">Espaces verts</a> <a href="/conseils">Conseils</a></nav>`;

// --- Définition des pages à générer ---------------------------------------
const pages = [];

pages.push({
  path: "/",
  title: "Élagueur, Jardinier & Paysagiste à Lisieux | Multi Taille Services — Pays d'Auge",
  description:
    "Multi Taille Services : élagueur, jardinier et paysagiste à Lisieux et dans tout le Pays d'Auge. Élagage, abattage, taille de haie, entretien de jardin. Devis gratuit : " + phone + ".",
  schemas: [site.localBusinessSchema()],
  body: `<h1>Élagage, taille de haies et abattage d'arbres autour de Lisieux</h1><p>25 ans d'expérience, nacelle, devis gratuit par téléphone, intervention dans un rayon d'environ 60 km autour de Lisieux.</p>${callBlock()}<h2>Nos prestations</h2><ul>${SERVICES.map((s) => `<li><a href="/${s.slug}">${esc(s.name)}</a> — ${esc(s.short)}</li>`).join("")}</ul><h2>Zone d'intervention</h2><ul>${site.CITIES.map((c) => `<li>${esc(c.name)}</li>`).join("")}</ul><h2>Conseils</h2><p><a href="/conseils">${ARTICLES.length} conseils sur l'élagage, les haies et l'abattage</a></p>`,
});

for (const s of SERVICES) {
  pages.push({
    path: `/${s.slug}`,
    title: s.title,
    description: s.meta,
    schemas: [site.localBusinessSchema(), site.serviceSchema(s.name, s.meta, `/${s.slug}`), site.breadcrumbSchema([{ label: "Accueil", to: "/" }, { label: s.h1 }]), ...(s.faq ? [site.faqSchema(s.faq)] : [])],
    body: `<h1>${esc(s.h1)}</h1><p>${esc(s.intro)}</p>${callBlock()}${sectionsHtml(s.sections)}${faqHtml(s.faq)}${callBlock()}`,
  });
}

for (const p of LOCAL_PAGES) {
  pages.push({
    path: `/${p.slug}`,
    title: p.title,
    description: p.meta,
    schemas: [site.localBusinessSchema(), site.breadcrumbSchema([{ label: "Accueil", to: "/" }, { label: p.h1 }]), ...(p.faq ? [site.faqSchema(p.faq)] : [])],
    body: `<h1>${esc(p.h1)}</h1><p>${esc(p.intro)}</p>${callBlock()}<section><h2>${esc(p.besoins?.h2 || "")}</h2>${(p.besoins?.paras || []).map((x) => `<p>${esc(x)}</p>`).join("")}</section>${ul(p.prestations)}${p.communes ? `<p>Communes voisines : ${esc(p.communes.join(", "))}.</p>` : ""}${faqHtml(p.faq)}${callBlock()}`,
  });
}

pages.push({
  path: "/conseils",
  title: "Conseils jardin, élagage et paysage | Multi Taille Services — Lisieux, Pays d'Auge",
  description: `${ARTICLES.length} conseils de professionnels pour vos arbres, haies et jardins dans le Pays d'Auge : élagage, taille de haie, abattage, entretien. Appelez-nous : ${phone}.`,
  schemas: [site.localBusinessSchema(), site.breadcrumbSchema([{ label: "Accueil", to: "/" }, { label: "Conseils jardin" }])],
  body: `<h1>Conseils jardin, élagage et paysage</h1>${callBlock()}<ul>${ARTICLES.map((a) => `<li><a href="/conseils/${a.slug}">${esc(a.h1)}</a></li>`).join("")}</ul>`,
});

for (const a of ARTICLES) {
  pages.push({
    path: `/conseils/${a.slug}`,
    title: a.title,
    description: a.meta,
    schemas: [
      site.localBusinessSchema(),
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: a.h1,
        description: a.meta,
        datePublished: a.date,
        dateModified: a.date,
        inLanguage: "fr-FR",
        image: `${SITE_URL}/images/logo.webp`,
        author: { "@type": "Organization", name: site.SITE.name },
        publisher: { "@type": "Organization", name: site.SITE.name },
        mainEntityOfPage: `${SITE_URL}/conseils/${a.slug}`,
      },
      site.breadcrumbSchema([{ label: "Accueil", to: "/" }, { label: "Conseils jardin", to: "/conseils" }, { label: a.h1 }]),
      ...(a.faq ? [site.faqSchema(a.faq)] : []),
    ],
    body: `<h1>${esc(a.h1)}</h1><p>${esc(a.intro)}</p>${callBlock()}${sectionsHtml(a.sections)}${callBlock()}${faqHtml(a.faq)}<section><h2>Pour aller plus loin</h2><ul>${(a.links || []).map((l) => `<li><a href="${esc(l.to)}">${esc(l.label)}</a></li>`).join("")}</ul></section>${callBlock()}`,
  });
}

// --- Écriture ---------------------------------------------------------------
// Gabarit : on nettoie d'éventuelles injections d'un précédent passage (script relançable).
const template = fs
  .readFileSync(path.join(buildDir, "index.html"), "utf8")
  .replace(/<link rel="canonical"[^>]*>/gi, "")
  .replace(/<meta (property="og:[^"]*"|name="robots")[^>]*>/gi, "")
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, "")
  .replace(/<div id="root"><main>[\s\S]*?<\/main><\/div>/i, '<div id="root"></div>');

const render = (pg) => {
  const url = `${SITE_URL}${pg.path === "/" ? "/" : pg.path}`;
  const head = [
    `<title>${esc(pg.title)}</title>`,
    `<meta name="description" content="${esc(pg.description)}"/>`,
    `<meta name="robots" content="index, follow"/>`,
    `<link rel="canonical" href="${url}"/>`,
    `<meta property="og:type" content="website"/>`,
    `<meta property="og:title" content="${esc(pg.title)}"/>`,
    `<meta property="og:description" content="${esc(pg.description)}"/>`,
    `<meta property="og:url" content="${url}"/>`,
    `<meta property="og:image" content="${SITE_URL}/images/logo.webp"/>`,
    `<meta property="og:locale" content="fr_FR"/>`,
    ...pg.schemas.map((s) => `<script type="application/ld+json">${JSON.stringify(s).replace(/</g, "\\u003c")}</script>`),
  ].join("");
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\s+name="description"[^>]*>/i, "")
    .replace("</head>", `${head}</head>`);
  html = html.replace(/<div id="root">\s*<\/div>/i, `<div id="root"><main>${navHtml}${pg.body}</main></div>`);
  return html;
};

let written = 0;
for (const pg of pages) {
  const out = pg.path === "/" ? path.join(buildDir, "index.html") : path.join(buildDir, pg.path, "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, render(pg));
  written++;
}

// --- Sitemap ------------------------------------------------------------------
const today = new Date().toISOString().slice(0, 10);
const prio = (p) => (p === "/" ? "1.0" : p.startsWith("/conseils/") ? "0.6" : p === "/conseils" ? "0.7" : LOCAL_PAGES.some((l) => `/${l.slug}` === p) ? "0.8" : "0.9");
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  pages
    .map((pg) => `  <url><loc>${SITE_URL}${pg.path}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${prio(pg.path)}</priority></url>`)
    .join("\n") +
  `\n</urlset>\n`;
fs.writeFileSync(path.join(buildDir, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(buildDir, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

console.log(`[postbuild-seo] ${written} pages HTML + sitemap.xml (${pages.length} URLs) → ${buildDir}`);
