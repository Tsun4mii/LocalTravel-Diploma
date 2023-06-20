import React from "react";
import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import { Navbar, Text } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { Button, IconButton, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsButton from "../../components/settings/SettingsButton";
import LogoutButton from "../../components/LogoutButton";
import { useTranslation } from "react-i18next";
import {
  getAuthRequest,
  postAuthRequest,
} from "../../utils/helpers/request.helpers";

const Root = () => {
  const { t } = useTranslation();
  const isAuth = useSelector((state) => state.user.isAuth);
  const role = useSelector((state) => state.user.role);
  const navigate = useNavigate();

  const onSub = async () => {
    const response = await postAuthRequest("/user/subscribe");
    return window.location.replace(response.url);
  };

  return (
    <>
      <Navbar isCompact isBordered variant="static">
        <Navbar.Brand>
          <Link to="">
            <Text>Local Travel</Text>
          </Link>
        </Navbar.Brand>
        <Navbar.Content>
          <Link to="/search">
            <Typography color="secondary" fontFamily={"Russo One"}>
              {t("Find your new journey")}
            </Typography>
          </Link>
        </Navbar.Content>
        {isAuth === true ? (
          <>
            {role === "PREMIUM" ? (
              <>
                <Link to="/route/create">
                  <Button variant="contained" color="secondary">
                    <Typography fontFamily={["Archivo Black", "Russo One"]}>
                      {t("Create your route")}
                    </Typography>
                  </Button>
                </Link>
              </>
            ) : (
              <></>
            )}
            <Navbar.Content>
              {role === "USER" ? (
                <>
                  <Navbar.Item>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={onSub}
                    >
                      <Typography fontFamily={["Archivo Black", "Russo One"]}>
                        {t("Sub")}
                      </Typography>
                    </Button>
                  </Navbar.Item>
                </>
              ) : (
                <></>
              )}
              <Navbar.Item>
                <Link to="/point/create">
                  <Button variant="contained" color="secondary">
                    <Typography fontFamily={["Archivo Black", "Russo One"]}>
                      {t("AddLandmark")}
                    </Typography>
                  </Button>
                </Link>
              </Navbar.Item>
              <Navbar.Item>
                <Link to="/profile">
                  <IconButton color="secondary">
                    <AccountCircleIcon />
                  </IconButton>
                </Link>
              </Navbar.Item>
              <Navbar.Item>
                <SettingsButton />
              </Navbar.Item>
              <Navbar.Item>
                <LogoutButton />
              </Navbar.Item>
            </Navbar.Content>
          </>
        ) : (
          <>
            <Navbar.Content>
              <Navbar.Item>
                <SettingsButton />
              </Navbar.Item>
              <NavLink to="/signin">{t("Sign in")}</NavLink>
              <Navbar.Item>
                <Link to="/signup">
                  <Button variant="contained" color="secondary">
                    {t("Sign up")}
                  </Button>
                </Link>
              </Navbar.Item>
            </Navbar.Content>
          </>
        )}
      </Navbar>
      <main className="content">
        <Outlet />
      </main>
    </>
  );
};

export default Root;
