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

const EndSubscription = () => {
  const reduxDispatch = useDispatch();

  useEffect(() => {
    const endSub = async () => {
      const end = await postAuthRequest("/user/unsub");
    };
    const dataFetch = async () => {
      const data = await postAuthRequest("/user/update-role", {
        role: "USER",
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
    endSub();
    dataFetch();
    updateUser();
  }, [reduxDispatch]);
  return (
    <Typography
      fontFamily={"Russo One"}
      sx={{ marginTop: 4, marginLeft: 4 }}
      fontSize={25}
    >
      Ваша подписка отменена. В следующем месяце средства не будут списаны.
    </Typography>
  );
};

export default EndSubscription;
