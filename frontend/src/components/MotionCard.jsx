import { motion } from "framer-motion";
import { Card } from "@mui/material";
import { useState } from "react";

export default function MotionCard({ children }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  return (
    <motion.div
      style={{ perspective: 1200 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setRotate({
          x: -(y - rect.height / 2) / 22,
          y: (x - rect.width / 2) / 22,
        });
      }}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y,
      }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 18,
      }}
    >
      <Card
        sx={{
          backdropFilter: "blur(28px)",
          background:
            "linear-gradient(145deg,rgba(255,255,255,.08),rgba(255,255,255,.03))",
          border: "1px solid rgba(255,255,255,.08)",
          borderRadius: 6,
          boxShadow:
            "0 20px 60px rgba(0,0,0,.35), inset 0 1px rgba(255,255,255,.08)",
        }}
      >
        {children}
      </Card>
    </motion.div>
  );
}