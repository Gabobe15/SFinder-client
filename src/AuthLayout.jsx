import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <CssBaseline />
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
