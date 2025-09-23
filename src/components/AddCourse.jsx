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
} from "@mui/material";
import { toast } from "react-toastify";

const AddCourse = () => {
  const { getCategory } = useCategory();
  const { addCourse } = useCourse();

  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    course: "",
    level: "diploma",
    category_id: "",
    deadline: "",
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

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!course || !level || !category_id || !deadline) return;
    try {
      await addCourse(form);
      setForm({
        course: "",
        level: "",
        category_id: "",
        deadline: "",
      });
      toast.success("course added");
    } catch (error) {
      toast.error("something went wrong", error?.message);
    }
  };

  const { course, category_id, level, deadline } = form;

  return (
    <Box onSubmit={handleSubmit} component={"form"}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7 }}>
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
        <Grid size={{ xs: 12, md: 7 }}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel id="level-select-label">Level:</InputLabel>
            <Select
              labelId="level-select-label"
              id="level-select"
              name="level"
              value={level || ''} 
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
        <Grid size={{ xs: 12, md: 7 }}>
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
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <TextField
            size="small"
            fullWidth
            type="date"
            name="deadline"
            value={deadline}
            label="Deadline"
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <Button variant="contained" type="submit" fullWidth>
            Create Course
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddCourse;
