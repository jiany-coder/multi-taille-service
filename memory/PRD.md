# PRD — Multi Taille Services (site SEO local)

## Problème initial (résumé)
Créer un site SEO premium pour Multi Taille Services, élagueur/jardinier/paysagiste basé à Lisieux (Pays d'Auge). ~25 pages fortes et bien maillées, extensibles. Cible : Lisieux, Orbec, Vimoutiers, Falaise. Conversion = appels téléphoniques uniquement (07 67 23 41 23). Aucun formulaire, email, chat ou prise de RDV. Blog = structure seule. Design premium, mobile-first, rapide.

## Choix utilisateur (validés)
- Basée à Lisieux (LocalBusiness schema).
- Photos d'illustration professionnelles (images WebP locales dans /public/images).
- Mentions : "Appel direct, réponse rapide" + "Devis gratuit".
- Domaine : URL actuelle (https://elagage-local.preview.emergentagent.com) pour canonical + sitemap.

## Architecture
- React SPA (react-router-dom v7) — pages générées depuis fichiers de données : `src/data/services.js` (11 services) et `src/data/localPages.js` (13 pages locales). Ajouter une page SEO plus tard = ajouter une entrée de données (+ route déjà générique dans App.js + URL dans sitemap.xml).
- SEO : react-helmet-async (title/meta/canonical/OG uniques par page), JSON-LD (LocalBusiness, Service, BreadcrumbList, FAQPage), breadcrumbs visuels, sitemap.xml + robots.txt dans /public, images WebP locales avec lazy loading et alt descriptifs.
- Design : forest green #0A2A1A + orange #FF5A00 (réservé aux CTA) + bone white. Cormorant Garamond (titres) + Manrope (texte). Lenis (smooth scroll), framer-motion (révélations, hero masqué ligne par ligne, parallaxe hero), marquee éditorial, grain SVG.
- Conversion : CallButton (tel:+33767234123) dans header, hero, CTA bands, footer + bouton flottant mobile (fixed bottom, md:hidden).
- Backend FastAPI : inchangé, non utilisé par le site (pas de données dynamiques requises).

## Pages livrées — 41 URLs
Accueil / ; services : elagage, abattage-arbres, dessouchage, taille-de-haie, debroussaillage, jardinier, paysagiste, entretien-de-jardin, entretien-espaces-verts, tonte-de-pelouse, entretien-exterieur ; locales : elagage/jardinier/paysagiste × lisieux/orbec/vimoutiers/falaise/livarot-pays-d-auge/argences/saint-pierre-en-auge/mezidon-vallee-d-auge + taille-de-haie-lisieux (URLs courtes : /elagage-mezidon, /elagage-saint-pierre-en-auge...) ; blog : /conseils + 3 articles (24/08/2026) : quand-tailler-sa-haie-en-normandie, tailler-un-pommier-pays-d-auge, elagage-ou-abattage-que-choisir. Articles dans src/data/articles.js avec schema Article + FAQ + maillage vers services.

## Vérifié (24/08/2026)
- Compilation OK, 0 erreur console (hors warning framer-motion bénin).
- Home, /elagage, /elagage-lisieux testés (titres, H1, FAQ accordéon OK, maillage OK).
- Mobile : bouton flottant tel: visible, menu mobile OK.
- robots.txt et sitemap.xml : HTTP 200, sitemap à jour (32 URLs).

## Backlog priorisé
- P0 : Saint-Pierre-en-Auge (élagueur/jardinier/paysagiste) — même mécanisme que Livarot.
- P1 : Vraies photos de réalisations client (remplacer les illustrations WebP). Nouveaux articles de blog au fil des saisons.
- P2 : Mézidon Vallée d'Auge, Cambremer, Pont-l'Évêque ; avis clients vérifiés ; page Mentions légales si besoin.

## Personas
- Particulier 40-70 ans, propriété avec jardin/arbres dans le Pays d'Auge, cherche "élagueur Lisieux" sur mobile → veut appeler vite.
- Résidence secondaire (Côte Fleurie) : entretien en absence.
- Syndic/entreprise : contrat espaces verts.
