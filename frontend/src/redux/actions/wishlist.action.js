// add to wishlist
export const addToWishlist = (data) => async (dispatch, getState) => {
  if (!data || !data._id) return;

  dispatch({
    type: "addToWishlist",
    payload: data,
  });

  const wishlist = getState().wishlist.wishlist || [];

  localStorage.setItem("wishlistItems", JSON.stringify(wishlist));

  return data;
};

// remove from cart
export const removeFromWishlist = (data) => async (dispatch, getState) => {
  if (!data || !data._id) return;

  dispatch({
    type: "removeFromWishlist",
    payload: data._id,
  });

  const wishlist = getState().wishlist.wishlist || [];

  localStorage.setItem("wishlistItems", JSON.stringify(wishlist));

  return data;
};