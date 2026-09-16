import { AppBar, Toolbar, Typography, Box } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "#0F172A",
        borderBottom: "1px solid #1E293B",
      }}
    >
      <Toolbar sx={{ maxWidth: 1100, mx: "auto", width: "100%" }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          LeadAI
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Typography sx={{ color: "#94A3B8" }}>
          AI Sales Qualification
        </Typography>
      </Toolbar>
    </AppBar>
  );
}