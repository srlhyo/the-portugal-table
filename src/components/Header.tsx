import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Experiências", href: "#experiencias" },
    { label: "Pacotes", href: "#pacotes" },
    { label: "Galeria", href: "#galeria" },
    { label: "Como Funciona", href: "#como-funciona" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <>
      {/* Header gradient overlay for initial legibility */}
      <div 
        className={`fixed top-0 left-0 right-0 h-32 z-40 pointer-events-none transition-opacity duration-500 ${
          isScrolled ? "opacity-0" : "opacity-100"
        }`}
        style={{
          background: 'linear-gradient(to bottom, hsla(25, 15%, 10%, 0.7) 0%, hsla(25, 15%, 10%, 0) 100%)'
        }}
      />
      
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/98 backdrop-blur-md shadow-soft py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex flex-col items-start">
              <span className={`font-display text-2xl lg:text-3xl tracking-wide transition-colors duration-300 ${
                isScrolled ? "text-foreground" : "text-white"
              }`}>
                Do Luxo à Mesa
              </span>
              <span className={`text-[10px] font-body uppercase tracking-[0.3em] transition-colors duration-300 ${
                isScrolled ? "text-gold" : "text-gold-light"
              }`}
              style={!isScrolled ? {
                background: 'linear-gradient(90deg, hsl(43, 55%, 58%), hsl(45, 50%, 68%), hsl(43, 55%, 58%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              } : {}}>
                Experiências Privadas
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`font-body text-xs uppercase tracking-[0.2em] transition-colors duration-300 link-underline ${
                    isScrolled 
                      ? "text-foreground/80 hover:text-gold" 
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* CTA Button - Desktop */}
            <a
              href="#contacto"
              className={`hidden lg:block font-body text-xs uppercase tracking-[0.2em] px-6 py-3 transition-all duration-500 ${
                isScrolled 
                  ? "border border-gold text-gold hover:bg-gold hover:text-primary"
                  : "border border-white/70 text-white hover:bg-white/10"
              }`}
            >
              Pedir Orçamento
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              aria-label="Menu"
            >
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className={`w-6 h-px block transition-colors ${isScrolled ? "bg-foreground" : "bg-white"}`}
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className={`w-6 h-px block transition-colors ${isScrolled ? "bg-foreground" : "bg-white"}`}
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className={`w-6 h-px block transition-colors ${isScrolled ? "bg-foreground" : "bg-white"}`}
              />
            </button>
          </nav>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-background border-t border-border"
            >
              <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-body text-sm uppercase tracking-[0.2em] text-foreground/80 hover:text-gold transition-colors"
                  >
                    {item.label}
                  </motion.a>
                ))}
                <a
                  href="#contacto"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-body text-sm uppercase tracking-[0.2em] text-center mt-4 btn-chrome-gold"
                >
                  Pedir Orçamento
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
