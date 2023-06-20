import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useEffect } from "react";
import NotificationSnackBar from "../../components/data/NotificationSnackBar";
import TableHeader from "../../components/data/TableHeader";
import { invitesColumns } from "../../configs/tables/invites.config";
import {
  deleteAuthRequest,
  getAuthRequest,
  postAuthRequest,
} from "../../utils/helpers/requests.helpers";

const Invites = () => {
  const [inviteData, setInviteData] = useState([]);
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
      const data = await getAuthRequest("/invite");
      setInviteData(data);
    };
    dataFetch();
  }, []);

  const handleApprove = async (id) => {
    try {
      const response = await postAuthRequest("/invite/accept", {
        inviteId: id,
      });
      const data = await getAuthRequest("/invite");
      return setInviteData(data);
    } catch (error) {
      setMessage(error.message);
      setOpenError(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteAuthRequest(`/invite/${id}`);
      if (response) {
        setMessage("Приглашение удалено");
        setOpenSuccess(true);
        const data = await getAuthRequest("/invite");
        setInviteData(data);
      }
    } catch (error) {
      setMessage(error.message);
      setOpenError(true);
    }
  };

  const invitesColumns = [
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
            Подтвердить
          </Button>
        );
      },
    },
    {
      field: "deny",
      headerName: "Deny",
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="error"
            onClick={(e) => handleDelete(params.id)}
          >
            Отменить
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
      <TableHeader />
      <Box m="40px 0 0 0" height="70vh">
        <DataGrid rows={inviteData} columns={invitesColumns} />
      </Box>
    </Box>
  );
};

export default Invites;
