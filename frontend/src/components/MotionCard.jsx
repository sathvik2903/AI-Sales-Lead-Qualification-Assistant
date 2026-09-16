import { motion } from "framer-motion";
import { Card } from "@mui/material";

export default function MotionCard({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Card
        sx={{
          background: "#1E293B",
          border: "1px solid #334155",
          borderRadius: 4,
          color: "white",
          boxShadow: "none",
        }}
      >
        {children}
      </Card>
    </motion.div>
  );
}