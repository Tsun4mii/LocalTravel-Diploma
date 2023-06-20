import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    email: "",
    role: "",
    username: "",
    isAuth: false,
    lang: false,
  },
  reducers: {
    setUserEmail: (state, action) => {
      state.email = action.payload;
    },
    setUserData: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.username = action.payload.username;
      state.isAuth = true;
    },
    clearState: (state, action) => {
      state.id = "";
      state.email = "";
      state.role = "";
      state.username = "";
      state.isAuth = false;
      state.lang = false;
    },
    changeLang: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const { setUserEmail, setUserData, clearState, changeLang } =
  userSlice.actions;

export default userSlice.reducer;
