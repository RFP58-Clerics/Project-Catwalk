import React from 'react';

const AddToCart = (props) => {
  if (props.sku.quantity > 2) {
  return (
  <option value={props.sku.size}>{props.sku.size}</option>
  )} else {
    return (
    <option value={'not available'}></option>
    )
  }


};

export default AddToCart;
