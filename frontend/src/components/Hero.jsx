import { Box, Typography, Chip } from "@mui/material";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Box sx={{ py: 3 }}>
        <Chip
          label="Cohere AI • FastAPI • SQLite"
          sx={{
            mb: 2,
            bgcolor: "rgba(37,99,235,.15)",
            color: "#60A5FA",
            fontWeight: 600,
          }}
        />

        <Typography
          variant="h3"
          sx={{
            color: "white",
            fontWeight: 800,
            lineHeight: 1.1,
          }}
        >
          AI Sales Lead
        </Typography>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            background: "linear-gradient(90deg,#2563EB,#7C3AED)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.1,
          }}
        >
          Qualification Assistant
        </Typography>

        <Typography
          sx={{
            mt: 2,
            color: "#94A3B8",
            maxWidth: 650,
            fontSize: "1rem",
          }}
        >
          Qualify potential customers using AI, match products from a knowledge
          base, and generate actionable sales insights instantly.
        </Typography>
      </Box>
    </motion.div>
  );
}