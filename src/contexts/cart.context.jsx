import { createContext, useReducer } from "react";

// Setting up cart context that includes initial values and those set by reducer
export const CartContext = createContext({
  cartTotal: 0,
  cartCount: 0,
  cartItems: [],
  isCartOpen: false,
  setIsCartOpen: () => {},
  addItemToCart: () => {},
  clearItemFromCart: () => {},
  removeItemFromCart: () => {},
});

//Setting up the reducer for the cart context

export const CartProvider = ({ children }) => {
  //useReducer [state, payload]
  const [{ cartItems, cartCount, cartTotal, isCartOpen }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  //functions for updateCartItems

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    clearItemFromCart,
    removeItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
/////////////////

dispatch(
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
    cartItems: newCartItems,
    cartTotal: newCartTotal,
    cartCount: newCartCount,
  })
);

////////////////////
