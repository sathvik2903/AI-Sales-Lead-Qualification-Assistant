import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MouseSpotlight() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 120, damping: 20 });
  const sy = useSpring(y, { stiffness: 120, damping: 20 });

  return (
    <motion.div
      onMouseMove={(e) => {
        x.set(e.clientX - 180);
        y.set(e.clientY - 180);
      }}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <motion.div
        style={{
          x: sx,
          y: sy,
          position: "absolute",
          width: 360,
          height: 360,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,.18), transparent 70%)",
          filter: "blur(40px)",
        }}
      />
    </motion.div>
  );
}