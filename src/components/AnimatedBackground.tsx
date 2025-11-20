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
      {/* Layer 1 - Deepest */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(circle at 20% 80%, hsl(0 86% 20% / 0.3) 0%, transparent 50%)",
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
          transition: "transform 0.3s ease-out",
        }}
      />

      {/* Layer 2 - Middle depth */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: "radial-gradient(circle at 80% 20%, hsl(0 86% 30% / 0.4) 0%, transparent 50%)",
          transform: `translate(${mousePosition.x * 1}px, ${mousePosition.y * 1}px)`,
          transition: "transform 0.2s ease-out",
        }}
      />

      {/* Layer 3 - Closest */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(circle at 50% 50%, hsl(0 86% 40% / 0.2) 0%, transparent 60%)",
          transform: `translate(${mousePosition.x * 1.5}px, ${mousePosition.y * 1.5}px)`,
          transition: "transform 0.15s ease-out",
        }}
      />

      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-primary/5 rounded-full blur-2xl animate-pulse delay-2000" />
      </div>

      {/* Diagonal gradient overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: "linear-gradient(135deg, transparent 0%, hsl(0 86% 20% / 0.2) 50%, transparent 100%)",
        }}
      />

      {/* Noise texture overlay for depth */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
