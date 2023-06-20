import { useEffect, useState, forwardRef } from "react";
import { tokens } from "../../utils/theme";
import { useParams } from "react-router-dom";
import {
  getAuthRequest,
  patchAuthRequest,
} from "../../utils/helpers/requests.helpers";
import {
  Box,
  useTheme,
  TextField,
  Button,
  Snackbar,
  Stack,
} from "@mui/material";
import TableHeader from "../../components/data/TableHeader";
import MuiAlert from "@mui/material/Alert";
import { categorySchema } from "../../utils/schemas/category.schema";
import NotificationSnackBar from "../../components/data/NotificationSnackBar";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EditCategory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { id } = useParams();
  const [categoryData, setCategoryData] = useState();
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

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
      const data = await getAuthRequest(`/category/${id}`);
      setCategoryData(data);
      setName(data.categoryName);
    };
    dataFetch();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const category = await categorySchema.validate({
        name: name,
      });
      const response = await patchAuthRequest(`/category/${id}`, category);
      if (response) {
        setMessage("Категория изменена");
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
      <TableHeader title="Категории" subtitle="Изменить категорию" />
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
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        alignItems="center"
      >
        <Button
          sx={{ marginTop: 2 }}
          type="submit"
          variant="contained"
          color="secondary"
          onClick={handleUpdate}
        >
          Сохранить
        </Button>
      </Stack>
    </Box>
  );
};

export default EditCategory;
