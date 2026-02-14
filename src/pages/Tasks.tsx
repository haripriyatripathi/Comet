import { useState } from "react";
import { motion } from "framer-motion";
import TaskPlanner from "../components/TaskPlanner";
import type { Task } from "../components/TaskPlanner";
import AmbientBackground from "../components/AmbientBackground";
import BottomNav from "../components/BottomNav";

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "read chapter 5 of bio", priority: "high", category: "study", mood: "calm", completed: false, pomodoroMinutes: 25 },
    { id: "2", title: "finish math problem set", priority: "medium", category: "study", mood: "", completed: false, pomodoroMinutes: 45 },
    { id: "3", title: "journal for 10 min", priority: "low", category: "health", mood: "happy", completed: true, pomodoroMinutes: 15 },
  ]);

  const addTask = (task: Omit<Task, "id" | "completed">) => {
    setTasks((prev) => [...prev, { ...task, id: Date.now().toString(), completed: false }]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen pb-24 relative">
      <AmbientBackground mode="library" />
      <div className="max-w-lg mx-auto px-4 pt-6 space-y-5">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="font-display text-2xl font-bold text-foreground">my tasks 📝</h1>
          <p className="text-sm text-muted-foreground mt-0.5">one thing at a time, you got this</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <TaskPlanner
            tasks={tasks}
            onAddTask={addTask}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
          />
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
};

export default TasksPage;
