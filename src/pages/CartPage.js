import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
// import { StoreContext } from '../context/StoreContext';

export const CartPage = (props) => {
   const { state, increase, decrease, removeProduct } = useContext(CartContext);
   const { cartItems, itemCount, total } = state;

   const handleIncrease = (id, size) => {
      increase({ _id: id, size });
   };

   const handleDecrease = (id, size) => {
      decrease({ _id: id, size });
   };

   const handleRemove = (id, size) => {
      removeProduct({ _id: id, size });
   };

   const handleCheckout = () => {
      console.dir(props);
      props.history.push('/login?redirect=shipping');
   };

   return (
      <div>
         <Row>
            <Col md={8}>
               <h3>Shopping Cart</h3>
               <hr />
               {cartItems.length === 0 ? (
                  <Message>
                     Your cart is empty <Link to='/'>Go Back</Link>
                  </Message>
               ) : (
                  <ListGroup variant='flush'>
                     {cartItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                           <Row>
                              <Col md={2}>
                                 <Image src={item.image} alt={item.name} fluid rounded />
                              </Col>
                              <Col md={2}>
                                 <Link to={`/product/${item._id}`}>{item.name}</Link>
                              </Col>
                              <Col md={2}>
                                 ${item.price} x {item.quantity}
                              </Col>
                              <Col md={2}>
                                 {item.size}
                                 {'"'}
                              </Col>
                              <Col md={4}>
                                 <Button
                                    type='button'
                                    variant='light'
                                    onClick={() => handleIncrease(item._id, item.size)}
                                 >
                                    <i className='fas fa-plus' />
                                 </Button>
                                 <Button
                                    type='button'
                                    variant='light'
                                    onClick={() => handleDecrease(item._id, item.size)}
                                 >
                                    <i className='fas fa-minus' />
                                 </Button>
                                 <Button
                                    type='button'
                                    variant='light'
                                    onClick={() => handleRemove(item._id, item.size)}
                                 >
                                    <i className='fas fa-trash' />
                                 </Button>
                              </Col>
                              <Col md={2}></Col>
                           </Row>
                        </ListGroup.Item>
                     ))}
                  </ListGroup>
               )}
            </Col>
            <Col md={4}>
               <Card>
                  <ListGroup variant='flush'>
                     <ListGroup.Item>
                        <h5>Subtotal </h5>
                        <h6>Items - {itemCount}</h6>
                        <h6>${total}</h6>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Button
                           type='button'
                           className='btn-block'
                           disabled={cartItems.length === 0}
                           onClick={() => handleCheckout()}
                        >
                           Checkout
                        </Button>
                     </ListGroup.Item>
                  </ListGroup>
               </Card>
            </Col>
         </Row>
      </div>
   );
};
