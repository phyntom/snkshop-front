import React, { useContext, useState, useEffect } from 'react';
import Product from '../components/Product';
import { Row, Col, Form, InputGroup, FormControl } from 'react-bootstrap';
import { StoreContext } from '../context/StoreContext';
import Paginator from '../components/Paginator';
import Steps from '../components/Steps';

const HomeScreen = (props) => {
   const { products } = useContext(StoreContext);
   const [searchKey, setSearchKey] = useState('');
   const [currentPage, setCurrentPage] = useState(1);
   const [items, setItems] = useState([]);
   const [pageSize, setPageSize] = useState(10);
   const [pagesCount, setPagesCount] = useState(0);
   const { location } = props;

   const category = location.search ? location.search.split('=')[1] : '';

   useEffect(() => {
      function loadProducts() {
         const data = [...products];
         setPagesCount(Math.ceil(products.length / 10));
         setItems(data.slice(0, 10));
      }
      loadProducts();
   }, [products]);

   const onSearch = (key) => {
      const value = key;
      setSearchKey(value);
      let currentItems = [...products];
      if (category) {
         currentItems = currentItems.filter((product) => {
            return product.category.toUpperCase() === category.toUpperCase();
         });
      }
      let filteredProducts = currentItems.filter((product) => {
         return (
            product.name.toUpperCase().includes(value.toUpperCase()) ||
            product.brand.toUpperCase().includes(value.toUpperCase()) ||
            product.description.toUpperCase().includes(value.toUpperCase()) ||
            product.category.toUpperCase().includes(value.toUpperCase()) ||
            product.releaseDate.toUpperCase().includes(value.toUpperCase())
         );
      });
      setPagesCount(Math.ceil(filteredProducts.length / pageSize));
      setItems(filteredProducts.slice(0, 0 + pageSize));
   };

   const onPageChange = (page) => {
      let data = [...products];
      let offset = (page - 1) * pageSize;
      setCurrentPage(page);
      const result = data.slice(offset, offset + pageSize);
      setItems(result);
      console.log(offset);
      console.log(offset + pageSize);
   };

   const onPageSizeChange = (size) => {
      let data = [...products];
      let offset = (currentPage - 1) * size;
      setPageSize(size);
      const result = data.slice(offset, offset + size);
      setPagesCount(Math.ceil(data.length / size));
      setItems(result);
      console.log(result);
   };

   const filterHandler = (key) => {
      const value = key;
      let currentItems = [...products];
      let filteredProducts = [];
      if (!value) {
         filteredProducts = [...products];
      } else {
         filteredProducts = currentItems.filter((product) => {
            return product.category.toUpperCase() === value.toUpperCase();
         });
      }
      setPagesCount(Math.ceil(filteredProducts.length / pageSize));
      if (filteredProducts.length !== items.length) {
         setItems(filteredProducts.slice(0, pageSize));
      }
   };

   useEffect(filterHandler, [category]);

   return (
      <div>
         <h3>Latest Products - {category}</h3>
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
            <Col md={2}>
               <Form.Control
                  as='select'
                  className={'select-pagination'}
                  value={pageSize}
                  onChange={(e) => onPageSizeChange(Number(e.target.value))}
               >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                  <option value={25}>25</option>
               </Form.Control>
            </Col>
            <Col md={6}>
               <Paginator
                  itemsCount={products.length}
                  pagesCount={pagesCount}
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
