import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRouter = ({ allowedRoles }) => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const role = user?.role; // Use optional chaining to safely access the role

  // 1. Check for token. Redirect to login if not found.
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Check for role authorization. Redirect to unauthorized page if not allowed.
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  // 3. If authorized, render the child route.
  return <Outlet />;
};

export default PrivateRouter;
