import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const deletePoint = async (id) => {
  console.log(id);
};

export const pointColumns = [
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
          onClick={(e) => deletePoint(params.id)}
        >
          Delete
        </Button>
      );
    },
  },
];
