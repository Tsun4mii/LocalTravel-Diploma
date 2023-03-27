import { parseCookies } from "nookies";
import { setAuthCookies } from "./cookies.helpers";

export const getRequest = async (url) => {
  const request = await fetch(`${process.env.REACT_APP_API_BASE}${url}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return await request.json();
};

export const getAuthRequest = async (url) => {
  const { access_token } = parseCookies();

  const request = await fetch(`${process.env.REACT_APP_API_BASE}${url}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  const response = await request.json();
  if (response.statusCode === 401) {
    await postRefreshRequest();
    const { access_token } = parseCookies();
    const request = await fetch(`${process.env.REACT_APP_API_BASE}${url}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      method: "GET",
    });
    return await request.json();
  }
  return response;
};

export const postRequest = async (url, body) => {
  const request = await fetch(`${process.env.REACT_APP_API_BASE}${url}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  });
  return await request.json();
};

export const postAuthRequest = async (url, body) => {
  const { access_token } = parseCookies();

  const request = await fetch(`${process.env.REACT_APP_API_BASE}${url}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    method: "POST",
    body: JSON.stringify(body),
  });
  const response = await request.json();
  if (response.statusCode === 401) {
    await postRefreshRequest();
    const { access_token } = parseCookies();
    const request = await fetch(`${process.env.REACT_APP_API_BASE}${url}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      method: "POST",
      body: JSON.stringify(body),
    });
    return await request.json();
  }
  return response;
};

export const postRefreshRequest = async () => {
  const { refresh_token } = parseCookies();

  const request = await fetch(
    `${process.env.REACT_APP_API_BASE}/admin/auth/refresh`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${refresh_token}`,
      },
      method: "POST",
    }
  );
  const tokens = await request.json();
  return setAuthCookies(tokens);
};

export const patchAuthRequest = async (url, body) => {
  const { access_token } = parseCookies();

  const request = await fetch(`${process.env.REACT_APP_API_BASE}${url}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    method: "PATCH",
    body: JSON.stringify(body),
  });
  const response = await request.json();
  if (response.statusCode === 401) {
    await postRefreshRequest();
    const { access_token } = parseCookies();
    const request = await fetch(`${process.env.REACT_APP_API_BASE}${url}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      method: "PATCH",
      body: JSON.stringify(body),
    });
    return await request.json();
  }
  return response;
};
