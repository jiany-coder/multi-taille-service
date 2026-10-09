import { Phone } from "lucide-react";
import { SITE } from "@/data/site";

export const FloatingCall = () => (
  <a
    href={SITE.tel}
    data-testid="floating-call-button"
    aria-label={`Appeler Multi Taille Services au ${SITE.phoneDisplay}`}
    className="fixed inset-x-3 bottom-3 z-50 flex items-center justify-center gap-3 rounded-full bg-ember py-3.5 font-sans text-base font-bold text-white shadow-[0_10px_30px_rgba(255,90,0,0.5)] transition-transform duration-300 active:scale-95 md:hidden"
  >
    <Phone className="h-5 w-5" strokeWidth={2.5} />
    Appeler maintenant, {SITE.phoneDisplay}
  </a>
);
