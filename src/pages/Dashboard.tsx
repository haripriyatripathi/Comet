import { motion } from "framer-motion";
import ProductivityCharts from "../components/ProductivityCharts";
import AmbientBackground from "../components/AmbientBackground";
import BottomNav from "../components/BottomNav";

const DashboardPage = () => {
  return (
    <div className="min-h-screen pb-24 relative">
      <AmbientBackground mode="night" />
      <div className="max-w-lg mx-auto px-4 pt-6 space-y-5">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="font-display text-2xl font-bold text-foreground">your stats 📊</h1>
          <p className="text-sm text-muted-foreground mt-0.5">see how far you've come ✨</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ProductivityCharts />
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
};

export default DashboardPage;
