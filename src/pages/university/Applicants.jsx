import { useEffect, useState } from "react";
import useUniversity from "../../hooks/useUniversity";
import { useNavigate } from "react-router-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DoneIcon from "@mui/icons-material/Done";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import {
  Box,
  Typography,
  Chip,
  IconButton,
  Paper,
  Alert,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid/internals";

const Applicants = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });
  const { getApplicants, updateApplicationStatus } = useUniversity();
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getApplicants();
      setState(data || []);
    } catch (error) {
      setError(error?.message || "Failed to fetch applicants");
      console.error("Error fetching applicants:", error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateApplicationStatus(id, status);
      await fetchData();
    } catch (error) {
      console.error("Error updating status:", error?.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
      case "approved":
        return "success";
      case "rejected":
        return "error";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  const columns = [
    {
      field: "fullname",
      headerName: "Full Name",
      width: 150,
      flex: 1,
    },
    {
      field: "course_name",
      headerName: "Program",
      width: 150,
      flex: 1,
    },
    {
      field: "qualification",
      headerName: "Education",
      width: 150,
      flex: 1,
    },
    {
      field: "education_level",
      headerName: "Education Level",
      width: 150,
      flex: 1,
    },
    {
      field: "personal_statement",
      headerName: "Statement of Purpose",
      width: 130,
      renderCell: (params) => (
        <Button
          component="a"
          href={params.value}
          target="_blank"
          startIcon={<PictureAsPdfIcon />}
          size="small"
          variant="outlined"
          sx={{ textTransform: "none" }}
        >
          View
        </Button>
      ),
    },
    {
      field: "status",
      headerName: "Application Status",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value || "Pending"}
          color={getStatusColor(params.value)}
          size="small"
        />
      ),
    },

    {
      field: "actions",
      headerName: "Review",
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
          <IconButton
            onClick={() =>
              handleStatusUpdate(Number(params.row.id), "accepted")
            }
            color="success"
            size="small"
            title="Approve application"
            disabled={params.row.status === "accepted"}
          >
            <DoneIcon />
          </IconButton>
          <IconButton
            onClick={() =>
              handleStatusUpdate(Number(params.row.id), "rejected")
            }
            color="error"
            size="small"
            title="Reject application"
            disabled={params.row.status === "rejected"}
          >
            <CancelOutlinedIcon />
          </IconButton>
        </Box>
      ),
    },
    {
      field: "details",
      headerName: "Details",
      width: 100,
      renderCell: (params) => (
        <IconButton
          onClick={() => navigate(`/university/applications/${params.row.id}`)}
          size="small"
          title="View application details"
        >
          <InfoOutlinedIcon color="info" />
        </IconButton>
      ),
    },
  ];

  const rows = state.map((item) => ({
    id: item.id,
    fullname: item.fullname,
    course_name: item.course_name,
    qualification: item.qualification,
    education_level: item.education_level,
    personal_statement: item.personal_statement,
    status: item.status,
  }));

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={200}
      >
        <Typography>Loading applications...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Error loading applications: {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        Applications Review
      </Typography>

      {rows.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="body1" color="text.secondary">
            No applications found
          </Typography>
        </Paper>
      ) : (
        <Paper sx={{ height: "100%", width: "100%"}}>
          <DataGrid
            rows={rows}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 25, 50]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: paginationModel.pageSize,
                  page: paginationModel.page,
                },
              },
            }}
          />
        </Paper>
      )}
    </Box>
  );
};

export default Applicants;
