import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const ProtectedRoute = (props) => {
   const { existUser } = useContext(StoreContext);

   if (!existUser) {
      return <Redirect to='/login' />;
   } else {
      return <Route {...props} />;
   }
};

export default ProtectedRoute;
