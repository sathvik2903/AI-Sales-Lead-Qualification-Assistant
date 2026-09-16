import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <Box sx={{ textAlign: "center", py: 6 }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <Typography
          variant="h2"
          sx={{
            color: "white",
            fontWeight: 800,
            lineHeight: 1,
          }}
        >
          AI Sales Lead
          <Box
            component="span"
            sx={{
              display: "block",
              background: "linear-gradient(90deg,#60A5FA,#8B5CF6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Qualification Assistant
          </Box>
        </Typography>

        <Typography sx={{ color: "#94A3B8", mt: 3, fontSize: 18 }}>
          Motion-first enterprise dashboard powered by Cohere AI.
        </Typography>
      </motion.div>
    </Box>
  );
}