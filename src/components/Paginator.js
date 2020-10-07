import React from 'react';
import { Pagination } from 'react-bootstrap';
import _ from 'lodash';

const Paginator = (props) => {
   const {
      next,
      prev,
      jump,
      currentPage,
      maxPage,
      startPage,
      currentData,
      endPage,
      pageSize,
   } = props;

   let pages = [];
   pageSize >= currentData.length
      ? (pages = _.range(startPage, endPage))
      : (pages = _.range(startPage, endPage + 1));

   return (
      <Pagination>
         {currentPage > 1 ? <Pagination.Prev onClick={() => prev()} /> : ''}
         {pages.map((page) => (
            <Pagination.Item active={page === currentPage} key={page} onClick={() => jump(page)}>
               {page}
            </Pagination.Item>
         ))}
         {currentPage !== maxPage ? <Pagination.Next onClick={() => next()} /> : ''}
      </Pagination>
   );
};

export default Paginator;

{
   /* {currentPage > displayPages ? (
            <>
               <Pagination.Item active={maxPage === 1} onClick={() => jump(1)}>
                  {1}
               </Pagination.Item>
               <Pagination.Ellipsis />
            </>
         ) : (
            ''
         )} */
}
