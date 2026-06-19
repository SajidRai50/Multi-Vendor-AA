// add to cart
export const addToCart = (data) => async (dispatch, getState) => {
  if (!data || !data._id) return;

  dispatch({
    type: "addToCart",
    payload: data,
  });

  const cart = getState().cart.cart || [];

  localStorage.setItem("cartItems", JSON.stringify(cart));

  return data;
};

// remove from cart
export const removeFromCart = (data) => async (dispatch, getState) => {
  if (!data || !data._id) return;

  dispatch({
    type: "removeFromCart",
    payload: data._id,
  });

  const cart = getState().cart.cart || [];

  localStorage.setItem("cartItems", JSON.stringify(cart));

  return data;
};