import { Container } from "@mui/material";
import { ApplicationTable } from "../components";


const Homepage = () => {
  return (
    <div style={{ minHeight: "110vh" }}>
      <Container spacing={3}>
        <ApplicationTable />
      </Container>
    </div>
  );
};

export default Homepage;
