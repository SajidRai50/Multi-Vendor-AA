
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  allProducts: [],
  isLoading: false,
  error: null,
   success: false,
};

// export const productReducer = createReducer(initialState, (builder) => {
// builder
//   .addCase("getAllProductsRequest", (state) => {
//     state.isLoading = true;
//     state.success = false; // reset
//   })
//   .addCase("getAllProductsSuccess", (state, action) => {
//     state.isLoading = false;
//     state.allProducts = action.payload;
//     state.success = true; // ✅ set success
//   })
//   .addCase("getAllProductsFail", (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//     state.success = false;
//   });
// })

export const productReducer = createReducer(initialState, (builder) => {
  builder
    // ================= FETCH =================
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

    // ================= CREATE =================
    .addCase("createProductRequest", (state) => {
      state.isLoading = true;
      state.success = false;
      state.error = null;
    })
    .addCase("createProductSuccess", (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.allProducts.push(action.payload); // optional
    })
    .addCase("createProductFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("createProductReset", (state) => {
      state.success = false;
    });
});


