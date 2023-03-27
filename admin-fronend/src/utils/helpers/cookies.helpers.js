import { setCookie } from "nookies";

export const setAuthCookies = (tokens) => {
  setCookie(null, "access_token", tokens.access_token, {
    maxAge: 60 * 10,
    path: "/",
    sameSite: "None",
  });
  setCookie(null, "refresh_token", tokens.refresh_token, {
    maxAge: 60 * 60 * 24 * 3,
    path: "/",
    sameSite: "None",
  });
};

export const destroyAuthCookies = () => {
  setCookie(null, "access_token", "", {
    maxAge: 0,
    path: "/",
    sameSite: "None",
  });
  setCookie(null, "refresh_token", "", {
    maxAge: 0,
    path: "/",
    sameSite: "None",
  });
};
