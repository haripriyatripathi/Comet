import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CatCompanion from "../components/CatCompanion";
import StreakCounter from "../components/StreakCounter";
import MoodCheckIn from "../components/MoodCheckIn";
import XPBar from "../components/XPBar";
import LofiPlayer from "../components/LofiPlayer";
import StudyPresence from "../components/StudyPresence";
import ModeSelector from "../components/ModeSelector";
import AmbientBackground from "../components/AmbientBackground";
import BottomNav from "../components/BottomNav";
import type { AmbientMode } from "../components/AmbientBackground";
import { levelTitles } from "../components/XPBar";
import catImage from "../assets/cat-companion.png";

const Index = () => {
  const [userName] = useState("friend");
  const [mood, setMood] = useState<string | undefined>();
  const [ambientMode, setAmbientMode] = useState<AmbientMode>("sunset");
  const [streak, setStreak] = useState(5);
  const [longestStreak] = useState(12);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [streakFreezes] = useState(2);
  const [xp] = useState(1250);
  const level = Math.floor(xp / 500);

  const handleCheckIn = () => {
    setHasCheckedIn(true);
    setStreak((s) => s + 1);
  };

  return (
    <div className="min-h-screen pb-24 relative">
      <AmbientBackground mode={ambientMode} />

      <div className="max-w-lg mx-auto px-4 pt-6 space-y-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="font-display text-2xl font-bold text-foreground">cozy study ☁️</h1>
          <p className="text-sm text-muted-foreground mt-0.5">your safe space to be productive</p>
        </motion.div>

        {/* Mode selector */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center"
        >
          <ModeSelector current={ambientMode} onChange={setAmbientMode} />
        </motion.div>

        {/* Cat Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <img
            src={catImage}
            alt="Study cat companion"
            className="w-28 h-28 rounded-2xl object-cover mb-2 shadow-lg"
          />
          <CatCompanion
            userName={userName}
            mood={mood}
            isActive={true}
            streakCount={streak}
          />
        </motion.div>

        {/* Mood */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <MoodCheckIn onMoodSelect={setMood} selectedMood={mood} />
        </motion.div>

        {/* Streak */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <StreakCounter
            currentStreak={streak}
            longestStreak={longestStreak}
            hasCheckedInToday={hasCheckedIn}
            streakFreezes={streakFreezes}
            onCheckIn={handleCheckIn}
            onUseFreeze={() => {}}
          />
        </motion.div>

        {/* XP */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <XPBar
            xp={xp}
            level={level}
            title={levelTitles[Math.min(level, levelTitles.length - 1)]}
            focusMinutesToday={85}
          />
        </motion.div>

        {/* Study Presence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <StudyPresence />
        </motion.div>

        {/* Lofi Player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <LofiPlayer />
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Index;
