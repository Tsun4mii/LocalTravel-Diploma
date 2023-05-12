import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Card, Spacer } from "@nextui-org/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  getRequest,
  postAuthRequest,
} from "../../utils/helpers/request.helpers";
import { routeSchema } from "../../utils/validation/route.validation.schema";
import debounce from "lodash.debounce";
import { useTranslation } from "react-i18next";
import NotificationSnackBar from "../../components/Notification/NotificationSnackBar";

const CreateRoute = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [categoriesInit, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [short_description, setSDescription] = useState("");
  const [description, setDescription] = useState("");
  const [country, setSelectedCountry] = useState("");
  const [categoriesToDisplay, setSelectedCategoriesTD] = useState([]);
  const [categories, setSelectedCategories] = useState([]);
  const [points, setPoints] = useState([]);
  const [pointSearch, setPointSearch] = useState([]);
  const [pointsToDisplay, setPointsTD] = useState([]);
  const [imagesToDisplay, setImagesTD] = useState([]);
  const [errorText, setErrorText] = useState("");
  const [test, stest] = useState("");

  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      const data = await getRequest("/country");
      setCountries(data);
    };
    const fetchCategories = async () => {
      const data = await getRequest("/category");
      setCategories(data);
    };
    fetchCountries();
    fetchCategories();
    setIsLoading(false);
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
    setOpenSuccess(false);
    setMessage("");
  };

  const addCategory = (category) => {
    if (!(categories.filter((c) => c === category.id).length > 0)) {
      setSelectedCategories((categories) => [...categories, category.id]);
      setSelectedCategoriesTD((categories) => [...categories, category]);
    }
    console.log(categoriesToDisplay);
  };

  const removeCategory = (category) => {
    setSelectedCategories((categories) =>
      categories.filter((c) => c !== category.id)
    );
    setSelectedCategoriesTD((categories) =>
      categories.filter((c) => c !== category)
    );
  };

  const addPoint = (point) => {
    if (!(points.filter((p) => p === point.id).length > 0)) {
      setPoints((points) => [...points, point.id]);
      setPointsTD((points) => [...points, point]);
    }
  };

  const removePoint = (point) => {
    setPoints((points) => points.filter((p) => p !== point.id));
    setPointsTD((points) => points.filter((p) => p !== point));
  };

  const addImages = (images) => {
    images.forEach((image) => {
      setImagesTD((prev) => [...prev, image]);
      setImages((prev) => [...prev, image.id]);
    });
  };

  const removeImage = (image) => {
    setImages((prev) => prev.filter((img) => img !== image.id));
    setImagesTD((prev) => prev.filter((img) => img !== image));
  };

  const handlePointSearch = async (e) => {
    if (e.target.value !== "") {
      const data = await getRequest(
        `/point?where[name][contains]=${e.target.value}&where[countryId]=${country}`
      );
      setPointSearch(data);
      return console.log(pointSearch);
    }
    return;
  };

  const debouncedOnSearch = debounce(handlePointSearch, 1000);

  const handleImages = async (e) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < e.target.files.length; i++) {
        formData.append("files", e.target.files[i]);
      }

      const request = await fetch(
        `${process.env.REACT_APP_API_BASE}/image/multiple`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await request.json();
      return addImages(data);
    } catch (error) {
      return console.log(error.message);
    }
  };

  const handleCreate = async () => {
    try {
      const route = await routeSchema.validate({
        name,
        short_description,
        description,
        country,
        points,
        categories,
        images,
      });
      const result = await postAuthRequest("/route", route);
      if (result) {
        setMessage("Route created");
        setOpenSuccess(true);
      }
      return console.log(result);
    } catch (error) {
      setMessage(error.message);
      setOpenError(true);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, marginTop: 3, marginLeft: 20, marginRight: 20 }}>
      <NotificationSnackBar
        openError={openError}
        openSuccess={openSuccess}
        handleClose={handleClose}
        message={message}
      />
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Card style={{ height: "90vh" }}>
            <Card.Body>
              <Stack direction="row" spacing={2}>
                <Stack direction="column" sx={{ width: "50%" }}>
                  <Typography>{name.length}/100</Typography>
                  <TextField
                    label={t("Route name")}
                    color="secondary"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={name.length < 10 ? true : false}
                    helperText={name.length < 10 ? t("Min 10 chars") : ""}
                    fullWidth
                    inputProps={{ maxLength: 100, minLength: 10 }}
                  />
                </Stack>
                <Stack direction="column" sx={{ width: "50%" }}>
                  <Typography>{short_description.length}/180</Typography>
                  <TextField
                    label={t("Short description")}
                    color="secondary"
                    value={short_description}
                    fullWidth
                    inputProps={{ maxLength: 180, minLength: 30 }}
                    onChange={(e) => setSDescription(e.target.value)}
                    error={short_description.length < 30 ? true : false}
                    helperText={
                      short_description.length < 30 ? t("Min 30 chars") : ""
                    }
                  />
                </Stack>
              </Stack>
              <Typography>{description.length}/2000</Typography>
              <TextField
                label={t("Description")}
                fullWidth
                multiline
                rows={10}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                inputProps={{ maxLength: 2000, minLength: 50 }}
                error={short_description.length < 50 ? true : false}
                helperText={
                  short_description.length < 50 ? t("Min 50 chars") : ""
                }
              />
              <Spacer y={1} />
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography>{t("Country")}:</Typography>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={country}
                  label={t("Country")}
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
                <Typography>{t("Select categories")}:</Typography>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={test}
                  label="Country"
                  sx={{ minWidth: 100 }}
                  onChange={(e) => addCategory(e.target.value)}
                >
                  {categoriesInit !== undefined
                    ? categoriesInit.map((c, i) => (
                        <MenuItem
                          value={{ id: c.id, categoryName: c.categoryName }}
                          key={i}
                        >
                          {c.categoryName}
                        </MenuItem>
                      ))
                    : ""}
                </Select>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="raised-button-file"
                  multiple
                  type="file"
                  onChange={(e) => handleImages(e)}
                />
                <label htmlFor="raised-button-file">
                  <Button variant="raised" component="span">
                    {t("Upload")}
                  </Button>
                </label>
              </Stack>
              <Spacer y={1} />
              <TextField onChange={debouncedOnSearch} label={t("Point name")} />
              <List sx={{ width: "100%", overflowY: "scroll" }}>
                {pointSearch !== undefined
                  ? pointSearch.map((point, i) => (
                      <ListItem key={i}>
                        <Card>
                          <Card.Body>
                            <ListItemText
                              primary={point.name}
                              secondary={
                                <Typography
                                  sx={{ display: "inline" }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  {point.address}
                                </Typography>
                              }
                            />

                            <Button onClick={(e) => addPoint(point)}>
                              {t("Add")}
                            </Button>
                          </Card.Body>
                        </Card>
                      </ListItem>
                    ))
                  : ""}
              </List>
              <Stack direction="column" alignItems="center">
                <Button
                  onClick={(e) => handleCreate()}
                  color="secondary"
                  variant="contained"
                >
                  {t("Create route")}
                </Button>
                <Typography color="error">{errorText}</Typography>
              </Stack>
            </Card.Body>
          </Card>
        </Grid>
        <Grid item xs={5}>
          <Card style={{ height: "100vh" }}>
            <Card.Body style={{ overflow: "scroll" }}>
              <Typography>{t("Selected categories")}:</Typography>
              <Stack direction="row" spacing={2}>
                {categoriesToDisplay.map((category, i) => (
                  <Chip
                    label={category.categoryName}
                    key={i}
                    sx={{ width: "fit-content" }}
                    onDelete={(e) => removeCategory(category)}
                  />
                ))}
              </Stack>
              <Spacer y={1} />
              <Divider light />
              <Spacer y={1} />
              <Typography>{t("Selected points")}:</Typography>
              {pointsToDisplay !== undefined
                ? pointsToDisplay.map((point, i) => (
                    <ListItem key={i}>
                      <Card>
                        <Card.Body>
                          <ListItemText
                            primary={point.name}
                            secondary={
                              <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {point.address}
                              </Typography>
                            }
                          />
                          <Button
                            variant="contained"
                            onClick={(e) => removePoint(point)}
                          >
                            {t("Remove")}
                          </Button>
                        </Card.Body>
                      </Card>
                    </ListItem>
                  ))
                : ""}
              <Spacer y={1} />
              <Divider light />
              <Spacer y={1} />
              <Typography>{t("Uploaded images")}:</Typography>
              <Spacer y={1} />
              <ImageList
                sx={{ width: 500, height: 450 }}
                cols={2}
                rowHeight={164}
              >
                {imagesToDisplay.length > 0
                  ? imagesToDisplay.map((item, i) => (
                      <ImageListItem key={i}>
                        <img
                          src={`${process.env.REACT_APP_UPLOADS_BASE}${item.uriPath}`}
                          alt={item.id}
                        />
                        <Button
                          variant="contained"
                          onClick={(e) => removeImage(item)}
                        >
                          {t("Remove")}
                        </Button>
                      </ImageListItem>
                    ))
                  : ""}
              </ImageList>
              <Divider light />
            </Card.Body>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateRoute;
