import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import PlaceIcon from "@mui/icons-material/Place";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const contactData = [
  {
    name: "Contact",
    icon: PhoneCallbackIcon,
    label: "0722418100",
  },
  {
    name: "Email",
    icon: MailOutlineIcon,
    label: "edufinder@gmail.com",
  },
  {
    name: "Location",
    icon: PlaceIcon,
    label: "Diamond Plaza 1, Parklands",
  },
];

import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Paper,
  CardMedia,
  CardContent,
  Card,
} from "@mui/material";
import { setError } from "../features/authSlice";

const Contact = () => {
  const { error } = useSelector((state) => state.auth);
  const [state, setState] = useState({
    fullname: "",
    email: "",
    subject: "",
    message: "",
  });

  const { fullname, email, subject, message } = state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(state);

    try {
      if (!fullname || !email || !message || !subject) return;
      toast.success("Email sent successfully!");
      setState({
        email: "",
        password: "",
      });
    } catch (error) {
      setError(error?.message);
    }
  };

  return (
    <Box
      sx={{
        background: "#f7f7f7ff",
      }}
    >
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
        <Box sx={{ my: 2 }}>
          <Grid container spacing={2}>
            {contactData.map(({ icon: IconComponent, label }, index) => (
              <Grid size={{ xs: 6, md: 4 }} key={index}>
                <Card
                  sx={{
                    height: 150,
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <CardContent>
                    <IconComponent
                      sx={{ fontSize: 40, color: "primary.main", mb: 1 }}
                    />
                    <Typography variant="h6" gutterBottom>
                      {label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
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
            Contact Us
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
                  name="fullname"
                  label="Full name"
                  variant="outlined"
                  fullWidth
                  type="text"
                  required
                  value={fullname}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  type="email"
                  value={email}
                  required
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  name="subject"
                  label="Subject"
                  variant="outlined"
                  fullWidth
                  type="text"
                  required
                  value={subject}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  name="message"
                  label="Message"
                  variant="outlined"
                  fullWidth
                  type="text"
                  multiline
                  rows={4}
                  required
                  value={message}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  size="large"
                >
                  Send message
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
    </Box>
  );
};

export default Contact;
