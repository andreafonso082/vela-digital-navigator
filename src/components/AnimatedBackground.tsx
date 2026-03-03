import { useEffect, useState } from "react";

const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* Deep gradient base layer */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(220 15% 8%) 0%, hsl(220 15% 4%) 60%, hsl(220 15% 3%) 100%)",
        }}
      />

      {/* Subtle warm accent - bottom left */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(circle at 15% 85%, hsl(0 60% 15% / 0.4) 0%, transparent 40%)",
          transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
          transition: "transform 0.4s ease-out",
        }}
      />

      {/* Cool depth accent - top right */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          background: "radial-gradient(circle at 85% 15%, hsl(220 30% 12% / 0.5) 0%, transparent 45%)",
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
          transition: "transform 0.3s ease-out",
        }}
      />

      {/* Very subtle primary glow - center */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: "radial-gradient(circle at 50% 50%, hsl(0 60% 20% / 0.15) 0%, transparent 50%)",
          transform: `translate(${mousePosition.x * 0.8}px, ${mousePosition.y * 0.8}px)`,
          transition: "transform 0.2s ease-out",
        }}
      />

      {/* Vignette effect for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, hsl(220 15% 2% / 0.6) 100%)",
        }}
      />

      {/* Fine noise texture for premium feel */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
