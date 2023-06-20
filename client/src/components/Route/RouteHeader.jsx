import React from "react";
import { Box, Card, Typography } from "@mui/material";

const RouteHeader = ({ title }) => {
  return (
    <Box mb="30px">
      <Card sx={{ padding: "10px" }}>
        <Typography variant="h2" fontWeight="bold" sx={{ m: "0 0 5px 0" }}>
          {title}
        </Typography>
      </Card>
    </Box>
  );
};

export default RouteHeader;
