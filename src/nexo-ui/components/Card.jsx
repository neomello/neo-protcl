import { cn } from "../utils/cn";
import particles from "../particles.json";

export function Card({ 
  title, 
  subtitle, 
  icon = particles.nucleus, 
  children, 
  className,
  variant = "default", // "default" | "glass" | "minimal"
  glow = false
}) {
  const variants = {
    default: "bg-depth border border-anomaly/40 rounded-neo",
    glass: cn(
      "bg-[rgba(28,28,30,0.7)] backdrop-blur-[50px] backdrop-saturate-[200%]",
      "border border-white/12 rounded-neo",
      "shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)]"
    ),
    minimal: "bg-carbon/50 border border-anomaly/20 rounded-neo"
  };

  const glowClass = glow ? "shadow-[0_4px_20px_rgba(52,225,255,0.15)]" : "";

  return (
    <div 
      className={cn(
        variants[variant] || variants.default,
        "p-u3 text-white font-sans transition-all",
        glowClass,
        className
      )}
    >
      {title && (
        <div className="flex items-center gap-u2 mb-u2">
          <span className="text-glitch text-xl font-mono">{icon}</span>
          <h3 className="text-lg tracking-tight font-semibold">{title}</h3>
        </div>
      )}

      {subtitle && (
        <p className="text-sm opacity-60 mb-u2 text-gray-300">{subtitle}</p>
      )}

      {children}
    </div>
  );
}

