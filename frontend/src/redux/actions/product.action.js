import axios from "axios";
import { server } from "../../server";

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