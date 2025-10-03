import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUniversity from "../../hooks/useUniversity";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material";

const Applicants = () => {
  const { getApplicants } = useUniversity();
  const [state, setState] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const data = await getApplicants();
      setState(data);
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(state);

  return (
    <Container sx={{ my: 5 }} maxWidth="md" spacing={3}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Applicantions
      </Typography>
      <Grid container spacing={3}>
        {state && state.length > 0 ? (
          state.map(({ id, fullname, course_name, status }) => (
            <Grid size={{ xs: 12 }} key={id}>
              {" "}
              <Card>
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignSelf: "flex-start",
                  }}
                >
                  <Box>
                    <Typography variant="h6">
                      {fullname || "No name"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {course_name || "N/A"}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, display: "flex", alignItems: "center" }}
                  >
                    <Chip
                      label={
                        status == "pending"
                          ? "Submited"
                          : status == "accepted"
                          ? "Accepted"
                          : "rejected"
                      }

                      color={
                        status === "accepted"
                          ? "success"
                          : status === "rejected"
                          ? "error"
                          : "warning"
                      }
                      size="small"
                      sx={{ ml: 1, p: 1 }}
                    />
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => navigate(`/student/applications/${id}`)}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid size={{ xs: 12 }}>
            <Card sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6" color="textSecondary">
                No applications found
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                You haven't submitted any applications yet.
              </Typography>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Applicants;
