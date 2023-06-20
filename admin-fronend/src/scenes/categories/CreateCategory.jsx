import { useState } from "react";
import { tokens } from "../../utils/theme";
import {
  Box,
  useTheme,
  TextField,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import TableHeader from "../../components/data/TableHeader";
import { postAuthRequest } from "../../utils/helpers/requests.helpers";
import { categorySchema } from "../../utils/schemas/category.schema";
import NotificationSnackBar from "../../components/data/NotificationSnackBar";

const CreateCategory = () => {
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
      const category = await categorySchema.validate({
        name: name,
      });
      const response = await postAuthRequest("/category", category);
      if (response) {
        setMessage("Категория добавлена");
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
      <TableHeader title="Категории" subtitle="Добавление категории" />
      <Box m="40px 0 0 0" alignContent="center" display="flex">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <TextField
            id="outlined-required"
            label="Наименование категории"
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
        sx={{ marginTop: 2 }}
        onClick={(e) => handleCreate()}
      >
        Добавить
      </Button>
    </Box>
  );
};

export default CreateCategory;
