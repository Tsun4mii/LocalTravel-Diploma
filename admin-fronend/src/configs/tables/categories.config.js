import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export const categoriesColumns = [
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
        <Button variant="contained" color="error">
          Delete
        </Button>
      );
    },
  },
];
