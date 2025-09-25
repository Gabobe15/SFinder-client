import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { NavLink } from "react-router-dom";
import useCategory from "../../hooks/useCategory";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Container,
  Grid,
  Paper,
  FormControl,
  FormLabel,
  MenuItem,
  FormControlLabel,
  RadioGroup,
  Radio,
  InputLabel,
  Select,
} from "@mui/material";
import { useSelector } from "react-redux";
import { MuiTelInput } from "mui-tel-input";

const AdminRegiter = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { error } = useSelector((state) => state.auth);

  const { getCategory } = useCategory();
  const { registerAuth } = useAuth();

  const [category, setCategory] = useState([]);

  const [state, setState] = useState({
    fullname: "",
    email: "",
    sex: "",
    mobile: "",
    role: "",
    address: "",
    password: "",
    confirmPassword: "",
    category_id: "",
  });

  const {
    fullname,
    sex,
    mobile,
    email,
    role,
    address,
    password,
    confirmPassword,
    category_id,
  } = state;

  const fetchCategory = async () => {
    try {
      const data = await getCategory();
      setCategory(data);
    } catch (error) {
      console.log(error?.messsage);
    }
  };

  console.log(category);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      alert("password don`t match");
      return;
    }
    console.log(state);

    registerAuth({
      fullname,
      email,
      mobile,
      sex,
      role,
      address,
      password,
      category_id,
    });

    setState({
      fullname: "",
      email: "",
      sex: "",
      mobile: "",
      role: "",
      address: "",
      password: "",
      confirmPassword: "",
      field_study: "",
    });
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handlePhoneChange = (newValue) => {
    setState((prev) => ({
      ...prev,
      mobile: newValue,
    }));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "50vh",
        display: "flex",
        alignContent: "center",
        flexDirection: "column",
        // border: "1px solid red",
        py: 4,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 4,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Add Account
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Grid container justifyContent="center" spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                id="fullname"
                type="text"
                name="fullname"
                label="Full name"
                fullWidth
                variant="outlined"
                value={fullname}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                id="email"
                type="email"
                name="email"
                label="Email"
                fullWidth
                variant="outlined"
                value={email}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <MuiTelInput
                value={mobile}
                onChange={handlePhoneChange}
                name="mobile"
                label="Phone Number"
                defaultCountry="KE"
                variant="outlined"
                fullWidth
                forceCallingCode
                preferredCountries={["KE", "SO", "ET", "UG"]}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel id="role-select-label">Role</InputLabel>
                <Select
                  labelId="role-select-label"
                  id="role-select"
                  name="role"
                  value={role}
                  onChange={handleChange}
                  label="Role"
                >
                  <MenuItem value="" disabled>
                    <em>Select a role</em>
                  </MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="university">University</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel id="category-select-label">
                  Field of Study
                </InputLabel>
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
                  {category.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl component="fieldset">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    flexWrap: "wrap",
                  }}
                >
                  <FormLabel component="legend" sx={{ mb: 0, marginRight: 1 }}>
                    Sex:
                  </FormLabel>
                  <RadioGroup
                    aria-label="sex"
                    name="sex"
                    value={sex}
                    onChange={handleChange}
                    row
                    sx={{
                      display: "flex",
                      flexWrap: { xs: "wrap", sm: "nowrap" },
                      gap: { xs: 1, sm: 2 },
                    }}
                  >
                    <FormControlLabel
                      value="Male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="Female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="institution"
                      control={<Radio />}
                      label="Educational Institution"
                      sx={{ whiteSpace: "nowrap" }}
                    />
                  </RadioGroup>
                </Box>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                label="Address"
                name="address"
                value={address}
                onChange={handleChange}
                multiline
                fullWidth
                rows={3}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                fullWidth
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handleChange}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword ? "hide password" : "show password"
                          }
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                id="cpassword"
                name="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                fullWidth
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleChange}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword ? "hide password" : "show password"
                          }
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Button
                variant="contained"
                sx={{ bgcolor: "#008000" }}
                type="submit"
                fullWidth
                size="large"
              >
                Register
              </Button>
              {error && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{ mt: 2, textAlign: "center" }}
                >
                  {error}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 2,
              gap: 1,
            }}
          >
            <Typography variant="body2">
              Already have account? {""}
              <NavLink to={"/login"} style={{ textDecoration: "none" }}>
                <Typography variant="body2" color="#1976d2" component="span">
                  Login
                </Typography>
              </NavLink>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminRegiter;
