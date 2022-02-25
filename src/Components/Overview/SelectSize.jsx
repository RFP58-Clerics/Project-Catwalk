import React from 'react';

function SelectSize(props) {
  return (
    <option value={JSON.stringify(props.sku)}>{props.sku.size}</option>
  );
}

export default SelectSize;
