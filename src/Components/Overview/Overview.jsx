import React from 'react';
import axios from 'axios';
import _ from 'underscore';
import ProductDetails from './ProductDetails.jsx';
import ProductPhotos from './ProductPhotos.jsx';
import MoreStyles from './MoreStyles.jsx';
import AddToCart from './AddToCart.jsx';
import QuantitySelect from './QuantitySelect.jsx';
import './styles.css';

class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      styles: [],
      currentPhoto: null,
      currentStyle: {},
      reviews: [],
      skus: [],
    };

    this.changePhoto = this.changePhoto.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
    this.getStyles = this.getStyles.bind(this);
    this.getReviews = this.getReviews.bind(this);
  }

  componentDidMount() {
    this.getStyles(this.props.product.id);
    this.getReviews(this.props.product.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.product && this.props.product.id !== prevProps.product.id) {
      this.getStyles(this.props.product.id);
      this.getReviews(this.props.product.id);
    }
  }

  getStyles(id) {
    axios.get('/itemStyles', {
      params: { id },
    }).then((results) => {
      this.setState({ currentStyle: results.data.results[0] });
      this.setState({ styles: results.data });
      this.setState({ currentPhoto: results.data.results[0].photos[0].url });
      this.setState({ skus: _.map(this.state.currentStyle.skus) });
    });
  }

  getReviews(id) {
    axios({
      method: 'get',
      url: `/products/${id}/reviews`,
    })
      .then((res) => {
        this.setState({
          reviews: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  changePhoto(newPhoto) {
    this.setState({ currentPhoto: newPhoto });
  }

  changeStyle(newStyle) {
    for (let i = 0; i < this.state.styles.results.length; i++) {
      if (newStyle.style_id === this.state.styles.results[i].style_id) {
        this.setState({
          currentStyle: this.state.styles.results[i],
          currentPhoto: this.state.styles.results[i].photos[0].url,
          skus: _.map(this.state.styles.results[i].skus),
        });
        break;
      }
    }
  }

  render() {
    return this.state.styles.length === 0 ? null : (
      <div className="overview">
        <img className="currentPhoto" src={this.state.currentPhoto} alt="main style" />
        <br></br>
        <div className="productThumbnails">
          {this.state.currentStyle.photos.map((photo, index) => (
            <>
              <ProductPhotos
                photo={photo}
                key={index}
                changePhoto={this.changePhoto}
              />
              <br />
              <br />
            </>
          ))}
        </div>
        <div className="productDetailsContainer">
          <ProductDetails
            product={this.props.product}
            productPrice={this.state.currentStyle.original_price}
            salePrice={this.state.currentStyle.sale_price}
            reviews={this.state.reviews}
          />
        </div>
        <div className="stylesContainer">
          {this.state.styles.results.map((style, index) => (
            <MoreStyles
              style={style}
              key={index}
              changeStyle={this.changeStyle}
            />
          ))}
        </div>
        <br></br>
        <select className="sizeSelector">
          {this.state.skus.map((sku, index) => (
            <AddToCart
              sku={sku}
              key={index}
            />
          ))}
        </select>
        <button className="cartButton">Add to cart</button>
        <img className="shareButtons" src='https://cdn3.iconfinder.com/data/icons/capsocial-round/500/facebook-32.png' />
        <img className="shareButtons" src='https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/twitter_circle-32.png'/>
        <img className="shareButtons" src='https://cdn-icons-png.flaticon.com/32/174/174863.png' />
      </div>
    );
  }
}

export default Overview;
