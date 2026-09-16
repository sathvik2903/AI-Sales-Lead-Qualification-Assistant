import { Box, Typography } from "@mui/material";
import { Home, Star, Clock, BarChart2, Settings } from "react-feather";
import { motion } from "framer-motion";

const items = [
  { icon: Home, label: "Home", id: "hero" },
  { icon: Star, label: "AI", id: "lead-form" },
  { icon: Clock, label: "History", id: "history" },
  { icon: BarChart2, label: "Analytics", id: "analytics" },
  { icon: Settings, label: "Settings", id: "settings" },
];

export default function Sidebar() {
  const scrollTo = (id) => {
    if (id === "settings") {
      alert("Settings panel coming in the next update.");
      return;
    }

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <motion.div
      initial={{ x: -120 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
    >
      <Box
        sx={{
          position: "fixed",
          left: 20,
          top: 100,
          width: 82,
          height: "78vh",
          borderRadius: "30px",
          backdropFilter: "blur(30px)",
          background: "rgba(255,255,255,.05)",
          border: "1px solid rgba(255,255,255,.08)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          zIndex: 100,
        }}
      >
        {items.map((item) => (
          <motion.div
            key={item.label}
            whileHover={{ scale: 1.15, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollTo(item.id)}
            style={{ cursor: "pointer" }}
          >
            <Box sx={{ color: "#CBD5E1", textAlign: "center" }}>
              <item.icon size={22} />
              <Typography sx={{ fontSize: 10, mt: 1 }}>
                {item.label}
              </Typography>
            </Box>
          </motion.div>
        ))}
      </Box>
    </motion.div>
  );
}