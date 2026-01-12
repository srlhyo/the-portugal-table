import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { UtensilsCrossed, Flower2, Camera } from "lucide-react";
import fingerfoodBoard from "@/assets/fingerfood-board.jpg";
import tableCandles from "@/assets/table-candles.jpg";
import tablePink from "@/assets/table-pink.jpg";

const services = [
  {
    icon: UtensilsCrossed,
    title: "Buffet Finger Food Premium",
    description: "Buffets completos montados no local do cliente, incluindo mesa, comida, apresentação, montagem e desmontagem, reposição e staff (conforme o pacote).",
    image: fingerfoodBoard,
  },
  {
    icon: Flower2,
    title: "Decoração de Mesas",
    description: "Mesa posta e decoração (sem comida), para pedidos de noivado, jantares especiais, eventos intimistas e datas importantes. Inclui loiças, guardanapos, centros de mesa, flores e styling visual.",
    image: tableCandles,
  },
  {
    icon: Camera,
    title: "Cenografia / Espaço Fotográfico",
    description: "Criação de cenários decorados para fotos, com painéis, flores, cubos, iluminação, balões e estruturas. Ideal para tornar o seu evento instagramável.",
    image: tablePink,
  },
];

const Services = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="servicos" className="py-28 lg:py-36 bg-secondary" style={{ scrollMarginTop: 'calc(var(--navbar-height) + 24px)' }}>
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="font-body text-[11px] uppercase tracking-[0.25em] mb-5 block text-gold">
            Os Nossos Serviços
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 font-light">
            O Que Fazemos
          </h2>
          <div className="separator-gold mx-auto mb-8" />
          <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed font-light">
            Criamos experiências visuais e gastronómicas de luxo em qualquer local — 
            casa do cliente, quintas, salões, rooftops ou espaços ao ar livre.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-10 lg:gap-12 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group"
            >
              {/* Image */}
              <div className="relative overflow-hidden mb-8 aspect-[4/3]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Subtle gold line on hover */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-gold"
                />
              </div>

              {/* Content */}
              <div className="text-center px-2">
                {/* Icon */}
                <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center border border-gold/40 transition-all duration-500 group-hover:border-gold">
                  <service.icon className="w-6 h-6 text-gold" />
                </div>

                <h3 className="font-display text-2xl lg:text-3xl text-foreground mb-4 font-light">
                  {service.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed font-light">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-block px-8 py-5 border border-gold/40">
            <p className="font-body text-sm text-foreground font-light">
              Os serviços podem ser contratados <span className="text-gold">separadamente</span> ou <span className="text-gold">combinados</span> no mesmo evento.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
