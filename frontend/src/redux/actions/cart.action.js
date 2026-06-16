// add yo cart

export const addToCart = (data) =>(dispatch ,getState) =>{
    dispatch({
        type : "addToCart",
        payLoad : data,
    });

    localStorage.setItem('cartItems' , JSON.stringify(getState().cart.cart));
    return data;
}


// remove from cart


export const removeFromCart = (data) =>(dispatch ,getState) =>{
    dispatch({
        type : "removeFromCart",
        payLoad : data._id,
    });

    localStorage.setItem('cartItems' , JSON.stringify(getState().cart.cart));
    return data;
}

