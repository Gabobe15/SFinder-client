import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Navlink = () => {
  const user = useSelector((state) => state.auth.user);
  const role = user?.role;
  console.log(role);

  return (
    <div style={{ display: "flex", columnGap: "10px", textDecoration: "none" }}>
      <NavLink to="/">Homepage</NavLink>
      <NavLink to="/contact">Contact</NavLink>
      <NavLink to="/about">About</NavLink>
      {role === "admin" && <NavLink to="/admin">Admin</NavLink>}
      {role === "university" && <NavLink to="/university">University</NavLink>}
      {role === "student" && <NavLink to="/student">Student</NavLink>}
    </div>
  );
};

export default Navlink;
