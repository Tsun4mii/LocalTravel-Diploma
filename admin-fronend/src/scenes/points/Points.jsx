import React from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../utils/theme";
import { useEffect, useState } from "react";
import { getAuthRequest } from "../../utils/helpers/requests.helpers";
import { pointColumns } from "../../configs/tables/points.config";
import TableHeader from "../../components/data/TableHeader";
import { Link } from "react-router-dom";

const Points = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [pointData, setPointData] = useState([]);

  useEffect(() => {
    const dataFetch = async () => {
      const data = await getAuthRequest("/point");
      setPointData(data);
    };
    dataFetch();
  }, []);

  return (
    <Box m="20px">
      <TableHeader title="POINTS" subtitle="Manage points" />
      <Box sx={{ display: "flex", flexDirection: "row-reverse", m: 1 }}>
        <Link to="/points/create">
          <Button variant="contained" color="secondary">
            Create
          </Button>
        </Link>
      </Box>
      <Box m="40px 0 0 0" height="70vh">
        <DataGrid rows={pointData} columns={pointColumns} />
      </Box>
    </Box>
  );
};

export default Points;
