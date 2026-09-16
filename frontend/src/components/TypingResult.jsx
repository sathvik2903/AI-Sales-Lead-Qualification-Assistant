import { Typewriter } from "react-simple-typewriter";
import { Typography } from "@mui/material";

export default function TypingResult({ text }) {
  return (
    <Typography sx={{ color: "#E2E8F0", whiteSpace: "pre-wrap", lineHeight: 1.8 }}>
      <Typewriter words={[text]} typeSpeed={15} cursor />
    </Typography>
  );
}