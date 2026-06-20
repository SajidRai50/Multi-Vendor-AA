// import { createReducer } from "@reduxjs/toolkit";

// const getWishlistFromStorage = () => {
//   try {
//     const data = JSON.parse(localStorage.getItem("wishlistItems"));
//     return Array.isArray(data) ? data.filter(Boolean) : [];
//   } catch (err) {
//     return [];
//   }
// };

// const initialState = {
//   wishlist: getWishlistFromStorage(),
// };

// export const wishlistReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase("addToWishlist", (state, action) => {
//       const item = action.payload;

//       // ❌ prevent null/invalid data
//       if (!item || !item._id) return;

//       const isItemExist = state.wishlist.find((i) => i?._id === item._id);

//       if (isItemExist) {
//         state.wishlist = state.wishlist.map((i) =>
//           i?._id === item._id ? item : i,
//         );
//       } else {
//         state.wishlist.push(item);
//       }
//     })

//     .addCase("removeFromWishlist", (state, action) => {
//       state.wishlist = state.wishlist.filter((i) => i?._id !== action.payload);
//     });
// });
import { createReducer } from "@reduxjs/toolkit";

const getWishlistFromStorage = () => {
  try {
    const data = JSON.parse(localStorage.getItem("wishlistItems"));
    return Array.isArray(data) ? data.filter(Boolean) : [];
  } catch (err) {
    return [];
  }
};

const initialState = {
  wishlist: getWishlistFromStorage(),
};

export const wishlistReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("addToWishlist", (state, action) => {
      const item = action.payload;

      if (!item || !item._id) return;

      const exists = state.wishlist.find((i) => i._id === item._id);

      // ✅ TOGGLE LOGIC (BEST PRACTICE)
      if (exists) {
        state.wishlist = state.wishlist.filter(
          (i) => i._id !== item._id
        );
      } else {
        state.wishlist.push(item);
      }
    })

    .addCase("removeFromWishlist", (state, action) => {
      state.wishlist = state.wishlist.filter(
        (i) => i._id !== action.payload
      );
    });
});