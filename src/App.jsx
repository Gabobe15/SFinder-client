import { CssBaseline } from "@mui/material";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearUserInfo } from "./features/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) {
      dispatch(clearUserInfo());
    }
  }, [token, dispatch]);
  return (
    <>
      <CssBaseline />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
