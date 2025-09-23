import { Box } from "@mui/material";
import { GridToolbarColumnsButton } from "@mui/x-data-grid";

export function CustomToolbar() {
  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        gap: 1,
        flexWrap: "wrap",
        borderBottom: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
        minHeight: "64px",
      }}
    >
        <GridToolbarColumnsButton/>
    </Box>
  );
}
