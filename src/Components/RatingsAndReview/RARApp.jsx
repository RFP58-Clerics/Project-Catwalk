/* eslint-disable class-methods-use-this */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
import Reviews from './Reviews.jsx';
import StarRating from './StarRating.jsx';
import NewReviewForm from './NewReviewForm.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
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
      meta: {
        characteristics: {},
      },
      starRating: null,
    };
    this.getReviews = this.getReviews.bind(this);
    this.getMeta = this.getMeta.bind(this);
    this.changeSort = this.changeSort.bind(this);
    this.setReviewFilter = this.setReviewFilter.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    const { product } = this.props;
    if (product) {
      this.getReviews(product.id);
      this.getMeta(product.id);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { product } = this.props;
    const { sort } = this.state;
    if ((product && product.id !== prevProps.product.id)
      || sort !== prevState.sort) {
      this.getReviews(product.id);
      this.getMeta(product.id);
    }
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      console.log('enter press here! ');
    }
  }

  getReviews(id) {
    const { sort } = this.state;
    axios({
      method: 'get',
      url: `/products/${id}/reviews?sort=${sort}`,
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

  setReviewFilter(stars) {
    const toggleIncludes = (arr, value) => {
      if (arr.includes(value)) {
        return arr.filter((v) => v !== value);
      }
      return [...arr, value];
    };

    this.setState((state) => ({ filter: toggleIncludes(state.filter, stars) }));
  }

  changeSort(event) {
    event.preventDefault();
    this.setState({
      sort: event.target.value,
    });
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

    const descriptions = {
      rating: ['Poor', 'Fair', 'Average', 'Good', 'Great'],
      Size: ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide'],
      Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
      Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
      Quality: ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
      Length: ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
      Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'],
    };

    const characteristics = meta.characteristics && Object.keys(meta.characteristics).map((key) => (
      <React.Fragment key={key}>
        {key}
        :
        <ProductBreakdown
          rating={parseFloat(meta.characteristics[key].value)}
          descriptions={descriptions[key]}
        />
      </React.Fragment>
    ));

    return (
      <div className="rarApp" onClick={onClick} role="menuitem" tabIndex={0} onKeyPress={this.handleKeyPress} id="scroll">
        <div className="rarBlock">
          <div className="rarBlockLeft">
            <h3 style={{ borderBottom: '1px solid grey' }}>Ratings and Reviews</h3>
            <div>
              <div className="reviewInfo">
                {reviews.length}
                &nbsp;
                Reviews
                <br />
                <NewReviewForm
                  getReviews={this.getReviews}
                  product={product}
                  characteristics={meta.characteristics}
                />
              </div>
              <StarRating rating={starRating} />
            </div>
            <RatingBreakdown
              filterReviews={this.setReviewFilter}
              filter={filter}
              productId={product.id}
            />
            <div className="characteristics">
              {characteristics}
            </div>
          </div>
          <div className="reviewlist">
            <label>Sort on:</label>
            &nbsp;
            <select className="sortSelector" value={sort} onChange={this.changeSort} name="sort" id="sort">
              <option value="relevant">Relevant</option>
              <option value="helpful">Helpful</option>
              <option value="newest">Newest</option>
            </select>
            <Reviews reviews={reviews} />
          </div>
        </div>
      </div>
    );
  }
}

export default RARApp;
