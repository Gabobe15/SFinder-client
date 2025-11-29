import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        background: "#000",
        color: "#fff",
        py: 2,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h5">ScholFind</Typography>
            <Typography variant="caption">
              Helping Kenyan students finding scholarship for Teriary Education.
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1">Contact</Typography>
            <Typography variant="caption">Number: 07 2200 0000</Typography>
            <br />
            <Typography variant="caption">
              Email: ScholFind@gmail.com
            </Typography>
            <br />
            <Typography variant="caption">
              Location: Diamond Plaza 1, Parklands
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          &copy; {new Date().getFullYear()}. <i>ScholFind</i>. All rights
          reserved
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
