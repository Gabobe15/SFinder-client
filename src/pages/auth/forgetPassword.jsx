import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";

const ForgetPassword = () => {
  const { error } = useSelector((state) => state.auth);
  const [state, setState] = useState({
    email: "",
  });

  const { email } = state;

  const { forgetPassword } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);

    forgetPassword(email);

    setState({
      email: "",
    });
  };
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
              <Button variant="contained" type="submit" fullWidth size="large">
                Password Reset
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

export default ForgetPassword;
