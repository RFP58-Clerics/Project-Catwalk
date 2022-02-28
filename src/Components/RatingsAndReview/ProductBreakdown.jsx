/* eslint-disable react/prop-types */
import React from 'react';

function ProductBreakdown({ rating, descriptions }) {
  const left = 400 * (((rating || 0) - 1) / 4);
  return (
    <div className="breakdown">
      <div className="breakdownBar" />
      <div className="breakdownArrow" style={{ left }}>▼</div>
      <div className="breakdownLabel">
        <span>{descriptions[0]}</span>
        <span>{descriptions[2]}</span>
        <span>{descriptions[4]}</span>
      </div>
    </div>
  );
}

export default ProductBreakdown;
