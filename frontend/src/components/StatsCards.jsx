import { Grid, Box, Typography } from "@mui/material";
import MotionCard from "./MotionCard";

const stats = [
  ["Leads", "254"],
  ["Qualified", "181"],
  ["Conversion", "78%"],
  ["AI Accuracy", "96%"],
];

export default function StatsCards() {
  return (
    <Grid container spacing={3} sx={{ mb: 5 }}>
      {stats.map(([label, value]) => (
        <Grid item xs={6} md={3} key={label}>
          <MotionCard>
            <Box sx={{ p: 3 }}>
              <Typography sx={{ color: "#94A3B8" }}>{label}</Typography>
              <Typography variant="h4" sx={{ color: "white", fontWeight: 700 }}>
                {value}
              </Typography>
            </Box>
          </MotionCard>
        </Grid>
      ))}
    </Grid>
  );
}