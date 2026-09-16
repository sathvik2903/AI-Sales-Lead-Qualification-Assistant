import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
  Grid,
} from "@mui/material";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StatsCards from "../components/StatsCards";
import MotionCard from "../components/MotionCard";
import LeadScore from "../components/LeadScore";
import LeadHistory from "../components/LeadHistory";
import AIInsights from "../components/AIInsights";

export default function Dashboard() {
  const [form, setForm] = useState({
    customer_name: "",
    company: "",
    industry: "",
    email: "",
    requirement: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [refreshHistory, setRefreshHistory] = useState(0);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submitLead = async () => {
    setLoading(true);
    const t = toast.loading("Analyzing lead with AI...");

    try {
      const res = await api.post("/leads/analyze", form);

      setResult(res.data);
      setRefreshHistory((prev) => prev + 1);

      toast.success("Lead analyzed successfully!", { id: t });

      setForm({
        customer_name: "",
        company: "",
        industry: "",
        email: "",
        requirement: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Analysis failed.", { id: t });
    }

    setLoading(false);
  };

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      color: "white",
      borderRadius: 3,
      background: "#0F172A",
      "& fieldset": { borderColor: "#334155" },
      "&:hover fieldset": { borderColor: "#475569" },
      "&.Mui-focused fieldset": { borderColor: "#2563EB" },
    },
    "& .MuiInputLabel-root": {
      color: "#94A3B8",
    },
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "#0F172A" }}>
      <Navbar />

      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Hero />

        <Box sx={{ mt: 4 }}>
          <StatsCards refresh={refreshHistory} />
        </Box>

        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <MotionCard>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ color: "white", mb: 3 }}>
                  New Lead
                </Typography>

                <TextField fullWidth label="Customer Name" name="customer_name" value={form.customer_name} onChange={handleChange} margin="normal" sx={inputStyle} />
                <TextField fullWidth label="Company" name="company" value={form.company} onChange={handleChange} margin="normal" sx={inputStyle} />
                <TextField fullWidth label="Industry" name="industry" value={form.industry} onChange={handleChange} margin="normal" sx={inputStyle} />
                <TextField fullWidth label="Email" name="email" value={form.email} onChange={handleChange} margin="normal" sx={inputStyle} />
                <TextField fullWidth multiline rows={5} label="Requirement" name="requirement" value={form.requirement} onChange={handleChange} margin="normal" sx={inputStyle} />

                <Button
                  fullWidth
                  variant="contained"
                  onClick={submitLead}
                  disabled={loading}
                  sx={{
                    mt: 3,
                    py: 1.6,
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: 700,
                    background: "#2563EB",
                    "&:hover": { background: "#1D4ED8" },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={22} color="inherit" />
                  ) : (
                    "Analyze Lead"
                  )}
                </Button>
              </Box>
            </MotionCard>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <MotionCard>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ color: "white", textAlign: "center", mb: 3 }}>
                  AI Qualification
                </Typography>

                <LeadScore score={result?.score || 75} />
              </Box>
            </MotionCard>

            {result && (
              <Box sx={{ mt: 2 }}>
                <AIInsights result={result} />
              </Box>
            )}
          </Grid>
        </Grid>

        <Box sx={{ mt: 5 }}>
          <LeadHistory refresh={refreshHistory} />
        </Box>
      </Container>
    </Box>
  );
}