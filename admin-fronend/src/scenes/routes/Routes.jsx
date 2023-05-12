import React from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../utils/theme";
import { useEffect, useState } from "react";
import {
  deleteAuthRequest,
  getAuthRequest,
} from "../../utils/helpers/requests.helpers";
import TableHeader from "../../components/data/TableHeader";
import { Link } from "react-router-dom";
import { routeColumns } from "../../configs/tables/routes.config";
import NotificationSnackBar from "../../components/data/NotificationSnackBar";

const Routes = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [routeData, setRouteData] = useState([]);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
    setOpenSuccess(false);
    setMessage("");
  };

  useEffect(() => {
    const dataFetch = async () => {
      const data = await getAuthRequest("/route");
      setRouteData(data);
    };
    dataFetch();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await deleteAuthRequest(`/route/${id}`);
      if (response) {
        setMessage("Route deleted");
        setOpenSuccess(true);
        const data = await getAuthRequest("/route");
        setRouteData(data);
      }
    } catch (error) {
      setMessage(error.message);
      setOpenError(true);
    }
  };

  const routeColumns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "UserID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      flex: 1,
    },
    {
      field: "delete",
      headerName: "Delete",
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="error"
            onClick={(e) => handleDelete(params.id)}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <NotificationSnackBar
        openError={openError}
        openSuccess={openSuccess}
        handleClose={handleClose}
        message={message}
      />
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
