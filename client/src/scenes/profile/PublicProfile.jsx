import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRequest } from "../../utils/helpers/request.helpers";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Input,
  List,
  Modal,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Avatar, Card, Divider, Spacer } from "@nextui-org/react";
import ProfRouteItem from "../../components/Route/ProfRouteItem";
import { useTranslation } from "react-i18next";

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

const PublicProfile = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [user, setUser] = useState();
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getRequest(`/user/${id}`);
      setUser(data);
    };
    fetchUser();
  }, [id]);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  if (!user) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, marginTop: 3, marginLeft: 20, marginRight: 20 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
          <Card>
            <Card.Body>
              <Stack direction="column" alignItems="center">
                {user.avatar.length > 0 ? (
                  <Avatar
                    size="lg"
                    src={`${process.env.REACT_APP_UPLOADS_BASE}${user.avatar[0].uriPath}`}
                  />
                ) : (
                  <Avatar size="lg" text={user.username} />
                )}
                <Stack direction="row" alignItems="center">
                  <Typography fontFamily={"Russo One"}>
                    {user.username}
                  </Typography>
                </Stack>
                <Spacer y={0.5} />
                <Divider />
                <Spacer y={0.5} />
                <Stack direction="row" alignItems="center">
                  <Typography fontFamily={"Russo One"}>
                    {t("About user")}
                  </Typography>
                </Stack>
                <Typography>
                  {user.about !== "" ? user.about : t("Nothing")}
                </Typography>
              </Stack>
            </Card.Body>
          </Card>
        </Grid>
        <Grid item xs={12} sm={7}>
          <Card>
            <Card.Body>
              <Box>
                <Typography fontFamily={"Russo One"}>
                  {t("Routes created by user")}:
                </Typography>
                {user.routes.length > 0 ? (
                  <List sx={{ width: "100%", overflowY: "scroll" }}>
                    {user.routes.map((route, i) => (
                      <ProfRouteItem
                        name={route.name}
                        short_description={route.short_description}
                        key={i}
                        id={route.id}
                      />
                    ))}
                  </List>
                ) : (
                  <Typography
                    fontFamily={"Archivo Black"}
                    color="secondary"
                    fontSize={40}
                  >
                    {t("Nothing")}
                  </Typography>
                )}
              </Box>
            </Card.Body>
          </Card>
          <Spacer y={1} />
          <Card>
            <Card.Body>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={tabValue}
                  onChange={handleChangeTab}
                  aria-label="basic tabs example"
                  textColor="secondary"
                >
                  <Tab label={t("Following")} {...a11yProps(0)} />
                  <Tab label={t("Following")} {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={tabValue} index={0}>
                <Box>
                  {user.following.length > 0 ? (
                    user.following.map((follow, i) => (
                      <Stack direction="row" key={i} alignItems="center">
                        <Avatar text={follow.followed.username} />
                        <Spacer x={0.5} />
                        <Typography>{follow.followed.username}</Typography>
                      </Stack>
                    ))
                  ) : (
                    <Typography fontFamily={"Russo One"}>
                      {t("Nothing")}
                    </Typography>
                  )}
                </Box>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <Box>
                  {user.followers.length > 0 ? (
                    user.followers.map((follow, i) => (
                      <Stack direction="row" key={i} alignItems="center">
                        <Avatar text={follow.follower.username} />
                        <Spacer x={0.5} />
                        <Typography>{follow.follower.username}</Typography>
                      </Stack>
                    ))
                  ) : (
                    <Typography fontFamily={"Russo One"}>
                      {t("Nothing")}
                    </Typography>
                  )}
                </Box>
              </TabPanel>
            </Card.Body>
          </Card>
        </Grid>
        <Grid item xs={12} sm={5}></Grid>
        <Grid item xs={12} sm={7}></Grid>
      </Grid>
    </Box>
  );
};

export default PublicProfile;
