import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
  Switch,
  FormControlLabel,
} from "@mui/material";

const ListUser = () => {
  const { UsersList, toggleUsersStatus } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const data = await UsersList();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await toggleUsersStatus(id, currentStatus, fetchUsers);
      setUsers(
        users.map((user) =>
          user.id == id ? { ...user, is_active: !currentStatus } : user
        )
      );
    } catch (error) {
      console.error("Failed to toggle user status:", error);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={200}
      >
        <Typography variant="h6">Loading users...</Typography>
      </Box>
    );
  }

  console.log(users);
  

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Users Management
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell align="left">
                <strong>Email</strong>
              </TableCell>
              <TableCell align="left">
                <strong>Field of Study</strong>
              </TableCell>
              <TableCell align="left">
                <strong>Mobile</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Status</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map(
                ({ id, fullname, email, mobile, is_active, field_study }) => (
                  <TableRow
                    key={id}
                    sx={{
                      "&.last-child td, &:last-child th": { border: 0 },
                      "&:hover": { backgroundColor: "action.hover" },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <Typography variant="body1" fontWeight="medium">
                        {fullname}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">{email}</TableCell>
                    <TableCell align="left">{field_study}</TableCell>
                    <TableCell align="left">{mobile}</TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "inline-block",
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1,
                          backgroundColor: is_active
                            ? "success.light"
                            : "error.light",
                          color: "white",
                          fontSize: "0.75rem",
                          fontWeight: "bold",
                        }}
                      >
                        {is_active ? "Active" : "Inactive"}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color={is_active ? "error" : "success"}
                        size="small"
                        onClick={() => handleToggleStatus(id, is_active)}
                        sx={{ textTransform: "none" }}
                      >
                        {is_active ? "Deactivate" : "Activate"}
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              )
            ) : (
              <TableRow>
                <TableCell colSpan="6" align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="textSecondary">
                    No users found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListUser;

{
  /* switch  */
}
{
  /* <FormControlLabel
   control={
    <Switch
       checked={is_active}
       onChange={() => handleT(id, is_active)}
       color="success"
     />
   }
  label={is_active ? "Inactive"}
 /> */
}
