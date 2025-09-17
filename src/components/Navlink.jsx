import React from "react";
import { NavLink } from "react-router-dom";

const Navlink = () => {
  return (
    <div style={{ display: "flex", columnGap: "10px", textDecoration: "none" }}>
      <NavLink to="/">Homepage</NavLink>
      <NavLink to="/contact">Contact</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/admin">Admin</NavLink>
      <NavLink to="/university">University</NavLink>
      <NavLink to="/student">Student</NavLink>
    </div>
  );
};

export default Navlink;
