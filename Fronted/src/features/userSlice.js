import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../utils/axiosClient";
import { getItem, KEY_ACCESS_TOKEN } from "../../utils/localStorageManager";

const initialState = { isLoading: false, isAuthenticated: false, user: null };

export const signup = createAsyncThunk("user/register", async (body) => {
  try {
    const { data } = await axiosClient.post("/user/register", body);
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
    Promise.reject(e);
  }
});

export const signin = createAsyncThunk("/user/login", async (body) => {
  try {
    const { data } = await axiosClient.post("/user/login", body);
    return data;
  } catch (e) {
    console.log(e);
    Promise.reject(e);
  }
});

export const fetchProfile = createAsyncThunk("/user/profile", async () => {
  try {
    const response = await axiosClient.get("/user/profile", {
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Authorization: `Bearer ${getItem(KEY_ACCESS_TOKEN)}`,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
    Promise.reject(e);
  }
});

export const logout = createAsyncThunk("/user/logout", async () => {
  try {
    const response = await axiosClient.get("/user/logout", {
      headers: {
        Authorization: `Bearer ${getItem(KEY_ACCESS_TOKEN)}`,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
    Promise.reject(e);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state, action) => {
        state.isAuthenticated = false;
        state.isLoading = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(signin.pending, (state, action) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(signin.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.success ? action.payload?.user : null;
        state.isAuthenticated = action.payload?.success;
        console.log(action.payload.user);
      })
      .addCase(fetchProfile.pending, (state, action) => {
        state.isAuthenticated = false;
        state.isLoading = true;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.user = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload?.success;
        state.isLoading = false;
        state.user = action.payload?.success ? action.payload?.user : null;
      })

      .addCase(logout.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.user = null;
      });
  },
});

export default userSlice.reducer;
