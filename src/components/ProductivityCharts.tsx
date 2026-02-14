import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { motion } from "framer-motion";

const weeklyData = [
  { day: "Mon", focus: 45, tasks: 3 },
  { day: "Tue", focus: 80, tasks: 5 },
  { day: "Wed", focus: 60, tasks: 4 },
  { day: "Thu", focus: 120, tasks: 7 },
  { day: "Fri", focus: 90, tasks: 6 },
  { day: "Sat", focus: 30, tasks: 2 },
  { day: "Sun", focus: 55, tasks: 3 },
];

const moodData = [
  { name: "happy", value: 35, color: "hsl(40 80% 70%)" },
  { name: "calm", value: 25, color: "hsl(160 40% 75%)" },
  { name: "motivated", value: 20, color: "hsl(15 80% 65%)" },
  { name: "tired", value: 12, color: "hsl(270 40% 80%)" },
  { name: "stressed", value: 8, color: "hsl(5 70% 65%)" },
];

const heatmapData = Array.from({ length: 28 }, (_, i) => ({
  day: i + 1,
  value: Math.floor(Math.random() * 5),
}));

const heatColors = [
  "hsl(30 30% 92%)",
  "hsl(15 80% 90%)",
  "hsl(15 80% 80%)",
  "hsl(15 80% 70%)",
  "hsl(15 80% 60%)",
];

const ProductivityCharts = () => {
  return (
    <div className="space-y-6">
      {/* Focus Time Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-5"
      >
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">weekly focus time 📈</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={weeklyData}>
            <defs>
              <linearGradient id="focusGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(15 80% 65%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(15 80% 65%)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(30 25% 88%)" />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(25 15% 50%)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "hsl(25 15% 50%)" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: "hsl(30 40% 95% / 0.9)",
                border: "1px solid hsl(30 25% 88%)",
                borderRadius: "12px",
                fontSize: "12px",
              }}
            />
            <Area type="monotone" dataKey="focus" stroke="hsl(15 80% 65%)" fill="url(#focusGradient)" strokeWidth={2.5} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Tasks Completed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-5"
      >
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">tasks completed 🎯</h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(30 25% 88%)" />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(25 15% 50%)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "hsl(25 15% 50%)" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: "hsl(30 40% 95% / 0.9)",
                border: "1px solid hsl(30 25% 88%)",
                borderRadius: "12px",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="tasks" fill="hsl(270 40% 80%)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Mood Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-5"
      >
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">mood vibes this month 💭</h3>
        <div className="flex items-center gap-4">
          <ResponsiveContainer width="50%" height={160}>
            <PieChart>
              <Pie data={moodData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={3} dataKey="value">
                {moodData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5">
            {moodData.map((m) => (
              <div key={m.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: m.color }} />
                <span className="text-xs text-muted-foreground">{m.name} ({m.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Streak Heatmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-5"
      >
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">monthly streak heatmap 🔥</h3>
        <div className="grid grid-cols-7 gap-1.5">
          {heatmapData.map((d) => (
            <motion.div
              key={d.day}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: d.day * 0.02 }}
              className="aspect-square rounded-md flex items-center justify-center text-xs font-medium"
              style={{ backgroundColor: heatColors[d.value] }}
              title={`Day ${d.day}: ${d.value} sessions`}
            >
              {d.day}
            </motion.div>
          ))}
        </div>
        <div className="flex items-center gap-1.5 mt-3 justify-end">
          <span className="text-xs text-muted-foreground">less</span>
          {heatColors.map((c, i) => (
            <div key={i} className="w-4 h-4 rounded-sm" style={{ backgroundColor: c }} />
          ))}
          <span className="text-xs text-muted-foreground">more</span>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductivityCharts;
