import { motion } from "framer-motion";
import { Flame, Snowflake, Star } from "lucide-react";

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
  hasCheckedInToday: boolean;
  streakFreezes: number;
  onCheckIn: () => void;
  onUseFreeze: () => void;
}

const StreakCounter = ({
  currentStreak,
  longestStreak,
  hasCheckedInToday,
  streakFreezes,
  onCheckIn,
  onUseFreeze,
}: StreakCounterProps) => {
  return (
    <div className="glass-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-foreground">daily streak</h3>
        {currentStreak > 0 && (
          <motion.div
            className="flex items-center gap-1 text-coral font-display font-bold text-xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Flame className="w-5 h-5" />
            {currentStreak}
          </motion.div>
        )}
      </div>

      {/* Streak Visual */}
      <div className="flex items-center gap-1.5">
        {Array.from({ length: 7 }).map((_, i) => (
          <motion.div
            key={i}
            className={`h-8 flex-1 rounded-md flex items-center justify-center text-xs font-bold ${
              i < currentStreak % 7
                ? "gradient-peach text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            {i < currentStreak % 7 ? "🔥" : "·"}
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-honey" />
          best: {longestStreak} days
        </span>
        <span className="flex items-center gap-1">
          <Snowflake className="w-3.5 h-3.5 text-sky" />
          freezes: {streakFreezes}
        </span>
      </div>

      <div className="flex gap-2">
        {!hasCheckedInToday ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onCheckIn}
            className="flex-1 gradient-peach text-primary-foreground font-display font-semibold py-2.5 rounded-lg shadow-md"
          >
            ✨ check in today
          </motion.button>
        ) : (
          <div className="flex-1 bg-mint/20 text-accent-foreground font-display font-semibold py-2.5 rounded-lg text-center">
            ✅ checked in!
          </div>
        )}
        {streakFreezes > 0 && !hasCheckedInToday && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onUseFreeze}
            className="px-4 bg-sky/20 text-foreground font-display font-medium py-2.5 rounded-lg"
          >
            ❄️ freeze
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default StreakCounter;
