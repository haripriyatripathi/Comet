import { motion } from "framer-motion";
import { Trophy, Zap, Clock, TrendingUp } from "lucide-react";

interface XPBarProps {
  xp: number;
  level: number;
  title: string;
  focusMinutesToday: number;
}

const levelTitles = [
  "Beginner Bean 🫘",
  "Curious Sprout 🌱",
  "Steady Stepper 👟",
  "Focus Fox 🦊",
  "Silent Scholar 📖",
  "Cozy Champion 🏆",
  "Midnight Master 🌙",
  "Zen Legend ✨",
];

const xpPerLevel = 500;

const XPBar = ({ xp, level, title, focusMinutesToday }: XPBarProps) => {
  const xpInLevel = xp % xpPerLevel;
  const progress = (xpInLevel / xpPerLevel) * 100;

  return (
    <div className="glass-card p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Trophy className="w-5 h-5 text-honey" />
          </motion.div>
          <div>
            <p className="text-xs text-muted-foreground">level {level}</p>
            <p className="font-display font-semibold text-sm text-foreground">{title}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Zap className="w-3 h-3 text-honey" />
            {xp} XP
          </p>
        </div>
      </div>

      {/* XP Progress */}
      <div className="space-y-1">
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full gradient-sunset rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <p className="text-xs text-muted-foreground text-right">
          {xpInLevel}/{xpPerLevel} XP to level {level + 1}
        </p>
      </div>

      {/* Stats row */}
      <div className="flex gap-3">
        <div className="flex-1 bg-muted/30 rounded-xl p-2.5 text-center">
          <Clock className="w-4 h-4 text-lavender mx-auto mb-1" />
          <p className="text-lg font-display font-bold text-foreground">{focusMinutesToday}</p>
          <p className="text-xs text-muted-foreground">min today</p>
        </div>
        <div className="flex-1 bg-muted/30 rounded-xl p-2.5 text-center">
          <TrendingUp className="w-4 h-4 text-mint mx-auto mb-1" />
          <p className="text-lg font-display font-bold text-foreground">{level}</p>
          <p className="text-xs text-muted-foreground">level</p>
        </div>
      </div>
    </div>
  );
};

export { levelTitles, xpPerLevel };
export default XPBar;
