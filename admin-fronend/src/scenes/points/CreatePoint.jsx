import { useState } from "react";
import { tokens } from "../../utils/theme";
import { Box, useTheme, TextField, Button, Stack } from "@mui/material";
import TableHeader from "../../components/data/TableHeader";
import { postAuthRequest } from "../../utils/helpers/requests.helpers";

const CreatePoint = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [name, setName] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  const handleCreate = async () => {
    try {
      const response = await postAuthRequest("/point", {
        name: name,
        lat: lat,
        lon: lon,
      });
      console.log(response);
    } catch (error) {
      return console.log(error);
    }
  };

  return (
    <Box m="20px">
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
      <Button
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
