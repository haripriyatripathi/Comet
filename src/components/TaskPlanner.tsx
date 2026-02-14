import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Clock, Trash2, Check, Tag } from "lucide-react";

export interface Task {
  id: string;
  title: string;
  priority: "low" | "medium" | "high";
  category: string;
  mood: string;
  completed: boolean;
  pomodoroMinutes: number;
}

const priorityStyles: Record<string, string> = {
  low: "bg-mint/20 text-accent-foreground",
  medium: "bg-honey/20 text-foreground",
  high: "bg-coral/20 text-foreground",
};

const categories = ["study", "work", "health", "creative", "life"];

interface TaskPlannerProps {
  tasks: Task[];
  onAddTask: (task: Omit<Task, "id" | "completed">) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskPlanner = ({ tasks, onAddTask, onToggleTask, onDeleteTask }: TaskPlannerProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [category, setCategory] = useState("study");
  const [pomodoroMinutes, setPomodoroMinutes] = useState(25);

  const handleAdd = () => {
    if (!title.trim()) return;
    onAddTask({ title, priority, category, mood: "", pomodoroMinutes });
    setTitle("");
    setPriority("medium");
    setIsAdding(false);
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="glass-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-foreground">tasks for today 📝</h3>
        <span className="text-sm text-muted-foreground font-medium">
          {completedCount}/{tasks.length} done
        </span>
      </div>

      {/* Progress bar */}
      {tasks.length > 0 && (
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full gradient-peach rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / tasks.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      )}

      {/* Task List */}
      <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, height: 0 }}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                task.completed ? "bg-muted/30 opacity-60" : "bg-card/40"
              }`}
            >
              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={() => onToggleTask(task.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  task.completed
                    ? "bg-primary border-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {task.completed && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
              </motion.button>

              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                  {task.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-xs px-1.5 py-0.5 rounded-md ${priorityStyles[task.priority]}`}>
                    {task.priority}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                    <Tag className="w-3 h-3" />
                    {task.category}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                    <Clock className="w-3 h-3" />
                    {task.pomodoroMinutes}m
                  </span>
                </div>
              </div>

              <button
                onClick={() => onDeleteTask(task.id)}
                className="p-1 text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Task */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3 pt-2"
          >
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="what do you need to do?"
              className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
            <div className="flex gap-2 flex-wrap">
              {(["low", "medium", "high"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                    priority === p ? priorityStyles[p] + " ring-1 ring-primary/20" : "bg-muted/30 text-muted-foreground"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                    category === c ? "bg-lavender/20 text-secondary-foreground ring-1 ring-secondary/30" : "bg-muted/30 text-muted-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <select
                value={pomodoroMinutes}
                onChange={(e) => setPomodoroMinutes(Number(e.target.value))}
                className="text-sm bg-muted/50 rounded-lg px-2 py-1 border border-border/50 text-foreground"
              >
                <option value={15}>15 min</option>
                <option value={25}>25 min</option>
                <option value={45}>45 min</option>
                <option value={60}>60 min</option>
              </select>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleAdd}
                className="flex-1 gradient-peach text-primary-foreground font-display font-semibold py-2 rounded-lg"
              >
                add task ✨
              </motion.button>
              <button
                onClick={() => setIsAdding(false)}
                className="px-4 bg-muted/50 text-muted-foreground rounded-lg"
              >
                cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isAdding && (
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => setIsAdding(true)}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-muted/30 hover:bg-muted/50 text-muted-foreground font-medium text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          add new task
        </motion.button>
      )}
    </div>
  );
};

export default TaskPlanner;
