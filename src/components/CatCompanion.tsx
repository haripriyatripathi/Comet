import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const catLines = [
  "one tiny step still counts 🌱",
  "no zero days, bestie ✨",
  "you're doing amazing sweetie 💅",
  "rest is productive too 🌙",
  "main character energy today 🌟",
  "soft launch your goals 🎀",
  "it's giving productivity ✨",
  "literally so proud of you 🥺",
  "slay your tasks today 💪",
  "you ate that study sesh 🔥",
];

interface CatCompanionProps {
  userName: string;
  mood?: string;
  isActive?: boolean;
  streakCount?: number;
  taskCompleted?: boolean;
}

const CatCompanion = ({ userName, mood, isActive = true, streakCount = 0, taskCompleted = false }: CatCompanionProps) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [showMessage, setShowMessage] = useState(true);
  const [isSleeping, setIsSleeping] = useState(false);

  useEffect(() => {
    if (!isActive) {
      const timer = setTimeout(() => setIsSleeping(true), 10000);
      return () => clearTimeout(timer);
    }
    setIsSleeping(false);
  }, [isActive]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowMessage(false);
      setTimeout(() => {
        setCurrentLine((prev) => (prev + 1) % catLines.length);
        setShowMessage(true);
      }, 500);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const greeting = mood
    ? `hey ${userName}! feeling ${mood} today? let's go 💖`
    : `hey ${userName}! ready to slay? 🌸`;

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Cat Body */}
      <motion.div
        className="relative"
        animate={
          isSleeping
            ? { y: [0, -3, 0] }
            : taskCompleted
              ? { y: [0, -20, 0], rotate: [0, -5, 5, 0] }
              : { y: [0, -8, 0] }
        }
        transition={{
          duration: isSleeping ? 4 : taskCompleted ? 0.6 : 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Cat SVG */}
        <svg width="120" height="120" viewBox="0 0 120 120" className="drop-shadow-lg">
          {/* Ears */}
          <motion.path
            d="M30 50 L20 20 L45 40 Z"
            fill="hsl(15 80% 75%)"
            stroke="hsl(15 60% 60%)"
            strokeWidth="2"
          />
          <motion.path
            d="M90 50 L100 20 L75 40 Z"
            fill="hsl(15 80% 75%)"
            stroke="hsl(15 60% 60%)"
            strokeWidth="2"
          />
          {/* Inner ears */}
          <path d="M32 45 L25 25 L43 40 Z" fill="hsl(340 50% 82%)" />
          <path d="M88 45 L95 25 L77 40 Z" fill="hsl(340 50% 82%)" />
          {/* Head */}
          <circle cx="60" cy="62" r="32" fill="hsl(15 80% 75%)" stroke="hsl(15 60% 60%)" strokeWidth="2" />
          {/* Eyes */}
          {isSleeping ? (
            <>
              <path d="M45 58 Q50 62 55 58" stroke="hsl(25 30% 25%)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M65 58 Q70 62 75 58" stroke="hsl(25 30% 25%)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </>
          ) : (
            <>
              <motion.g animate={{ scaleY: [1, 1, 0.1, 1, 1] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 1] }}>
                <circle cx="48" cy="58" r="5" fill="hsl(25 30% 20%)" />
                <circle cx="72" cy="58" r="5" fill="hsl(25 30% 20%)" />
                <circle cx="50" cy="56" r="1.5" fill="hsl(0 0% 100%)" />
                <circle cx="74" cy="56" r="1.5" fill="hsl(0 0% 100%)" />
              </motion.g>
            </>
          )}
          {/* Nose */}
          <ellipse cx="60" cy="66" rx="3" ry="2" fill="hsl(340 50% 70%)" />
          {/* Mouth */}
          <path d="M57 68 Q60 72 63 68" stroke="hsl(25 30% 30%)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Whiskers */}
          <line x1="30" y1="62" x2="44" y2="64" stroke="hsl(25 20% 50%)" strokeWidth="1" />
          <line x1="30" y1="68" x2="44" y2="67" stroke="hsl(25 20% 50%)" strokeWidth="1" />
          <line x1="76" y1="64" x2="90" y2="62" stroke="hsl(25 20% 50%)" strokeWidth="1" />
          <line x1="76" y1="67" x2="90" y2="68" stroke="hsl(25 20% 50%)" strokeWidth="1" />
          {/* Blush */}
          <circle cx="40" cy="68" r="5" fill="hsl(340 60% 80%)" opacity="0.5" />
          <circle cx="80" cy="68" r="5" fill="hsl(340 60% 80%)" opacity="0.5" />
          {/* Body */}
          <ellipse cx="60" cy="100" rx="25" ry="16" fill="hsl(15 80% 75%)" stroke="hsl(15 60% 60%)" strokeWidth="2" />
          {/* Paws */}
          <ellipse cx="45" cy="112" rx="8" ry="5" fill="hsl(15 80% 78%)" stroke="hsl(15 60% 60%)" strokeWidth="1.5" />
          <ellipse cx="75" cy="112" rx="8" ry="5" fill="hsl(15 80% 78%)" stroke="hsl(15 60% 60%)" strokeWidth="1.5" />
          {/* Tail */}
          <motion.path
            d="M85 100 Q100 90 95 75"
            stroke="hsl(15 80% 72%)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            animate={{ d: ["M85 100 Q100 90 95 75", "M85 100 Q105 95 98 80", "M85 100 Q100 90 95 75"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>

        {/* Sleeping Zzz */}
        {isSleeping && (
          <motion.span
            className="absolute -top-2 -right-2 text-lg font-display text-muted-foreground"
            animate={{ opacity: [0, 1, 0], y: [0, -10] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💤
          </motion.span>
        )}

        {/* Streak fire */}
        {streakCount > 0 && (
          <motion.span
            className="absolute -top-3 left-1/2 -translate-x-1/2 text-xl"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            🔥
          </motion.span>
        )}
      </motion.div>

      {/* Speech Bubble */}
      <AnimatePresence mode="wait">
        {showMessage && (
          <motion.div
            key={currentLine}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="glass-card px-4 py-2 max-w-[260px] text-center relative"
          >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-card/60 border-l border-t border-border/40 rotate-45" />
            <p className="text-sm font-medium text-foreground">
              {currentLine === 0 ? greeting : catLines[currentLine]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CatCompanion;
