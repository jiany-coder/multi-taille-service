// Prérendu : après `craco build`, écrit un fichier HTML complet par page dans build/.
// Le design est celui de l'application React ; seul le HTML initial change (lisible sans JavaScript par Google et les IA).
import { build } from "esbuild";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const buildDir = path.join(root, "build");
const tmp = path.join(root, ".prerender");
fs.mkdirSync(tmp, { recursive: true });

const aliasPlugin = {
  name: "alias-at",
  setup(b) {
    b.onResolve({ filter: /^@\// }, (args) => {
      const base = path.join(root, "src", args.path.slice(2));
      for (const c of [base, base + ".js", base + ".jsx", base + ".json", path.join(base, "index.js"), path.join(base, "index.jsx")]) {
        if (fs.existsSync(c) && fs.statSync(c).isFile()) return { path: c };
      }
      return { errors: [{ text: `Introuvable : ${args.path}` }] };
    });
  },
};

await build({
  entryPoints: [path.join(root, "scripts/server-entry.jsx")],
  outfile: path.join(tmp, "server.cjs"),
  bundle: true,
  platform: "node",
  format: "cjs",
  jsx: "automatic",
  loader: { ".js": "jsx", ".css": "empty", ".svg": "dataurl", ".png": "dataurl", ".jpg": "dataurl", ".webp": "dataurl" },
  plugins: [aliasPlugin],
  define: { "process.env.NODE_ENV": '"production"' },
  logLevel: "error",
});

const require = createRequire(import.meta.url);
const { render, routes, meta } = require(path.join(tmp, "server.cjs"));
const M = meta();
const SITE = (process.env.SITE_URL || M.site).replace(/\/$/, "");
// Tant que INDEXABLE n'est pas "true" (mise en ligne validée), tout le site est en noindex (pré-publication).
const INDEXABLE = process.env.INDEXABLE === "true";
const template = fs.readFileSync(path.join(buildDir, "index.html"), "utf8");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const ld = (o) => JSON.stringify(o).replace(/</g, "\\u003c");

function headTags(h) {
  if (!h) throw new Error("balises de page absentes");
  const lds = (Array.isArray(h.jsonLd) ? h.jsonLd : h.jsonLd ? [h.jsonLd] : [])
    .map((o) => `<script type="application/ld+json" data-rh="true">${ld(o)}</script>`).join("");
  return [
    `<title data-rh="true">${esc(h.title)}</title>`,
    `<meta data-rh="true" name="description" content="${esc(h.desc)}">`,
    `<meta data-rh="true" name="robots" content="${INDEXABLE ? "index, follow, max-image-preview:large" : "noindex, nofollow"}">`,
    `<meta data-rh="true" name="geo.region" content="FR-14">`,
    `<meta data-rh="true" name="geo.placename" content="Lisieux, Calvados, Normandie">`,
    `<link data-rh="true" rel="canonical" href="${esc(h.url)}">`,
    `<meta data-rh="true" property="og:type" content="${esc(h.type)}">`,
    `<meta data-rh="true" property="og:title" content="${esc(h.title)}">`,
    `<meta data-rh="true" property="og:description" content="${esc(h.desc)}">`,
    `<meta data-rh="true" property="og:url" content="${esc(h.url)}">`,
    `<meta data-rh="true" property="og:image" content="${esc(h.img)}">`,
    `<meta data-rh="true" property="og:locale" content="fr_FR">`,
    `<meta data-rh="true" property="og:site_name" content="${esc(M.name)}">`,
    `<meta data-rh="true" name="twitter:card" content="summary_large_image">`,
    `<meta data-rh="true" name="twitter:title" content="${esc(h.title)}">`,
    `<meta data-rh="true" name="twitter:description" content="${esc(h.desc)}">`,
    `<meta data-rh="true" name="twitter:image" content="${esc(h.img)}">`,
    lds,
  ].join("");
}

function page(url) {
  const { html, head } = render(url);
  const out = template
    .replace(/<title>.*?<\/title>/s, "")
    .replace(/<meta name="description"[^>]*>/s, "")
    .replace("</head>", headTags(head) + "</head>")
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  return { out, html, head };
}

