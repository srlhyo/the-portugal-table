import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    quote:
      "Nunca imaginei que a minha sala pudesse ficar tão elegante. Foi como viver num editorial de revista por uma noite.",
    author: "Maria C.",
    event: "Jantar de Aniversário",
  },
  {
    quote:
      "Cada detalhe foi pensado com tanto carinho. As minhas amigas ficaram encantadas com o brunch.",
    author: "Ana S.",
    event: "Baby Shower",
  },
  {
    quote:
      "Profissionalismo e requinte num nível que nunca tinha visto. Superou todas as expectativas.",
    author: "Joana M.",
    event: "Celebração Íntima",
  },
];

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
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
            Testemunhos
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            O Que Dizem
          </h2>
          <div 
            className="w-16 h-px mx-auto"
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(43, 65%, 50%), hsl(45, 50%, 68%), hsl(43, 65%, 50%), transparent)',
              boxShadow: '0 0 8px hsla(42, 65%, 45%, 0.3)'
            }}
          />
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-card p-8 lg:p-10 border border-border/50 hover:border-gold/30 transition-all duration-500 group"
            >
              {/* Quote Mark - Chrome Gold */}
              <div 
                className="font-display text-6xl leading-none mb-4"
                style={{
                  background: 'linear-gradient(135deg, hsl(42, 65%, 45%), hsl(43, 55%, 58%), hsl(45, 50%, 70%))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  opacity: 0.5
                }}
              >
                "
              </div>
              
              {/* Quote Text */}
              <p className="font-display text-lg lg:text-xl text-foreground italic leading-relaxed mb-8">
                {testimonial.quote}
              </p>

              {/* Separator - Chrome Gold */}
              <div 
                className="w-12 h-px mb-6"
                style={{
                  background: 'linear-gradient(90deg, hsl(43, 65%, 50%), hsl(45, 50%, 68%), transparent)',
                  boxShadow: '0 0 6px hsla(42, 65%, 45%, 0.2)'
                }}
              />

              {/* Author */}
              <div>
                <p className="font-body text-sm text-foreground font-medium">
                  {testimonial.author}
                </p>
                <p className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground mt-1">
                  {testimonial.event}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
