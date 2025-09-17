import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const ListUser = () => {
  const { UsersList, toggleUsersStatus } = useAuth();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const data = await UsersList();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <table border="1" width={"80%"}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Field of Study</th>
            <th>Mobile</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(
              ({ id, fullname, email, mobile, is_active, field_study }) => (
                <tr key={id}>
                  <td>{fullname}</td>
                  <td>{email}</td>
                  <td>{field_study}</td>
                  <td>{mobile}</td>
                  <td>{is_active ? "Active" : "Inactive"}</td>
                  <td>
                    {/* Action buttons (e.g., Edit, Delete) go here */}
                    <button
                      onClick={() =>
                        toggleUsersStatus(id, is_active, fetchUsers)
                      }
                    >
                      {is_active ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan="5">No user found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListUser;
