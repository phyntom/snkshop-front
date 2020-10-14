import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';
import Message from '../components/FormContainer';

export const Profile = (props) => {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [errorMessage, setErrorMessage] = useState('');

   const { existUser, updateSavedUser } = useContext(StoreContext);

   useEffect(() => {
      const fetchProfile = async () => {
         try {
            let config = {
               headers: {
                  'Authorization': `Bearer ${existUser.token}`,
                  'Content-Type': 'application/json',
               },
            };
            const response = await axios.patch('/api/users', { name, email, password }, config);
            const fecthedUser = response.data;
            setName(fecthedUser.name);
            setEmail(fecthedUser.email);
         } catch (error) {
            if (error.response.data) {
               setErrorMessage(error.response.data.message);
            } else setErrorMessage(error.message);
         }
      };
      fetchProfile();
   });

   const handleUpdate = async (e) => {
      e.preventDefault();
      try {
         let config = {
            headers: {
               'Authorization': `Bearer ${existUser.token}`,
               'Content-Type': 'application/json',
            },
         };
         const response = await axios.patch('/api/users', { name, email, password }, config);
         const updatedUser = response.data;
         updateSavedUser(updatedUser);
      } catch (error) {
         if (error.response.data) setErrorMessage(error.response.data.message);
         else setErrorMessage(error.message);
      }
   };

   return (
      <Row>
         <Col md={4}>
            <Form onSubmit={handleUpdate}>
               <h3 className='my-5'>Sign In</h3>
               {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
               <Form.Group controlId='name'>
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                     type='text'
                     placeholder='Enter name'
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
               </Form.Group>
               <Form.Group controlId='email'>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                     type='email'
                     placeholder='Enter email'
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
               </Form.Group>
               <Form.Group controlId='password'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                     type='password'
                     placeholder='Enter password'
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
               </Form.Group>
               <Form.Group controlId='confirm-password'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                     type='password'
                     placeholder='Confirm password'
                     value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Form.Control>
               </Form.Group>
               <Button type='submit' variant='primary'>
                  Update
               </Button>
            </Form>
         </Col>
         <Col md={8}>
            <h3 className='my-5'>Orders</h3>
         </Col>
      </Row>
   );
};
