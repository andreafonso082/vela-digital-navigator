import { useEffect, useState } from "react";

const F1CarAnimation = () => {
  const [phase, setPhase] = useState<"stopped" | "accelerating" | "resetting">("stopped");

  useEffect(() => {
    const runAnimation = () => {
      // Start stopped
      setPhase("stopped");
      
      // After 1s, accelerate
      const accelerateTimer = setTimeout(() => {
        setPhase("accelerating");
      }, 1000);

      // After acceleration completes (1.2s), reset position instantly
      const resetTimer = setTimeout(() => {
        setPhase("resetting");
      }, 2200);

      // After instant reset, go back to stopped
      const stoppedTimer = setTimeout(() => {
        setPhase("stopped");
      }, 2250);

      return () => {
        clearTimeout(accelerateTimer);
        clearTimeout(resetTimer);
        clearTimeout(stoppedTimer);
      };
    };

    runAnimation();
    const interval = setInterval(runAnimation, 4000);

    return () => clearInterval(interval);
  }, []);

  const getTransformStyle = () => {
    switch (phase) {
      case "stopped":
        return {
          transform: "translateX(0)",
          transition: "none",
          opacity: 1,
        };
      case "accelerating":
        return {
          transform: "translateX(150%)",
          transition: "transform 1.2s cubic-bezier(0.33, 1, 0.68, 1), opacity 0.3s ease-out",
          opacity: 0,
        };
      case "resetting":
        return {
          transform: "translateX(0)",
          transition: "none",
          opacity: 0,
        };
      default:
        return {};
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <svg
        viewBox="0 0 64 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 text-primary"
        style={getTransformStyle()}
      >
        {/* F1 Car Body */}
        <path
          d="M8 18 L12 14 L20 13 L26 10 L38 10 L44 12 L52 12 L56 14 L58 18 L56 20 L8 20 L8 18"
          fill="currentColor"
        />
        {/* Front Wing */}
        <path
          d="M4 18 L8 16 L8 20 L4 22 Z"
          fill="currentColor"
        />
        {/* Rear Wing */}
        <path
          d="M54 8 L58 8 L58 12 L54 12 Z"
          fill="currentColor"
        />
        <path
          d="M52 6 L60 6 L60 8 L52 8 Z"
          fill="currentColor"
        />
        {/* Cockpit */}
        <ellipse
          cx="32"
          cy="13"
          rx="5"
          ry="3"
          fill="hsl(var(--card))"
        />
        {/* Driver helmet */}
        <circle
          cx="32"
          cy="12"
          r="2"
          fill="hsl(var(--foreground))"
        />
        {/* Front Wheel */}
        <circle
          cx="16"
          cy="22"
          r="5"
          fill="hsl(var(--foreground))"
        />
        <circle
          cx="16"
          cy="22"
          r="2"
          fill="hsl(var(--muted))"
        />
        {/* Rear Wheel */}
        <circle
          cx="48"
          cy="22"
          r="5"
          fill="hsl(var(--foreground))"
        />
        <circle
          cx="48"
          cy="22"
          r="2"
          fill="hsl(var(--muted))"
        />
      </svg>
    </div>
  );
};

export default F1CarAnimation;
