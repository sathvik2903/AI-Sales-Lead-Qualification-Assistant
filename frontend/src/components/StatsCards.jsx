import { Box, Typography } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import VerifiedIcon from "@mui/icons-material/Verified";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PsychologyIcon from "@mui/icons-material/Psychology";

export default function StatsCards() {
  const cards = [
    {
      title: "Total Leads",
      value: "254",
      icon: <GroupsIcon sx={{ color: "#3B82F6", fontSize: 28 }} />,
    },
    {
      title: "Qualified",
      value: "181",
      icon: <VerifiedIcon sx={{ color: "#22C55E", fontSize: 28 }} />,
    },
    {
      title: "Conversion",
      value: "78%",
      icon: <TrendingUpIcon sx={{ color: "#F59E0B", fontSize: 28 }} />,
    },
    {
      title: "AI Accuracy",
      value: "96%",
      icon: <PsychologyIcon sx={{ color: "#8B5CF6", fontSize: 28 }} />,
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2,1fr)",
          md: "repeat(4,1fr)",
        },
        gap: 2,
        mb: 4,
      }}
    >
      {cards.map((card) => (
        <Box
          key={card.title}
          sx={{
            bgcolor: "#1E293B",
            border: "1px solid #334155",
            borderRadius: 3,
            p: 3,
            transition: "0.25s",
            "&:hover": {
              transform: "translateY(-4px)",
              borderColor: "#3B82F6",
            },
          }}
        >
          {card.icon}

          <Typography sx={{ color: "#94A3B8", mt: 2 }}>
            {card.title}
          </Typography>

          <Typography
            variant="h4"
            sx={{ color: "white", fontWeight: 700 }}
          >
            {card.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}