import { Typewriter } from "react-simple-typewriter";
import { Typography } from "@mui/material";

export default function TypingResult({ text }) {
  return (
    <Typography
      sx={{
        color: "#E2E8F0",
        lineHeight: 1.9,
        whiteSpace: "pre-wrap",
      }}
    >
      <Typewriter
        words={[text]}
        typeSpeed={15}
        deleteSpeed={1000}
        cursor
      />
    </Typography>
  );
}