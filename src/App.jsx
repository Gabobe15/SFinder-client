import { Container, CssBaseline } from "@mui/material";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearUserInfo } from "./features/authSlice";
import { AppBar, AppProfile } from "./pages";

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  // const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!token) {
      dispatch(clearUserInfo());
    }
  }, [token]);
  return (
    <>
      <CssBaseline />
      <AppProfile />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
