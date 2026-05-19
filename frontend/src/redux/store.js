 import { configureStore } from "@reduxjs/toolkit";
import {userReducer} from "./reducers/user.reducer.js"
import { productReducer } from "./reducers/product.reducer.js";
import { sellerReducer } from "./reducers/seller.reducer.js";
const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    products: productReducer,
  },
});
export default Store;
