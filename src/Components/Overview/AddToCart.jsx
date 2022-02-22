import React from 'react';

const AddToCart = (props) => (
  <>
    <option value={props.sku.size}>{props.sku.size}</option>
  </>
);

export default AddToCart;
