import { useState, useEffect, useCallback } from "react";
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
    { label: "Serviços", href: "#servicos" },
    { label: "Pacotes", href: "#pacotes" },
    { label: "Galeria", href: "#galeria" },
    { label: "Como Funciona", href: "#como-funciona" },
    { label: "Contacto", href: "#contacto" },
  ];

  // Smooth scroll handler that accounts for navbar height
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // Close mobile menu first
    setIsMobileMenuOpen(false);
    
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Small delay to allow mobile menu to close
      setTimeout(() => {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, isMobileMenuOpen ? 150 : 0);
    }
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "shadow-soft py-3"
          : "py-4"
      }`}
      style={{
        backgroundColor: 'hsl(45, 35%, 97%)',
      }}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex flex-col items-start">
            <span className="font-display text-2xl lg:text-3xl tracking-wide text-foreground">
              Do Luxo à Mesa
            </span>
            <span 
              className="text-[10px] font-body uppercase tracking-[0.25em] text-gold"
            >
              Experiências Premium
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="font-body text-[11px] uppercase tracking-[0.18em] text-foreground/75 hover:text-gold transition-colors duration-300 link-underline"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <a
            href="#contacto"
            onClick={(e) => handleNavClick(e, '#contacto')}
            className="hidden lg:block btn-outline-gold text-[10px] py-3 px-8"
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
              className="w-6 h-px block bg-foreground"
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-px block bg-foreground"
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-6 h-px block bg-foreground"
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
            className="lg:hidden border-t border-border"
            style={{
              backgroundColor: 'hsl(45, 35%, 97%)',
            }}
          >
            <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="font-body text-sm uppercase tracking-[0.15em] text-foreground/80 hover:text-gold transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
              <a
                href="#contacto"
                onClick={(e) => handleNavClick(e, '#contacto')}
                className="font-body text-sm uppercase tracking-[0.15em] text-center mt-4 btn-outline-gold py-3"
              >
                Pedir Orçamento
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
