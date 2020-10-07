import { useState } from 'react';

const usePagination = (data, itemsPerPage, displayPages) => {
   const [currentPage, setCurrentPage] = useState(1);
   const [startPage, setStartPage] = useState(1);
   const [endPage, setEndPage] = useState(displayPages);
   const maxPage = Math.ceil(data.length / itemsPerPage);

   const currentData = () => {
      const begin = (currentPage - 1) * itemsPerPage;
      const end = begin + itemsPerPage;
      return data.slice(begin, end);
   };

   const next = () => {
      // go the next page but never go beyond max
      let actualPage = Math.min(currentPage + 1, maxPage);
      setCurrentPage(actualPage);
      if (actualPage > displayPages) {
         setEndPage(() => Math.min(actualPage + 1, maxPage));
         if (actualPage !== maxPage) {
            setStartPage(() => Math.min(actualPage - 1, maxPage));
         } else {
            setStartPage(() => Math.min(actualPage - 2, maxPage));
         }
      } else {
         setStartPage(1);
         setEndPage(displayPages);
      }
   };

   const prev = () => {
      // go to the previous but never go beyong the first page
      let actualPage = Math.max(currentPage - 1, 1);
      setCurrentPage(actualPage);
      if (actualPage > displayPages) {
         setStartPage(() => Math.max(actualPage - 1, 1));
         setEndPage(Math.max(actualPage + 1, 1));
      } else {
         setStartPage(1);
         setEndPage(displayPages);
      }
   };

   const jump = (page) => {
      // get the current page number between the 1 and the one you give
      const pageNumber = Math.max(1, page);
      // but remain in the range
      let actualPage = Math.min(pageNumber, maxPage);
      setCurrentPage(actualPage);
      if (actualPage >= displayPages) {
         if (actualPage !== maxPage) {
            setStartPage(() => Math.max(actualPage - 1, 1));
         } else {
            setStartPage(() => Math.max(actualPage - 2, 1));
         }
         setEndPage(() => Math.min(actualPage + 1, maxPage));
      } else {
         setStartPage(1);
         setEndPage(displayPages);
      }
   };

   return { next, prev, jump, currentData, currentPage, maxPage, startPage, endPage };
};

export default usePagination;
