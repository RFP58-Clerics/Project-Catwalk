import React from 'react';
import axios from 'axios';
import Reviews from './Reviews.jsx';
import StarRating from './StarRating.jsx';
import StarRatingFetcher from './StarRatingFetcher.jsx';
import NewReviewForm from './NewReviewForm.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import './reviewstyles.css';

const calcAverageRating = (ratings) => {
  const r = [];
  for (let i = 0, keys = Object.keys(ratings); i < keys.length; i += 1) {
    const k = keys[i];
    r[parseInt(k, 10)] = parseInt(ratings[k], 10);
  }

  let starSum = 0;
  let totalReviews = 0;
  for (let i = 1; i < 6; i += 1) {
    if (r[i]) {
      starSum += i * r[i];
      totalReviews += r[i];
    }
  }
  return starSum / totalReviews;
};

class RARApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      sort: 'relevant',
      filter: [],
      meta: {},
      starRating: null,
    };
    this.getReviews = this.getReviews.bind(this);
    this.getMeta = this.getMeta.bind(this);
    this.changeSort = this.changeSort.bind(this);
    this.setReviewFilter = this.setReviewFilter.bind(this);
  }

  componentDidMount() {
    if (this.props.product) {
      // console.log(this.props.product);
      this.getReviews(this.props.product.id);
      this.getMeta(this.props.product.id);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if ((this.props.product && this.props.product.id !== prevProps.product.id) || this.state.sort !== prevState.sort) {
      // console.log(this.props.product);
      this.getReviews(this.props.product.id);
      this.getMeta(this.props.product.id);
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

  getMeta(productId) {
    axios({
      method: 'get',
      url: `reviews/meta/${productId}`,
    })
      .then((res) => (
        this.setState({
          meta: res.data,
          starRating: calcAverageRating(res.data.ratings),
        })
      ))
      .catch((err) => console.log(err));
  }

  changeSort(event) {
    event.preventDefault();
    this.setState({
      sort: event.target.value,
    });
  }

  setReviewFilter(stars) {
    const toggleIncludes = (arr, value) => {
      if (arr.includes(value)) {
        return arr.filter((v) => v !== value);
      }
      return [...arr, value];
    };

    this.setState((state) => ({ filter: toggleIncludes(state.filter, stars) }));
  }

  render() {
    const { product, onClick } = this.props;
    let { reviews } = this.state;
    const {
      filter, meta, starRating, sort,
    } = this.state;

    if (filter.length) {
      reviews = reviews.filter((review) => filter.includes(review.rating));
    }

    const characteristics = meta.characteristics && Object.keys(meta.characteristics).map((key) => (
      <React.Fragment key={key}>
        {key}
        :
        <StarRating rating={parseFloat(meta.characteristics[key].value)} />
      </React.Fragment>
    ));

    return (
      <div className="rarAppTopLevel" onClick={onClick}>
        <div>
          <h3>Ratings and Reviews</h3>
          <StarRating rating={starRating} />
          {reviews.length}
          Reviews
          <br />
          <RatingBreakdown
            filterReviews={this.setReviewFilter}
            filter={filter}
            productId={product.id}
          />
          <NewReviewForm
            getReviews={this.getReviews}
            product={product}
            characteristics={meta.characteristics}
          />
          <label>Sort on:</label>
          <select value={sort} onChange={this.changeSort} name="sort" id="sort">
            <option value="relevant">Relevant</option>
            <option value="helpful">Helpful</option>
            <option value="newest">Newest</option>
          </select>
        </div>
        <Reviews reviews={reviews} />
        { characteristics }
      </div>
    );
  }
}

export default RARApp;
