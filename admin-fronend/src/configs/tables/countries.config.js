import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const handleDelete = async () => {};

export const countriesColumns = [
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
        <Button variant="contained" color="error">
          Delete
        </Button>
      );
    },
  },
];
