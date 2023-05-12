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
import NotificationSnackBar from "../../components/data/NotificationSnackBar";

const Countries = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    const dataFetch = async () => {
      const data = await getAuthRequest("/country");
      setCountriesData(data);
    };
    dataFetch();
  }, []);

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

  const handleDelete = async (id) => {
    try {
      const response = await deleteAuthRequest(`/country/${id}`);
      if (response) {
        setMessage("Country deleted");
        setOpenSuccess(true);
        const data = await getAuthRequest("/country");
        setCountriesData(data);
      }
    } catch (error) {
      setMessage(error.message);
      setOpenError(true);
    }
  };

  const countriesColumns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "countryName",
      headerName: "Country",
      flex: 1,
    },
    {
      field: "edit",
      headerName: "Edit",
      renderCell: (params) => {
        return (
          <Link to={`/countries/edit/${params.row.id}`}>
            <Button variant="contained" color="warning">
              Edit
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
      <TableHeader title="Countries" subtitle="Manage countries" />
      <Box sx={{ display: "flex", flexDirection: "row-reverse", m: 1 }}>
        <Link to="/countries/create">
          <Button variant="contained" color="secondary">
            Create
          </Button>
        </Link>
      </Box>
      <Box m="40px 0 0 0" height="70vh">
        <DataGrid rows={countriesData} columns={countriesColumns} />
      </Box>
    </Box>
  );
};

export default Countries;
