import { useEffect, useState } from "react";
import useCourse from "../hooks/useCourse";
import useUniversity from "../hooks/useUniversity";
import useAuth from "../hooks/useAuth";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const AddUniversityCourse = () => {
  const user = useSelector((state) => state.auth.user);
  console.log("user", user);
  const userId = user?.id;
  const { getCourses } = useCourse();
  const { UserList } = useAuth();
  const { addUniversityCourses } = useUniversity();

  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    available_slots: "",
    course_id: "",
    deadline: "",
  });

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchCategory = async () => {
    try {
      const data = await UserList();
      setCategory(data || {});
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchCategory();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.course_id || !form.available_slots || !form.deadline) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      await addUniversityCourses({
        available_slots: Number(form.available_slots),
        course_id: Number(form.course_id),
        university_id: Number(userId),
        deadline: form.deadline,
      });

      // Reset form
      setForm({
        available_slots: "",
        course_id: "",
        requirements: "",
        deadline: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const { available_slots, course_id, deadline } = form;
  console.log(courses);
  console.log(category);

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
          variant="h4"
          gutterBottom
          mb={3}
          textAlign={"center"}
          textTransform={"uppercase"}
        >
          Add Program
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="course_id-select-label">Course</InputLabel>
              <Select
                labelId="course_id-select-label"
                id="course_id-select"
                name="course_id"
                value={course_id}
                onChange={handleChange}
                label="Course"
                required
              >
                <MenuItem value="" disabled>
                  Select a course
                </MenuItem>
                {courses
                  .filter(
                    (course) => course.category?.name === category?.field_study
                  )
                  .map(({ course, id }) => (
                    <MenuItem key={id} value={id}>
                      {course}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              name="available_slots"
              value={available_slots}
              onChange={handleChange}
              type="number"
              required
              label="Available Slots"
              slotProps={{ htmlInput: { min: 1 } }}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              type="date"
              name="deadline"
              value={deadline}
              onChange={handleChange}
              label="Deadline"
              slotProps={{
                inputLabel: { shrink: true },
                htmlInput: { min: new Date().toISOString().split("T")[0] },
              }}
              required
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={loading}
            >
              {loading ? "Adding Course..." : "Add Course"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default AddUniversityCourse;
