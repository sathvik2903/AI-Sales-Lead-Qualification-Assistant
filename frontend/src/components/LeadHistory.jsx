import { useEffect, useState } from "react";
import { Box, Typography, TextField, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import api from "../services/api";
import MotionCard from "./MotionCard";

export default function LeadHistory({ refresh }) {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");

  const loadLeads = async () => {
    try {
      const res = await api.get("/leads");

      const formatted = (res.data || []).map((lead) => ({
        id: lead.id,
        customer_name: lead.customer_name,
        company: lead.company,
        industry: lead.industry,
        score: lead.score,
        priority: lead.priority,
      }));

      setRows(formatted);
    } catch (err) {
      console.error("Lead History Error:", err);
    }
  };

  useEffect(() => {
    loadLeads();
  }, [refresh]);

  const filtered = rows.filter((r) =>
    `${r.customer_name} ${r.company} ${r.industry}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const columns = [
    { field: "customer_name", headerName: "Customer", flex: 1 },
    { field: "company", headerName: "Company", flex: 1 },
    { field: "industry", headerName: "Industry", flex: 1 },
    { field: "score", headerName: "Score", width: 100 },
    {
      field: "priority",
      headerName: "Priority",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={
            params.value === "High"
              ? "success"
              : params.value === "Medium"
              ? "warning"
              : "default"
          }
        />
      ),
    },
  ];

  return (
    <MotionCard>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ color: "white", mb: 3 }}>
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
              bgcolor: "#0F172A",
              color: "white",
              borderRadius: 2,
            },
          }}
        />

        <Box sx={{ height: 420 }}>
          <DataGrid
            rows={filtered}
            columns={columns}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5, page: 0 },
              },
            }}
            disableRowSelectionOnClick
            sx={{
              border: "none",
              bgcolor: "#1E293B",
              color: "white",

              "& .MuiDataGrid-columnHeaders": {
                bgcolor: "#0F172A",
                color: "white",
              },

              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid #334155",
              },

              "& .MuiDataGrid-row:hover": {
                bgcolor: "rgba(59,130,246,.08)",
              },

              "& .MuiDataGrid-footerContainer": {
                bgcolor: "#0F172A",
                color: "white",
              },

              "& .MuiDataGrid-overlay": {
                bgcolor: "#1E293B",
                color: "white",
              },
            }}
          />
        </Box>
      </Box>
    </MotionCard>
  );
}