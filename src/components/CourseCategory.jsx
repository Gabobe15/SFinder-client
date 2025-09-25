import { useEffect, useState } from "react";
import useCategory from "../hooks/useCategory";
import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
const CourseCategory = () => {
  const { getCategory } = useCategory();
  const [category, setCategory] = useState([]);

  const fetchCategory = async () => {
    try {
      const data = await getCategory();
      setCategory(data);
    } catch (error) {
      console.log(error?.messsage);
    }
  };

  console.log(category);

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <Container spacing={3} maxWidth="lg">
      <Paper
        elevation={0}
        sx={{
          p: 3, // Padding around the entire form
          mx: "auto", // Center the form
          bgcolor: "#fff", // Use theme background
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          Categories
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-lable="list category">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  <strong>General Requirement</strong>
                </TableCell>
                <TableCell>
                  <strong>Requirements</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {category.length > 0 ? (
                category.map(
                  ({ id, name, general_requirements, requirement_file }) => (
                    <TableRow key={id}>
                      <TableCell>{name}</TableCell>
                      <TableCell>
                        {general_requirements.split(",")[0]}
                        <br />
                        {general_requirements.split(",")[1]}
                      </TableCell>

                      <TableCell>
                        <Button
                          component="a"
                          target="_blank"
                          href={requirement_file}
                          download
                          variant="outlined"
                          size="small"
                          startIcon={<CloudDownloadIcon />}
                          sx={{ textDecoration: "none" }}
                        >
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                )
              ) : (
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{
                      py: 3,
                    }}
                    colSpan="4"
                  >
                    <Typography variant="body1" color="textSecondary">
                      No category found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default CourseCategory;
