import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
const Header = () => {
   return (
      <header>
         <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
            <Container>
               <LinkContainer to='/'>
                  <Navbar.Brand>Sneaker City</Navbar.Brand>
               </LinkContainer>
               <Navbar.Toggle aria-controls='basic-navbar-nav' />
               <Navbar.Collapse id='basic-navbar-nav'>
                  <Nav className='mr-auto'>
                     <LinkContainer to='/'>
                        <Nav.Link>Women</Nav.Link>
                     </LinkContainer>
                     <LinkContainer to='/'>
                        <Nav.Link>Men</Nav.Link>
                     </LinkContainer>
                  </Nav>
                  <Nav className='ml-auto'>
                     <LinkContainer to='/cart'>
                        <Nav.Link>
                           <i className='fas fa-shopping-cart'></i>Cart
                        </Nav.Link>
                     </LinkContainer>
                     <LinkContainer to='/login'>
                        <Nav.Link>
                           <i className='fas fa-user'></i>
                           Sign In
                        </Nav.Link>
                     </LinkContainer>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>
      </header>
   );
};

export default Header;
