import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

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
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import { NavLink } from "react-router-dom";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { error } = useSelector((state) => state.auth);
  const [state, setState] = useState({
    old_password: "",
    new_password: "",
    confirm_new_password: "",
  });

  const { old_password, new_password, confirm_new_password } = state;

  const { changePassword } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);

    if (new_password != confirm_new_password) {
      toast.error("password don't match");
      return;
    }

    changePassword(state);

    // setState({
    //   email: "",
    //   password: "",
    // });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "60vh",
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        flexDirection: "column",
        py: 4,
        margin: "40px auto",
      }}
    >
      <Box sx={{ display: "flex", gap: 2, my: 2, alignItems: "center" }}>
        <NavLink style={{ textDecoration: "none" }} to="/account">
          Account
        </NavLink>
        <NavLink
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            background: "blue",
            color: "white",
            padding: "2px 10px",
          }}
          to="/change-password"
        >
          <LockIcon fontSize="small" sx={{ mr: 0.5 }} />
          Security
        </NavLink>
      </Box>
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
          Change Password
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
            gap: 2,
          }}
        >
          <Grid container justifyContent="center" spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                id="opassword"
                name="old_password"
                label="Old Password"
                variant="outlined"
                fullWidth
                type={showPassword ? "text" : "password"}
                value={old_password}
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
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                id="npassword"
                name="new_password"
                label="New Password"
                variant="outlined"
                fullWidth
                type={showPassword ? "text" : "password"}
                value={new_password}
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
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                id="cpassword"
                name="confirm_new_password"
                label="Confirm Password"
                variant="outlined"
                fullWidth
                type={showPassword ? "text" : "password"}
                value={confirm_new_password}
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
              <Button variant="contained" type="submit" fullWidth size="large">
                Change Password
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
              alignItems: "flex-start",
              mt: 2,
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Password Requirements:
            </Typography>
            <Typography variant="caption">
              Minimum 8 characters long - the more the better
            </Typography>
            <Typography variant="caption">
              At least on lowercase & uppercase letter
            </Typography>
            <Typography variant="caption">
              At least one number, symbol
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ChangePassword;
