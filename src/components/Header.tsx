import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardList } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "O que fazemos", href: "#servicos", type: "anchor" as const },
    { label: "Pacotes & Preços", href: "#pacotes", type: "anchor" as const },
    { label: "Extras", href: "#extras", type: "anchor" as const },
    { label: "Galeria", href: "#galeria", type: "anchor" as const },
    { label: "Como reservar", href: "#como-funciona", type: "anchor" as const },
    { label: "O Diário da Mesa", href: "/diario", type: "route" as const },
  ];

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, item: typeof navItems[0]) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (item.type === "route") {
      navigate(item.href);
      return;
    }

    // If on another page, navigate home first then scroll
    if (location.pathname !== "/") {
      navigate("/" + item.href);
      return;
    }

    const targetId = item.href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      setTimeout(() => {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, isMobileMenuOpen ? 150 : 0);
    }
  }, [isMobileMenuOpen, navigate, location.pathname]);

  const handleLogoClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [navigate, location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "shadow-soft py-3" : "py-4"
      }`}
      style={{ backgroundColor: 'hsl(45, 35%, 97%)' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" onClick={handleLogoClick} className="flex items-center shrink-0 mr-4 sm:mr-6 lg:mr-10">
            <img
              src={logo}
              alt="Do Luxo à Mesa - Eventos e Catering"
              className="h-[56px] sm:h-[64px] lg:h-[80px] w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className="font-body text-[11px] uppercase tracking-[0.18em] text-foreground/75 hover:text-gold transition-colors duration-300 link-underline"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right side: Cart icon only */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 hover:text-gold transition-colors duration-300"
              aria-label="A Minha Proposta"
              title="A Minha Proposta"
            >
              <ClipboardList className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-gold text-white text-[10px] font-body rounded-full">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile: Cart + Menu */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2"
              aria-label="A Minha Proposta"
              title="A Minha Proposta"
            >
              <ClipboardList className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-gold text-white text-[10px] font-body rounded-full">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              aria-label="Menu"
            >
              <motion.span animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="w-6 h-px block bg-foreground" />
              <motion.span animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }} className="w-6 h-px block bg-foreground" />
              <motion.span animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="w-6 h-px block bg-foreground" />
            </button>
          </div>
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
            style={{ backgroundColor: 'hsl(45, 35%, 97%)' }}
          >
            <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={(e) => handleNavClick(e, item)}
                  className="font-body text-sm uppercase tracking-[0.15em] text-foreground/80 hover:text-gold transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
