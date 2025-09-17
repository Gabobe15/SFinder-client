import { NavLink, Outlet } from "react-router-dom";

const University = () => {
 
  return (
    <div>
      <h1>University</h1>
      <div style={{ display: "flex", columnGap: 2 }}>
        <NavLink to="applicants">Applicants</NavLink>
        <NavLink to="">Add Course</NavLink>
        <NavLink to="university-course">Add University Course</NavLink>
      </div>
      {<Outlet />}
    </div>
  );
};

export default University;
