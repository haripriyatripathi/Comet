import { motion } from "framer-motion";
import { Cloud, Sunset, Moon, BookOpen } from "lucide-react";
import type { AmbientMode } from "./AmbientBackground";

const modes: { mode: AmbientMode; icon: React.ReactNode; label: string; emoji: string }[] = [
  { mode: "rainy", icon: <Cloud className="w-4 h-4" />, label: "rainy", emoji: "🌧️" },
  { mode: "sunset", icon: <Sunset className="w-4 h-4" />, label: "sunset", emoji: "🌅" },
  { mode: "night", icon: <Moon className="w-4 h-4" />, label: "night", emoji: "🌙" },
  { mode: "library", icon: <BookOpen className="w-4 h-4" />, label: "library", emoji: "📚" },
];

interface ModeSelectorProps {
  current: AmbientMode;
  onChange: (mode: AmbientMode) => void;
}

const ModeSelector = ({ current, onChange }: ModeSelectorProps) => (
  <div className="flex gap-2">
    {modes.map((m) => (
      <motion.button
        key={m.mode}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onChange(m.mode)}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
          current === m.mode
            ? "glass-card-strong text-foreground shadow-md"
            : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
        }`}
      >
        <span>{m.emoji}</span>
        {m.label}
      </motion.button>
    ))}
  </div>
);

export default ModeSelector;
