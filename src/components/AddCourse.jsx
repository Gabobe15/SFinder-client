import { useEffect, useState } from "react";
import useCategory from "../hooks/useCategory";
import useCourse from "../hooks/useCourse";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper, // Added Paper component
} from "@mui/material";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const AddCourse = () => {
  const { UserList } = useAuth();
  const { getCategory } = useCategory();
  const { addCourse } = useCourse();

  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    course: "",
    level: "diploma",
    category_id: "",
  });

  const fetchCategories = async () => {
    try {
      const data = await getCategory();
      setCategories(data || []);
      setForm({
        course: "",
        category_id: "",
        deadline: "",
      });
    } catch (error) {
      toast.error("something went wrong", error?.message);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await UserList();
      setUser(response);
    } catch (error) {
      console.log("something went wrong", error?.message);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!course || !level || !category_id) return;
    try {
      await addCourse(form);
      setForm({
        course: "",
        level: "",
        category_id: "",
      });
    } catch (error) {
      toast.error("something went wrong", error?.message);
    }
  };

  const { course, category_id, level } = form;

  console.log(user);

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 4, md: 8 },
        maxWidth: 800,
        mx: "auto",
        bgcolor: "background.paper",
      }}
    >
      <Box component={"form"} onSubmit={handleSubmit}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ mb: 3 }}
          textAlign={"center"}
          textTransform={"uppercase"}
        >
          Add Course
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            {/* Changed size to item */}
            <TextField
              size="small"
              label="Course Name"
              name="course"
              value={course}
              fullWidth
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="level-select-label">Level:</InputLabel>
              <Select
                labelId="level-select-label"
                id="level-select"
                name="level"
                value={level || ""}
                onChange={handleChange}
                label="Level"
              >
                <MenuItem value="" disabled>
                  <em>Select a level</em>
                </MenuItem>
                <MenuItem value="diploma">Diploma</MenuItem>
                <MenuItem value="degree">Degree</MenuItem>
              </Select>
            </FormControl>
          </Grid>
       
          <Grid size={{ xs: 12 }}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="category-select-label">Field of Study</InputLabel>
              <Select
                labelId="category-select-label"
                id="category_id"
                name="category_id"
                value={category_id}
                onChange={handleChange}
                label="Field of Study"
              >
            
                <MenuItem value="" disabled>
                  Select a field
                </MenuItem>
                {categories
                  .filter((category) => category?.name === user?.field_study)
                  .map(({ name, id }) => (
                    <MenuItem key={id} value={id}>
                      {name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Button variant="contained" type="submit" fullWidth size="large">
              Create Course
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default AddCourse;
