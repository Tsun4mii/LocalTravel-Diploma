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
import NotificationSnackBar from "../../components/data/NotificationSnackBar";
import { pointUpdateSchema } from "../../utils/schemas/point.update.schema";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EditPoint = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { id } = useParams();
  const [pointData, setPointData] = useState();
  const [name, setName] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
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
      const data = await getAuthRequest(`/point/${id}`);
      setPointData(data);
      setName(data.name);
      setLat(data.lat);
      setLon(data.lon);
    };
    dataFetch();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const point = await pointUpdateSchema.validate({
        name: name,
        lat: lat,
        lon: lon,
      });
      const response = await patchAuthRequest(`/point/${id}`, point);
      setMessage("Точка изменена");
      setOpenSuccess(true);
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
      <TableHeader title="Точки" subtitle="Изменить точку" />
      <Box m="40px 0 0 0" alignContent="center" display="flex">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <TextField
            id="outlined-required"
            label="Наименование точки"
            value={name}
            color="secondary"
            onChange={(e) => setName(e.target.value)}
            maxRows={1}
          />
          <TextField
            id="outlined-required"
            label="Широта"
            value={lat}
            color="secondary"
            onChange={(e) => setLat(e.target.value)}
            maxRows={1}
          />
          <TextField
            id="outlined-required"
            label="Долгота"
            value={lon}
            color="secondary"
            onChange={(e) => setLon(e.target.value)}
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

export default EditPoint;
