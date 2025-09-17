import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you’re looking for doesn’t exist.</p>
      <NavLink to="/" style={{ color: "blue", textDecoration: "underline" }}>
        Go back to homepage
      </NavLink>
    </div>
  );
};

export default NotFound;
