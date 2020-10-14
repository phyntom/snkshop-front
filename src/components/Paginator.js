import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Paginator = ({ itemsCount, pagesCount, pageSize, currentPage, onPageChange }) => {
   if (pagesCount === 1) return null;
   const pages = _.range(1, pagesCount + 1);
   console.log(pages);

   return (
      <nav>
         <ul className='pagination'>
            {pages.map((page) => (
               <li key={page} className={page === currentPage ? 'page-item active' : 'page-item'}>
                  <button className='page-link' onClick={(e) => onPageChange(page, e)}>
                     {Number(page)}
                  </button>
               </li>
            ))}
         </ul>
      </nav>
   );
};

Paginator.propTypes = {
   itemsCount: PropTypes.number.isRequired,
   pageSize: PropTypes.number.isRequired,
   currentPage: PropTypes.number.isRequired,
   onPageChange: PropTypes.func.isRequired,
};

export default Paginator;
