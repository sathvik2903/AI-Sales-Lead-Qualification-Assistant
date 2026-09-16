import { useState } from "react";
import api from "../services/api";

import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";

import { motion } from "framer-motion";
import toast from "react-hot-toast";

import AuroraBackground from "../components/AuroraBackground";
import GridBackground from "../components/GridBackground";
import MouseSpotlight from "../components/MouseSpotlight";
import Navbar from "../components/Navbar";
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
    } catch (err) {
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
      backdropFilter: "blur(14px)",
      transition: "all .35s ease",

      "& fieldset": {
        borderColor: "rgba(255,255,255,.12)",
      },

      "&:hover fieldset": {
        borderColor: "#60A5FA",
      },

      "&.Mui-focused": {
        transform: "translateY(-2px)",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#8B5CF6",
        boxShadow: "0 0 24px rgba(139,92,246,.45)",
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
      <MouseSpotlight />
      <Navbar />

      <Container
        maxWidth="xl"
        sx={{
          py: 4,
          position: "relative",
          zIndex: 2,
        }}
      >
        <Hero />

        <StatsCards />

        <Grid container spacing={4} alignItems="stretch">
          <Grid item xs={12} lg={7}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <MotionCard>
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "white",
                      mb: 1,
                      fontWeight: 700,
                    }}
                  >
                    Submit Sales Lead
                  </Typography>

                  <Typography
                    sx={{
                      color: "#94A3B8",
                      mb: 3,
                    }}
                  >
                    Enter customer details and let Cohere AI qualify the lead.
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
                    whileHover={{
                      scale: 1.03,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                  >
                    <Button
                      fullWidth
                      onClick={submitLead}
                      disabled={loading}
                      variant="contained"
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
                      mb: 3,
                      fontWeight: 700,
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

                  <Divider sx={{ borderColor: "rgba(255,255,255,.08)", mb: 3 }} />

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box sx={{ textAlign: "center" }}>
                        <Typography
                          variant="h6"
                          sx={{ color: "white", fontWeight: 700 }}
                        >
                          High
                        </Typography>
                        <Typography sx={{ color: "#94A3B8", fontSize: 14 }}>
                          Priority
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={6}>
                      <Box sx={{ textAlign: "center" }}>
                        <Typography
                          variant="h6"
                          sx={{ color: "white", fontWeight: 700 }}
                        >
                          Ready
                        </Typography>
                        <Typography sx={{ color: "#94A3B8", fontSize: 14 }}>
                          Demo Status
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </MotionCard>

              {result && (
                <Box sx={{ mt: 3 }}>
                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <MotionCard>
                      <CardContent sx={{ p: 4 }}>
                        <Typography
                          variant="h5"
                          sx={{
                            color: "white",
                            mb: 3,
                            fontWeight: 700,
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

        <Box sx={{ mt: 6 }}>
          <LeadHistory />
        </Box>
      </Container>
    </Box>
  );
}