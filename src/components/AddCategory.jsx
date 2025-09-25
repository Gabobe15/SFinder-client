import { useState } from "react";
import { NavLink } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const AddCategory = () => {
  const [state, setState] = useState({
    name: "",
    general_requirements: "",
    requirement_file: null,
  });

  const { name, general_requirements } = state;

  const { addCategory } = useCategory();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      if (files[0].size > 5 * 1024 * 1024) {
        return;
      }
      setState({
        ...state,
        [name]: files[0],
      });
    } else {
      setState({
        ...state,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("general_requirements", general_requirements);
    if (state.requirement_file) {
      formdata.append("requirement_file", state.requirement_file);
    }
    console.log(state);

    addCategory(formdata);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          maxWidth: 800,
          mx: "auto",
          bgcolor: "background.paper",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%", // Use full width
            maxWidth: "100%", // Prevent horizontal overflow
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Add Category
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                name="name"
                value={name}
                fullWidth
                onChange={handleChange}
                label="Category"
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                name="general_requirements"
                value={general_requirements}
                fullWidth
                onChange={handleChange}
                label="General Requirement"
                size="small"
                multiline
                rows={3}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                type="file"
                label="Requirement file"
                name="requirement_file"
                fullWidth
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                  htmlInput: { accept: ".pdf" },
                }}
                helperText="Upload a PDF file (max 5MB)"
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Button
                sx={{ margin: "10px 0" }}
                variant="contained"
                type="submit"
                fullWidth
                size="large"
              >
                Create Category
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddCategory;
