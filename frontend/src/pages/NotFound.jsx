import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { CallButton } from "@/components/CallButton";

export default function NotFound() {
  return (
    <>
      <Seo title="Page introuvable | Multi Taille Services — Lisieux, Pays d'Auge" description="La page demandée n'existe pas. Retournez à l'accueil de Multi Taille Services, élagueur et paysagiste à Lisieux." path="/404" />
      <section data-testid="not-found" className="grain bg-forest">
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-8 px-6 py-28 sm:px-10 sm:py-36">
          <p className="font-serif text-8xl font-semibold text-bone/20">404</p>
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-bone sm:text-5xl">
            Cette page s'est fait élaguer.
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-bone/70">
            La page que vous cherchez n'existe pas ou a été déplacée. Retournez à l'accueil, ou appelez-nous directement pour votre projet d'élagage, de taille de haie ou d'entretien de jardin.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <CallButton size="lg" dark testid="call-cta-404" />
            <Link to="/" data-testid="not-found-home-link" className="link-underline text-sm font-semibold text-bone/85">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
