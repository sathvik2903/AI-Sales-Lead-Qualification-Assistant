import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.div initial={{ y: -60 }} animate={{ y: 0 }}>
      <Box
        sx={{
          position: "sticky",
          top: 16,
          mx: "auto",
          width: "95%",
          maxWidth: 1300,
          px: 3,
          py: 2,
          borderRadius: "999px",
          backdropFilter: "blur(20px)",
          background: "rgba(255,255,255,.05)",
          border: "1px solid rgba(255,255,255,.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 50,
        }}
      >
        <Typography sx={{ color: "white", fontWeight: 800 }}>
          LeadAI
        </Typography>

        <Typography sx={{ color: "#94A3B8" }}>
          Cohere Powered
        </Typography>
      </Box>
    </motion.div>
  );
}