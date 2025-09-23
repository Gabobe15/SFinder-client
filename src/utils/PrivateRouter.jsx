import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const PrivateRouter = ({ allowedRoles }) => {
  const token = cookies.get("token");
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const role = user?.role;

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRouter;
