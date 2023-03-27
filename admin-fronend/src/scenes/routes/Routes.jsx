import React from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../utils/theme";
import { useEffect, useState } from "react";
import { getAuthRequest } from "../../utils/helpers/requests.helpers";
import TableHeader from "../../components/data/TableHeader";
import { Link } from "react-router-dom";
import { routeColumns } from "../../configs/tables/routes.config";

const Routes = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [routeData, setRouteData] = useState([]);

  useEffect(() => {
    const dataFetch = async () => {
      const data = await getAuthRequest("/route");
      setRouteData(data);
    };
    dataFetch();
  }, []);

  return (
    <Box m="20px">
      <TableHeader title="POINTS" subtitle="Manage points" />
      <Box sx={{ display: "flex", flexDirection: "row-reverse", m: 1 }}>
        <Link to="/routes/create">
          <Button variant="contained" color="secondary">
            Create
          </Button>
        </Link>
      </Box>
      <Box m="40px 0 0 0" height="70vh">
        <DataGrid rows={routeData} columns={routeColumns} />
      </Box>
    </Box>
  );
};

export default Routes;
