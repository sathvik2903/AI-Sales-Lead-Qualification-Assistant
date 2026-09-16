import {
  Box,
  Typography,
  Chip,
  LinearProgress,
  Grid,
} from "@mui/material";
import {
  Package,
  CheckCircle,
  HelpCircle,
  TrendingUp,
} from "react-feather";
import MotionCard from "./MotionCard";

export default function AIInsights({ result }) {
  if (!result) return null;

  const confidence = result.confidence || 90;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <MotionCard>
        <Box sx={{ p: 3 }}>
          <Typography
            variant="h6"
            sx={{ color: "white", fontWeight: 700, mb: 3 }}
          >
            AI Insights
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box
                sx={{
                  bgcolor: "#0F172A",
                  borderRadius: 3,
                  p: 2,
                  border: "1px solid #334155",
                }}
              >
                <Typography sx={{ color: "#94A3B8", fontSize: ".85rem" }}>
                  Priority
                </Typography>

                <Chip
                  label={result.priority}
                  color={
                    result.priority === "High"
                      ? "success"
                      : result.priority === "Medium"
                      ? "warning"
                      : "default"
                  }
                  sx={{ mt: 1 }}
                />
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box
                sx={{
                  bgcolor: "#0F172A",
                  borderRadius: 3,
                  p: 2,
                  border: "1px solid #334155",
                }}
              >
                <Typography sx={{ color: "#94A3B8", fontSize: ".85rem" }}>
                  Confidence
                </Typography>

                <Typography
                  sx={{ color: "white", fontWeight: 700, mt: 1 }}
                >
                  {confidence}%
                </Typography>

                <LinearProgress
                  variant="determinate"
                  value={confidence}
                  sx={{
                    mt: 1,
                    height: 8,
                    borderRadius: 5,
                    bgcolor: "#334155",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </MotionCard>

      <MotionCard>
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <TrendingUp size={18} color="#60A5FA" />
            <Typography sx={{ color: "white", fontWeight: 700 }}>
              Lead Summary
            </Typography>
          </Box>

          <Typography sx={{ color: "#CBD5E1", lineHeight: 1.8 }}>
            {result.summary}
          </Typography>
        </Box>
      </MotionCard>

      <MotionCard>
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Package size={18} color="#60A5FA" />
            <Typography sx={{ color: "white", fontWeight: 700 }}>
              Recommended Products
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {(result.recommended_products || []).map((product) => (
              <Grid item xs={12} key={product}>
                <Box
                  sx={{
                    bgcolor: "#0F172A",
                    borderRadius: 3,
                    border: "1px solid #334155",
                    p: 2,
                  }}
                >
                  <Typography sx={{ color: "white", fontWeight: 600 }}>
                    {product}
                  </Typography>

                  <Typography
                    sx={{ color: "#94A3B8", fontSize: ".85rem", mt: 0.5 }}
                  >
                    Recommended by AI based on industry and customer requirement.
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </MotionCard>

      <MotionCard>
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <CheckCircle size={18} color="#60A5FA" />
            <Typography sx={{ color: "white", fontWeight: 700 }}>
              Next Action
            </Typography>
          </Box>

          <Typography sx={{ color: "#CBD5E1" }}>
            {result.next_action}
          </Typography>
        </Box>
      </MotionCard>

      <MotionCard>
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <HelpCircle size={18} color="#60A5FA" />
            <Typography sx={{ color: "white", fontWeight: 700 }}>
              Follow-up Questions
            </Typography>
          </Box>

          <Box component="ul" sx={{ color: "#CBD5E1", pl: 3 }}>
            {(result.follow_up_questions || []).map((q, i) => (
              <li key={i}>
                <Typography sx={{ color: "#CBD5E1", mb: 1 }}>
                  {q}
                </Typography>
              </li>
            ))}
          </Box>
        </Box>
      </MotionCard>
    </Box>
  );
}