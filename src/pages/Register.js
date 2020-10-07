import React, { useState, useContext } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Axios from 'axios';
import { StoreContext } from '../context/StoreContext';

export const Register = (props) => {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [error, setError] = useState('');
   const { updateSavedUser } = useContext(StoreContext);

   const handleRegister = async (e) => {
      e.preventDefault();
      if (!password || password === '') {
         setError('Password cannot be empty');
         return;
      }
      if (password !== confirmPassword) {
         setError('Passwords do not match');
         return;
      }
      try {
         const response = await Axios.post('/api/users', { name, email, password });
         const user = response.data;
         updateSavedUser(user);
         props.history.push('/cart');
      } catch (error) {
         console.error(error.message);
         if (error.response.data) setError(error.response.data.message);
         else setError(error.message);
      }
   };

   return (
      <FormContainer>
         <Form onSubmit={handleRegister}>
            <h3 className='my-5'>Sign In</h3>
            {error && <Message variant='danger'>{error}</Message>}
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
               Register
            </Button>
         </Form>
      </FormContainer>
   );
};
