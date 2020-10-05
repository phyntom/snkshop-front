import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeScreen from './pages/HomePage';
import './App.css';
import { Container } from 'react-bootstrap';
import ProductPage from './pages/ProductPage';

const App = () => {
   return (
      <Router>
         <Header />
         <Container>
            <main className='py-3'>
               <Switch>
                  <Route path='/' exact component={HomeScreen} />
                  <Route path='/product/:id' component={ProductPage} />
               </Switch>
            </main>
         </Container>
         <Footer />
      </Router>
   );
};

export default App;
