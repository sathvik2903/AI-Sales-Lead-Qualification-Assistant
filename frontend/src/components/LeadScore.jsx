import { Box, Typography } from "@mui/material";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function LeadScore({ score = 92 }) {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Box sx={{ width: 140, mx: "auto" }}>
        <CircularProgressbar
          value={score}
          text={`${score}`}
          styles={buildStyles({
            pathColor: score >= 85 ? "#16A34A" : score >= 70 ? "#EA580C" : "#DC2626",
            textColor: "#fff",
            trailColor: "#334155",
            strokeLinecap: "round",
          })}
        />
      </Box>

      <Typography variant="h5" sx={{ color: "white", fontWeight: 700, mt: 2 }}>
        {score}/100
      </Typography>

      <Typography sx={{ color: "#94A3B8" }}>
        AI Qualification Score
      </Typography>
    </Box>
  );
}