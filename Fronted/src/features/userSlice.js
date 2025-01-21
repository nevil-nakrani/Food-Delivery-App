import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: "nevil" };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    // builder.addCase( , (state, action) => {})
  },
});

export default userSlice.reducer;
