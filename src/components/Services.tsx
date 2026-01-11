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
    title: "Buffet de Finger Food",
    description: "Montagem completa do buffet (mesa, decoração + comida) em qualquer local. Ideal para aniversários, noivados, baby showers, festas privadas e eventos sociais.",
    image: fingerfoodBoard,
  },
  {
    icon: Flower2,
    title: "Decoração de Mesas",
    description: "Mesa posta, styling, flores, velas, louça e ambiente. Sem comida. Perfeito para datas especiais, jantares, pedidos de casamento, almoços e celebrações íntimas.",
    image: tableCandles,
  },
  {
    icon: Camera,
    title: "Espaço Fotografável",
    description: "Criação de cenário decorado para fotos: painéis, balões, flores, luzes, cubos, etc. Ideal para tornar o seu evento ainda mais instagramável.",
    image: tablePink,
  },
];

const Services = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="servicos" className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span 
            className="font-body text-xs uppercase tracking-[0.3em] mb-4 block"
            style={{
              background: 'linear-gradient(90deg, hsl(42, 65%, 45%), hsl(43, 55%, 58%), hsl(42, 65%, 45%))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Os Nossos Serviços
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            O Que Fazemos
          </h2>
          <div 
            className="w-20 h-px mx-auto mb-8"
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(43, 65%, 50%), hsl(45, 50%, 68%), hsl(43, 65%, 50%), transparent)',
              boxShadow: '0 0 10px hsla(42, 65%, 45%, 0.3)'
            }}
          />
          <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
            Vamos a qualquer local — casa do cliente, quintas, salões, rooftops, espaços ao ar livre. 
            Montamos experiências visuais e gastronómicas que transformam celebrações em momentos inesquecíveis.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10 mb-16">
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
                {/* Gold accent on hover */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{
                    background: 'linear-gradient(90deg, hsl(43, 65%, 50%), hsl(45, 50%, 68%), hsl(43, 65%, 50%))',
                    boxShadow: '0 0 10px hsla(42, 65%, 45%, 0.5)'
                  }}
                />
              </div>

              {/* Content */}
              <div className="text-center px-4">
                {/* Icon */}
                <div 
                  className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border transition-all duration-500 group-hover:shadow-gold"
                  style={{
                    borderImage: 'linear-gradient(135deg, hsl(40, 70%, 35%), hsl(43, 65%, 50%), hsl(45, 50%, 68%)) 1'
                  }}
                >
                  <service.icon 
                    className="w-7 h-7"
                    style={{ color: 'hsl(42, 65%, 48%)' }}
                  />
                </div>

                <h3 className="font-display text-2xl lg:text-3xl text-foreground mb-4">
                  {service.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
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
          <div 
            className="inline-block px-8 py-4 border"
            style={{
              borderImage: 'linear-gradient(135deg, hsl(40, 70%, 35%), hsl(43, 65%, 50%), hsl(45, 50%, 68%)) 1'
            }}
          >
            <p className="font-body text-sm text-foreground">
              Os serviços podem ser contratados <strong>separadamente</strong> ou <strong>combinados</strong> no mesmo evento.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
