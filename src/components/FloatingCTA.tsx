import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero (500px)
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <Link to="/quote">
        <Button
          size="lg"
          className="bg-primary hover:bg-primary-hover text-primary-foreground rounded-full shadow-strong px-6 py-6 text-base font-semibold"
        >
          Pedir Orçamento
          <ArrowRight className="ml-2" size={18} />
        </Button>
      </Link>
    </div>
  );
};

export default FloatingCTA;
