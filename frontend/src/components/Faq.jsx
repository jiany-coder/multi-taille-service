import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/Reveal";

export const Faq = ({ items, title = "Questions fréquentes", testid = "faq-section" }) => (
  <section data-testid={testid} className="mx-auto max-w-4xl px-6 py-20 sm:px-10 sm:py-28">
    <Reveal>
      <p className="overline-tag mb-4">On vous dit tout</p>
      <h2 className="mb-12 font-serif text-4xl font-semibold tracking-tight text-forest sm:text-5xl">{title}</h2>
    </Reveal>
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, i) => (
        <AccordionItem key={i} value={`faq-${i}`} className="border-b border-charcoal/15" data-testid={`faq-item-${i}`}>
          <AccordionTrigger
            data-testid={`faq-question-${i}`}
            className="py-6 text-left font-serif text-xl font-semibold text-forest hover:text-ember hover:no-underline sm:text-2xl"
          >
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="pb-6 text-base leading-relaxed text-charcoal/75">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </section>
);
