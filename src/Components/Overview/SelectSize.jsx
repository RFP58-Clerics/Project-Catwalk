import React from 'react';

function SelectSize(props) {
  return (
    <option value={props.sku.size}>{props.sku.size}</option>
  );
}

export default SelectSize;
