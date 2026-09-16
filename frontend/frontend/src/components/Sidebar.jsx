import { Box, Typography } from "@mui/material";
import { Home, History, Sparkles, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { icon: Home, label: "Dashboard" },
  { icon: Sparkles, label: "AI Leads" },
  { icon: History, label: "History" },
  { icon: BarChart3, label: "Analytics" },
];

export default function Sidebar() {
  return (
    <motion.div initial={{ x: -120 }} animate={{ x: 0 }} transition={{ type: "spring", stiffness: 120 }}>
      <Box
        sx={{
          position: "fixed",
          left: 20,
          top: 90,
          width: 80,
          height: "80vh",
          borderRadius: 8,
          backdropFilter: "blur(24px)",
          background: "rgba(255,255,255,.05)",
          border: "1px solid rgba(255,255,255,.08)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          zIndex: 20,
        }}
      >
        {items.map((item) => (
          <motion.div
            key={item.label}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
            <Box
              sx={{
                color: "#CBD5E1",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <item.icon size={24} />
              <Typography sx={{ fontSize: 11, mt: 1 }}>
                {item.label}
              </Typography>
            </Box>
          </motion.div>
        ))}
      </Box>
    </motion.div>
  );
}