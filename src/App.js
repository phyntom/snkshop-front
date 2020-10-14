import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import { Route, Switch } from 'react-router-dom';
import HomeScreen from './pages/HomePage';
import './App.css';
import { Container } from 'react-bootstrap';
import ProductPage from './pages/ProductPage';
import { StoreContextProvider } from './context/StoreContext';
import { CartContextProvider } from './context/CartContext';
import { CartPage } from './pages/CartPage';
import { LoginPage } from './pages/LoginPage';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import { ShippingPage } from './pages/ShippingPage';
import { CreateOrderPage } from './pages/CreateOrderPage';

const App = () => {
   return (
      <React.Fragment>
         <StoreContextProvider>
            <CartContextProvider>
               <Header />
               <Container>
                  <main className='py-3'>
                     <Switch>
                        <Route path={'/'} exact component={HomeScreen} />
                        <Route path={'/home'} component={HomeScreen} />
                        <Route path='/login' component={LoginPage} />
                        <ProtectedRoute path='/profile' component={Profile} />
                        <ProtectedRoute path='/shipping' component={ShippingPage} />
                        <ProtectedRoute path='/createorder' component={CreateOrderPage} />
                        <Route path={'/register'} component={Register} />
                        <Route path={'/product/:id'} component={ProductPage} />
                        <Route path={'/cart'} component={CartPage} />
                     </Switch>
                  </main>
               </Container>
               <Footer />
            </CartContextProvider>
         </StoreContextProvider>
      </React.Fragment>
   );
};

export default App;
