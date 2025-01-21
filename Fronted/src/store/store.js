import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice.js";
import foodReducer from "../features/foodSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    food: foodReducer,
  },
});

export default store;
