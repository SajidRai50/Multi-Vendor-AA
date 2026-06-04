 import { configureStore } from "@reduxjs/toolkit";
import {userReducer} from "./reducers/user.reducer.js"
import { productReducer } from "./reducers/product.reducer.js";
import { sellerReducer } from "./reducers/seller.reducer.js";
import { eventReducer } from "./reducers/event.reducer.js";
const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    products: productReducer,
    events :eventReducer,
  },
});
export default Store;
