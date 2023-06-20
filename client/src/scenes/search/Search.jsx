import {
  Box,
  Button,
  Grid,
  List,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import Map, { Marker, Source, Layer } from "react-map-gl";
import maplibreGl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Card, Spacer } from "@nextui-org/react";
import { useEffect } from "react";
import { getRequest } from "../../utils/helpers/request.helpers";
import RouteListItem from "../../components/Route/RouteListItem";
import * as turf from "@turf/turf";
import { useTranslation } from "react-i18next";

const GEOFENCE = turf.circle([0, 0], 1000000, {
  units: "miles",
});

const Search = () => {
  const { t } = useTranslation();
  const [countries, setCountries] = useState();
  const [categories, setCategories] = useState();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [foundRoutes, setFoundRouted] = useState();
  const [clickedRoute, setClicked] = useState();
  const [viewState, setViewState] = useState({});

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
  }, []);

  const onMove = useCallback(({ viewState }) => {
    const newCenter = [viewState.longitude, viewState.latitude];
    if (turf.booleanPointInPolygon(newCenter, GEOFENCE)) {
      setViewState(newCenter);
    }
  }, []);

  const handleSearch = async () => {
    let requestString = "/route?include[points]=true&include[categories]=true";
    if (selectedCountry !== undefined && selectedCountry !== "") {
      requestString += `&where[countryId]=${selectedCountry}`;
    }
    if (selectedCategory !== undefined && selectedCategory !== "") {
      requestString += `&where[categories][some][id]=${selectedCategory}`;
    }
    const data = await getRequest(requestString);
    setFoundRouted(data);
  };

  const handleShowOnMap = (points) => {
    setViewState({
      longitude: points[0].lon,
      latitude: points[0].lat,
      zoom: 15,
    });
    setClicked(points);
    console.log(points);
  };

  const mapLineCoords = (source) => {
    let lineCoordArray = [];
    if (source !== undefined) {
      source.forEach((element) => {
        lineCoordArray.push([element.lon, element.lat]);
      });
      return lineCoordArray;
    }
    return lineCoordArray;
  };

  let geoData = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: mapLineCoords(clickedRoute),
    },
  };

  return (
    <Box sx={{ flexGrow: 1, marginTop: 3, marginLeft: 20, marginRight: 20 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
          <Card>
            <Card.Body style={{ width: "100%", height: "90vh" }}>
              <Stack direction="column">
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography
                    color="secondary"
                    fontFamily={"Russo One"}
                    fontSize={30}
                  >
                    {t("Find your new journey")}
                  </Typography>
                </Stack>
                <Spacer y={0.5} />
                <Grid container spacing={1}>
                  <Grid item>
                    <Typography color="secondary" fontFamily={"Russo One"}>
                      {t("Country")}:
                    </Typography>
                  </Grid>
                  <Grid item>
                    {" "}
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      color="secondary"
                      value={selectedCountry}
                      label="Country"
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
                  </Grid>
                </Grid>
                <Spacer y={1} />
                <Grid container spacing={2}>
                  <Grid item>
                    <Typography color="secondary" fontFamily={"Russo One"}>
                      {t("Category")}:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      color="secondary"
                      value={selectedCategory}
                      label="Category"
                      sx={{ minWidth: 100 }}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {categories !== undefined
                        ? categories.map((c, i) => (
                            <MenuItem value={c.id} key={i}>
                              {c.categoryName}
                            </MenuItem>
                          ))
                        : ""}
                    </Select>
                  </Grid>
                </Grid>
                <Spacer y={1} />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={(e) => handleSearch()}
                >
                  {t("Search")}
                </Button>
                <List sx={{ width: "100%", overflowY: "scroll" }}>
                  {foundRoutes !== undefined
                    ? foundRoutes.map((route, i) => (
                        <RouteListItem
                          name={route.name}
                          short_description={route.short_description}
                          points={route.points}
                          handler={handleShowOnMap}
                          key={i}
                          categories={route.categories}
                          id={route.id}
                        />
                      ))
                    : ""}
                </List>
              </Stack>
            </Card.Body>
          </Card>
        </Grid>
        <Grid item xs={12} sm={7}>
          <Map
            mapLib={maplibreGl}
            style={{ width: "100%", height: "90vh" }}
            {...viewState}
            onMove={onMove}
            mapStyle="https://api.maptiler.com/maps/openstreetmap/style.json?key=bjLDbhMtZ821SnQaduPp"
          >
            {clickedRoute !== undefined ? (
              clickedRoute.map((point, i) => (
                <Marker
                  key={i}
                  longitude={point.lon}
                  latitude={point.lat}
                  anchor="center"
                ></Marker>
              ))
            ) : (
              <></>
            )}
            <Source type="geojson" data={geoData}>
              <Layer
                id="lineLayer"
                type="line"
                source="my-data"
                layout={{
                  "line-join": "round",
                  "line-cap": "round",
                }}
                paint={{
                  "line-color": "rgba(3, 170, 238, 0.5)",
                  "line-width": 5,
                }}
              />
            </Source>
          </Map>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Search;
