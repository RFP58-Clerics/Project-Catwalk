import React from 'react';

function SelectQuantity(props) {
  return (
    <option value={props.qty}>{props.qty}</option>
  );
}

export default SelectQuantity;
