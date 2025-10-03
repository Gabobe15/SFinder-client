import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { NavLink, useNavigate } from "react-router-dom";
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
} from "@mui/material";
import { useSelector } from "react-redux";
import { MuiTelInput } from "mui-tel-input";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const { error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const nagivate = useNavigate();
  const [state, setState] = useState({
    fullname: "",
    email: "",
    sex: "",
    mobile: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const { fullname, sex, mobile, email, address, password, confirmPassword } =
    state;

  const { registerAuth } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (newValue) => {
    setState((prev) => ({
      ...prev,
      mobile: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      alert("password don`t match");
      return;
    }
    console.log(state);

    try {
      registerAuth({ fullname, email, mobile, sex, address, password });
      setTimeout(() => {
        nagivate("/login");
      }, 5000);
    } catch (error) {
      toast.error("Something went wrong", error);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Container
      maxWidth="sm"
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
          Regsiter
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
              <FormControl component="fieldset">
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <FormLabel component="legend" sx={{ mb: 0, marginRight: 1 }}>
                    Sex:
                  </FormLabel>
                  <RadioGroup
                    aria-label="sex"
                    name="sex"
                    value={sex}
                    onChange={handleChange}
                    row
                    sx={{ display: "flex", gap: 2 }}
                  >
                    <FormControlLabel
                      value="Male"
                      control={<Radio />}
                      label="Male"
                      id="male"
                    />
                    <FormControlLabel
                      value="Female"
                      control={<Radio />}
                      label="Female"
                      id="female"
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

export default RegisterPage;
