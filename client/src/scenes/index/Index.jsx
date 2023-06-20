import { Box, Button, Grid, Typography } from "@mui/material";
import { Card } from "@nextui-org/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Index = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ flexGrow: 1, marginTop: 3, marginLeft: 40, marginRight: 40 }}>
      <Grid container spacing={2}>
        <Grid item sm={6} sx={{ height: "90vh" }}>
          <Typography
            fontSize={90}
            fontFamily={"Russo One"}
            sx={{
              maxWidth: 600,
              position: "absolute",
              top: 300,
              lineHeight: 1,
              left: 250,
            }}
          >
            {t("New adventure")}
          </Typography>
          <Typography
            fontSize={20}
            fontFamily={"Russo One"}
            sx={{
              maxWidth: 400,
              position: "absolute",
              top: 575,
              left: 250,
              color: "#5dcb67",
            }}
          >
            {t("We will help")}
          </Typography>
          <Link to="/signup">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#5dcb67",
                position: "absolute",
                top: 615,
                left: 250,
              }}
            >
              <Typography fontFamily={"Russo One"}>{t("Sign up")}</Typography>
            </Button>
          </Link>
          <Link to="/signin">
            <Button
              variant="text"
              sx={{
                position: "absolute",
                top: 615,
                left: 400,
              }}
            >
              <Typography fontFamily={"Russo One"}>{t("Sign in")}</Typography>
            </Button>
          </Link>
        </Grid>
        <Grid item sm={6}>
          <Card
            style={{ height: 700, width: 700, marginLeft: 10, marginTop: 80 }}
          >
            <Card.Body style={{ backgroundColor: "#94e19b" }}></Card.Body>
          </Card>
          <Card
            style={{
              height: 500,
              width: 400,
              position: "absolute",
              top: 250,
              left: 900,
            }}
          >
            <Card.Body
              style={{
                backgroundImage:
                  "url(https://source.unsplash.com/random/?mountains,forest,architecture)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></Card.Body>
          </Card>
          <Card
            style={{
              height: 500,
              width: 400,
              position: "absolute",
              top: 100,
              left: 1150,
            }}
          >
            <Card.Body
              style={{
                backgroundImage:
                  "url(https://source.unsplash.com/random/?forest,architecture)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></Card.Body>
          </Card>
          <Card
            style={{
              height: 500,
              width: 400,
              position: "absolute",
              top: 380,
              left: 1400,
            }}
          >
            <Card.Body
              style={{
                backgroundImage:
                  "url(https://source.unsplash.com/random/?mountains)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></Card.Body>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Index;
