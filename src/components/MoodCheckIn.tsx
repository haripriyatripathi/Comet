import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const moods = [
  { emoji: "😊", label: "happy", color: "bg-honey/20" },
  { emoji: "😌", label: "calm", color: "bg-mint/20" },
  { emoji: "😴", label: "tired", color: "bg-lavender/20" },
  { emoji: "😤", label: "stressed", color: "bg-coral/20" },
  { emoji: "🥺", label: "anxious", color: "bg-sky/20" },
  { emoji: "😎", label: "motivated", color: "bg-peach/20" },
];

interface MoodCheckInProps {
  onMoodSelect: (mood: string) => void;
  selectedMood?: string;
}

const MoodCheckIn = ({ onMoodSelect, selectedMood }: MoodCheckInProps) => {
  const [hoveredMood, setHoveredMood] = useState<string | null>(null);

  return (
    <div className="glass-card p-5 space-y-3">
      <h3 className="font-display text-lg font-semibold text-foreground">how are you feeling? 💭</h3>
      <div className="grid grid-cols-3 gap-2">
        {moods.map((mood, i) => (
          <motion.button
            key={mood.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setHoveredMood(mood.label)}
            onMouseLeave={() => setHoveredMood(null)}
            onClick={() => onMoodSelect(mood.label)}
            className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
              selectedMood === mood.label
                ? `${mood.color} ring-2 ring-primary/30`
                : "hover:bg-muted/50"
            }`}
          >
            <span className="text-2xl">{mood.emoji}</span>
            <span className="text-xs font-medium text-muted-foreground">{mood.label}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedMood && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-sm text-center text-muted-foreground pt-1"
          >
            {selectedMood === "tired" || selectedMood === "stressed" || selectedMood === "anxious"
              ? "it's okay to take it slow today. you're still showing up 🌸"
              : "let's channel that energy! 🚀"}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MoodCheckIn;
