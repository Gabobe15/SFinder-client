import { Box, Container } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

import { NavLink } from "react-router-dom";

const Account = () => {
  return (
    <Container>
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
          Account
        </NavLink>
        <NavLink
          to="/change-password"
          style={{
            display: "flex",
            justifyContent: "center",
            textDecoration: "none",
          }}
        >
          <LockIcon fontSize="small" sx={{ mr: 0.5 }} />
          Security
        </NavLink>
      </Box>
    </Container>
  );
};

export default Account;
