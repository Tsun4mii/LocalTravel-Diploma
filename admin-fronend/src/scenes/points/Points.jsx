import React from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../utils/theme";
import { useEffect, useState } from "react";
import {
  deleteAuthRequest,
  getAuthRequest,
} from "../../utils/helpers/requests.helpers";
import { pointColumns } from "../../configs/tables/points.config";
import TableHeader from "../../components/data/TableHeader";
import { Link } from "react-router-dom";
import NotificationSnackBar from "../../components/data/NotificationSnackBar";

const Points = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [pointData, setPointData] = useState([]);

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
      const data = await getAuthRequest("/point");
      setPointData(data);
    };
    dataFetch();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await deleteAuthRequest(`/point/${id}`);
      if (response) {
        setMessage("Точка удалена");
        setOpenSuccess(true);
        const data = await getAuthRequest("/point");
        setPointData(data);
      }
    } catch (error) {
      setMessage(error.message);
      setOpenError(true);
    }
  };

  const pointColumns = [
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
      field: "lat",
      headerName: "Latitude",
      flex: 1,
    },
    {
      field: "lon",
      headerName: "Longitude",
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
      field: "edit",
      headerName: "Edit",
      renderCell: (params) => {
        return (
          <Link to={`/points/edit/${params.row.id}`}>
            <Button variant="contained" color="warning">
              Изменить
            </Button>
          </Link>
        );
      },
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
            Удалить
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
      <TableHeader title="Точки" subtitle="Управление точками" />
      <Box sx={{ display: "flex", flexDirection: "row-reverse", m: 1 }}>
        <Link to="/points/create">
          <Button variant="contained" color="secondary">
            Добавить
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
