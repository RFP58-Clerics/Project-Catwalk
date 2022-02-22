import React from 'react';

const QuantitySelect = (props) => (
  <>
    <option value={props.sku.quantity}>{props.sku.quantity}</option>
  </>
);

export default QuantitySelect;
