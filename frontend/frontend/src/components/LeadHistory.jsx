import { useEffect, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MotionCard from "./MotionCard";
import PriorityBadge from "./PriorityBadge";
import api from "../services/api";

export default function LeadHistory() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/leads")
      .then((res) => {
        const data = res.data.map((lead) => ({
          ...lead,
          priority: lead.ai_analysis?.toLowerCase().includes("urgent")
            ? "High"
            : "Medium",
        }));
        setRows(data);
      })
      .catch(() => {});
  }, []);

  const filtered = rows.filter((r) =>
    `${r.customer_name} ${r.company} ${r.industry}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const columns = [
    { field: "customer_name", headerName: "Customer", flex: 1 },
    { field: "company", headerName: "Company", flex: 1 },
    { field: "industry", headerName: "Industry", flex: 1 },
    {
      field: "priority",
      headerName: "Priority",
      flex: 1,
      renderCell: (params) => (
        <PriorityBadge priority={params.value} />
      ),
    },
  ];

  return (
    <MotionCard>
      <Box sx={{ p: 3 }}>
        <Typography
          variant="h5"
          sx={{ color: "white", mb: 3, fontWeight: 700 }}
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

        <Box sx={{ height: 380 }}>
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