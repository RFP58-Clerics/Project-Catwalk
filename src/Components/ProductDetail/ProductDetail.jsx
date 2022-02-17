import React from 'react';
import axios from 'axios';
import ProductStyles from './ProductStyles.jsx';
import MoreStyles from './MoreStyles.jsx';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      styles: [],
      currentPhoto: null,
      currentProduct: this.props.product,
      currentStyle: {},
    };

    this.changePhoto = this.changePhoto.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
  }

  // get styles
  componentDidMount() {
    axios.get('/itemStyles', {
      params: {
        id: this.props.product.id,
      },
    }).then((results) => {
      this.setState({ currentStyle: results.data.results[0] });
      this.setState({ styles: results.data });
      this.setState({ currentPhoto: results.data.results[0].photos[0].url });
    });
  }

  changePhoto(newPhoto) {
    this.setState({ currentPhoto: newPhoto });
  }

  changeStyle(newStyle) {
    for (let i = 0; i < this.state.styles.results.length; i++) {
      console.log('searching for ', newStyle);
      if (newStyle.style_id === this.state.styles.results[i].style_id) {
        this.setState({ currentStyle: this.state.styles.results[i] });
        console.log('found! Updating to ', this.state.styles.results[i].style_id);
        console.log('CurrentStyle is now: ', this.state.currentStyle);
        break;
      }
    }
  }

  render() {
    return this.state.styles.length === 0 ? null : (
      <div>
        <h3>Overview</h3>
        <div className="product-category">{this.state.currentProduct.category}</div>
        <div className="product-name">{this.state.currentProduct.name}</div>
        <div className="product-price">{this.state.currentStyle.original_price}</div>
        <div className="sale-price"></div>
        <div className="product-description">{this.state.currentProduct.description}</div>
        <img className="default-style" src={this.state.currentPhoto} alt="main style" />
        <div className="style-photo">
          {this.state.currentStyle.photos.map((photo, index) => (
            <ProductStyles photo={photo} key={index} changePhoto={this.changePhoto} />
          ))}
        </div>
        <div className="style-selector">
          {this.state.styles.results.map((style, index) => (
            <MoreStyles style={style} key={index} changeStyle={this.changeStyle} />
          ))}
        </div>
        <img className="share-buttons" src='https://cdn3.iconfinder.com/data/icons/capsocial-round/500/facebook-32.png'></img>
        <img className="share-buttons" src='https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/twitter_circle-32.png'></img>
        <img className="share-buttons" src='https://cdn-icons-png.flaticon.com/32/174/174863.png'></img>
      </div>
    );
  }
}

export default ProductDetail;
