/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import axios from 'axios';
import React from 'react';

class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starCounts: null,
      recommended: null,
    };
    this.getRatings = this.getRatings.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    this.getRatings();
  }

  componentDidUpdate(prevProps) {
    const { productId } = this.props;
    if (productId !== prevProps.productId) {
      this.getRatings();
    }
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      console.log('enter press here! ');
    }
  }

  getRatings() {
    const { productId } = this.props;
    axios({
      method: 'get',
      url: `reviews/meta/${productId}`,
    })
      .then((res) => {
        this.setState({
          starCounts: res.data.ratings,
          recommended:
          (parseInt(res.data.recommended.true, 10) / (parseInt(res.data.recommended.true, 10)
          + parseInt(res.data.recommended.false, 10))),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { filterReviews, filter } = this.props;
    const { starCounts, recommended } = this.state;

    if (!starCounts) {
      return null;
    }

    const totalReviews = Object.values(starCounts).reduce((a, b) => a + parseInt(b, 10), 0);

    return (
      <div className="ratingBreakdown">
        {
          [1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={filter.includes(i) ? 'highlight' : ''}
              onClick={() => filterReviews(i)}
              onKeyPress={this.handleKeyPress}
              role="button"
              tabIndex="0"
            >
              {i}
              Star
              {i > 1 && 's'}
              &nbsp;
              <progress
                key={i}
                max={100}
                value={(100 * parseInt(starCounts[String(i)], 10)) / totalReviews}
              />
            </div>
          ))
        }
        <div>
          {parseFloat(recommended * 100).toFixed(1)}
          % Recommended&nbsp;
          <progress className="recommendedBar" max={100} value={recommended * 100} />
        </div>
      </div>
    );
  }
}

export default RatingBreakdown;
