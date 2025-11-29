import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { NavLink } from "react-router-dom";
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
import { useSelector } from "react-redux";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const { email, password } = state;
  const { error } = useSelector((state) => state.auth);

  const { loginAuth } = useAuth();

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

    loginAuth(state);

    // setState({
    //   email: "",
    //   password: "",
    // });
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
          sx={{ my: 3, fontStyle: "italic" }}
        >
          ScholFind
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
              <Button variant="contained" type="submit" fullWidth size="large">
                Login
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
            <NavLink to={"/forget-password"} style={{ textDecoration: "none" }}>
              <Typography variant="body2" color="primary">
                Forget password?
              </Typography>
            </NavLink>
            <Typography variant="body2">
              Don't have account? {""}
              <NavLink to={"/register"} style={{ textDecoration: "none" }}>
                <Typography variant="body2" color="#1976d2" component="span">
                  Register
                </Typography>
              </NavLink>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
