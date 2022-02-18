import React from 'react';
import axios from 'axios';
import ProductDetails from './ProductDetails.jsx';
import ProductStyles from './ProductStyles.jsx';
import MoreStyles from './MoreStyles.jsx';
import StarRatingFetcher from '../RatingsAndReview/StarRatingFetcher.jsx';
import './styles.css';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      styles: [],
      currentPhoto: null,
      currentStyle: {},
      reviews: [],
    };

    this.changePhoto = this.changePhoto.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
  }

  componentDidMount() {
    this.getStyles(this.props.product.id)

    axios({
      method: 'get',
      url: `/products/${this.props.product.id}/reviews`,
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

  getStyles(id) {
    axios.get('/itemStyles', {
      params: { id },
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
    console.log('new style is', newStyle);
    for (let i = 0; i < this.state.styles.results.length; i++) {
      console.log('inside loop');
      if (newStyle.style_id === this.state.styles.results[i].style_id) {
        console.log('found!');
        console.log('old currentStyle:', this.state.currentStyle);
        console.log('updating to', this.state.styles.results[i]);
        this.setState({ currentStyle: this.state.styles.results[i] });
        console.log('currentStyle set to', this.state.currentStyle);
        break;
      }
    }
  }

  render() {
    return this.state.styles.length === 0 ? null : (
      <div className="overview">
        <h3>Overview</h3>
        <img className="default-style" src={this.state.currentPhoto} alt="main style" />
        <br></br>
        <div className="style-photo">
          {this.state.currentStyle.photos.map((photo, index) => (
            <>
              <ProductStyles photo={photo} key={index} changePhoto={this.changePhoto} />
              <br />
              <br />
            </>
          ))}
        </div>
        <div className="product-total-reviews">Read all {this.state.reviews.length} reviews</div>
        <StarRatingFetcher productId={this.props.product.id} />
        <div className="productDetails"><ProductDetails product={this.props.product}/></div>
        <div className="style-selector">
          {this.state.styles.results.map((style, index) => (
            <MoreStyles style={style} key={index} changeStyle={this.changeStyle} />
          ))}
        </div>
        <select>
          <option defaultValue="Select Size">Select Size</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
        <button className="add-cart">Add to cart</button>
        <img className="share-buttons" src='https://cdn3.iconfinder.com/data/icons/capsocial-round/500/facebook-32.png'></img>
        <img className="share-buttons" src='https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/twitter_circle-32.png'></img>
        <img className="share-buttons" src='https://cdn-icons-png.flaticon.com/32/174/174863.png'></img>
      </div>
    );
  }
}

export default ProductDetail;
