import { useState } from "react";
import { NavLink } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import {
  Box,
  Button,
  Container,
  Grid,
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

    // setState({
    //   email: "",
    //   password: "",
    // });
  };
  return (
    <Container maxWidth="lg" spacing={2}>
      <Box component="form" onSubmit={handleSubmit} sx={{ minWidth: 500 }}>
        <Typography variant="h5" gutterBottom mb={3}>
          Add Category
        </Typography>
        <Grid
          container
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Grid size={{ xs: 12, md: 7 }}>
            <TextField
              name="name"
              value={name}
              fullWidth
              onChange={handleChange}
              label="Category"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <TextField
              name="general_requirements"
              value={general_requirements}
              fullWidth
              onChange={handleChange}
              label="General Requirement"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <TextField
              type="file"
              label="Requirement file"
              name="requirement_file"
              fullWidth
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              inputProps={{ accept: ".pdf" }}
              required
              helperText="Upload a PDF file (max 5MB)"
            />
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <Button sx={{ margin: "10px 0" }} variant="contained" type="submit">
            Create Category
          </Button>
        </Grid>
      </Box>
    </Container>
  );
};

export default AddCategory;
