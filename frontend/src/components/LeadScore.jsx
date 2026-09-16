import { Box, CircularProgress, Typography } from "@mui/material";

export default function LeadScore({ score = 92 }) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" value={100} size={120} sx={{ color: "#1E293B", position: "absolute" }} />
      <CircularProgress variant="determinate" value={score} size={120} sx={{ color: "#8B5CF6" }} />
      <Box sx={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Typography sx={{ color: "white", fontWeight: 700 }}>{score}</Typography>
        <Typography sx={{ color: "#94A3B8", fontSize: 12 }}>Score</Typography>
      </Box>
    </Box>
  );
}