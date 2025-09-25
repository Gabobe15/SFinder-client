import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Paper,
  Alert,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
} from "@mui/material";

import { NavLink } from "react-router-dom";
import { MuiTelInput } from "mui-tel-input";
import useAuth from "../../hooks/useAuth";

const Account = () => {
  const { loading, user } = useSelector((state) => state.auth);
  const role = user?.role;

  const { UserList, updateUserProfile } = useAuth();

  const [state, setState] = useState({
    fullname: "",
    email: "",
    mobile: "",
    address: "",
    sex: "",
  });

  const { fullname, email, mobile, address, sex } = state;

  const [updateError, setUpdateError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await UserList();
        setState({
          fullname: userData.fullname || "",
          email: userData.email || "",
          mobile: userData.mobile || "",
          address: userData.address || "",
          sex: userData.sex || "",
        });
      } catch (error) {
        console.error("Failed to load user data", error);
      }
    };
    loadUserData();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateError("");
    setUpdateSuccess("");
    try {
      await updateUserProfile({
        fullname,
        mobile,
        address,
        sex,
        email,
      });
    } catch (error) {
      console.log(error?.message);

      setUpdateError("Failed to update profile. Please try again.");
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "40vh",
        display: "flex",
        alignContent: "center",
        flexDirection: "column",
        py: 4,
      }}
    >
      <Box sx={{ display: "flex", gap: 2, my: 2, alignItems: "center" }}>
        <NavLink
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            background: "blue",
            color: "white",
            padding: "2px 10px",
          }}
          to="/account"
        >
          <PersonOutlineIcon fontSize="small" sx={{ mr: 0.5 }} />
          Account
        </NavLink>
        <NavLink
          style={{
            textDecoration: "none",
          }}
          to="/change-password"
        >
          Security
        </NavLink>
      </Box>
      {updateSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {updateSuccess}
        </Alert>
      )}
      {updateError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {updateError}
        </Alert>
      )}
      <Paper
        elevation={3}
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
          sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}
        >
          Account Detail
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Grid container justifyContent="center" spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                name="fullname"
                label="Full name"
                variant="outlined"
                fullWidth
                value={fullname}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={handleChange}
                type="email"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
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
                    {role == "university" && (
                      <FormControlLabel
                        value="None"
                        control={<Radio />}
                        label="None"
                        id="none"
                      />
                    )}
                  </RadioGroup>
                </Box>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                name="address"
                label="Address"
                variant="outlined"
                fullWidth
                value={address}
                onChange={handleChange}
                multiline
                rows={3}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                size="large"
                disabled={loading}
                sx={{ py: 1.5 }}
              >
                {loading ? <CircularProgress size={24} /> : "Save Change"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Account;
