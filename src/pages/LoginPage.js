import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import axios from 'axios';
import { getInStorage } from '../utils/persistStorage';
import Message from '../components/Message';
import { StoreContext } from '../context/StoreContext';

export const LoginPage = (props) => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');
   const { updateSavedUser } = useContext(StoreContext);
   const userExist = getInStorage('user');

   const { location, history } = props;

   const redirect = location.search ? location.search.split('=')[1] : '/';

   useEffect(() => {
      if (userExist) {
         history.push(redirect);
      }
   }, [history, redirect, userExist]);

   const submitHandler = async (e) => {
      e.preventDefault();
      try {
         let config = {
            headers: {
               'Content-Type': 'application/json',
            },
         };
         const response = await axios.post(
            'api/users/login',
            {
               email,
               password,
            },
            config
         );
         const userData = response.data;
         updateSavedUser(userData);
         history.push(`/${redirect}`);
      } catch (error) {
         if (error.response.data) setError(error.response.data.message);
         else setError(error.message);
      }
   };

   return (
      <FormContainer>
         <h3 className='my-5'>Sign In</h3>
         {error && <Message variant='danger'>{error}</Message>}
         <Form onSubmit={submitHandler}>
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
            <Button type='submit' variant='primary'>
               Sign In
            </Button>
            <Row className='py-3'>
               <Col>
                  New User ?{' '}
                  <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                     Register
                  </Link>
               </Col>
            </Row>
         </Form>
      </FormContainer>
   );
};
