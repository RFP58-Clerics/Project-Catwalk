import React from 'react';
import ReviewTile from './ReviewTile.jsx';


class Reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  handleMoreButton() {

  }

  render() {
    return (
      <div>
        {this.props.reviews.map((review, key) =>
          <ReviewTile review={review} key={key} />
        )}
        <button>More Reviews</button>
      </div>
    )
  }
}

export default Reviews;