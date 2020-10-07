import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';
const Product = (props) => {
   const { product } = props;
   return (
      <Card className='my-1 py-3 rounded'>
         <Link to={`/product/${product._id}`}>
            <Card.Img variant='top product-img' src={`${product.image}`} />
         </Link>
         <Card.Body>
            <Card.Title as='div'>
               <Link to={`/product/${product._id}`}>
                  <p className='font-weight-normal'>{product.name}</p>
               </Link>
            </Card.Title>
            <Card.Text as='div'>
               <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </Card.Text>
            <Card.Text as='h3' className='py-1'>
               ${product.price}
            </Card.Text>
         </Card.Body>
      </Card>
   );
};

export default Product;
