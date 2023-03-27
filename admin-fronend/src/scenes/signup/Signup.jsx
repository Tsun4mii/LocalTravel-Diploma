import {
  Avatar,
  Box,
  Grid,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../../utils/theme";
import Paper from "@mui/material/Paper";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
const Signup = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random/?mountains,forest)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
              component="h1"
              variant="h1"
              color={colors.grey[100]}
              fontWeight="bold"
            >
              LT Admin Sign Up
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                color="secondary"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                color="secondary"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="code"
                label="code"
                type="password"
                id="code"
                color="secondary"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 3, mb: 2, bgcolor: colors.greenAccent[500] }}
              >
                <Typography color={colors.primary[500]}>Sign Up</Typography>
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Signup;
