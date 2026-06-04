
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  allProducts: [],
  isLoading: false,
  error: null,
   success: false,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    // ================= FETCH ALL PRODUCTS (GLOBAL) =================
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
    })

    // ================= FETCH SHOP PRODUCTS =================
    .addCase("getAllProductsShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllProductsShopSuccess", (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    })
    .addCase("getAllProductsShopFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // ================= CREATE PRODUCT =================
    .addCase("createProductRequest", (state) => {
      state.isLoading = true;
      state.success = false;
      state.error = null;
    })
    .addCase("createProductSuccess", (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.allProducts.push(action.payload); // optional optimistic update
    })
    .addCase("createProductFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("createProductReset", (state) => {
      state.success = false;
    })

    // ================= DELETE PRODUCT =================
    .addCase("deleteProductRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteProductSuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload;

      // optional: remove deleted product from state if id is sent
      state.allProducts = state.allProducts?.filter(
        (item) => item._id !== action.meta?.id
      );
    })
    .addCase("deleteProductFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // ================= UTIL =================
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});


