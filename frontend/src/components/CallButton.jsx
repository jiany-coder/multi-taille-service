import { Phone } from "lucide-react";
import { SITE } from "@/data/site";

const SIZES = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export const CallButton = ({ size = "md", sub = false, dark = false, testid = "call-cta", className = "" }) => (
  <span className={`inline-flex flex-col items-start gap-1.5 ${className}`}>
    <a
      href={SITE.tel}
      data-testid={testid}
      aria-label={`Appeler Multi Taille Services au ${SITE.phoneDisplay}`}
      className={`group inline-flex items-center gap-3 whitespace-nowrap rounded-full bg-ember font-sans font-bold text-white shadow-[0_8px_24px_rgba(255,90,0,0.35)] transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5 hover:bg-ember-dark hover:shadow-[0_12px_32px_rgba(255,90,0,0.45)] ${SIZES[size]}`}
    >
      <Phone className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:rotate-12" strokeWidth={2.4} />
      <span className="whitespace-nowrap">Appeler maintenant</span>
      <span className="hidden whitespace-nowrap opacity-90 sm:inline">{SITE.phoneDisplay}</span>
    </a>
    {sub && (
      <span className={`pl-2 text-xs font-semibold tracking-wide ${dark ? "text-white/70" : "text-charcoal/60"}`}>
        {SITE.slogan}
      </span>
    )}
  </span>
);
