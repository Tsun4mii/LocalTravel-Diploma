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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
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
      const response = await patchAuthRequest(`/point/${id}`, {
        name: name,
        lat: lat,
        lon: lon,
      });
      setOpen(true);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box m="20px">
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar>
      <TableHeader title="Point" subtitle="Edit point" />
      <Box m="40px 0 0 0" alignContent="center" display="flex">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <TextField
            id="outlined-required"
            label="Point name"
            value={name}
            color="secondary"
            onChange={(e) => setName(e.target.value)}
            maxRows={1}
          />
          <TextField
            id="outlined-required"
            label="Point latitude"
            value={lat}
            color="secondary"
            onChange={(e) => setLat(e.target.value)}
            maxRows={1}
          />
          <TextField
            id="outlined-required"
            label="Point longitude"
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
          type="submit"
          variant="contained"
          color="secondary"
          onClick={handleUpdate}
        >
          Save
        </Button>
      </Stack>
    </Box>
  );
};

export default EditPoint;
