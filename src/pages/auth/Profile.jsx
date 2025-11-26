import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  CircularProgress,
  Backdrop,
  Alert,
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import {
  Lock as LockIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  LocationOn as LocationOnIcon,
  CalendarToday as CalendarTodayIcon,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { UserList } = useAuth();

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await UserList();
      setData(response);
    } catch (error) {
      console.error("Failed to load profile", error?.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading)
    return (
      <Backdrop open sx={{ color: "#fff", zIndex: 9999 }}>
        <CircularProgress color="inherit" />
        <Typography sx={{ ml: 2 }}>Loading your profile...</Typography>
      </Backdrop>
    );

  if (error)
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Error loading profile: {error}
        </Alert>
        <Button variant="contained" onClick={fetchUserData}>
          Try Again
        </Button>
      </Container>
    );

  return (
    <Container maxWidth="lg" sx={{ py: 4, minHeight: "60vh" }}>
      {/* Profile Card */}
      <Paper elevation={2} sx={{ borderRadius: 3, overflow: "hidden" }}>
        <Box
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            height: 150,
          }}
        />

        <Card sx={{ mt: -8, borderRadius: 3 }}>
          <Grid container spacing={3} sx={{ p: 4 }}>
            <Grid
              item
              xs={12}
              md={3}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <CardMedia
                sx={{
                  height: 140,
                  width: 140,
                  borderRadius: "50%",
                  border: "4px solid white",
                  boxShadow: 3,
                }}
                image={data?.profile_picture || "/profile.jpg"}
                title={`${data?.fullname}'s profile`}
              />
            </Grid>

            <Grid item xs={12} md={9}>
              <CardContent>
                <Typography variant="h4" gutterBottom fontWeight="bold">
                  {data?.fullname}
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
                  <Chip label={data?.role} color="primary" variant="filled" />
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="body1"
                      sx={{ display: "flex", alignItems: "center", mb: 1 }}
                    >
                      <EmailIcon sx={{ mr: 1, color: "text.secondary" }} />
                      {data?.email}
                    </Typography>
                  </Grid>
                  {data?.sex !== "None" && (
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="body1"
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <PersonIcon sx={{ mr: 1, color: "text.secondary" }} />

                        {data?.sex}
                      </Typography>
                    </Grid>
                  )}
                  {data?.study && (
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="body1"
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <SchoolIcon sx={{ mr: 1, color: "text.secondary" }} />

                        {data?.study}
                      </Typography>
                    </Grid>
                  )}
                  {data?.mobile && (
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="body1"
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <PhoneIcon sx={{ mr: 1, color: "text.secondary" }} />
                        {data?.mobile}
                      </Typography>
                    </Grid>
                  )}
                  {data?.address && (
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="body1"
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <LocationOnIcon
                          sx={{ mr: 1, color: "text.secondary" }}
                        />
                        {data?.address}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Paper>
    </Container>
  );
};

export default Profile;
