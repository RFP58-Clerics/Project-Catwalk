import React from 'react';
import PropTypes from 'prop-types';
import './reviewstyles.css';

const StarRating = function StarRating({ rating }) {
  const width = (100 * rating) / 5;
  return (
    <div>
      <div className="starbox">
        <div style={{ width: `${width}%` }}>★★★★★</div>
        <div>☆☆☆☆☆</div>
      </div>
      {rating !== null ? rating.toFixed(1) : '-.-'}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number,
};

export default StarRating;
