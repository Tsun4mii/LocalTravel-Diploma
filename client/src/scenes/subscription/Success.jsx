import { Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/reducers/userSlice";
import {
  getAuthRequest,
  postAuthRequest,
  postRefreshRequest,
} from "../../utils/helpers/request.helpers";

const Success = () => {
  const reduxDispatch = useDispatch();

  useEffect(() => {
    const dataFetch = async () => {
      const data = await postAuthRequest("/user/update-role", {
        role: "PREMIUM",
      });
    };
    const updateUser = async () => {
      const userData = await getAuthRequest("/auth/me");
      console.log(userData);
      reduxDispatch(
        setUserData({
          id: userData.id,
          email: userData.email,
          role: userData.role,
        })
      );
      const refresh = await postRefreshRequest();
    };
    dataFetch();
    updateUser();
  }, [reduxDispatch]);

  return (
    <Typography
      fontFamily={"Russo One"}
      sx={{ marginTop: 4, marginLeft: 4 }}
      fontSize={25}
    >
      Спасибо за подписку. Теперь вы можете создавать собственные туристические
      маршруты!
    </Typography>
  );
};

export default Success;
