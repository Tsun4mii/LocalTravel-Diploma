import { useState } from "react";
import { tokens } from "../../utils/theme";
import { Box, useTheme, TextField, Button, Stack } from "@mui/material";
import TableHeader from "../../components/data/TableHeader";
import { postAuthRequest } from "../../utils/helpers/requests.helpers";
import { pointSchema } from "../../utils/schemas/point.schema";
import NotificationSnackBar from "../../components/data/NotificationSnackBar";

const CreatePoint = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [name, setName] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [address, setAddress] = useState("");
  const [countryId, setCountryId] = useState("");

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
      const point = await pointSchema.validate({
        name: name,
        lon: lon,
        lat: lat,
        countryId: countryId,
        address: address,
      });
      const response = await postAuthRequest("/point", point);
      if (response) {
        setMessage("Point crated");
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
          <TextField
            id="outlined-required"
            label="Point address"
            value={address}
            color="secondary"
            onChange={(e) => setAddress(e.target.value)}
            maxRows={1}
          />
          <TextField
            id="outlined-required"
            label="Point country Id"
            value={countryId}
            color="secondary"
            onChange={(e) => setCountryId(e.target.value)}
            maxRows={1}
          />
        </Stack>
      </Box>
      <Button
        sx={{ marginTop: 2 }}
        type="submit"
        variant="contained"
        color="secondary"
        onClick={(e) => handleCreate()}
      >
        Create
      </Button>
    </Box>
  );
};

export default CreatePoint;
