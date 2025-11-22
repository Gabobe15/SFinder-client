import { Box, Button, Container, Typography } from "@mui/material";
import { ApplicationTable } from "../components";

const Homepage = () => {
  return (
    <Box
      style={{
        minHeight: "150vh",

        background: "#f7f7f7ff",
      }}
    >
      <Box sx={{
          display: "flex", justifyContent: "center",gap: 3, alignItems: "center",  flexDirection: "column", height: "60vh", background: "url('hero.png') no-repeat center center", backgroundSize: "cover"}} >
        <Typography
          variant="h3"
          sx={{ fontSize: { xs: "1.75rem", sm: "2rem",   md: "2.5rem",  lg: "2.75rem",  xl: "3rem",}, fontWeight: 600, textAlign: "center", mb: 2 }} >
          The Easiest Way to Find Scholarships.
        </Typography>

        <Typography
          sx={{  lineHeight: 1.8, maxWidth: {   xs: "100%",   sm: 500,   md: 700,  lg: 900,  xl: 1100,  }, textAlign: "center",  fontSize: {  xs: "0.9rem", sm: "1rem",   md: "1.1rem",  lg: "1.2rem", xl: "1.3rem", },  px: {
              xs: 2,
              sm: 3,
              md: 0,
            },
          }}
        >
          Searching for scholarships can be a full-time job. We've done the
          heavy lifting for you. Our platform consolidates scholarships from a
          huge range of sources, making it simple to find and apply for the
          college.
        </Typography>
      </Box>
      <Container spacing={3}>
        <ApplicationTable />
      </Container>
    </Box>
  );
};

export default Homepage;
