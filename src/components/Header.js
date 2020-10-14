import React, { useContext } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { StoreContext } from '../context/StoreContext';

const Header = (props) => {
   const { state } = useContext(CartContext);
   const { existUser, removeSavedUser } = useContext(StoreContext);

   const handleLogout = () => {
      removeSavedUser(existUser);
      window.location = '/';
   };

   return (
      <header>
         <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
            <Container>
               <LinkContainer to='/'>
                  <Navbar.Brand>Sneaker City</Navbar.Brand>
               </LinkContainer>
               <Navbar.Toggle aria-controls='basic-navbar-nav' />
               <Navbar.Collapse id='basic-navbar-nav'>
                  <Nav className='mr-auto'>
                     <LinkContainer to={`/home`}>
                        <Nav.Link>All</Nav.Link>
                     </LinkContainer>
                     <LinkContainer to={`/home?category=women`}>
                        <Nav.Link>Women</Nav.Link>
                     </LinkContainer>
                     <LinkContainer to={`/home?category=men`}>
                        <Nav.Link>Men</Nav.Link>
                     </LinkContainer>
                  </Nav>
                  <Nav className='ml-auto'>
                     <LinkContainer to='/cart'>
                        <Nav.Link>
                           <i className='fas fa-shopping-cart'></i>
                           {state.itemCount} Cart
                        </Nav.Link>
                     </LinkContainer>
                     {existUser ? (
                        <NavDropdown title={existUser.name} id='username'>
                           <LinkContainer to='/profile'>
                              <NavDropdown.Item>Profile</NavDropdown.Item>
                           </LinkContainer>
                           <NavDropdown.Item onClick={() => handleLogout()}>
                              Logout
                           </NavDropdown.Item>
                        </NavDropdown>
                     ) : (
                        <LinkContainer to='/login'>
                           <Nav.Link>
                              <i className='fas fa-user'></i>
                              Sign In
                           </Nav.Link>
                        </LinkContainer>
                     )}
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>
      </header>
   );
};

export default Header;
