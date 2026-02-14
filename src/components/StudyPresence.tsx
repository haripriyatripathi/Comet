import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { useState, useEffect } from "react";

const StudyPresence = () => {
  const [onlineCount, setOnlineCount] = useState(0);

  useEffect(() => {
    // Simulated online users
    setOnlineCount(Math.floor(Math.random() * 200) + 50);
    const interval = setInterval(() => {
      setOnlineCount((prev) => prev + Math.floor(Math.random() * 5) - 2);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card p-4 flex items-center gap-3">
      <div className="relative">
        <Users className="w-5 h-5 text-mint" />
        <motion.div
          className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-mint rounded-full"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">
          <span className="font-display font-bold text-mint">{onlineCount}</span> studying rn
        </p>
        <p className="text-xs text-muted-foreground">you're not alone ✨</p>
      </div>
    </div>
  );
};

export default StudyPresence;
