import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import tablePink from "@/assets/table-pink.jpg";
import dinnerFormal from "@/assets/dinner-formal.jpg";
import cocktailsTable from "@/assets/cocktails-table.jpg";
import brunchGold from "@/assets/brunch-gold.jpg";

const experiences = [
  {
    title: "Jantares Íntimos",
    subtitle: "Noites de Elegância",
    description:
      "Transformamos a sua sala de jantar num cenário de sonho. Mesas impecáveis com talheres dourados, guardanapos de seda e decoração floral que impressiona.",
    image: dinnerFormal,
    features: ["Até 20 convidados", "Mesa completa", "Decoração incluída"],
  },
  {
    title: "Brunches Privados",
    subtitle: "Manhãs Encantadas",
    description:
      "Uma experiência matinal refinada com mesa estilizada, panquecas, ovos, fruta fresca e detalhes que transformam um simples brunch numa celebração memorável.",
    image: brunchGold,
    features: ["Pequeno-almoço completo", "Flores frescas", "Louça premium"],
  },
  {
    title: "Celebrações",
    subtitle: "Momentos Especiais",
    description:
      "Baby showers, aniversários, noivados. Cada celebração merece uma mesa à altura do momento. Criamos atmosferas mágicas com atenção a cada detalhe.",
    image: tablePink,
    features: ["Temáticas personalizadas", "Finger food", "Decoração completa"],
  },
  {
    title: "Eventos Especiais",
    subtitle: "Cocktails & Mais",
    description:
      "Cocktail parties, encontros de amigas, festas ao pôr-do-sol. Criamos experiências únicas com bebidas de assinatura e finger food gourmet.",
    image: cocktailsTable,
    features: ["Bebidas de autor", "Canapés premium", "Ambiente refinado"],
  },
];

const ExperienceCard = ({
  experience,
  index,
}: {
  experience: (typeof experiences)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isReversed = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden group ${
          isReversed ? "lg:order-2" : ""
        }`}
      >
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={experience.image}
            alt={experience.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        {/* Gold accent line */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
      </div>

      {/* Content */}
      <div className={isReversed ? "lg:order-1" : ""}>
        <span className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-4 block">
          {experience.subtitle}
        </span>
        <h3 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
          {experience.title}
        </h3>
        <div className="w-16 h-px bg-gold mb-6" />
        <p className="font-body text-sm md:text-base text-foreground/70 leading-relaxed mb-8">
          {experience.description}
        </p>
        <div className="flex flex-wrap gap-4 mb-8">
          {experience.features.map((feature) => (
            <span
              key={feature}
              className="font-body text-xs uppercase tracking-[0.15em] text-foreground/60 border border-border px-4 py-2"
            >
              {feature}
            </span>
          ))}
        </div>
        <a
          href="#contacto"
          className="inline-block font-body text-xs uppercase tracking-[0.2em] text-gold border-b border-gold pb-2 hover:text-foreground hover:border-foreground transition-all duration-500"
        >
          Pedir Orçamento
        </a>
      </div>
    </motion.div>
  );
};

const Experiences = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="experiencias" className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-4 block">
            O Que Criamos
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Experiências
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mb-6" />
          <p className="font-body text-sm md:text-base text-foreground/70 leading-relaxed">
            Vamos à sua casa e transformamos o seu espaço num cenário de revista.
            Mesas estilizadas, finger food de luxo e momentos inesquecíveis.
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-24 lg:space-y-32">
          {experiences.map((experience, index) => (
            <ExperienceCard key={experience.title} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiences;
