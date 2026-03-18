import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingCTA = () => {
  const location = useLocation();

  // Hide on the quote page
  if (location.pathname === "/quote") return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
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
