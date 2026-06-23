import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null,
  success: false,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
    })

    .addCase("LoadUserSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    })

    .addCase("LoadUserFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    })

    // ✅ ADD THIS (IMPORTANT)
    .addCase("LogoutUserSuccess", (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
    })


    //update user info

    .addCase("UpdateUserInfoRequest", (state) => {
      state.loading = true;
    })

    .addCase("UpdateUserInfoSuccess", (state, action) => {
      state.loading = false;
    state.user = action.payload;
    state.success = true;
    })

    .addCase("UpdateUserInfoFail", (state, action) => {
  state.loading = false;
  state.error = action.payload;
  state.success = false;
})

.addCase("clearSuccess", (state) => {
  state.success = false;
})

    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
