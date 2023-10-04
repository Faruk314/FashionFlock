import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoggedIn: false,
  userInfo: null,
};

export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (thunkAPI) => {
    try {
      const user = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/getuserinfo`
      );
      return user.data;
    } catch (error) {
      console.log(error);
      return;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin(state, action) {
      state.isLoggedIn = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    });
  },
});

export const { setLogin, setUserInfo } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectUserInfo = (state) => state.auth.userInfo;

export default authSlice.reducer;
