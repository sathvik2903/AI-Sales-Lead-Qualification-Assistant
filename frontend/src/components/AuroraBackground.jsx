import { motion } from "framer-motion";

export default function AuroraBackground() {
  return (
    <>
      <motion.div
        animate={{ x: [0, 120, -80, 0], y: [0, -80, 60, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
        style={{
          position: "fixed",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle,#4F46E5,transparent 70%)",
          filter: "blur(90px)",
          top: -120,
          left: -120,
          zIndex: -3,
        }}
      />
      <motion.div
        animate={{ x: [0, -120, 80, 0], y: [0, 100, -80, 0] }}
        transition={{ repeat: Infinity, duration: 22, ease: "easeInOut" }}
        style={{
          position: "fixed",
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "radial-gradient(circle,#06B6D4,transparent 70%)",
          filter: "blur(80px)",
          bottom: -120,
          right: -120,
          zIndex: -3,
        }}
      />
    </>
  );
}