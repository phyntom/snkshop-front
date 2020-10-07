import React, { useContext } from 'react';
import Product from '../components/Product';
import { Row, Col } from 'react-bootstrap';
import { StoreContext } from '../context/StoreContext';
import Paginator from '../components/Paginator';
import usePagination from '../components/usePagination';

const HomeScreen = (props) => {
   const { products } = useContext(StoreContext);
   const {
      next,
      prev,
      jump,
      currentData,
      currentPage,
      maxPage,
      startPage,
      endPage,
   } = usePagination(products, 8, 2);

   return (
      <div>
         <h1>Latest Product</h1>
         <Row>
            {currentData().map((product, index) => (
               <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
               </Col>
            ))}
         </Row>
         <Row className={'my-4'}>
            <Col md={6}>
               <Paginator
                  next={next}
                  prev={prev}
                  currentData={currentData}
                  displayPages={3}
                  pageSize={2}
                  currentPage={currentPage}
                  maxPage={maxPage}
                  startPage={startPage}
                  endPage={endPage}
                  jump={jump}
               />
            </Col>
         </Row>
      </div>
   );
};

export default HomeScreen;
