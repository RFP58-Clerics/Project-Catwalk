import React from 'react';


const ProductDetail = (props) => (
  console.log(props),
  <>
    <div className='logo'>This is the logo</div>
    <div className='search'>This is the search bar</div>
    <div className='image'>This is the product image</div>
    <div className='product-name'>{props.product.name}</div>
    <div className='product-description'>{props.product.description}</div>
    <div className='product-price'>{props.product.default_price}</div>
  </>
)

export default ProductDetail;