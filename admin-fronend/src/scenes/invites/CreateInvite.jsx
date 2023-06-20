import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import NotificationSnackBar from "../../components/data/NotificationSnackBar";
import TableHeader from "../../components/data/TableHeader";
import { postAuthRequest } from "../../utils/helpers/requests.helpers";
import { emailSchema } from "../../utils/schemas/email.schema";

const CreateInvite = () => {
  const [email, setEmail] = useState("");
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

  const handleSend = async () => {
    try {
      const emailToSend = await emailSchema.validate({
        recipientEmail: email,
      });
      const response = await postAuthRequest("/invite/create", emailToSend);
      if (response.id) {
        setMessage("Приглашение отправлено на проверку");
        setOpenSuccess(true);
      }
    } catch (error) {
      setMessage(error.message);
      setOpenError(true);
    }
  };

  return (
    <Box m="20px">
      <NotificationSnackBar
        openError={openError}
        openSuccess={openSuccess}
        handleClose={handleClose}
        message={message}
      />
      <TableHeader
        title="Приглашения"
        subtitle="Создайте новое приглашение. Вы отправите данное пришлашение на проверку другому администратору."
      />
      <Box m="40px 0 0 0" alignContent="center" display="flex">
        <TextField
          id="outlined-required"
          label="Почта получателя"
          value={email}
          color="secondary"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          sx={{ marginTop: 2 }}
          color="secondary"
          variant="contained"
          style={{ margin: "10px" }}
          onClick={(e) => {
            handleSend();
          }}
        >
          Отправить
        </Button>
      </Box>
    </Box>
  );
};

export default CreateInvite;
