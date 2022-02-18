import React from 'react';
import axios from 'axios';
import ProductDetails from './ProductDetails.jsx';
import ProductStyles from './ProductStyles.jsx';
import MoreStyles from './MoreStyles.jsx';
import './styles.css';

class Overview extends React.Component {
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
    this.getStyles(this.props.product.id);

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
    for (let i = 0; i < this.state.styles.results.length; i++) {
      if (newStyle.style_id === this.state.styles.results[i].style_id) {
        this.setState({ currentStyle: this.state.styles.results[i] });
        break;
      }
    }
  }

  render() {
    return this.state.styles.length === 0 ? null : (
      <div className="overview">
        <h3>Overview</h3>
        <img className="defaultStyle" src={this.state.currentPhoto} alt="main style" />
        <br></br>
        <div className="stylePhotos">
          {this.state.currentStyle.photos.map((photo, index) => (
            <>
              <ProductStyles
                photo={photo}
                key={index}
                changePhoto={this.changePhoto}
              />
              <br />
              <br />
            </>
          ))}
        </div>
        <div className="productDetails">
          <ProductDetails
            product={this.props.product}
            productPrice={this.state.currentStyle.original_price}
            salePrice={this.state.currentStyle.sale_price}
            reviews={this.state.reviews}
          />
        </div>
        <div className="styleSelector">
          {this.state.styles.results.map((style, index) => (
            <MoreStyles
              style={style}
              key={index}
              changeStyle={this.changeStyle}
            />
          ))}
        </div>
        <br />
        <select>
          <option defaultValue="Select Size">Select Size</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
        <button className="addCart">Add to cart</button>
        <br />
        <img className="shareButtons" src='https://cdn3.iconfinder.com/data/icons/capsocial-round/500/facebook-32.png' />
        <img className="shareButtons" src='https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/twitter_circle-32.png' />
        <img className="shareButtons" src='https://cdn-icons-png.flaticon.com/32/174/174863.png' />
      </div>
    );
  }
}

export default Overview;
