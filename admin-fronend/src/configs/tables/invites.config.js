import { Button } from "@mui/material";
import { postAuthRequest } from "../../utils/helpers/requests.helpers";

const handleApprove = async (id) => {
  try {
    const response = await postAuthRequest("/invite/accept", { inviteId: id });
    return console.log(response);
  } catch (error) {
    return console.log(error);
  }
};

export const invitesColumns = [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
  },
  {
    field: "recipientEmail",
    headerName: "Recipient",
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
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
    field: "approve",
    headerName: "Approve",
    renderCell: (params) => {
      return (
        <Button
          variant="contained"
          color="secondary"
          onClick={(e) => handleApprove(params.id)}
        >
          Approve
        </Button>
      );
    },
  },
  {
    field: "deny",
    headerName: "Deny",
    renderCell: (params) => {
      return (
        <Button variant="contained" color="error">
          Deny
        </Button>
      );
    },
  },
];
