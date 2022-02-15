import React from 'react';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      style: [],
    };


  }

  render() {
    return (
      <>
        <div className="image">This is the product image, new component?</div>
        <div className="product-category">{this.props.product.category}</div>
        <div className="product-name">{this.props.product.name}</div>
        <div className="product-price">{this.props.product.default_price} Price from style, not default. Might need a whole style component</div>
        <div className="product-description">{this.props.product.description}</div>
      </>
    );
  }
}

export default ProductDetail;
