import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.div
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      transition={{ type: "spring" }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 20,
          mx: "auto",
          width: "92%",
          maxWidth: 1200,
          px: 4,
          py: 2,
          borderRadius: 999,
          backdropFilter: "blur(22px)",
          background: "rgba(255,255,255,.05)",
          border: "1px solid rgba(255,255,255,.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          LeadAI
        </Typography>

        <Typography sx={{ color: "#CBD5E1" }}>
          Motion Dashboard
        </Typography>
      </Box>
    </motion.div>
  );
}