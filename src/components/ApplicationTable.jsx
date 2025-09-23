import { useEffect, useState } from "react";
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
} from "@mui/material";

export default function DataTable() {
  const { getUniversityCourses, getApplicants } = useUniversity();
  const [applications, setApplications] = useState([]);
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

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
    fetchApiData();
  }, []);

  console.log("Applications:", applications);
  console.log("Courses:", state);

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
      field: "requirements",
      headerName: "Requirements",
      width: 250,
      flex: 1,
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
      field: "deadline",
      headerName: "Deadline",
      width: 120,
      valueFormatter: (params) => {
        if (!params.value) return "N/A";
        return new Date(params.value).toLocaleDateString();
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        const alreadyApplied = applications.some(
          (app) => app.course == params.row.course_id
        );
        return (
          <Chip
            label={alreadyApplied ? "Applied" : "Available"}
            color={alreadyApplied ? "success" : "primary"}
            size="small"
            variant={alreadyApplied ? "filled" : "outlined"}
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      type: "actions",
      getActions: (params) => {
        const alreadyApplied = applications.some(
          (app) => app.course == params.row.course_id
        );

        return [
          alreadyApplied ? (
            <Box
              component="span"
              sx={{
                px: 2,
                py: 1,
                color: "text.secondary",
                fontStyle: "italic",
                fontSize: "0.875rem",
              }}
            >
              Applied
            </Box>
          ) : (
            <NavLink
              to="/applications"
              state={{
                course: params.row.course,
                university: params.row.university,
                id: params.row.id,
                course_id: params.row.course_id,
              }}
              style={{ textDecoration: "none" }}
            >
              <GridActionsCellItem
                // icon={<HowToReg />}
                label="Apply Now"
                showInMenu
              />
            </NavLink>
          ),
        ];
      },
    },
  ];

  const rows = state.map((item) => ({
    ...item,
    id: item.id,
  }));

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
    <Box sx={{ height: 400, width: "100%" }}>
      <Typography variant="h4" component="h1" gutterBottom >
        University Courses
      </Typography>
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
