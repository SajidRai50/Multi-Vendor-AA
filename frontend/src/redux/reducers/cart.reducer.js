import { createReducer } from "@reduxjs/toolkit";

const getCartFromStorage = () => {
  try {
    const data = JSON.parse(localStorage.getItem("cartItems"));
    return Array.isArray(data) ? data.filter(Boolean) : [];
  } catch (err) {
    return [];
  }
};

const initialState = {
  cart: getCartFromStorage(),
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("addToCart", (state, action) => {
      const item = action.payload;

      // ❌ prevent null/invalid data
      if (!item || !item._id) return;

      const isItemExist = state.cart.find(
        (i) => i?._id === item._id
      );

      if (isItemExist) {
        state.cart = state.cart.map((i) =>
          i?._id === item._id ? item : i
        );
      } else {
        state.cart.push(item);
      }
    })

    .addCase("removeFromCart", (state, action) => {
      state.cart = state.cart.filter((i) => i?._id !== action.payload);
    });
});