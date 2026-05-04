 import { configureStore } from "@reduxjs/toolkit";
import {userReducer} from "./reducers/user.reducer.js"
import { productReducer } from "./reducers/product.reducer.js";
const Store = configureStore({
  reducer: {
    user :userReducer,
     products: productReducer,
  },
});
export default Store;
