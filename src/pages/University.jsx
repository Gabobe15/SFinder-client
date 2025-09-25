import { Box, Container, Button, Typography } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";

const University = () => {
  // const location = useLocation();

  const navItems = [
    { to: "", label: "View Applications" },
    { to: "add-course", label: "Create Course" },
    { to: "university-course", label: "Add University Program" },
  ];

  return (
    <Box
      sx={{
        background: "#f7f7f7ff",
        height:'120vh'
      }}
    >
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "flex-end",
            mt: 2,
            mb: { xs: 2, md: 4 },
          }}
        >
          {navItems.map(({ to, label }) => {
            // const isActive = location.pathname.endsWith(to);

            return (
              <Button
                key={to}
                component={NavLink}
                to={to}
                end
                // variant={isActive ? "contained" : "outlined"}
                sx={{
                  textDecoration: "none",
                  textTransform: "none",
                  // fontWeight: isActive ? 600 : 400,
                }}
              >
                {label}
              </Button>
            );
          })}
        </Box>

        <Outlet />
      </Container>
    </Box>
  );
};

export default University;
