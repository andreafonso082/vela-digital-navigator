import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import velaLogo from "@/assets/vela-logo.png";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={velaLogo} alt="Vela Agency" className="h-8 w-8" />
              <span className="text-xl font-bold">Vela</span>
            </div>
            <p className="text-secondary-foreground/80 text-sm">
              Marketing profissional, rápido e acessível para pequenos negócios.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm">
                  Serviços
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold mb-4">Serviços</h3>
            <ul className="space-y-2 text-sm text-secondary-foreground/80">
              <li>Criação de Websites</li>
              <li>SEO & Google Meu Negócio</li>
              <li>Gestão de Redes Sociais</li>
              <li>Criação de Logotipos</li>
              <li>Fotografia Profissional</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-secondary-foreground/80">
                <Mail size={16} className="text-primary" />
                <span>info@velaagency.pt</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-secondary-foreground/80">
                <Phone size={16} className="text-primary" />
                <span>+351 912 345 678</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-secondary-foreground/80">
                <MapPin size={16} className="text-primary" />
                <span>Algarve, Portugal</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/10 mt-8 pt-8 text-center">
          <p className="text-sm text-secondary-foreground/60">
            © {new Date().getFullYear()} Vela Agency. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
