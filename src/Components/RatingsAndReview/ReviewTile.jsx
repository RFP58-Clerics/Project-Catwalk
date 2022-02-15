import React from 'react';

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    let review = this.props.review;
    return (
      <div>
        {review.summary}
      </div>
    )
  }
}

export default ReviewTile;