const stripTags = (s) => s.replace(/<script.*?<\/script>|<style.*?<\/style>/gs, " ").replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ");
const report = [];
const problems = [];
const titles = new Map();
const list = routes();

for (const url of list) {
  const { out, html, head } = page(url);
  // /page -> build/page.html : Cloudflare Pages sert cette page à /page (sans barre finale).
  const file = url === "/" ? path.join(buildDir, "index.html") : path.join(buildDir, url.slice(1) + ".html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, out);
  const words = stripTags(html).split(/\s+/).filter(Boolean).length;
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) problems.push(`${url}: ${h1} balise(s) h1`);
  if (!head || !head.title || !head.desc) problems.push(`${url}: titre ou description manquant`);
  if (head && head.title.length > 60) problems.push(`${url}: titre trop long (${head.title.length})`);
  if (head && (head.desc.length < 110 || head.desc.length > 165)) problems.push(`${url}: description ${head.desc.length} car.`);
  if (head && head.url !== SITE + (url === "/" ? "/" : url)) problems.push(`${url}: canonical inattendu ${head.url}`);
  if (head) {
    if (titles.has(head.title)) problems.push(`${url}: titre identique à ${titles.get(head.title)}`);
    titles.set(head.title, url);
  }
  report.push({ url, words });
}

// 404 : vrai code 404 (Cloudflare Pages sert 404.html pour toute adresse inconnue)
const nf = page("/page-introuvable-404");
fs.writeFileSync(path.join(buildDir, "404.html"), nf.out);

const today = new Date().toISOString().slice(0, 10);
const prio = (u) => (u === "/" ? "1.0" : M.services.some((s) => s.url === u) ? "0.9" : u === "/conseils" ? "0.6" : u.startsWith("/conseils/") ? "0.5" : "0.8");
fs.writeFileSync(path.join(buildDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  list.map((u) => `<url><loc>${SITE}${u === "/" ? "/" : u}</loc><lastmod>${today}</lastmod><priority>${prio(u)}</priority></url>`).join("\n") + `\n</urlset>\n`);
fs.writeFileSync(path.join(buildDir, "robots.txt"),
  INDEXABLE ? `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n` : `User-agent: *\nDisallow: /\n`);
fs.writeFileSync(path.join(buildDir, "llms.txt"), [
  `# ${M.name}`, "",
  `> Élagueur, jardinier et paysagiste à Lisieux et dans le Pays d'Auge (Calvados). Devis gratuit, contact par téléphone : ${M.phone}.`, "",
  "## Services",
  ...M.services.map((s) => `- ${SITE}${s.url} : ${s.name}`), "",
  "## Pages locales",
  ...M.local.map((s) => `- ${SITE}${s.url}`), "",
  "## Conseils",
  ...M.articles.map((s) => `- ${SITE}${s.url}`), "",
].join("\n"));
fs.writeFileSync(path.join(buildDir, "_headers"),
  "/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n" +
  (INDEXABLE ? "" : "  X-Robots-Tag: noindex, nofollow\n") +
  "/static/*\n  Cache-Control: public, max-age=31536000, immutable\n/images/*\n  Cache-Control: public, max-age=31536000, immutable\n");

const wc = report.map((r) => r.words).sort((a, b) => a - b);
console.log(`Prérendu : ${list.length} pages, mots/page min ${wc[0]} · médiane ${wc[wc.length >> 1]} · max ${wc[wc.length - 1]} · indexable=${INDEXABLE}`);
const thin = report.filter((r) => r.words < 250);
if (thin.length) problems.push(`${thin.length} page(s) sous 250 mots, ex. ${thin.slice(0, 5).map((r) => r.url + " (" + r.words + ")").join(", ")}`);
fs.rmSync(tmp, { recursive: true, force: true });
if (problems.length) {
  console.error(`PROBLÈMES (${problems.length}) :\n` + problems.slice(0, 60).join("\n"));
  if (process.env.STRICT) process.exit(1);
} else {
  console.log("Contrôles OK.");
}
