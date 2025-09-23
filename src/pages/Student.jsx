import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

const Student = () => {
  return <Container spacing={3}>{<Outlet />}</Container>;
};

export default Student;
