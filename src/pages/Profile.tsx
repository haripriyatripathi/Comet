import { motion } from "framer-motion";
import { levelTitles, xpPerLevel } from "../components/XPBar";
import AmbientBackground from "../components/AmbientBackground";
import BottomNav from "../components/BottomNav";
import catImage from "../assets/cat-companion.png";

const badges = ["🌱 First Step", "🔥 3-Day Streak", "📚 Bookworm", "🌙 Night Owl", "☕ Coffee Lover"];
const unlockedBadges = 3;

const ProfilePage = () => {
  const xp = 1250;
  const level = Math.floor(xp / xpPerLevel);

  return (
    <div className="min-h-screen pb-24 relative">
      <AmbientBackground mode="sunset" />
      <div className="max-w-lg mx-auto px-4 pt-6 space-y-5">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="font-display text-2xl font-bold text-foreground">my profile 🐱</h1>
        </motion.div>

        {/* Avatar card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 flex flex-col items-center gap-3"
        >
          <img src={catImage} alt="Profile cat" className="w-24 h-24 rounded-2xl object-cover shadow-lg" />
          <h2 className="font-display text-xl font-bold text-foreground">friend</h2>
          <p className="text-sm text-muted-foreground">
            level {level} · {levelTitles[Math.min(level, levelTitles.length - 1)]}
          </p>
          <div className="flex gap-4 text-center mt-2">
            <div>
              <p className="font-display font-bold text-lg text-foreground">1,250</p>
              <p className="text-xs text-muted-foreground">total XP</p>
            </div>
            <div className="w-px bg-border" />
            <div>
              <p className="font-display font-bold text-lg text-foreground">12</p>
              <p className="text-xs text-muted-foreground">best streak</p>
            </div>
            <div className="w-px bg-border" />
            <div>
              <p className="font-display font-bold text-lg text-foreground">48</p>
              <p className="text-xs text-muted-foreground">tasks done</p>
            </div>
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-5"
        >
          <h3 className="font-display text-lg font-semibold text-foreground mb-3">badges 🏅</h3>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge, i) => (
              <motion.div
                key={badge}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className={`px-3 py-1.5 rounded-xl text-sm font-medium ${
                  i < unlockedBadges
                    ? "gradient-peach text-primary-foreground"
                    : "bg-muted/50 text-muted-foreground"
                }`}
              >
                {badge}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Cat Skins */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-5"
        >
          <h3 className="font-display text-lg font-semibold text-foreground mb-3">cat outfits 🎀</h3>
          <div className="grid grid-cols-4 gap-3">
            {["🐱", "🐱‍👤", "😺", "😸"].map((cat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1 }}
                className={`aspect-square rounded-xl flex items-center justify-center text-3xl ${
                  i === 0 ? "gradient-lavender shadow-md" : "bg-muted/30"
                }`}
              >
                {cat}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
};

export default ProfilePage;
