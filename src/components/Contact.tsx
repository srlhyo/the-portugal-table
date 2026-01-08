import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    event: "",
    date: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert("Obrigada pelo seu contacto! Responderemos em breve.");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
            <span className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-8 block">
              Vamos Conversar
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-6">
              Reserve a Sua Experiência
            </h2>
            <div className="w-16 h-px bg-gold mb-8" />
            <p className="font-body text-sm md:text-base text-primary-foreground/80 leading-relaxed mb-12">
              Cada evento é único e merece atenção personalizada. Partilhe connosco 
              a sua visão e criaremos juntos uma experiência extraordinária.
            </p>

            {/* Contact Details */}
            <div className="space-y-6">
              <div>
                <p className="font-body text-xs uppercase tracking-[0.2em] text-gold mb-2">
                  Email
                </p>
                <a
                  href="mailto:hello@doluxoamesa.pt"
                  className="font-display text-xl text-primary-foreground hover:text-gold transition-colors"
                >
                  hello@doluxoamesa.pt
                </a>
              </div>
              <div>
                <p className="font-body text-xs uppercase tracking-[0.2em] text-gold mb-2">
                  Telefone
                </p>
                <a
                  href="tel:+351912345678"
                  className="font-display text-xl text-primary-foreground hover:text-gold transition-colors"
                >
                  +351 912 345 678
                </a>
              </div>
              <div>
                <p className="font-body text-xs uppercase tracking-[0.2em] text-gold mb-2">
                  Instagram
                </p>
                <a
                  href="https://instagram.com/doluxoamesa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-xl text-primary-foreground hover:text-gold transition-colors"
                >
                  @doluxoamesa
                </a>
              </div>
              <div>
                <p className="font-body text-xs uppercase tracking-[0.2em] text-gold mb-2">
                  Localização
                </p>
                <p className="font-display text-xl text-primary-foreground">
                  Portugal
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="font-body text-xs uppercase tracking-[0.15em] text-gold block mb-3">
                    Nome *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-primary-foreground/30 py-3 font-body text-primary-foreground placeholder:text-primary-foreground/40 focus:border-gold focus:outline-none transition-colors"
                    placeholder="O seu nome"
                  />
                </div>
                <div>
                  <label className="font-body text-xs uppercase tracking-[0.15em] text-gold block mb-3">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-primary-foreground/30 py-3 font-body text-primary-foreground placeholder:text-primary-foreground/40 focus:border-gold focus:outline-none transition-colors"
                    placeholder="email@exemplo.pt"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="font-body text-xs uppercase tracking-[0.15em] text-gold block mb-3">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-primary-foreground/30 py-3 font-body text-primary-foreground placeholder:text-primary-foreground/40 focus:border-gold focus:outline-none transition-colors"
                    placeholder="+351 900 000 000"
                  />
                </div>
                <div>
                  <label className="font-body text-xs uppercase tracking-[0.15em] text-gold block mb-3">
                    Data do Evento
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-primary-foreground/30 py-3 font-body text-primary-foreground focus:border-gold focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="font-body text-xs uppercase tracking-[0.15em] text-gold block mb-3">
                  Tipo de Evento
                </label>
                <select
                  name="event"
                  value={formData.event}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-primary-foreground/30 py-3 font-body text-primary-foreground focus:border-gold focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="" className="bg-primary text-primary-foreground">
                    Selecione uma opção
                  </option>
                  <option value="brunch" className="bg-primary text-primary-foreground">
                    Brunch de Luxo
                  </option>
                  <option value="jantar" className="bg-primary text-primary-foreground">
                    Jantar Íntimo
                  </option>
                  <option value="aniversario" className="bg-primary text-primary-foreground">
                    Aniversário
                  </option>
                  <option value="babyshower" className="bg-primary text-primary-foreground">
                    Baby Shower
                  </option>
                  <option value="cocktail" className="bg-primary text-primary-foreground">
                    Cocktail Party
                  </option>
                  <option value="outro" className="bg-primary text-primary-foreground">
                    Outro
                  </option>
                </select>
              </div>

              <div>
                <label className="font-body text-xs uppercase tracking-[0.15em] text-gold block mb-3">
                  Mensagem
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-transparent border-b border-primary-foreground/30 py-3 font-body text-primary-foreground placeholder:text-primary-foreground/40 focus:border-gold focus:outline-none transition-colors resize-none"
                  placeholder="Conte-nos sobre o seu evento..."
                />
              </div>

              <div className="pt-6">
                <Button
                  type="submit"
                  variant="luxury"
                  size="luxury"
                  className="w-full md:w-auto bg-gold text-primary hover:bg-gold-light"
                >
                  Enviar Pedido
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
