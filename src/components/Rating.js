import React from 'react';
import PropTypes from 'prop-types';

const Rating = (props) => {
   const { value, text, color } = props;
   return (
      <div className='rating'>
         <span>
            <i
               className={
                  value >= 1 ? 'fas fa-star' : value >= 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'
               }
               style={{ color }}
            />
         </span>
         <span>
            <i
               className={
                  value >= 2 ? 'fas fa-star' : value >= 1.5 ? 'fas fa-star-half-alt' : 'far fa-star'
               }
               style={{ color }}
            />
         </span>
         <span>
            <i
               className={
                  value >= 3 ? 'fas fa-star' : value >= 2.5 ? 'fas fa-star-half-alt' : 'far fa-star'
               }
               style={{ color }}
            />
         </span>
         <span>
            <i
               className={
                  value >= 4 ? 'fas fa-star' : value >= 3.5 ? 'fas fa-star-half-alt' : 'far fa-star'
               }
               style={{ color }}
            />
         </span>
         <span>
            <i
               className={
                  value >= 5 ? 'fas fa-star' : value >= 4.5 ? 'fas fa-star-half-alt' : 'far fa-star'
               }
               style={{ color }}
            />
         </span>
         <span className='px-1'>{text.length > 0 && text}</span>
      </div>
   );
};

Rating.defaultProps = {
   color: '#D48B19',
   value: 0,
};

Rating.propTypes = {
   value: PropTypes.number.isRequired,
   text: PropTypes.string.isRequired,
   color: PropTypes.string,
};

export default Rating;
