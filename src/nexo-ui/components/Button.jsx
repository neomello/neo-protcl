import { cn } from "../utils/cn";
import { soundManager } from "../../utils/sounds";

export function Button({ 
  children, 
  className, 
  variant = "primary", 
  glow = true,
  onClick,
  ...props 
}) {
  const baseClasses = "px-u3 py-u2 rounded-neo font-sans tracking-wide transition-all backdrop-blur-sm";
  
  const variants = {
    primary: cn(
      "border-2 border-glitch/50 bg-gray-800/50 text-glitch",
      "hover:border-glitch hover:bg-gray-800/70"
    ),
    secondary: cn(
      "border-2 border-anomaly/50 bg-gray-800/50 text-anomaly",
      "hover:border-anomaly hover:bg-gray-800/70"
    ),
    signal: cn(
      "border-2 border-signal/50 bg-gray-800/50 text-signal",
      "hover:border-signal hover:bg-gray-800/70"
    ),
    minimal: cn(
      "border border-anomaly/40 text-anomaly bg-depth/50",
      "hover:bg-depth hover:border-anomaly/60"
    )
  };

  const glowStyles = {
    primary: glow ? {
      boxShadow: "0 0 15px rgba(52, 225, 255, 0.3), inset 0 0 10px rgba(52, 225, 255, 0.1)",
      textShadow: "0 0 8px rgba(52, 225, 255, 0.6)"
    } : {},
    secondary: glow ? {
      boxShadow: "0 0 15px rgba(26, 154, 247, 0.3), inset 0 0 10px rgba(26, 154, 247, 0.1)",
      textShadow: "0 0 8px rgba(26, 154, 247, 0.6)"
    } : {},
    signal: glow ? {
      boxShadow: "0 0 15px rgba(123, 93, 255, 0.3), inset 0 0 10px rgba(123, 93, 255, 0.1)",
      textShadow: "0 0 8px rgba(123, 93, 255, 0.6)"
    } : {},
    minimal: {}
  };

  const handleClick = (e) => {
    try {
      if (soundManager && soundManager.playClick) {
        soundManager.playClick();
      }
    } catch (err) {
      // Ignora se soundManager não estiver disponível
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      className={cn(
        baseClasses,
        variants[variant] || variants.primary,
        "font-mono text-sm",
        className
      )}
      style={glowStyles[variant] || glowStyles.primary}
    >
      {children}
    </button>
  );
}

