import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
const Product = (props) => {
   const { product } = props;
   return (
      <Card className='my-1 py-3 rounded'>
         <a href={`/product/${product._id}`}>
            <Card.Img variant='top' src={`${product.image}`} />
         </a>
         <Card.Body>
            <Card.Title as='div'>
               <p className='font-weight-normal'>{product.name}</p>
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
