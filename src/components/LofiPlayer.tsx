import { motion } from "framer-motion";
import { Volume2, VolumeX, SkipForward, Music } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const tracks = [
  { name: "cozy rain", emoji: "🌧️" },
  { name: "soft piano", emoji: "🎹" },
  { name: "night café", emoji: "☕" },
  { name: "forest walk", emoji: "🌿" },
];

const LofiPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4 flex items-center gap-3"
    >
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-10 h-10 rounded-full gradient-lavender flex items-center justify-center text-secondary-foreground"
      >
        {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </motion.button>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {tracks[currentTrack].emoji} {tracks[currentTrack].name}
        </p>
        <div className="flex items-center gap-1 mt-1">
          {isPlaying && (
            <>
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-primary rounded-full"
                  animate={{ height: [4, 12, 6, 14, 4] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </>
          )}
          {!isPlaying && <p className="text-xs text-muted-foreground">paused</p>}
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={nextTrack}
        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <SkipForward className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
};

export default LofiPlayer;
