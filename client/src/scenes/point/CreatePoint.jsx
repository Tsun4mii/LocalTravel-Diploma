import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Card, Spacer } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import NotificationSnackBar from "../../components/Notification/NotificationSnackBar";
import {
  getRequest,
  postAuthRequest,
} from "../../utils/helpers/request.helpers";
import { pointSchema } from "../../utils/validation/point.validation.schema";

const CreatePoint = () => {
  const [name, setName] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [address, setAddress] = useState("");
  const [countryId, setCountryId] = useState("");
  const [countries, setCountries] = useState([]);
  const [country, setSelectedCountry] = useState("");
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      const data = await getRequest("/country");
      setCountries(data);
    };
    fetchCountries();
  }, []);

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
        name,
        lat,
        lon,
        address,
        countryId: country,
      });
      const result = await postAuthRequest("/point", point);
      if (result) {
        setMessage("Точка добавлена");
        setOpenSuccess(true);
      }
      return console.log(result);
    } catch (error) {
      setMessage(error.message);
      setOpenError(true);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, marginTop: 3, marginLeft: 20, marginRight: 20 }}>
      <NotificationSnackBar
        openError={openError}
        openSuccess={openSuccess}
        handleClose={handleClose}
        message={message}
      />
      <Grid container spacing={2}>
        <Grid item marginLeft={"40%"}>
          <Card>
            <Card.Body>
              <Stack direction="column">
                <TextField
                  label="Наименование точки"
                  color="secondary"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={name.length < 4 ? true : false}
                  helperText={
                    name.length < 4
                      ? "Минимальная длина наименования 4 символа"
                      : ""
                  }
                  fullWidth
                  inputProps={{ maxLength: 100, minLength: 4 }}
                />
                <Spacer y={1} />
                <TextField
                  label="Долгота"
                  color="secondary"
                  value={lon}
                  onChange={(e) => setLon(e.target.value)}
                  error={lon.length < 2 ? true : false}
                  helperText={lon.length < 2 ? "Минимальная длина 2" : ""}
                  fullWidth
                  inputProps={{ maxLength: 100, minLength: 2 }}
                />
                <Spacer y={1} />
                <TextField
                  label="Широта"
                  color="secondary"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  error={lat.length < 2 ? true : false}
                  helperText={lat.length < 2 ? "Минимальная длина 2" : ""}
                  fullWidth
                  inputProps={{ maxLength: 100, minLength: 2 }}
                />
                <Spacer y={1} />
                <TextField
                  label="Адрес"
                  color="secondary"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  error={address.length < 4 ? true : false}
                  helperText={
                    address.length < 4
                      ? "Минимальная длина адреса 4 символа"
                      : ""
                  }
                  fullWidth
                  inputProps={{ maxLength: 100, minLength: 4 }}
                />
                <Spacer y={1} />
                <Typography>Страна:</Typography>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={country}
                  label="Страна"
                  sx={{ minWidth: 100 }}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  {countries !== undefined
                    ? countries.map((c, i) => (
                        <MenuItem value={c.id} key={i}>
                          {c.countryName}
                        </MenuItem>
                      ))
                    : ""}
                </Select>
                <Spacer y={1} />
                <Button onClick={(e) => handleCreate()}>Добавить</Button>
              </Stack>
            </Card.Body>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreatePoint;
