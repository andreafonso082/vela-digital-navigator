import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import velaLogo from "@/assets/vela-logo.png";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [{
    name: "Home",
    path: "/"
  }, {
    name: "Sobre Nós",
    path: "/about"
  }, {
    name: "Serviços",
    path: "/services"
  }, {
    name: "Blog",
    path: "/blog"
  }, {
    name: "Contactos",
    path: "/contact"
  }];
  return <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src={velaLogo} alt="Vela Agency" className="h-10 w-10 transition-transform group-hover:scale-105" />
            <span className="text-2xl font-bold text-secondary">Vela</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => <Link key={link.path} to={link.path} className="text-foreground hover:text-primary transition-colors font-medium">
                {link.name}
              </Link>)}
            <Link to="/quote">
              <Button variant="default" className="bg-primary hover:bg-primary-hover text-primary-foreground">
                Pedir Orçamento
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className="md:hidden mt-4 pb-4 space-y-4 border-t border-border pt-4">
            {navLinks.map(link => <Link key={link.path} to={link.path} className="block text-foreground hover:text-primary transition-colors font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </Link>)}
            <Link to="/quote" onClick={() => setIsMenuOpen(false)}>
              <Button variant="default" className="w-full bg-primary hover:bg-primary-hover text-primary-foreground">
                Pedir Orçamento
              </Button>
            </Link>
          </div>}
      </nav>
    </header>;
};
export default Header;