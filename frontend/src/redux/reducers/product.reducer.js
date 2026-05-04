// reducers/product.reducer.js
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  allProducts: [],
  isLoading: false,
  error: null,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("getAllProductsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllProductsSuccess", (state, action) => {
      state.isLoading = false;
      state.allProducts = action.payload;
    })
    .addCase("getAllProductsFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
});