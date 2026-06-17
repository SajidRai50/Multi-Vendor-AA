import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./reducers/user.reducer.js";
import { sellerReducer } from "./reducers/seller.reducer.js";
import { productReducer } from "./reducers/product.reducer.js";
import { eventReducer } from "./reducers/event.reducer.js";
import { cartReducer } from "./reducers/cart.reducer.js";

const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    product: productReducer,
    event: eventReducer,
    cart: cartReducer,
  },
});

export default Store;