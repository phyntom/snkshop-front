import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { saveInStorage, removeInStorage } from '../utils/persistStorage';

export const StoreContext = createContext();

const savedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

export const StoreContextProvider = (props) => {
   const [products, setProducts] = useState([]);
   const [existUser, setExistUser] = useState(savedUser);

   console.log(localStorage.getItem('user'));

   const fetchProducts = async () => {
      try {
         const { data } = await axios.get('api/products');
         setProducts(data);
      } catch (error) {
         console.log(error.message);
      }
   };

   const fetchProductById = (id) => {
      return products.find((product) => product._id === id);
   };

   const updateSavedUser = (user) => {
      setExistUser(user);
      saveInStorage('user', user);
   };

   const removeSavedUser = (user) => {
      removeInStorage('user', user);
      setExistUser(null);
   };

   useEffect(() => {
      fetchProducts();
   }, []);

   return (
      <StoreContext.Provider
         value={{
            products,
            fetchProducts,
            fetchProductById,
            existUser,
            updateSavedUser,
            removeSavedUser,
         }}
      >
         {props.children}
      </StoreContext.Provider>
   );
};
