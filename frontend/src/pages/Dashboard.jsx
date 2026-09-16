import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
  CardContent,
  Grid,
} from "@mui/material";

import AuroraBackground from "../components/AuroraBackground";
import GridBackground from "../components/GridBackground";
import ParticleField from "../components/ParticleField";
import MouseSpotlight from "../components/MouseSpotlight";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Hero from "../components/Hero";
import StatsCards from "../components/StatsCards";
import MotionCard from "../components/MotionCard";
import LeadHistory from "../components/LeadHistory";
import LeadScore from "../components/LeadScore";
import TypingResult from "../components/TypingResult";

export default function Dashboard() {
  const [form, setForm] = useState({
    customer_name: "",
    company: "",
    industry: "",
    email: "",
    requirement: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitLead = async () => {
    setLoading(true);

    const loadingToast = toast.loading("AI is qualifying the lead...");

    try {
      const res = await api.post("/leads/analyze", form);

      setResult(res.data.analysis);

      toast.success("Lead analyzed successfully!", {
        id: loadingToast,
      });
    } catch {
      toast.error("Analysis failed.", {
        id: loadingToast,
      });
      setResult("");
    }

    setLoading(false);
  };

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      color: "white",
      borderRadius: "18px",
      background: "rgba(255,255,255,.04)",
      backdropFilter: "blur(16px)",
      transition: "all .3s ease",
      "& fieldset": {
        borderColor: "rgba(255,255,255,.12)",
      },
      "&:hover fieldset": {
        borderColor: "#60A5FA",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#8B5CF6",
        boxShadow: "0 0 22px rgba(139,92,246,.35)",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#94A3B8",
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#050816",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <AuroraBackground />
      <GridBackground />
      <ParticleField />
      <MouseSpotlight />

      <Navbar />
      <Sidebar />

      <Container
        maxWidth="xl"
        sx={{
          py: 4,
          pl: { xs: 0, lg: 12 },
          position: "relative",
          zIndex: 2,
        }}
      >
        <Box id="hero">
          <Hero />
        </Box>

        <Box id="analytics">
          <StatsCards />
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} lg={7}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Box id="lead-form">
                <MotionCard>
                  <CardContent sx={{ p: 4 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        color: "white",
                        fontWeight: 700,
                        mb: 3,
                      }}
                    >
                      Submit Sales Lead
                    </Typography>

                    <TextField
                      fullWidth
                      label="Customer Name"
                      name="customer_name"
                      value={form.customer_name}
                      onChange={handleChange}
                      margin="normal"
                      sx={inputStyle}
                    />

                    <TextField
                      fullWidth
                      label="Company"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      margin="normal"
                      sx={inputStyle}
                    />

                    <TextField
                      fullWidth
                      label="Industry"
                      name="industry"
                      value={form.industry}
                      onChange={handleChange}
                      margin="normal"
                      sx={inputStyle}
                    />

                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      margin="normal"
                      sx={inputStyle}
                    />

                    <TextField
                      fullWidth
                      multiline
                      rows={6}
                      label="Customer Requirement"
                      name="requirement"
                      value={form.requirement}
                      onChange={handleChange}
                      margin="normal"
                      sx={inputStyle}
                    />

                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={submitLead}
                        disabled={loading}
                        sx={{
                          mt: 4,
                          py: 2,
                          borderRadius: "999px",
                          fontWeight: 700,
                          fontSize: "1rem",
                          background:
                            "linear-gradient(90deg,#3B82F6,#8B5CF6)",
                          boxShadow:
                            "0 0 35px rgba(99,102,241,.45)",
                          "&:hover": {
                            boxShadow:
                              "0 0 55px rgba(99,102,241,.85)",
                          },
                        }}
                      >
                        {loading ? (
                          <CircularProgress
                            size={24}
                            color="inherit"
                          />
                        ) : (
                          "Analyze Lead"
                        )}
                      </Button>
                    </motion.div>
                  </CardContent>
                </MotionCard>
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} lg={5}>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <MotionCard>
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "white",
                      fontWeight: 700,
                      mb: 3,
                    }}
                  >
                    AI Qualification Score
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mb: 3,
                    }}
                  >
                    <LeadScore score={92} />
                  </Box>

                  <Typography
                    sx={{
                      color: "#94A3B8",
                      textAlign: "center",
                      lineHeight: 1.8,
                    }}
                  >
                    Enterprise AI Lead Qualification powered by Cohere with intelligent product retrieval.
                  </Typography>
                </CardContent>
              </MotionCard>

              {result && (
                <Box sx={{ mt: 3 }}>
                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <MotionCard>
                      <CardContent sx={{ p: 4 }}>
                        <Typography
                          variant="h5"
                          sx={{
                            color: "white",
                            fontWeight: 700,
                            mb: 3,
                          }}
                        >
                          AI Analysis
                        </Typography>

                        <TypingResult text={result} />
                      </CardContent>
                    </MotionCard>
                  </motion.div>
                </Box>
              )}
            </motion.div>
          </Grid>
        </Grid>

        <Box id="history" sx={{ mt: 6 }}>
          <LeadHistory />
        </Box>
      </Container>
    </Box>
  );
}