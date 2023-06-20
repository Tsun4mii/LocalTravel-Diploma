import {
  Avatar,
  Box,
  Grid,
  Typography,
  TextField,
  Link,
  Button,
} from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../../utils/theme";
import Paper from "@mui/material/Paper";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/reducers/userSlice";
import {
  getAuthRequest,
  postRequest,
} from "../../utils/helpers/request.helpers";
import { useNavigate } from "react-router-dom";
import { setAuthCookies } from "../../utils/helpers/cookies.helpers";
import { useTranslation } from "react-i18next";
import NotificationSnackBar from "../../components/Notification/NotificationSnackBar";
import { loginSchema } from "../../utils/validation/login.validation.schema";

const Signin = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const reduxDispatch = useDispatch();
  const navigate = useNavigate();

  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignin = async (e) => {
    try {
      e.preventDefault();
      const user = await loginSchema.validate({
        email: email,
        password: password,
      });
      const tokens = await postRequest("/auth/local/signin", user);
      if (tokens.statusCode === 403) {
        throw new Error("Wrong email or password");
      }
      setAuthCookies(tokens);
      const userData = await getAuthRequest("/auth/me");
      console.log(userData);
      reduxDispatch(
        setUserData({
          id: userData.id,
          email: userData.email,
          role: userData.role,
        })
      );
      return navigate("/");
    } catch (error) {
      setMessage(error.message);
      setOpenError(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
    setOpenSuccess(false);
    setMessage("");
  };

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <NotificationSnackBar
          openError={openError}
          openSuccess={openSuccess}
          handleClose={handleClose}
          message={message}
        />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random/?mountains,forest,architecture)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginLeft: 0,
              marginRight: 0,
              marginTop: 20,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: colors.greenAccent[500] }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h3"
              variant="h3"
              color="secondary"
              fontWeight="bold"
            >
              Welcome to Local Travel
            </Typography>
            <Box
              component="form"
              onSubmit={handleSignin}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={t("Email")}
                name="email"
                autoComplete="email"
                color="secondary"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={t("Password")}
                type="password"
                id="password"
                autoComplete="current-password"
                color="secondary"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 3, mb: 2, bgcolor: colors.chateau_green[500] }}
              >
                <Typography color={colors.primary[500]}>
                  {t("Sign in")}
                </Typography>
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Signin;
