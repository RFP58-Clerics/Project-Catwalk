/* eslint-disable react/prop-types */
import React from 'react';
import './reviewstyles.css';

const StarRating = function StarRating({ rating }) {
  let width = (100 * rating) / 5;
  width = (Math.round(width * 4) / 4).toFixed(2);
  // const num = 5.12345;
  // num = parseFloat((Math.round(num * 4) / 4).toFixed(2));
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

export default StarRating;
