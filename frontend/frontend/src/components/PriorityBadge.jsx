import { Chip } from "@mui/material";

const colors = {
  High: "#EF4444",
  Medium: "#F59E0B",
  Low: "#10B981",
};

export default function PriorityBadge({ priority = "High" }) {
  return (
    <Chip
      label={priority}
      sx={{
        background: colors[priority],
        color: "white",
        fontWeight: 700,
        boxShadow: `0 0 18px ${colors[priority]}`,
      }}
    />
  );
}