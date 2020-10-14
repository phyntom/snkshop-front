import React, { useState, useContext, useEffect } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import Message from '../components/Message';
// import Axios from 'axios';
// import { StoreContext } from '../context/StoreContext';
import { CartContext } from '../context/CartContext';
import Steps from '../components/Steps';

export const ShippingPage = (props) => {
   const [country, setCountry] = useState('');
   const [city, setCity] = useState('');
   const [phoneNumber, setPhoneNumber] = useState('');
   const [address, setAddress] = useState('');
   const [email, setEmail] = useState('');
   const [errorMsg, setErrorMsg] = useState('');
   const { addShipping, state } = useContext(CartContext);
   const { shippingAddress } = state;

   useEffect(() => {
      if (shippingAddress) {
         setCountry(shippingAddress.country);
         setCity(shippingAddress.city);
         setPhoneNumber(shippingAddress.phoneNumber);
         setEmail(shippingAddress.email);
         setAddress(shippingAddress.address);
      }
   }, [shippingAddress]);

   const { history } = props;

   const addShippingHandler = (e) => {
      e.preventDefault();
      if (country && city && email && phoneNumber && address) {
         addShipping({
            country,
            city,
            email,
            phoneNumber,
            address,
         });
         history.push('/createorder');
      } else {
         setErrorMsg('One or more empty field(s)');
      }
   };
   return (
      <div>
         <Steps step1 step2 />
         <FormContainer>
            <h3 className='my-5'>Delivery Address</h3>
            {errorMsg && <Message variant='danger'>{errorMsg}</Message>}
            <Form onSubmit={addShippingHandler}>
               <Form.Group controlId='countryId'>
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                     type='text'
                     placeholder='Enter your country'
                     value={country}
                     onChange={(e) => setCountry(e.target.value)}
                  ></Form.Control>
               </Form.Group>
               <Form.Group controlId='cityId'>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                     type='text'
                     placeholder='Enter your city'
                     value={city}
                     onChange={(e) => setCity(e.target.value)}
                  ></Form.Control>
               </Form.Group>
               <Form.Group controlId='emailId'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                     type='email'
                     placeholder='Enter your email address'
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
               </Form.Group>
               <Form.Group controlId='phoneNumberId'>
                  <Form.Label>Phone number</Form.Label>
                  <Form.Control
                     type='text'
                     placeholder='Enter your phone number'
                     value={phoneNumber}
                     onChange={(e) => setPhoneNumber(e.target.value)}
                  ></Form.Control>
               </Form.Group>
               <Form.Group controlId='addressId'>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                     type='text'
                     placeholder='Enter your address'
                     value={address}
                     onChange={(e) => setAddress(e.target.value)}
                  ></Form.Control>
               </Form.Group>
               <Button type='submit' variant='primary'>
                  Next
               </Button>
            </Form>
         </FormContainer>
      </div>
   );
};
