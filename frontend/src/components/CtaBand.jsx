import { Reveal } from "@/components/Reveal";
import { CallButton } from "@/components/CallButton";

export const CtaBand = ({ title = "Un arbre à tailler, un jardin à reprendre ?", text = "Un appel suffit. Nous passons voir votre terrain, votre haie ou vos arbres et nous vous donnons un avis clair, sans engagement.", testid = "cta-band" }) => (
  <section data-testid={testid} className="grain relative overflow-hidden bg-forest py-20 sm:py-28">
    <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full border border-white/10" />
    <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full border border-white/10" />
    <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 sm:px-10 lg:flex-row lg:items-center lg:justify-between">
      <Reveal className="max-w-2xl">
        <p className="overline-tag mb-4">Devis gratuit — Pays d'Auge</p>
        <h2 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-bone sm:text-5xl">
          {title}
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-bone/70">{text}</p>
      </Reveal>
      <Reveal delay={0.15}>
        <CallButton size="lg" sub dark testid={`${testid}-call-button`} />
      </Reveal>
    </div>
  </section>
);
