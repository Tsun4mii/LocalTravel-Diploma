import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    role: "",
    isAuth: false,
  },
  reducers: {
    setUserEmail: (state, action) => {
      state.email = action.payload;
    },
    setUserData: (state, action) => {
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.isAuth = true;
    },
    clearState: (state, action) => {
      state.email = "";
      state.role = "";
      state.isAuth = false;
    },
  },
});

export const { setUserEmail, setUserData, clearState } = userSlice.actions;

export default userSlice.reducer;
