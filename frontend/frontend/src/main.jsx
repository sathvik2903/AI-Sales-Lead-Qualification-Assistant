import React from "react";
import ReactDOM from "react-dom/client";

import { CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#111827",
          color: "#fff",
          border: "1px solid rgba(255,255,255,.1)",
        },
      }}
    />
    <App />
  </React.StrictMode>
);