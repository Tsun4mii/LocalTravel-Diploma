import { useState } from "react";
import { tokens } from "../../utils/theme";
import { Box, useTheme, TextField, Button, Stack } from "@mui/material";
import TableHeader from "../../components/data/TableHeader";
import { postAuthRequest } from "../../utils/helpers/requests.helpers";
import { countrySchema } from "../../utils/schemas/country.schema";
import NotificationSnackBar from "../../components/data/NotificationSnackBar";

const CreateCountry = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [name, setName] = useState("");

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

  const handleCreate = async () => {
    try {
      const country = await countrySchema.validate({
        name: name,
      });
      const response = await postAuthRequest("/country", country);
      if (response) {
        setMessage("Страна добавлена");
        return setOpenSuccess(true);
      }
    } catch (error) {
      setMessage(error.message);
      return setOpenError(true);
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
      <TableHeader title="Страны" subtitle="Добавьте страну" />
      <Box m="40px 0 0 0" alignContent="center" display="flex">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <TextField
            id="outlined-required"
            label="Название"
            value={name}
            color="secondary"
            onChange={(e) => setName(e.target.value)}
            maxRows={1}
          />
        </Stack>
      </Box>
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        onClick={(e) => handleCreate()}
      >
        Сохранить
      </Button>
    </Box>
  );
};

export default CreateCountry;
