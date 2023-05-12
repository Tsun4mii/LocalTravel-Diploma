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
import React, { useEffect, useState } from "react";
import {
  getAuthRequest,
  postAuthRequest,
  patchAuthRequest,
} from "../../utils/helpers/request.helpers";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ProfRouteItem from "../../components/Route/ProfRouteItem";
import NotificationSnackBar from "../../components/Notification/NotificationSnackBar";
import { useTranslation } from "react-i18next";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};

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

const Profile = () => {
  const { t } = useTranslation();
  const [userData, setUserData] = useState();
  const [updateUsername, setUpdateUsername] = useState("");
  const [updateAbout, setUpdateAbout] = useState("");
  const [openUNameModal, setOpenUNameNodal] = React.useState(false);
  const [tabValue, setTabValue] = useState(0);
  const handleOpen = () => setOpenUNameNodal(true);
  const handleClose = () => setOpenUNameNodal(false);

  const [openAboutModal, setOpenAboutNodal] = React.useState(false);
  const handleOpenAbout = () => setOpenAboutNodal(true);
  const handleCloseAbout = () => setOpenAboutNodal(false);

  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const dataFetch = async () => {
      const data = await getAuthRequest(`/auth/me`);
      setUserData(data);
      console.log(data);
    };
    dataFetch();
  }, []);

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
    setOpenSuccess(false);
    setMessage("");
  };

  const handleUpdateUsername = async () => {
    try {
      const data = patchAuthRequest("/auth/update", {
        username: updateUsername,
      });
      const newUserData = await getAuthRequest("/auth/me");
      setUserData(newUserData);
      setMessage("Username updated");
      setOpenSuccess(true);
      return;
    } catch (error) {
      setMessage(error.message);
      setOpenError(true);
      return;
    }
  };

  const handleUpdateAbout = async () => {
    try {
      const data = patchAuthRequest("/auth/update", {
        about: updateAbout,
      });
      const newUserData = await getAuthRequest("/auth/me");
      setUserData(newUserData);
      setMessage("About updated");
      setOpenSuccess(true);
      return;
    } catch (error) {
      setMessage(error.message);
      setOpenError(true);
      return;
    }
  };

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  if (!userData) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <>
      <NotificationSnackBar
        openError={openError}
        openSuccess={openSuccess}
        handleClose={handleCloseNotification}
        message={message}
      />
      <Modal
        keepMounted
        open={openUNameModal}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="keep-mounted-modal-title"
            variant="h6"
            component="h2"
            fontFamily={"Russo One"}
          >
            {t("Enter new username")}
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Input
              value={updateUsername}
              onChange={(e) => setUpdateUsername(e.target.value)}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={(e) => handleUpdateUsername()}
            >
              {t("Update")}
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Modal
        keepMounted
        open={openAboutModal}
        onClose={handleCloseAbout}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="keep-mounted-modal-title"
            variant="h6"
            component="h2"
            fontFamily={"Russo One"}
          >
            {t("Enter new about information")}
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Input
              value={updateAbout}
              multiline
              rows={4}
              onChange={(e) => setUpdateAbout(e.target.value)}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={(e) => handleUpdateAbout()}
            >
              {t("Update")}
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Box sx={{ flexGrow: 1, marginTop: 3, marginLeft: 20, marginRight: 20 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5}>
            <Card>
              <Card.Body>
                <Stack direction="column" alignItems="center">
                  {userData.avatar.length > 0 ? (
                    <Avatar
                      size="lg"
                      src={`${process.env.REACT_APP_UPLOADS_BASE}${userData.avatar[0].uriPath}`}
                    />
                  ) : (
                    <Avatar size="lg" text={userData.email} />
                  )}
                  <Stack direction="row" alignItems="center">
                    <Typography fontFamily={"Archivo Black"}>
                      {userData.username}
                    </Typography>
                    <IconButton onClick={(e) => handleOpen()}>
                      <EditNoteIcon />
                    </IconButton>
                  </Stack>
                  <Spacer y={0.5} />
                  <Divider />
                  <Spacer y={0.5} />
                  <Stack direction="row" alignItems="center">
                    <Typography fontFamily={"Russo One"}>
                      {t("About")}
                    </Typography>
                    <IconButton onClick={(e) => handleOpenAbout()}>
                      <EditNoteIcon />
                    </IconButton>
                  </Stack>
                  <Typography>
                    {userData.about !== "" ? userData.about : t("Nothing")}
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
                    {t("Routes created by you")}:
                  </Typography>
                  {userData.routes.length > 0 ? (
                    <List sx={{ width: "100%", overflowY: "scroll" }}>
                      {userData.routes.map((route, i) => (
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
                      fontFamily={"Russo One"}
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
                    <Tab label={t("Followers")} {...a11yProps(1)} />
                  </Tabs>
                </Box>
                <TabPanel value={tabValue} index={0}>
                  <Box>
                    {userData.following.length > 0 ? (
                      userData.following.map((follow, i) => (
                        <Stack direction="row" key={i} alignItems="center">
                          <Avatar text={follow.followed.username} />
                          <Spacer x={0.5} />
                          <Typography fontFamily={"Russo One"}>
                            {follow.followed.username}
                          </Typography>
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
                    {userData.followers.length > 0 ? (
                      userData.followers.map((follow, i) => (
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
    </>
  );
};

export default Profile;
