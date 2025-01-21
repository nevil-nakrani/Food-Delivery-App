import { createSlice } from "@reduxjs/toolkit";
import { food_list } from "../assets/frontend_assets/assets";

const initialState = { food_list, cartItems: {} };

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemId = action.payload;
      if (!state.cartItems[itemId]) {
        state.cartItems[itemId] = 1;
      } else {
        state.cartItems[itemId] += 1;
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      if (state.cartItems[itemId]) {
        delete state.cartItems[itemId];
      }
    },
    clearCart: (state) => {
      state.cartItems = {};
    },
    setCartItems: (state, action) => {
      state.cartItems = { ...state.cartItems, ...action.payload };
    },
  },
  extraReducers: (builder) => {},
});

export const { addToCart, removeFromCart, clearCart, setCartItems } =
  foodSlice.actions;

// Selector to calculate the total count of items in the cart
export const selectCartItemCount = (state) => {
  const { cartItems } = state.food;
  return Object.values(cartItems).reduce((total, count) => total + count, 0);
};

// Keep the existing total price selector
export const selectCartTotal = (state) => {
  const { cartItems } = state.food;
  const { food_list } = state.food;

  return Object.keys(cartItems).reduce((total, itemId) => {
    const item = food_list.find((food) => food.id === itemId);
    return total + (item?.price || 0) * cartItems[itemId];
  }, 0);
};

export default foodSlice.reducer;
