import React from 'react';
import axios from 'axios';
import _ from 'underscore';
import ProductDetails from './ProductDetails.jsx';
import ProductPhotos from './ProductPhotos.jsx';
import MoreStyles from './MoreStyles.jsx';
import SelectSize from './SelectSize.jsx';
import SelectQuantity from './SelectQuantity.jsx';
import './styles.css';

class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      styles: [],
      currentPhoto: null,
      currentStyle: {
        original_price: 0,
        sale_price: 0,
        photos: [],
      },
      reviews: [],
      skus: [],
      qty: [],
      currentQty: 0,
      currentSize: '',
    };

    this.changePhoto = this.changePhoto.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
    this.getStyles = this.getStyles.bind(this);
    this.getReviews = this.getReviews.bind(this);
    this.changeSize = this.changeSize.bind(this);
    this.changeQty = this.changeQty.bind(this);
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
      if (results.data.results.length !== 0) {
        this.setState({ currentStyle: results.data.results[0] });
        this.setState({ styles: results.data });
        this.setState({ currentPhoto: results.data.results[0].photos[0].url });
        this.setState({ skus: _.map(this.state.currentStyle.skus) });
        const newQty = [];
        for (let i = 1; i < this.state.skus[0].quantity + 1; i++) {
          newQty.push(i);
        }
        this.setState({ qty: newQty });
      } else {
        this.setState({ styles: results.data });
      }
    });
  }

  handleClick(e) {
    e.preventDefault();
    axios({
      method: 'post',
      url: '/cart',
    }).then(
      console.log('posted!'),
    );
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

  changeSize(e) {
    e.preventDefault();
    this.setState({ currentSize: JSON.parse(e.target.value).size });
    let arr = [];
    const newQty = JSON.parse(e.target.value).quantity;
    for (let i = 1; i <= newQty; i++) {
      arr.push(i);
      this.setState({ qty: arr });
    }
    arr = [];
  }

  changeQty(e) {
    e.preventDefault();
    this.setState({ currentQty: Number(e.target.value) });
  }

  enlargeImg() {
    const img = document.getElementById('img1');
    img.style.transform = 'scale(1.5)';
    img.style.transition = 'transform 0.25s ease';
    const button = document.getElementById('button1');
    button.style.display = 'inline';
  }

  resetImg() {
    const img = document.getElementById('img1');
    img.style.transform = 'scale(1)';
    img.style.transition = 'transform 0.25s ease';
    const button = document.getElementById('button1');
    button.style.display = 'none';
  }

  render() {
    return this.state.styles.length === 0 ? null : (
      <div className="overview">
        <div className="imgAndButton">
          <button className="resetImgButton" id="button1" onClick={this.resetImg}>X</button>
          <img className="currentPhoto" id="img1" src={this.state.currentPhoto} alt="main style" onClick={this.enlargeImg} />
          <div className="thumbnailWrapper">
            <div className="productThumbnails">
              {this.state.currentStyle ? this.state.currentStyle.photos.map((photo, index) => (
                <ProductPhotos
                  photo={photo}
                  key={index}
                  changePhoto={this.changePhoto}
                />
              )) : null}
            </div>
          </div>
        </div>
        <div className="rightSide">
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
          <div className="cartGang">
            <select className="selectSize" onChange={this.changeSize}>
              <option defaultValue>Select size</option>
              {this.state.skus.map((sku, index) => (
                <SelectSize
                  sku={sku}
                  key={index}
                />
              ))}
            </select>
            <select className="selectQuantity" onChange={this.changeQty}>
              <option defaultValue>Select quantity</option>
              {this.state.qty.map((qty, index) => (
                <SelectQuantity
                  qty={qty}
                  key={index}
                />
              ))}
            </select>
            <button className="cartButton" onClick={this.handleClick}>Add to cart</button>
          </div>
          <div className="shareButtonsContainer">
            <div className="shareButtons">
              <img className="socialImg" src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-facebook_-256.png" />
              <img className="socialImg" src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_instagram-256.png" />
              <img className="socialImg" src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Twitter2_colored_svg-256.png" />
              <img className="socialImg" src="https://cdn1.iconfinder.com/data/icons/logotypes/32/pinterest-256.png" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Overview;
