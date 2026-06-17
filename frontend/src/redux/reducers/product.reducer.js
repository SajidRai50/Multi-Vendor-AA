import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  allProducts: [],
  shopProducts: [],
  isLoading: false,
  error: null,
  success: false,
  message: null,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder

    // ================= GET ALL PRODUCTS =================
    .addCase("getAllProductsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllProductsSuccess", (state, action) => {
      state.isLoading = false;
      state.allProducts = action.payload || [];
    })
    .addCase("getAllProductsFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // ================= SHOP PRODUCTS =================
    .addCase("getAllProductsShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllProductsShopSuccess", (state, action) => {
      state.isLoading = false;
      state.shopProducts = action.payload || [];
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

      if (action.payload) {
        state.allProducts.unshift(action.payload); // newest first
      }
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
      state.message = action.payload.message;

      state.allProducts = state.allProducts.filter(
        (item) => item._id !== action.payload.id
      );
    })
    .addCase("deleteProductFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // ================= CLEAR ERRORS =================
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});