import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export const routeColumns = [
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
    field: "edit",
    headerName: "Edit",
    renderCell: (params) => {
      return (
        <Link to={`/points/edit/${params.row.id}`}>
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
