import { Container, Box, Typography, Button } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
const Admin = () => {
  return (
    <Container spacing={3} sx={{ mt: 2 }} maxWidth="lg">
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1, gap: 1 }}>
        <Button component={NavLink} to="" variant="text" size="small">
          Users
        </Button>
        <Button component={NavLink} to="signup" variant="text" size="small">
          Add Account
        </Button>
        <Button
          component={NavLink}
          to="add-category"
          variant="text"
          size="small"
        >
          Add Category
        </Button>
        <Button
          component={NavLink}
          to="list-category"
          variant="text"
          size="small"
        >
          Categories
        </Button>
      </Box>
      <Box>{<Outlet />}</Box>
    </Container>
  );
};

export default Admin;
