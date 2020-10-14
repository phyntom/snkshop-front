import React, { useContext, createContext, useReducer } from 'react';
import { CartReducer, sumItems } from './CartReducer';
import { StoreContext } from '../context/StoreContext';

export const CartContext = createContext();

const savedCartItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
const savedShippingAddress = localStorage.getItem('shippingAddress')
   ? JSON.parse(localStorage.getItem('shippingAddress'))
   : {};
const initialState = {
   cartItems: savedCartItems,
   ...sumItems(savedCartItems),
   shippingAddress: savedShippingAddress,
   checkout: false,
};

export const CartContextProvider = (props) => {
   const [state, dispatch] = useReducer(CartReducer, initialState);
   const { products } = useContext(StoreContext);

   const increase = (payload) => {
      console.log(payload);
      dispatch({ type: 'INCREASE', payload });
   };

   const decrease = (payload) => {
      dispatch({ type: 'DECREASE', payload });
   };

   const addProduct = (payload) => {
      dispatch({ type: 'ADD_PRODUCT', payload });
   };

   const removeProduct = (payload) => {
      dispatch({ type: 'REMOVE_PRODUCT', payload });
   };
   const addShipping = (payload) => {
      dispatch({ type: 'ADD_SHIPPING', payload });
   };

   const addOrder = (payload) => {
      dispatch({ type: 'ADD_ORDER', payload });
   };

   const productInCart = (id) => {
      const cartProduct = products.find((p) => p._id === id);
      return cartProduct;
   };

   return (
      <CartContext.Provider
         value={{
            increase,
            decrease,
            addProduct,
            removeProduct,
            state,
            productInCart,
            addShipping,
            addOrder,
         }}
      >
         {props.children}
      </CartContext.Provider>
   );
};
