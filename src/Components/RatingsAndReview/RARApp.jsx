import React from 'react';
import axios from 'axios';
// import { render, fireEvent } from '../test-utils';
import Reviews from './Reviews.jsx';
import StarRatingFetcher from './StarRatingFetcher.jsx';

class RARApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      sort: 'relevant',
    };
    this.getReviews = this.getReviews.bind(this);
    this.changeSort = this.changeSort.bind(this);
  }

  componentDidMount() {
    if (this.props.product) {
      // console.log(this.props.product);
      this.getReviews(this.props.product.id);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if ((this.props.product && this.props.product !== prevProps.product) || this.state.sort !== prevState.sort) {
      // console.log(this.props.product);
      this.getReviews(this.props.product.id);
    }
  }

  getReviews(id) {
    axios({
      method: 'get',
      url: `/products/${id}/reviews?sort=${this.state.sort}`,
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

  changeSort(event) {
    event.preventDefault();
    this.setState({
      sort: event.target.value,
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
          <br />
          <label>Sort on:</label>
          <select value={this.state.sort} onChange={this.changeSort} name="sort" id="sort">
            <option value="relevant">Relevant</option>
            <option value="helpful">Helpful</option>
            <option value="newest">Newest</option>
          </select>
        </div>
        <Reviews reviews={this.state.reviews}/>
        Comfort:
        <StarRatingFetcher productId={this.props.product.id} type="Comfort" />
        Fit:
        <StarRatingFetcher productId={this.props.product.id} type="Fit" />
        Length:
        <StarRatingFetcher productId={this.props.product.id} type="Length" />
        Quality:
        <StarRatingFetcher productId={this.props.product.id} type="Quality" />
      </div>
    );
  }
}

export default RARApp;
