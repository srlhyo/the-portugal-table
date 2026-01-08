import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import brunchImage from "@/assets/brunch.jpg";
import dinnerImage from "@/assets/dinner.jpg";
import fingerfoodImage from "@/assets/fingerfood.jpg";

const experiences = [
  {
    title: "Brunch de Luxo",
    subtitle: "Manhãs Encantadas",
    description:
      "Uma experiência matinal refinada com mesa estilizada, finger food gourmet e detalhes que transformam um simples brunch numa celebração memorável.",
    image: brunchImage,
    features: ["Mesa Decorada", "Finger Food Artesanal", "Flores Frescas"],
  },
  {
    title: "Jantares Íntimos",
    subtitle: "Noites de Elegância",
    description:
      "Transformamos a sua sala de jantar num cenário de revista. Iluminação ambiente, mesa impecável e gastronomia que surpreende.",
    image: dinnerImage,
    features: ["Decoração Completa", "Menu Exclusivo", "Ambiente Personalizado"],
  },
  {
    title: "Finger Food de Autor",
    subtitle: "Arte Comestível",
    description:
      "Criações gastronómicas que são verdadeiras obras de arte. Perfeitas para cocktails, aniversários e celebrações especiais.",
    image: fingerfoodImage,
    features: ["Apresentação Editorial", "Ingredientes Premium", "Criações Únicas"],
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
        index % 2 === 1 ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden group ${
          index % 2 === 1 ? "lg:order-2" : ""
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
      <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
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
          Saber Mais
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
            O Que Oferecemos
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Experiências Únicas
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mb-6" />
          <p className="font-body text-sm md:text-base text-foreground/70 leading-relaxed">
            Cada momento merece ser extraordinário. Criamos experiências que transformam 
            celebrações em memórias inesquecíveis.
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
