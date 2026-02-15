import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ShoppingCart } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCart } from "@/contexts/CartContext";
import {
  useWhatsAppUrl,
  whatsappLinkProps,
} from "@/hooks/use-whatsapp";

const faqItems = [
  {
    question: "Reservas",
    answer:
      "A reserva da data é confirmada mediante sinal de 50% do valor total.\nO restante pagamento é efetuado até 48h antes do evento.",
  },
  {
    question: "Antecedência mínima para reserva",
    answer:
      "ESSENCE: mínimo 10 dias de antecedência\nSUPREME: mínimo 15 dias de antecedência\nPREMIUM: mínimo 20 dias de antecedência\n\nReservas fora destes prazos estão sujeitas a disponibilidade e eventual ajuste de valor.",
  },
  {
    question: "O que está incluído",
    answer:
      "Buffet de Finger Food conforme o pacote escolhido, montagem cuidada, apresentação impactante e cores adaptadas ao tema do cliente.",
  },
  {
    question: "Personalização",
    answer:
      "As cores e a estética do buffet são adaptadas ao tema do evento, sem custo adicional.",
  },
  {
    question: "Staff",
    answer:
      "Apenas o pacote PREMIUM inclui staff de apoio ao buffet.\nNos pacotes ESSENCE e SUPREME, após a montagem, o buffet fica ao encargo dos anfitriões.",
  },
  {
    question: "Duração do serviço",
    answer:
      "A duração do serviço varia conforme o pacote contratado.\nProlongamentos estão sujeitos a disponibilidade e valor adicional.",
  },
  {
    question: "Deslocação",
    answer:
      "A deslocação não está incluída no valor base e é calculada conforme a localização do evento.",
  },
  {
    question: "Cancelamentos",
    answer: "O sinal não é reembolsável em caso de cancelamento.",
  },
];

const FAQ = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const { setIsOpen } = useCart();
  const whatsappUrl = useWhatsAppUrl();

  return (
    <section id="faq" className="py-28 lg:py-36 bg-card">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="font-body text-[11px] uppercase tracking-[0.25em] mb-5 block text-gold">
            Informações Importantes
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 font-light">
            FAQ
          </h2>
          <div className="separator-gold mx-auto mb-8" />
          <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed font-light">
            Tudo o que precisa de saber antes de reservar o seu evento.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-2xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-0">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-border/40 last:border-b-0"
              >
                <AccordionTrigger className="font-display text-lg md:text-xl text-foreground font-light py-6 hover:no-underline hover:text-gold transition-colors [&[data-state=open]]:text-gold">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="font-body text-sm md:text-base text-muted-foreground leading-relaxed font-light whitespace-pre-line pb-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="font-body text-sm text-muted-foreground mb-8 font-light max-w-lg mx-auto">
            Ainda tem dúvidas? Pode submeter o pedido e nós confirmamos a disponibilidade da data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsOpen(true)}
              className="btn-gold-flat flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Verificar disponibilidade da minha data
            </button>
            <a
              href={whatsappUrl}
              {...whatsappLinkProps}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gold/40 text-foreground hover:bg-gold/10 transition-colors font-body text-xs uppercase tracking-[0.15em]"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Tenho uma dúvida rápida (WhatsApp)
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
