import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  username: "",
  email: "",
  avatar_url: "",
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.avatar_url = action.payload.avatar_url;
    },
    update: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.avatar_url = action.payload.avatar_url;
    },
    logout: (state, action) => {
      state.id = "";
      state.username = "";
      state.email = "";
      state.avatar_url = "";
    },

  },
});
export const { login, update, logout,refreshToken } = accountSlice.actions;

export default accountSlice.reducer;
