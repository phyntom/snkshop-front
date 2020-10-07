import React from 'react';
import React, { useState, useContext } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Axios from 'axios';
import { StoreContext } from '../context/StoreContext';

export const ShippingPage = () => {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [error, setError] = useState('');
   const { updateSavedUser } = useContext(StoreContext);
   return <div></div>;
};
