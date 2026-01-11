import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    date: "",
    location: "",
    guests: "",
    wantsBuffet: "",
    wantsDecoration: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic will be added later
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
            <span 
              className="font-body text-xs uppercase tracking-[0.3em] mb-8 block"
              style={{
                background: 'linear-gradient(90deg, hsl(43, 55%, 58%), hsl(45, 50%, 72%), hsl(43, 55%, 58%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Vamos Conversar
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-6">
              Pedir Orçamento
            </h2>
            <div 
              className="w-16 h-px mb-8"
              style={{
                background: 'linear-gradient(90deg, hsl(43, 65%, 50%), hsl(45, 50%, 68%), transparent)',
                boxShadow: '0 0 8px hsla(42, 65%, 45%, 0.3)'
              }}
            />
            <p className="font-body text-sm md:text-base text-primary-foreground/80 leading-relaxed mb-12">
              Partilhe connosco os detalhes do seu evento e receba um orçamento 
              personalizado em 24 horas. Sem compromisso.
            </p>

            {/* Contact Details */}
            <div className="space-y-6 mb-12">
              <div>
                <p 
                  className="font-body text-xs uppercase tracking-[0.2em] mb-2"
                  style={{
                    background: 'linear-gradient(90deg, hsl(43, 55%, 58%), hsl(45, 50%, 72%))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
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
                <p 
                  className="font-body text-xs uppercase tracking-[0.2em] mb-2"
                  style={{
                    background: 'linear-gradient(90deg, hsl(43, 55%, 58%), hsl(45, 50%, 72%))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  WhatsApp
                </p>
                <a
                  href="https://wa.me/351912345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-xl text-primary-foreground hover:opacity-80 transition-opacity"
                >
                  +351 912 345 678
                </a>
              </div>
              <div>
                <p 
                  className="font-body text-xs uppercase tracking-[0.2em] mb-2"
                  style={{
                    background: 'linear-gradient(90deg, hsl(43, 55%, 58%), hsl(45, 50%, 72%))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
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
                <p 
                  className="font-body text-xs uppercase tracking-[0.2em] mb-2"
                  style={{
                    background: 'linear-gradient(90deg, hsl(43, 55%, 58%), hsl(45, 50%, 72%))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Localização
                </p>
                <p className="font-display text-xl text-primary-foreground">
                  Portugal Continental
                </p>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/351912345678?text=Olá! Gostaria de pedir um orçamento para um evento."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 btn-chrome-gold"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Contactar por WhatsApp
            </a>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label 
                    className="font-body text-xs uppercase tracking-[0.15em] block mb-3"
                    style={{
                      background: 'linear-gradient(90deg, hsl(43, 55%, 58%), hsl(45, 50%, 72%))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    Nome *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-primary-foreground/40 py-3 font-body text-primary-foreground placeholder:text-primary-foreground/50 focus:border-gold focus:outline-none transition-colors"
                    placeholder="O seu nome"
                  />
                </div>
                <div>
                  <label 
                    className="font-body text-xs uppercase tracking-[0.15em] block mb-3"
                    style={{
                      background: 'linear-gradient(90deg, hsl(43, 55%, 58%), hsl(45, 50%, 72%))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-primary-foreground/40 py-3 font-body text-primary-foreground placeholder:text-primary-foreground/50 focus:border-gold focus:outline-none transition-colors"
                    placeholder="email@exemplo.pt"
                  />
                </div>
              </div>

              {/* WhatsApp & Date */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label 
                    className="font-body text-xs uppercase tracking-[0.15em] block mb-3"
                    style={{
                      background: 'linear-gradient(90deg, hsl(43, 55%, 58%), hsl(45, 50%, 72%))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-primary-foreground/40 py-3 font-body text-primary-foreground placeholder:text-primary-foreground/50 focus:border-gold focus:outline-none transition-colors"
                    placeholder="+351 900 000 000"
                  />
                </div>
                <div>
                  <label 
                    className="font-body text-xs uppercase tracking-[0.15em] block mb-3"
                    style={{
                      background: 'linear-gradient(90deg, hsl(43, 55%, 58%), hsl(45, 50%, 72%))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    Data do Evento
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-primary-foreground/40 py-3 font-body text-primary-foreground focus:border-gold focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Location & Guests */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label 
                    className="font-body text-xs uppercase tracking-[0.15em] block mb-3"
                    style={{
                      background: 'linear-gradient(90deg, hsl(43, 55%, 58%), hsl(45, 50%, 72%))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    Local
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-primary-foreground/40 py-3 font-body text-primary-foreground placeholder:text-primary-foreground/50 focus:border-gold focus:outline-none transition-colors"
                    placeholder="Lisboa, Cascais, etc."
                  />
                </div>
                <div>
                  <label 
                    className="font-body text-xs uppercase tracking-[0.15em] block mb-3"
                    style={{
                      background: 'linear-gradient(90deg, hsl(43, 55%, 58%), hsl(45, 50%, 72%))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    Número de Convidados
                  </label>
                  <input
                    type="text"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-primary-foreground/40 py-3 font-body text-primary-foreground placeholder:text-primary-foreground/50 focus:border-gold focus:outline-none transition-colors"
                    placeholder="Ex: 25 pessoas"
                  />
                </div>
              </div>

              {/* Service Type */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label 
                    className="font-body text-xs uppercase tracking-[0.15em] block mb-3"
                    style={{
                      background: 'linear-gradient(90deg, hsl(43, 55%, 58%), hsl(45, 50%, 72%))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    Buffet
                  </label>
                  <select
                    name="wantsBuffet"
                    value={formData.wantsBuffet}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-primary-foreground/40 py-3 font-body text-primary-foreground focus:border-gold focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="" className="bg-primary text-primary-foreground">
                      Selecione
                    </option>
                    <option value="sim" className="bg-primary text-primary-foreground">
                      Sim, quero buffet
                    </option>
                    <option value="nao" className="bg-primary text-primary-foreground">
                      Não
                    </option>
                  </select>
                </div>
                <div>
                  <label 
                    className="font-body text-xs uppercase tracking-[0.15em] block mb-3"
                    style={{
                      background: 'linear-gradient(90deg, hsl(43, 55%, 58%), hsl(45, 50%, 72%))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    Decoração
                  </label>
                  <select
                    name="wantsDecoration"
                    value={formData.wantsDecoration}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-primary-foreground/40 py-3 font-body text-primary-foreground focus:border-gold focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="" className="bg-primary text-primary-foreground">
                      Selecione
                    </option>
                    <option value="sim" className="bg-primary text-primary-foreground">
                      Sim, quero decoração
                    </option>
                    <option value="nao" className="bg-primary text-primary-foreground">
                      Não
                    </option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label 
                  className="font-body text-xs uppercase tracking-[0.15em] block mb-3"
                  style={{
                    background: 'linear-gradient(90deg, hsl(43, 55%, 58%), hsl(45, 50%, 72%))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Mensagem
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-transparent border-b border-primary-foreground/40 py-3 font-body text-primary-foreground placeholder:text-primary-foreground/50 focus:border-gold focus:outline-none transition-colors resize-none"
                  placeholder="Conte-nos mais sobre o seu evento..."
                />
              </div>

              {/* Submit */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full btn-chrome-gold text-sm py-5"
                >
                  Pedir Orçamento
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
