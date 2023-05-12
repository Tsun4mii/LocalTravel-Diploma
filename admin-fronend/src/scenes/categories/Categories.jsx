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

const Categories = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    const dataFetch = async () => {
      const data = await getAuthRequest("/category");
      setCategoriesData(data);
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
      const response = await deleteAuthRequest(`/category/${id}`);
      if (response) {
        setMessage("Category deleted");
        setOpenSuccess(true);
        const data = await getAuthRequest("/category");
        setCategoriesData(data);
      }
    } catch (error) {
      setMessage(error.message);
      setOpenError(true);
    }
  };

  const categoriesColumns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "categoryName",
      headerName: "Category",
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
          <Link to={`/categories/edit/${params.row.id}`}>
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
      <TableHeader title="Categories" subtitle="Manage categories" />
      <Box sx={{ display: "flex", flexDirection: "row-reverse", m: 1 }}>
        <Link to="/categories/create">
          <Button variant="contained" color="secondary">
            Create
          </Button>
        </Link>
      </Box>
      <Box m="40px 0 0 0" height="70vh">
        <DataGrid rows={categoriesData} columns={categoriesColumns} />
      </Box>
    </Box>
  );
};

export default Categories;
