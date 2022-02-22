import React from 'react';

const AddToCart = (props) => {
  return (
    <>
      <option value={props.sku.size}>{props.sku.size}</option>
      <button className="overview" id="cartButton">Add to cart</button>
    </>
  )
};

export default AddToCart;
