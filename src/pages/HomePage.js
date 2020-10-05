import React, { useState, useEffect } from 'react';
import Product from '../components/Product';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

const HomeScreen = () => {
   const [products, setProducts] = useState([]);

   useEffect(() => {
      const fetchProduct = async () => {
         const { data } = await axios.get('http://127.0.0.1:5000/api/products');
         console.dir('aimable');
         setProducts(data);
      };
      fetchProduct();
   }, []);

   return (
      <div>
         <h1>Latest Product</h1>
         <Row>
            {products.map((product, index) => (
               <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
               </Col>
            ))}
         </Row>
      </div>
   );
};

export default HomeScreen;
