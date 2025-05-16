import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice.js";
import foodReducer from "../features/foodSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    food: foodReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("cartItems", JSON.stringify(state.food.cartItems));
});

export default store;
