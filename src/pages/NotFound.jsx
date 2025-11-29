import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        height: "80vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>404 - Page Not Found</h1>
      <p>The page you&apos;re looking for doesn&apos;t exist.</p>
      <NavLink to="/" style={{ color: "blue", textDecoration: "underline" }}>
        Go back to homepage
      </NavLink>
    </div>
  );
};

export default NotFound;
