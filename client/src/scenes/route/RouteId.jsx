import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  List,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getRequest } from "../../utils/helpers/request.helpers";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Map, { Marker, Source, Layer } from "react-map-gl";
import maplibreGl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Card, Avatar } from "@nextui-org/react";
import { tokens } from "../../utils/theme";
import { useTranslation } from "react-i18next";
import CommentSend from "../../components/Comments/CommentSend";
import CommentDisplay from "../../components/Comments/CommentDisplay";
import { useSelector } from "react-redux";
import UnFollowButton from "../../components/Follow/UnFollowButton";
import FollowButton from "../../components/Follow/FollowButton";
import NotificationSnackBar from "../../components/Notification/NotificationSnackBar";
import PointListItem from "../../components/Point/PointListItem";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const RouteId = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [routeData, setRouteData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [comments, setComments] = useState([]);
  const [follow, setFollow] = useState([]);
  const isAuth = useSelector((state) => state.user.isAuth);
  const userId = useSelector((state) => state.user.id);

  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const dataFetch = async () => {
      const data = await getRequest(
        `/route/${id}?include[points]=true&include[user]=true&include[categories]=true&include[images]=true`
      );
      setRouteData(data);
      const comments = await getRequest(
        `/comment?include[user]=true&where[routeId]=${id}`
      );
      setComments(comments);
      console.log(userId + " " + data.user.id);
      const followers = await getRequest(
        `/follow?where[followerId]=${userId}&where[followingIs]=${data.user.id}`
      );
      console.log(followers);
      setFollow(followers);
      setIsLoading(false);
    };
    dataFetch();
  }, [id, setIsLoading, userId]);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
    setOpenSuccess(false);
    setMessage("");
  };

  const updateFollow = async () => {
    const followers = await getRequest(
      `/follow?where[followerId]=${userId}&where[followingIs]=${routeData.user.id}`
    );
    if (followers) {
      return setFollow(followers);
    }
  };

  const updateComments = async () => {
    const comments = await getRequest(
      `/comment?include[user]=true&where[routeId]=${id}`
    );
    if (comments) {
      return setComments(comments);
    }
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
      coordinates: mapLineCoords(routeData.points),
    },
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
        handleClose={handleCloseNotification}
        message={message}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
          <Card>
            <Card.Body style={{ padding: 0 }}>
              <Map
                mapLib={maplibreGl}
                style={{ width: "100%", height: "50vh" }}
                initialViewState={{
                  latitude: routeData.points[0].lat,
                  longitude: routeData.points[0].lon,
                  zoom: 13,
                }}
                mapStyle="https://api.maptiler.com/maps/openstreetmap/style.json?key=bjLDbhMtZ821SnQaduPp"
              >
                {routeData.points !== undefined ? (
                  routeData.points.map((point, i) => (
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
            </Card.Body>
          </Card>
        </Grid>
        <Grid item xs={12} sm={7}>
          <Box marginLeft={10}>
            <Typography fontFamily={"Archivo Black"} color="gray">
              Local Travel... With Love
            </Typography>
            <Typography
              fontSize={40}
              fontFamily={"Archivo Black"}
              color={colors.chateau_green[500]}
              paddingBottom={4}
            >
              {routeData.name}
            </Typography>
            <Divider light />
            <Typography paddingTop={2} fontFamily={"Russo One"}>
              {t("Created by")}
            </Typography>
            <Box marginBottom={3}>
              <Stack spacing={2} direction="row" alignItems="center">
                <Avatar
                  size="lg"
                  text={routeData.user.username}
                  color="success"
                  bordered
                />
                <Link to={`/user/${routeData.user.id}`}>
                  <Typography fontFamily={"Russo One"} color="secondary">
                    {routeData.user.username}
                  </Typography>
                </Link>
                {isAuth === true ? (
                  follow.length > 0 ? (
                    <UnFollowButton
                      followId={follow[0].id}
                      updateHandler={updateFollow}
                    />
                  ) : (
                    <FollowButton
                      followedId={routeData.user.id}
                      notify={true}
                      updateHandler={updateFollow}
                    />
                  )
                ) : (
                  <></>
                )}
              </Stack>
            </Box>
            <Typography fontFamily={"Russo One"}>
              {t("Brief description")}
            </Typography>
            <Typography>{routeData.short_description}</Typography>
          </Box>
        </Grid>
        <Grid item sm={7}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={handleChangeTab}
              aria-label="basic tabs example"
              textColor="secondary"
            >
              <Tab label={t("Description")} {...a11yProps(0)} />
              <Tab label={t("Photos")} {...a11yProps(1)} />
              <Tab label={t("Comments")} {...a11yProps(2)} />
              <Tab label={t("Points")} {...a11yProps(3)} />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            <span dangerouslySetInnerHTML={{ __html: routeData.description }} />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <ImageList variant="masonry" cols={3} gap={8}>
              {routeData.images.map((item) => (
                <ImageListItem key={item.id}>
                  <img
                    src={`${process.env.REACT_APP_UPLOADS_BASE}${item.uriPath}`}
                    alt={item.id}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            {isAuth === true ? (
              <CommentSend
                routeId={id}
                updateComments={updateComments}
                setMessage={setMessage}
                setOpenError={setOpenError}
                setOpenSuccess={setOpenSuccess}
              />
            ) : (
              <></>
            )}
            <List>
              {comments.length > 0 ? (
                <>
                  {comments.map((comment, i) => (
                    <CommentDisplay comment={comment} />
                  ))}
                </>
              ) : (
                <Typography>There nothing yet</Typography>
              )}
            </List>
          </TabPanel>
          <TabPanel>
            <List>
              {routeData.points !== undefined
                ? routeData.points.map((point, i) => (
                    <PointListItem point={point} index={i + 1} />
                  ))
                : ""}
            </List>
          </TabPanel>
        </Grid>
        <Grid item xs={5}></Grid>
      </Grid>
    </Box>
  );
};

export default RouteId;
