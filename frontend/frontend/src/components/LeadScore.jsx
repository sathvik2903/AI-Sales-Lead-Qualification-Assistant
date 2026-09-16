import { Box, CircularProgress, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function LeadScore({ score = 92 }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 180 }}
    >
      <Box
        sx={{
          position: "relative",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress
          variant="determinate"
          value={100}
          size={120}
          thickness={4}
          sx={{ color: "rgba(255,255,255,.08)", position: "absolute" }}
        />

        <CircularProgress
          variant="determinate"
          value={score}
          size={120}
          thickness={4}
          sx={{ color: "#7C3AED" }}
        />

        <Box sx={{ position: "absolute", textAlign: "center" }}>
          <Typography variant="h5" sx={{ color: "white", fontWeight: 700 }}>
            {score}
          </Typography>
          <Typography sx={{ color: "#94A3B8", fontSize: 13 }}>
            Score
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
}