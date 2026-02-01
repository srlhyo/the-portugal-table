import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ShoppingCart } from "lucide-react";
import { 
  useWhatsAppUrl, 
  PHONE_DISPLAY, 
  PHONE_TEL,
  whatsappLinkProps 
} from "@/hooks/use-whatsapp";
import { useCart } from "@/contexts/CartContext";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const whatsappUrl = useWhatsAppUrl();
  const { setIsOpen } = useCart();

  return (
    <section id="contacto" className="py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Contact Info */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-body text-[11px] uppercase tracking-[0.25em] mb-8 block text-gold">
              Vamos Conversar
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-6 font-light">
              Contacto
            </h2>
            <div className="w-16 h-px mb-8 bg-gold/50" />
            <p className="font-body text-sm md:text-base text-primary-foreground/80 leading-relaxed mb-12">
              Estamos disponíveis para esclarecer todas as suas dúvidas e ajudar a planear o seu evento perfeito.
            </p>

            {/* Contact Details */}
            <div className="space-y-6 mb-12">
              <div>
                <p className="font-body text-xs uppercase tracking-[0.2em] mb-2 text-gold">
                  Email
                </p>
                <a
                  href="mailto:hello@doluxoamesa.pt"
                  className="font-display text-xl text-primary-foreground hover:opacity-80 transition-opacity"
                >
                  hello@doluxoamesa.pt
                </a>
              </div>
              <div>
                <p className="font-body text-xs uppercase tracking-[0.2em] mb-2 text-gold">
                  WhatsApp
                </p>
                <a
                  href={PHONE_TEL}
                  className="font-display text-xl text-primary-foreground hover:opacity-80 transition-opacity"
                >
                  {PHONE_DISPLAY}
                </a>
              </div>
              <div>
                <p className="font-body text-xs uppercase tracking-[0.2em] mb-2 text-gold">
                  Instagram
                </p>
                <a
                  href="https://instagram.com/doluxoamesa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-xl text-primary-foreground hover:opacity-80 transition-opacity"
                >
                  @doluxoamesa
                </a>
              </div>
              <div>
                <p className="font-body text-xs uppercase tracking-[0.2em] mb-2 text-gold">
                  Localização
                </p>
                <p className="font-display text-xl text-primary-foreground">
                  Portugal Continental
                </p>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={whatsappUrl}
              {...whatsappLinkProps}
              className="inline-flex items-center gap-3 btn-gold-flat"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Falar no WhatsApp
            </a>
          </motion.div>

          {/* Right: How to Request Quote */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="bg-primary-foreground/5 border border-gold/20 p-8 md:p-10">
              <h3 className="font-display text-2xl md:text-3xl text-primary-foreground mb-4 font-light">
                Como pedir orçamento
              </h3>
              <div className="w-12 h-px mb-6 bg-gold/50" />
              <p className="font-body text-sm md:text-base text-primary-foreground/80 leading-relaxed mb-8">
                Escolha um pacote e os extras pretendidos e finalize o seu pedido no carrinho. 
                A nossa equipa irá confirmar a disponibilidade e enviar o orçamento final.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={() => setIsOpen(true)}
                  className="btn-gold-flat flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Abrir carrinho
                </button>
                <a
                  href={whatsappUrl}
                  {...whatsappLinkProps}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gold/40 text-primary-foreground hover:bg-gold/10 transition-colors font-body text-xs uppercase tracking-[0.15em]"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Falar no WhatsApp
                </a>
              </div>

              {/* Disclaimer */}
              <p className="font-body text-xs text-primary-foreground/60 leading-relaxed">
                O pedido de orçamento não constitui compromisso e está sujeito a confirmação de disponibilidade.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
