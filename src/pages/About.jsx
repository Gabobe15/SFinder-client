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
import TargetIcon from "@mui/icons-material/Flag";
import VisibilityIcon from "@mui/icons-material/Visibility";
const About = () => {
  return (
    <Box
      sx={{
        background: "#f7f7f7ff",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          minHeight: "40vh",
          display: "flex",
          alignContent: "center",
          flexDirection: "column",
          py: 4,
        }}
      >
        <Box sx={{ my: 2 }}>
          <Grid container spacing={2} alignItems={"center"}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                sx={{ fontWeight: "bold", mb: 3, color: "primary.main" }}
              >
                About Us
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 2 }}>
                We believe every Kenyan student deserves a chance to achieve
                their educational dreams without the burden of debt. We saw how
                frustrating and time-consuming the scholarship search was.
                Students were spending countless hours on different websites,
                sifting through outdated information, and missing out on
                opportunities simply because they didn't know where to look
              </Typography>
              <Typography variant="body1" sx={{ my: 2, lineHeight: 1.7 }}>
                That's why we created this platform. Our goal is simple: to make
                the scholarship process easy, efficient, and accessible for
                everyone. We consolidate thousands of scholarships from various
                sources, putting them all in one place.
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                Our team is made up of educators, developers, and former
                students who understand the challenges you face. We're committed
                to helping you find the right funding so you can focus on what
                really matters: your studies and your future.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ borderRadius: 2, overflow: "hidden", boxShadow: 3 }}>
                <CardMedia
                  component={"img"}
                  image="/uni.png"
                  alt="Students celebrating scholarship achievements"
                  sx={{
                    width: "100%",
                    height: 400,
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                />
              </Card>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Box sx={{ my: 4 }}>
            {/* Mission & Vision Section */}
            <Grid container spacing={4} sx={{ mt: 2 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card sx={{ p: 4, height: "100%", bgcolor: "primary.50" }}>
                  <Box sx={{ textAlign: "center", mb: 2 }}>
                    <TargetIcon
                      sx={{ fontSize: 40, color: "primary.main", mb: 1 }}
                    />
                  </Box>
                  <Typography
                    variant="h4"
                    component="h3"
                    gutterBottom
                    sx={{ fontWeight: "bold", textAlign: "center" }}
                  >
                    Our Mission
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                    To democratize access to education by providing every Kenyan
                    student with a comprehensive, user-friendly platform that
                    simplifies the scholarship search process and eliminates
                    financial barriers to higher education.
                  </Typography>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Card sx={{ p: 4, height: "100%", bgcolor: "secondary.50" }}>
                  <Box sx={{ textAlign: "center", mb: 2 }}>
                    <VisibilityIcon
                      sx={{ fontSize: 40, color: "secondary.main", mb: 1 }}
                    />
                  </Box>
                  <Typography
                    variant="h4"
                    component="h3"
                    gutterBottom
                    sx={{ fontWeight: "bold", textAlign: "center" }}
                  >
                    Our Vision
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                    A Kenya where no student misses out on educational
                    opportunities due to lack of information or financial
                    constraints, creating a future where talent and
                    determination are the only requirements for academic
                    success.
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
