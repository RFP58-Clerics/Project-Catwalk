import React from 'react';

function SelectQuantity(props) {
  return (
    <option value={props.sku.quantity}>{props.sku.quantity}</option>
  );
}

export default SelectQuantity;
