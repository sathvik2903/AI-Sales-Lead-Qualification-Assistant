import { motion } from "framer-motion";

const particles = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
  duration: Math.random() * 8 + 6,
}));

export default function ParticleField() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: -1 }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          animate={{ y: [-20, 20, -20], opacity: [0.2, 0.8, 0.2] }}
          transition={{ repeat: Infinity, duration: p.duration }}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "#7C3AED",
            boxShadow: "0 0 12px #7C3AED",
          }}
        />
      ))}
    </div>
  );
}