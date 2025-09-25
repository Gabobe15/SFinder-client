import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useUniversity from "../../hooks/useUniversity";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { format } from "date-fns";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import ForwardIcon from "@mui/icons-material/Forward";
const formatDate = (isoString) => {
  return format(new Date(isoString), "MMM dd, yyyy");
};

const Applicant = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { getApplicant } = useUniversity();
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const data = await getApplicant(id);
      setState(data);
      setLoading(false);
    } catch (error) {
      console.log(error?.messsage);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Typography variant="h5">Loading....</Typography>;
  }

  console.log(state);
  return (
    <Container spacing={3} maxWidth="lg" sx={{ mt: 5, mb:3 }}>
      <Button
        onClick={() => navigate(`/student`)}
        size="large"
        sx={{
          rotate: "180deg",
          "&:hover": { bgcolor: "transparent" },
        }}
      >
        <ForwardIcon sx={{ color: "primary.main" }} />
      </Button>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <Typography variant="h5" component="h2" pt={2} px={2} gutterBottom>
              Personal Information
            </Typography>
            <Divider />

            <Box sx={{ display: "flex", gap: 2 }}>
              {/* Passport Photo */}
              <Box sx={{ flexShrink: 0, flexBasis: "40%" }}>
                <CardMedia
                  component="img"
                  sx={{
                    height: "100%",
                    objectFit: "cover",
                    borderColor: "divider",
                  }}
                  image={state?.passport_photo}
                  alt={state?.fullname || "Applicant photo"}
                />
              </Box>

              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  p: 0,
                  gap: 1.5,
                  flex: 1,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {state?.fullname}
                </Typography>
                <Divider />

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography variant="body2">
                    <strong>Email:</strong> {state?.email}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Phone:</strong> {state?.phone}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Gender:</strong> {state?.sex}
                  </Typography>
                  <Typography variant="body2">
                    <strong>National ID:</strong> {state?.national_id}
                  </Typography>
                  <Typography variant="body2">
                    <strong>County:</strong> {state?.county}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Address:</strong> {state?.address}
                  </Typography>
                </Box>
              </CardContent>
            </Box>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <Typography variant="h5" component="h2" pt={2} px={2} gutterBottom>
              Academic Information
            </Typography>
            <Divider />
            <CardContent
              sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}
            >
              <Box>
                <Typography variant="h6" gutterBottom>
                  {state?.course_name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {state?.university_name}
                </Typography>
              </Box>

              <Divider />

              <Box>
                <Typography variant="body2">
                  <strong>Education Level:</strong> {state?.education_level}
                </Typography>
                <Typography variant="body2">
                  <strong>Qualifications:</strong> {state?.qualification}
                </Typography>
                <Typography variant="body2">
                  <strong>Application Date:</strong>{" "}
                  {formatDate(state?.created_at)}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body2" sx={{ mr: 1 }}>
                  <strong>Status:</strong>
                </Typography>
                <Chip
                  label={state?.status || "Pending"}
                  color={
                    state?.status === "approved"
                      ? "success"
                      : state?.status === "rejected"
                      ? "error"
                      : "warning"
                  }
                  size="small"
                />
              </Box>

              {state?.academic_transcript && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="body2" sx={{ flex: 1 }}>
                    <strong>Academic Transcript</strong>
                  </Typography>
                  <Button
                    component="a"
                    target="_blank"
                    href={state.academic_transcript}
                    download
                    variant="outlined"
                    size="small"
                    startIcon={<CloudDownloadIcon />}
                    sx={{ textDecoration: "none" }}
                  >
                    Download
                  </Button>
                </Box>
              )}

              {state?.personal_statement && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="body2" sx={{ flex: 1 }}>
                    <strong>Personal Statement</strong>
                  </Typography>
                  <Button
                    component="a"
                    href={state.personal_statement}
                    download
                    target="_blank"
                    variant="outlined"
                    size="small"
                    startIcon={<CloudDownloadIcon />}
                    sx={{ textDecoration: "none" }}
                  >
                    Download
                  </Button>
                </Box>
              )}

              {state?.recommendation && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="body2" sx={{ flex: 1 }}>
                    <strong>Recommendation Letter</strong>
                  </Typography>
                  <Button
                    component="a"
                    target="_blank"
                    href={state.recommendation}
                    download
                    variant="outlined"
                    size="small"
                    startIcon={<CloudDownloadIcon />}
                    sx={{ textDecoration: "none" }}
                  >
                    Download
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Applicant;
