import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import './App.css';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';

function App() {
   return (
      <div className='App'>
         <Header />
         <Container>
            <main className='py-3'>
               <HomeScreen />
            </main>
         </Container>
         <Footer />
      </div>
   );
}

export default App;
