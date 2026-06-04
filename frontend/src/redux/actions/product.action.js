import axios from "axios";
import { server } from "../../server";
// create product
export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "createProductRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${server}/product/create-product`,
      newForm,
      config
    );

    dispatch({
      type: "createProductSuccess",
      payload: data.product,
    });

  } catch (error) {
    dispatch({
      type: "createProductFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};


// get All Products of a shop
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsShopRequest",
    });

    const { data } = await axios.get(
      `${server}/product/get-all-products-shop/${id}`
    );
    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsShopFailed",
      payload: error.response.data.message,
    });
  }
};


// delete Products of a shop

export const deleteProduct = (id) => async (dispatch) =>{
  try {
    dispatch({
      type : "deleteProductRequest"
    })

    const { data} = await axios.delete(`${server}/product/delete-shop-product/${id}`,
     {withCredentials:true}
    )
  dispatch({
      type: "deleteProductSuccess",
      payload: data.messaage,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductFailed",
      payload: error.response.data.message,
    });

  }
}