import React from 'react';

const ProductDetails = (props) => (
  <>
    <div className="product-category">{props.product.category}</div>
    <div className="product-name">{props.product.name}</div>
    <div className="product-price">$money</div>
    <div className="product-description">{props.product.description}</div>
  </>
)


export default ProductDetails;
