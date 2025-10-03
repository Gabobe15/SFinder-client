import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DescriptionIcon from "@mui/icons-material/Description";
import useUniversity from "../hooks/useUniversity";
import { NavLink } from "react-router-dom";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import {
  Paper,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  Button,
} from "@mui/material";

export default function DataTable() {
  const { getUniversityCourses, getApplicants } = useUniversity();
  const [_, setApplications] = useState([]);
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  // Get current user from Redux
  const currentUser = useSelector((state) => state.auth.user);
  const currentUserId = currentUser?.id;

  const fetchApiData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [courseData, applicantsData] = await Promise.all([
        getUniversityCourses(),
        getApplicants(),
      ]);
      setState(courseData);
      setApplications(applicantsData || []);
    } catch (error) {
      setError(error?.message || "Failed to fetch data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUserId) {
      fetchApiData();
    }
  }, [currentUserId]);



  const columns = [
    {
      field: "course",
      headerName: "Course",
      width: 200,
      flex: 1,
    },
    {
      field: "university",
      headerName: "University",
      width: 150,
    },
    {
      field: "level",
      headerName: "Level",
      width: 250,
      flex: 1,
    },
    {
      field: "requirement_file",
      headerName: "Requirements",
      width: 250,
      flex: 1,
      renderCell: (params) => {
        if (!params.value) {
          return (
            <Typography
              variant="body2"
              color="text.secondary"
              fontStyle="italic"
            >
              No requirements file
            </Typography>
          );
        }

        return (
          <Button
            variant="outlined"
            size="small"
            startIcon={<DescriptionIcon />}
            href={params.value}
            target="_blank"
            download
            component="a"
            sx={{
              textTransform: "none",
              fontWeight: "500",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            PDF
          </Button>
        );
      },
    },
    {
      field: "available_slots",
      headerName: "Slots",
      width: 80,
      type: "number",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "formatted_deadline",
      headerName: "Deadline",
      width: 120,
      valueFormatter: (params) => {
        return params.value;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 140,
      renderCell: (params) => {
        const { has_applied, is_available, is_past_deadline } = params.row;

        if (has_applied) {
          return (
            <Chip
              label="Applied"
              color="success"
              size="small"
              variant="filled"
            />
          );
        } else if (!is_available) {
          if (is_past_deadline) {
            return (
              <Chip
                label="Closed"
                color="error"
                size="small"
                variant="filled"
              />
            );
          } else {
            return (
              <Chip
                label="Unavailable"
                color="warning"
                size="small"
                variant="filled"
              />
            );
          }
        } else {
          return (
            <Chip
              label="Available"
              color="primary"
              size="small"
              variant="outlined"
            />
          );
        }
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      type: "actions",
      getActions: (params) => {
        const { has_applied, is_available, is_past_deadline, available_slots } =
          params.row;

        // User has already applied
        if (has_applied) {
          return [
            <Box
              key="applied"
              component="span"
              sx={{
                px: 2,
                py: 1,
                color: "text.secondary",
                fontStyle: "italic",
                fontSize: "0.875rem",
              }}
            >
              Already Applied
            </Box>,
          ];
        }

        // Course is not available (deadline passed or no slots)
        if (!is_available) {
          let reason = "Closed";
          if (is_past_deadline) {
            reason = "Deadline Passed";
          } else if (available_slots <= 0) {
            reason = "No Slots";
          } else if (!params.row.deadline) {
            reason = "No Deadline";
          }

          return [
            <Button
              key="closed"
              disabled
              size="small"
              variant="outlined"
              sx={{ color: "text.disabled", borderColor: "text.disabled" }}
            >
              {reason}
            </Button>,
          ];
        }

        // Course is available for application
        return [
          <NavLink
            key="apply"
            to="/applications"
            state={{
              course: params.row.course,
              university: params.row.university,
              university_id: params.row.university_id,
              course_id: params.row.course_id,
            }}
            style={{ textDecoration: "none" }}
          >
            <GridActionsCellItem label="Apply Now" showInMenu />
          </NavLink>,
        ];
      },
    },
  ];

  const rows = state.map((item) => ({
    ...item,
    id: item.id,
  }));

  // Debug: Check the data structure
  useEffect(() => {}, [state]);

  if (!currentUserId && !loading) {
    return (
      <Alert severity="warning" sx={{ mb: 2 }}>
        Please log in to view courses.
      </Alert>
    );
  }

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={400}
      >
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Loading courses..
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Error loading courses: {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ height: 400, width: "100%", mt: 2 }}>
      {rows.length === 0 && !loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={200}
        >
          <Typography variant="body1" color="text.secondary">
            No courses found
          </Typography>
        </Box>
      ) : (
        <Paper sx={{ height: "100%", width: "100%", p: 2 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 25, 50]}
            checkboxSelection={false}
            disableRowSelectionOnClick
            loading={loading}
            slots={{
              toolbar: GridToolbar,
            }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
            sx={{
              border: 0,
              "& .MuiDataGrid-cell:hover": {
                backgroundColor: "action.hover",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "background.default",
              },
              "& .MuiDataGrid-toolbarContainer": {
                padding: "16px",
                backgroundColor: "background.paper",
                borderBottom: "1px solid",
                borderColor: "divider",
              },
            }}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5, page: 0 },
              },
              sorting: {
                sortModel: [{ field: "deadline", sort: "asc" }],
              },
            }}
          />
        </Paper>
      )}
    </Box>
  );
}
