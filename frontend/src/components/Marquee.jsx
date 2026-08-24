const ITEMS = [
  "Élagage", "Abattage", "Taille de haie", "Jardinier", "Paysagiste",
  "Entretien de jardin", "Lisieux & Pays d'Auge", "Devis gratuit", "Appel direct, réponse rapide",
];

const Row = () => (
  <div className="flex shrink-0 items-center">
    {ITEMS.map((item, i) => (
      <span key={i} className="flex items-center">
        <span className="whitespace-nowrap px-6 font-serif text-2xl italic text-bone/85 sm:text-3xl">{item}</span>
        <span className="h-1.5 w-1.5 rounded-full bg-ember" />
      </span>
    ))}
  </div>
);

export const Marquee = () => (
  <div data-testid="editorial-marquee" className="overflow-hidden border-y border-white/10 bg-forest-deep py-5" aria-hidden="true">
    <div className="flex w-max animate-marquee">
      <Row />
      <Row />
    </div>
  </div>
);
