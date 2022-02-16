import React from 'react';
import axios from 'axios';
import ProductStyle from './ProductStyle.jsx';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      style: [],
      currentPhoto: null,
      currentProduct: this.props.product,
    };

    this.changePhoto = this.changePhoto.bind(this);
    this.changeProduct = this.changeProduct.bind(this);
  }

  // get styles
  componentDidMount() {
    axios.get('/itemStyles', {
      params: {
        id: this.props.product.id,
      },
    }).then((results) => {
      this.setState({ style: results.data });
      this.setState({ currentPhoto: results.data.results[0].photos[0].url });
    });
  }

  changePhoto(newPhoto) {
    this.setState({ currentPhoto: newPhoto });
  }

  changeProduct(newProduct) {
    this.setState({ currentProduct: newProduct });
  }

  render() {
    return this.state.style.length === 0 ? null : (
      <>
        <div className="product-category">{this.state.currentProduct.category}</div>
        <div className="product-name">{this.state.currentProduct.name}</div>
        <div className="product-price">{this.state.style.results[0].original_price}</div>
        <div className="sale-price"></div>
        <div className="product-description">{this.state.currentProduct.description}</div>
        <img className="default-style" src={this.state.currentPhoto} alt="main style" />
        <div className="style">
          {this.state.style.results[0].photos.map((photo, index) => (
            <ProductStyle photo={photo} key={index} changePhoto={this.changePhoto} />
          ))}
        </div>
        <div className="style-selector">This is where the other styles will go</div>
        <div className="share-buttons">These are where the share buttons will go</div>
      </>
    );
  }
}

export default ProductDetail;
