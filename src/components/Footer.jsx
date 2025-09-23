import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        background: "#000",
        color: "#fff",
        py: 2,
        // position: "fixed",
        // bottom: 0,
        // left: 0,
        // right: 0,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h5">Scholarship finder</Typography>
            <Typography variant="caption">
              Helping Kenyan students finding scholarship for Teriary Education.
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1">Contact</Typography>
            <Typography variant="caption">07 2200 0000</Typography>
            <br />
            <Typography variant="caption">Nairobi,Kenya</Typography>
          </Box>
        </Box>
        <Typography variant="body2" sx={{ textAlign: "center" }} >
          &copy; {new Date().getFullYear()}. <i>Scholarship finder</i>. All
          rights reserved
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
