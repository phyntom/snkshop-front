import React, { useContext, useState, useEffect } from 'react';
import Product from '../components/Product';
import { Row, Col, Form, InputGroup, FormControl } from 'react-bootstrap';
import { StoreContext } from '../context/StoreContext';
import Paginator from '../components/Paginator';
import usePagination from '../components/usePagination';

const HomeScreen = (props) => {
   const { products } = useContext(StoreContext);
   const [searchKey, setSearchKey] = useState('');
   const [currentPage, setCurrentPage] = useState(1);
   const [items, setItems] = useState([]);
   const [pageSize, setPageSize] = useState(3);

   useEffect(() => {
      if (products.length > 0) {
         const data = [...products];
         setItems(data.slice(0, pageSize));
      }
   }, [products]);

   const onSearch = (key) => {
      let value = key;
      setSearchKey(value);
      let currentItems = [...products];
      let filteredProducts = currentItems.filter((product) => {
         return (
            product.name.toUpperCase().includes(value.toUpperCase()) ||
            product.brand.toUpperCase().includes(value.toUpperCase()) ||
            product.description.toUpperCase().includes(value.toUpperCase())
         );
      });
      setItems(filteredProducts);
   };

   const onPageChange = (page) => {
      let data = [...products];
      let offset = (page - 1) * pageSize;
      setCurrentPage(page);
      setItems(data.slice(offset, offset + pageSize));
   };

   return (
      <div>
         <h1>Latest Product</h1>
         <Row className={'py-2'}>
            <Col md={4}>
               <InputGroup className='mb-2'>
                  <InputGroup.Prepend>
                     <InputGroup.Text>
                        <i className='fas fa-search'></i>
                     </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                     id='inlineFormInputGroup'
                     value={searchKey}
                     onChange={(e) => onSearch(e.target.value)}
                     placeholder='Search'
                  />
               </InputGroup>
            </Col>
         </Row>
         <Row>
            {items.map((product, index) => (
               <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
               </Col>
            ))}
         </Row>
         <Row className={'my-4'}>
            <Col md={6}>
               <Paginator
                  itemsCount={products.length}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={onPageChange}
               />
            </Col>
         </Row>
      </div>
   );
};

export default HomeScreen;
