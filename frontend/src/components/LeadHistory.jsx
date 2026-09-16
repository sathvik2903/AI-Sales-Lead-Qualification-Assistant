import { useEffect, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import api from "../services/api";
import MotionCard from "./MotionCard";

export default function LeadHistory() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api
      .get("/leads")
      .then((res) => setRows(res.data))
      .catch(() => {});
  }, []);

  const filtered = rows.filter((r) =>
    `${r.customer_name || ""} ${r.company || ""} ${r.industry || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const columns = [
    { field: "customer_name", headerName: "Customer", flex: 1 },
    { field: "company", headerName: "Company", flex: 1 },
    { field: "industry", headerName: "Industry", flex: 1 },
  ];

  return (
    <MotionCard>
      <Box sx={{ p: 3 }}>
        <Typography
          variant="h5"
          sx={{ color: "white", fontWeight: 700, mb: 3 }}
        >
          Lead History
        </Typography>

        <TextField
          fullWidth
          placeholder="Search leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              color: "white",
              borderRadius: 3,
            },
          }}
        />

        <Box sx={{ height: 360 }}>
          <DataGrid
            rows={filtered}
            columns={columns}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            sx={{
              border: "none",
              color: "white",
              "& .MuiDataGrid-columnHeaders": {
                background: "rgba(255,255,255,.05)",
              },
            }}
          />
        </Box>
      </Box>
    </MotionCard>
  );
}