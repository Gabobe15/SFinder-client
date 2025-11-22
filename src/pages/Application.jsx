import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useUniversity from "../hooks/useUniversity";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { MuiTelInput } from "mui-tel-input";

const MultiStepForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const steps = ["Personal Information", "Academic Information"];
  const location = useLocation();

  // ✅ Correctly map university_id → universityId
  const {
    course: initialCourse,
    university: initialUniversity,
    university_id: universityId,
    course_id: courseId,
  } = location.state || {};

  console.log("Extracted values:", {
    initialCourse,
    initialUniversity,
    universityId,
    courseId,
  });

  const { addApplicants } = useUniversity();

  const [step, setStep] = useState(1);
  const [state, setState] = useState({
    // personal info
    fullname: "",
    email: "",
    address: "",
    national_id: "",
    county: "",
    phone: "",
    sex: "",
    passport_photo: null,
    // academic info
    course: courseId,
    university: universityId, // ✅ use integer ID
    education_level: "",
    qualification: "",
    recommendation: null,
    academic_transcript: null,
    personal_statement: null,
  });

  console.log(
    "university ID",
    universityId,
    "University Name",
    initialUniversity
  );

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      if (files[0].size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
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

  const {
    fullname,
    email,
    address,
    national_id,
    county,
    phone,
    sex,
    education_level,
    qualification,
  } = state;

  const nextStep = () => {
    if (step === 1) {
      if (
        !state.fullname ||
        !state.email ||
        !state.national_id ||
        !state.county ||
        !state.phone ||
        !state.sex ||
        !state.address ||
        !state.passport_photo
      ) {
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formdata = new FormData();

      // Convert IDs to integers explicitly
      const intUniversityId = parseInt(universityId);
      const intCourseId = parseInt(courseId);

      console.log("Sending IDs:", {
        universityId: intUniversityId,
        courseId: intCourseId,
      });

      Object.entries(state).forEach(([key, value]) => {
        if (value) {
          if (value instanceof File) {
            formdata.append(key, value);
          } else if (key === "university") {
            formdata.append(key, intUniversityId);
          } else if (key === "course") {
            formdata.append(key, intCourseId);
          } else {
            formdata.append(key, value);
          }
        }
      });

      // Debug what's being sent
      for (let [key, value] of formdata.entries()) {
        console.log(key, value);
      }

      await addApplicants(formdata);

      navigate("/");
    } catch (error) {
      toast.error("Submission failed. Please try again.");
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (newValue) => {
    setState((prev) => ({
      ...prev,
      phone: newValue,
    }));
  };

  return (
    <Container maxWidth="md" sx={{ my: 2 }}>
      <Paper elevation={3} sx={{ p: 4, position: "relative" }}>
        <Typography variant="h4" gutterBottom align="center">
          University Application
        </Typography>
        <Box component={"form"} onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    name="fullname"
                    value={fullname}
                    type="text"
                    fullWidth
                    label="Fullname"
                    variant="outlined"
                    onChange={handleChange}
                    required
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    type="email"
                    name="email"
                    label="Email"
                    required
                    fullWidth
                    variant="outlined"
                    value={email}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    name="national_id"
                    value={national_id}
                    type="text"
                    fullWidth
                    label="National Id"
                    variant="outlined"
                    onChange={handleChange}
                    required
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    name="county"
                    value={county}
                    type="text"
                    fullWidth
                    label="County"
                    variant="outlined"
                    onChange={handleChange}
                    required
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <MuiTelInput
                    value={phone}
                    onChange={handlePhoneChange}
                    name="phone"
                    label="Phone Number"
                    defaultCountry="KE"
                    variant="outlined"
                    fullWidth
                    required
                    forceCallingCode
                    preferredCountries={["KE", "SO", "ET", "UG"]}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    type="file"
                    name="passport_photo"
                    label="Passport Photo"
                    fullWidth
                    required
                    variant="outlined"
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      accept: "image/*",
                    }}
                    helperText="Upload a recent passport-sized photo (JPG, PNG, max 5MB)"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl component="fieldset" fullWidth>
                    <FormLabel component="legend">Sex:</FormLabel>
                    <RadioGroup
                      aria-label="sex"
                      name="sex"
                      value={sex}
                      onChange={handleChange}
                      row
                      sx={{ mt: 1 }}
                    >
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    name="address"
                    label="Address"
                    multiline
                    rows={3}
                    required
                    fullWidth
                    variant="outlined"
                    value={address}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </>
          )}

          {step === 2 && (
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" gutterBottom>
                  Academic Information
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Course: {initialCourse} | University: {initialUniversity}
                </Typography>
              </Grid>

              <div>
                <input type="hidden" name="course" value={courseId} />
                <p>Course: {initialCourse}</p>
              </div>
              <div>
                <input type="hidden" name="university" value={universityId} />
                <p>University: {initialUniversity}</p>
              </div>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  type="text"
                  name="education_level"
                  value={education_level}
                  variant="outlined"
                  fullWidth
                  label="Education Level"
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  type="text"
                  name="qualification"
                  value={qualification}
                  onChange={handleChange}
                  fullWidth
                  label="Qualification"
                  required
                  variant="outlined"
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  type="file"
                  name="academic_transcript"
                  label="Academic Transcript"
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ accept: ".pdf" }}
                  required
                  helperText="Upload a PDF file (max 5MB)"
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  type="file"
                  name="personal_statement"
                  label="Personal Statement"
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ accept: ".pdf" }}
                  required
                  helperText="Upload a PDF file (max 5MB)"
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  type="file"
                  name="recommendation"
                  label="Recommendation"
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ accept: ".pdf" }}
                  required
                  helperText="Upload a PDF file (max 5MB)"
                />
              </Grid>
            </Grid>
          )}

          <Box
            sx={{
              mt: 4,
              pt: 2,
              borderTop: "1px solid",
              borderColor: "divider",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Chip
              label={`Step ${step} of ${steps.length}`}
              color="primary"
              variant="outlined"
            />
            <Box sx={{ display: "flex", gap: 1 }}>
              {step > 1 && (
                <Button
                  variant="outlined"
                  onClick={prevStep}
                  disabled={loading}
                >
                  Back
                </Button>
              )}
              {step < steps.length ? (
                <Button
                  variant="contained"
                  onClick={nextStep}
                  disabled={loading}
                >
                  Next
                </Button>
              ) : (
                <Button variant="contained" type="submit" disabled={loading}>
                  {loading ? "Submitting" : "Submit Application"}
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default MultiStepForm;
