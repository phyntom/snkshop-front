import React, { useState, useContext } from 'react';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { StoreContext } from '../context/StoreContext';
import Steps from '../components/Steps';
import { customRounder } from '../utils/Formater';
import axios from 'axios';

export const CreateOrderPage = (props) => {
   const { state } = useContext(CartContext);
   const { cartItems, shippingAddress, total, itemCount, addOrder } = state;
   const [errorMsg, setErrorMsg] = useState('');
   const [paymentMethod, setPaymentMethod] = useState('');
   const { existUser } = useContext(StoreContext);

   state.itemsPrice = total;
   state.shippingPrice = total > 150 ? 0 : 85;
   state.taxPrice = customRounder(Number(0.15 * total));
   state.totalPrice = customRounder(Number(state.shippingPrice + state.taxPrice) + Number(total));

   const createOrderHandler = async (e) => {
      e.preventDefault();
      const data = {
         orderItems: cartItems,
         shippingAddress: shippingAddress,
         paymentMethod: paymentMethod,
         quantity: itemCount,
         itemsPrice: state.itemsPrice,
         taxtPrice: state.taxPrice,
         shippingPrice: state.shippingPrice,
         totalPrice: state.totalPrice,
      };
      try {
         let config = {
            headers: {
               'Authorization': `Bearer ${existUser.token}`,
               'Content-Type': 'application/json',
            },
         };
         const response = await axios.post('/api/orders', data, config);
         const createdOrder = response.data;
         console.log(createdOrder);
      } catch (error) {
         if (error.response.data) {
            setErrorMsg(error.response.data.message);
         } else setErrorMsg(error.message);
      }
      // addOrder({ ...data });
   };

   return (
      <>
         <Steps step1 step2 step3 />
         <Form onSubmit={createOrderHandler}>
            <Row>
               <Col md={8}>
                  <ListGroup variant='flush'>
                     <ListGroup.Item>
                        <h4>Payment Method</h4>

                        <Form.Group>
                           <Col md={5}>
                              <Form.Check
                                 inline
                                 label='Paypal or Credit Card'
                                 name='paymentMethod'
                                 type='radio'
                                 id='paypal'
                                 value='PayPal'
                                 onChange={(e) => setPaymentMethod(e.target.value)}
                              />
                              <Form.Check
                                 inline
                                 label='Stripe'
                                 name='paymentMethod'
                                 type='radio'
                                 id='stripe'
                                 value='Stripe'
                                 disabled
                              />
                           </Col>
                        </Form.Group>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <h4>Shipping Address</h4>
                        <p>
                           <strong>Address:</strong>
                           {shippingAddress.address},{shippingAddress.city}
                           <br />
                           {shippingAddress.email}, {shippingAddress.country}
                        </p>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <h4>Order Items</h4>
                        {cartItems.length === 0 ? (
                           <Message>Your cart is empty</Message>
                        ) : (
                           <>
                              <ListGroup variant='flush'>
                                 {cartItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                       <Row>
                                          <Col md={1}>
                                             <Image
                                                src={item.image}
                                                alt={item.name}
                                                fluid
                                                rounded
                                             />
                                          </Col>
                                          <Col>
                                             <Link to={`/product/${item._id}`}>{item.name}</Link>
                                          </Col>
                                          <Col md={1}>
                                             {item.size}
                                             {'"'}
                                          </Col>
                                          <Col md={4}>
                                             {item.quantity} x ${item.price} = $
                                             {item.quantity * item.price}
                                          </Col>
                                       </Row>
                                    </ListGroup.Item>
                                 ))}
                              </ListGroup>
                           </>
                        )}
                     </ListGroup.Item>
                  </ListGroup>
               </Col>
               <Col md={4}>
                  <Card>
                     <ListGroup variant='flush'>
                        <ListGroup.Item>
                           <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                           <Row>
                              <Col>Items({itemCount})</Col>
                              <Col>${state.itemsPrice}</Col>
                           </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                           <Row>
                              <Col>Shipping</Col>
                              <Col>${state.shippingPrice}</Col>
                           </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                           <Row>
                              <Col>Tax</Col>
                              <Col>${state.taxPrice}</Col>
                           </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                           <Row>
                              <Col>Total</Col>
                              <Col>${state.totalPrice}</Col>
                           </Row>
                        </ListGroup.Item>
                        {errorMsg && (
                           <ListGroup.Item>
                              <Message variant='danger'>{errorMsg}</Message>
                           </ListGroup.Item>
                        )}
                        <ListGroup.Item>
                           <Button type='submit' className='btn-block' disabled={cartItems === 0}>
                              Create Order
                           </Button>
                        </ListGroup.Item>
                     </ListGroup>
                  </Card>
               </Col>
            </Row>
         </Form>
      </>
   );
};
