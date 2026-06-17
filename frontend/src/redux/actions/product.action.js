import axios from "axios";
import { server } from "../../server";

// ================= CREATE PRODUCT =================
export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch({ type: "createProductRequest" });

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    const { data } = await axios.post(
      `${server}/product/create-product`,
      newForm,
      config
    );

    dispatch({
      type: "createProductSuccess",
      payload: data.product || {},
    });
  } catch (error) {
    dispatch({
      type: "createProductFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ================= GET ALL PRODUCTS =================
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllProductsRequest" });

    const { data } = await axios.get(
      `${server}/product/get-all-products`
    );

    dispatch({
      type: "getAllProductsSuccess",
      payload: data.products || [],
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ================= GET SHOP PRODUCTS =================
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getAllProductsShopRequest" });

    const { data } = await axios.get(
      `${server}/product/get-all-products-shop/${id}`
    );

    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data.products || [],
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsShopFailed",
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ================= DELETE PRODUCT =================
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteProductRequest" });

    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
      { withCredentials: true }
    );

    dispatch({
      type: "deleteProductSuccess",
      payload: {
        message: data.message,
        id,
      },
    });
  } catch (error) {
    dispatch({
      type: "deleteProductFailed",
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ================= CLEAR ERRORS =================
export const clearErrors = () => (dispatch) => {
  dispatch({ type: "clearErrors" });
};