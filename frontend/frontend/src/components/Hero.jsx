import { Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <Box sx={{ textAlign: "center", py: 8 }}>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Typography
          variant="h2"
          sx={{
            color: "white",
            fontWeight: 800,
            lineHeight: 1,
          }}
        >
          Qualify Leads

          <Box
            component="span"
            sx={{
              display: "block",
              background:
                "linear-gradient(90deg,#60A5FA,#A855F7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            with AI
          </Box>

        </Typography>

        <Typography
          sx={{
            color: "#94A3B8",
            mt: 3,
            fontSize: 18,
          }}
        >
          Enterprise-grade lead qualification powered by Cohere AI,
          retrieval search, and beautiful motion-first design.
        </Typography>

      </motion.div>

    </Box>
  );
}