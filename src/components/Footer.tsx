const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background py-16 lg:py-20 border-t border-border">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16 mb-16">
          {/* Brand - Sem ® */}
          <div>
            <a href="#" className="inline-block mb-6">
              <span className="font-display text-2xl lg:text-3xl text-foreground">
                Do Luxo à Mesa
              </span>
            </a>
            <p className="font-body text-sm text-foreground/60 leading-relaxed max-w-xs mb-4">
              Experiências premium de buffet e decoração que transformam 
              qualquer espaço numa celebração memorável.
            </p>
            <p className="font-display text-lg text-foreground/80 italic">
              Luxo com vida. Glamour moderno.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 
              className="font-body text-xs uppercase tracking-[0.2em] mb-6"
              style={{
                background: 'linear-gradient(90deg, hsl(42, 65%, 45%), hsl(43, 55%, 55%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Navegação
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { label: "Serviços", href: "#servicos" },
                { label: "Pacotes", href: "#pacotes" },
                { label: "Galeria", href: "#galeria" },
                { label: "Como Funciona", href: "#como-funciona" },
                { label: "Pedir Orçamento", href: "#contacto" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-body text-sm text-foreground/60 hover:text-gold transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 
              className="font-body text-xs uppercase tracking-[0.2em] mb-6"
              style={{
                background: 'linear-gradient(90deg, hsl(42, 65%, 45%), hsl(43, 55%, 55%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Contactos
            </h4>
            <div className="space-y-3">
              <a
                href="https://instagram.com/doluxoamesa"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-foreground/60 hover:text-gold transition-colors block"
              >
                Instagram — @doluxoamesa
              </a>
              <a
                href="https://wa.me/351912345678"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-foreground/60 hover:text-gold transition-colors block"
              >
                WhatsApp — +351 912 345 678
              </a>
              <a
                href="mailto:hello@doluxoamesa.pt"
                className="font-body text-sm text-foreground/60 hover:text-gold transition-colors block"
              >
                hello@doluxoamesa.pt
              </a>
              <p className="font-body text-sm text-foreground/60">
                Portugal Continental
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Sem ® */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-foreground/40 uppercase tracking-[0.1em]">
            © {currentYear} Do Luxo à Mesa. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="font-body text-xs text-foreground/40 hover:text-gold transition-colors uppercase tracking-[0.1em]"
            >
              Privacidade
            </a>
            <a
              href="#"
              className="font-body text-xs text-foreground/40 hover:text-gold transition-colors uppercase tracking-[0.1em]"
            >
              Termos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
