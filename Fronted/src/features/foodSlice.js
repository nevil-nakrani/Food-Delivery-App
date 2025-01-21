import { createSlice } from "@reduxjs/toolkit";
import { food_list } from "../assets/assets";

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
    decreaseFromtheCart: (state, action) => {
      const itemId = action.payload;
      if (state.cartItems[itemId] === 1) {
        delete state.cartItems[itemId];
      } else {
        state.cartItems[itemId] -= 1;
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

export const {
  addToCart,
  decreaseFromtheCart,
  removeFromCart,
  clearCart,
  setCartItems,
} = foodSlice.actions;

// Selector to calculate the total count of items in the cart
export const selectCartItemCount = (state) => {
  const { cartItems } = state.food;
  return Object.values(cartItems).reduce((total, count) => total + count, 0);
};

// Keep the existing total price selector
export const selectCartTotal = (state) => {
  const { cartItems, food_list } = state.food;

  return Object.keys(cartItems).reduce((total, itemId) => {
    const item = food_list.find((food) => food.id === itemId);
    return total + (item?.price || 0) * cartItems[itemId];
  }, 0);
};

export const subTotal = (state) => {
  const { cartItems, food_list } = state.food;
  let amount = 0;
  for (const itemId in cartItems) {
    if (cartItems[itemId] > 0) {
      // Check if the item quantity is greater than 0
      const itemInfo = food_list.find((food) => food._id === itemId);
      if (itemInfo) {
        amount += itemInfo.price * cartItems[itemId];
      }
    }
  }

  return amount;
};

export default foodSlice.reducer;
