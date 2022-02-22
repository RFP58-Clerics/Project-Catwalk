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
  }

  componentDidMount() {
    this.getRatings();
  }

  componentDidUpdate(prevProps) {
    if (this.props.productId !== prevProps.productId) {
      this.getRatings();
    }
  }

  getRatings() {
    axios({
      method: 'get',
      url: `reviews/meta/${this.props.productId}`,
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
              className={filter.includes(i) ? "highlight" : ""}
              onClick={() => filterReviews(i)}
            >
              {i} Star{i > 1 && 's'}&nbsp;
              <progress
                key={i}
                max={100}
                value={(100 * parseInt(starCounts[String(i)], 10)) / totalReviews}
              />
            </div>
          ))
        }
        {parseFloat(recommended * 100).toFixed(1)}% Recommended&nbsp;
        <progress max={100} value={recommended * 100} />
      </div>
    );
  }
}

export default RatingBreakdown;
