import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

type AmbientMode = "rainy" | "sunset" | "night" | "library";

const modeConfig: Record<AmbientMode, { gradient: string; particles: string[]; overlay: string }> = {
  rainy: {
    gradient: "from-sky/20 via-lavender-light/15 to-mint-light/20",
    particles: ["💧", "🌧️", "☁️", "🌿"],
    overlay: "bg-sky/5",
  },
  sunset: {
    gradient: "from-peach-light/30 via-coral/10 to-honey/20",
    particles: ["🌅", "✨", "🌤️", "🦋"],
    overlay: "bg-peach/5",
  },
  night: {
    gradient: "from-secondary/20 via-lavender-light/10 to-sky/10",
    particles: ["⭐", "🌙", "✨", "💫"],
    overlay: "bg-secondary/5",
  },
  library: {
    gradient: "from-cream/30 via-peach-light/15 to-honey/15",
    particles: ["📚", "🕯️", "🍂", "☕"],
    overlay: "bg-cream/10",
  },
};

interface AmbientBackgroundProps {
  mode: AmbientMode;
}

const AmbientBackground = ({ mode }: AmbientBackgroundProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const config = modeConfig[mode];

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 16 + 12,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 10,
      emoji: config.particles[Math.floor(Math.random() * config.particles.length)],
    }));
    setParticles(newParticles);
  }, [mode]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Base gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} transition-all duration-1000`} />

      {/* Overlay */}
      <div className={`absolute inset-0 ${config.overlay} transition-all duration-1000`} />

      {/* Floating particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute opacity-40"
          style={{
            left: `${p.x}%`,
            fontSize: `${p.size}px`,
            animation: `particle-float ${p.duration}s linear ${p.delay}s infinite`,
          }}
        >
          {p.emoji}
        </span>
      ))}

      {/* Soft radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
    </div>
  );
};

export default AmbientBackground;
export type { AmbientMode };
