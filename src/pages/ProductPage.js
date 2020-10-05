import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';

const ProductPage = (props) => {
   const { id } = props.match.params;
   const [products, setProducts] = useState([]);
   const product = products.find((item) => item._id === id);
   console.log(id);
   return (
      <>
         <Link className='btn btn-dark my-3' to='/'>
            Go Back
         </Link>
         <Row>
            <Col md={6}>
               <Image src={product.image} fluid />
            </Col>
            <Col md={3}>
               <ListGroup variant='flush'>
                  <ListGroup.Item>
                     <span className='lead'>{product.name}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                     <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                  </ListGroup.Item>
                  <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                  <ListGroup.Item>Description: {product.description}</ListGroup.Item>
               </ListGroup>
            </Col>
            <Col md={3}>
               <Card>
                  <ListGroup variant='flush'>
                     <ListGroup.Item>
                        <Row>
                           <Col>Price</Col>
                           <Col>
                              <strong>${product.price}</strong>
                           </Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Status</Col>
                           <Col>
                              <strong>
                                 {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                              </strong>
                           </Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Button
                           className='btn-block'
                           type='button'
                           disabled={product.countInStock === 0}
                        >
                           Add to Cart
                        </Button>
                     </ListGroup.Item>
                  </ListGroup>
               </Card>
            </Col>
         </Row>
      </>
   );
};

export default ProductPage;
