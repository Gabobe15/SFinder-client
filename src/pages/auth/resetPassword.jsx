import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

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

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { error } = useSelector((state) => state.auth);
  const { uid, token } = useParams();
  const [state, setState] = useState({
    new_password: "",
    confirm_password: "",
  });

  const { new_password, confirm_password } = state;

  const { resetPassword } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ uid, token, new_password, confirm_password });

    if (new_password != confirm_password) {
      toast.error("password don't match");
      return;
    }

    resetPassword({ uid, token, new_password, confirm_password });
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
          Reset Password
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
            <Grid size={{ xs: 12 }}>
              <TextField
                id="cpassword"
                name="confirm_password"
                label="Confirm Password"
                variant="outlined"
                fullWidth
                type={showPassword ? "text" : "password"}
                value={confirm_password}
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
            <Grid size={{ xs: 12}}>
              <Button variant="contained" type="submit" fullWidth size="large">
                Reset Password
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
        </Box>
      </Paper>
    </Container>
  );
};

export default ResetPassword;
