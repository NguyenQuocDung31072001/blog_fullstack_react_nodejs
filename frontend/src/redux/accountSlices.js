import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  username: "",
  email: "",
  avatar_url: "",
  access_token:""
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
      state.access_token=action.payload.access_token
    },
    update: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.avatar_url = action.payload.avatar_url;
      state.access_token=action.payload.access_token
    },
    logout: (state, action) => {
      state.id = "";
      state.username = "";
      state.email = "";
      state.avatar_url = "";
      state.access_token=""
    },
    refreshToken:(state,action)=>{
      state.access_token=action.payload.access_token
    }
  },
});
export const { login, update, logout,refreshToken } = accountSlice.actions;

export default accountSlice.reducer;
