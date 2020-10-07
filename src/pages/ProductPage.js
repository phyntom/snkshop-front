import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { CartContext } from '../context/CartContext';
import axios from 'axios';

const ProductPage = (props) => {
   const { id } = props.match.params;
   const [product, setProduct] = useState({});
   const [qty, setQty] = useState(1);
   const [size, setSize] = useState('');
   const [qtyInSize, setQtyInSize] = useState(1);
   // const { fetchProductById } = useContext(StoreContext);
   const { addProduct } = useContext(CartContext);

   // const fetchSelectedProduct = () => {
   //    const selectedProduct = fetchProductById(id);
   //    const initSize = selectedProduct.variants[0].quantity;
   //    setQtyInSize(initSize);
   //    setProduct(selectedProduct);
   // };

   const handleSelectSize = (selectedSize) => {
      const sizeQty = product.variants.find((item) => item.size === selectedSize);
      setSize(selectedSize);
      if (sizeQty) setQtyInSize(parseInt(sizeQty.quantity));
   };

   const handleAddProduct = (currentProduct) => {
      console.log(qty);
      addProduct({ currentProduct, size, qty });
   };

   // useEffect(fetchSelectedProduct, []);

   useEffect(() => {
      const fetchSingleProduct = async () => {
         const res = await axios.get(`/api/products/${id}`);
         setProduct(res.data);
         const initSize = res.data.variants[0].size;
         const initQtyInSize = res.data.variants[0].quantity;
         setSize(initSize);
         setQtyInSize(initQtyInSize);
      };
      fetchSingleProduct();
   }, []);

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
                     <span className='h4'>Brand: {product.brand}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                     <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                  </ListGroup.Item>
                  <ListGroup.Item className='h5'>Price: ${product.price}</ListGroup.Item>
                  <ListGroup.Item>
                     <span className='h5'>Description:</span>{' '}
                     <span className='font-weight-lighter'>{product.description}</span>
                  </ListGroup.Item>
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
                     {product.countInStock > 0 && (
                        <>
                           <ListGroup.Item>
                              <Row>
                                 <Col>Size</Col>
                                 <Col>
                                    <Form.Control
                                       as='select'
                                       value={size}
                                       onChange={(e) => handleSelectSize(e.target.value)}
                                    >
                                       {product.variants.map((item, index) => (
                                          <option key={item._id} value={item.size}>
                                             {item.size}
                                          </option>
                                       ))}
                                    </Form.Control>
                                 </Col>
                              </Row>
                           </ListGroup.Item>
                           <ListGroup.Item>
                              <Row>
                                 <Col>Qty</Col>
                                 <Col>
                                    <Form.Control
                                       as='select'
                                       value={qty}
                                       onChange={(e) => setQty(parseInt(e.target.value))}
                                    >
                                       {[...Array(qtyInSize).keys()].map((item, index) => (
                                          <option key={index + 1} value={index + 1}>
                                             {index + 1}
                                          </option>
                                       ))}
                                    </Form.Control>
                                 </Col>
                              </Row>
                           </ListGroup.Item>
                        </>
                     )}
                     <ListGroup.Item>
                        <Button
                           className='btn-block'
                           type='button'
                           disabled={product.countInStock === 0}
                           onClick={() => handleAddProduct(product)}
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
