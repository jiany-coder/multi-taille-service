// Point d'entrée "serveur" : produit le HTML de chaque page au moment de la construction (prérendu).
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { AppRoutes } from "../src/App";
import { SERVICES } from "../src/data/services";
import { LOCAL_PAGES } from "../src/data/localPages";
import { ARTICLES } from "../src/data/articles";
import { SITE } from "../src/data/site";

export function routes() {
  const list = [
    "/", "/conseils",
    ...SERVICES.map((s) => `/${s.slug}`),
    ...LOCAL_PAGES.map((p) => `/${p.slug}`),
    ...ARTICLES.map((a) => `/conseils/${a.slug}`),
  ];
  return [...new Set(list)];
}

export const meta = () => ({
  site: SITE.baseUrl,
  name: SITE.name,
  phone: SITE.phoneDisplay,
  services: SERVICES.map((s) => ({ url: `/${s.slug}`, name: s.name })),
  local: LOCAL_PAGES.map((p) => ({ url: `/${p.slug}`, name: p.title })),
  articles: ARTICLES.map((a) => ({ url: `/conseils/${a.slug}`, name: a.title })),
});

export function render(url) {
  globalThis.__HEAD__ = null;
  const html = renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>
  );
  return { html, head: globalThis.__HEAD__ };
}
