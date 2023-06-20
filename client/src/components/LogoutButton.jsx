import { Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearState } from "../redux/reducers/userSlice";
import { destroyAuthCookies } from "../utils/helpers/cookies.helpers";
import { postAuthRequest } from "../utils/helpers/request.helpers";

const LogoutButton = () => {
  const navigator = useNavigate();
  const reduxDispatch = useDispatch();
  const { t } = useTranslation();

  const logout = async () => {
    const response = await postAuthRequest("/auth/logout", {});
    if (!response.count) {
      console.log("ERROR");
    }
    destroyAuthCookies();
    reduxDispatch(clearState());
    return navigator("/signin");
  };

  return (
    <Button variant="contained" color="secondary" onClick={(e) => logout()}>
      {t("logout")}
    </Button>
  );
};

export default LogoutButton;
