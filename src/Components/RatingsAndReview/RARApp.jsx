import React from 'react';
import axios from 'axios';
import Reviews from './Reviews.jsx';
import StarRatingFetcher from './StarRatingFetcher.jsx';

class RARApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
    };
    this.getReviews = this.getReviews.bind(this);
  }

  componentDidMount() {
    if (this.props.product) {
      // console.log(this.props.product);
      this.getReviews(this.props.product.id);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.product && this.props.product !== prevProps.product) {
      // console.log(this.props.product);
      this.getReviews(this.props.product.id);
    }
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

  render() {
    return (
      <div>
        <div>
          <h3>Ratings and Reviews</h3>
          <StarRatingFetcher productId={this.props.product.id}/>
          {this.state.reviews.length}
          Reviews
        </div>
        <Reviews reviews={this.state.reviews}/>
        Comfort:
        <StarRatingFetcher productId={this.props.product.id} type="Comfort" />
      </div>
    );
  }
}

export default RARApp;
