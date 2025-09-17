import { NavLink, Outlet } from "react-router-dom";
const Admin = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "5px 10px",
        }}
      >
        <h3>AdminPage</h3>
        <div
          style={{ display: "flex", columnGap: "10px", textDecoration: "none" }}
        >
          <NavLink to="">List User</NavLink>
          <NavLink to="signup">Add User</NavLink>
          <NavLink to="add-category">Add Course Category</NavLink>
          <NavLink to="list-category">List Category</NavLink>
        </div>
      </div>
      <div>{<Outlet />}</div>
    </div>
  );
};

export default Admin;
