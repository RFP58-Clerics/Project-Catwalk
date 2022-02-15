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
        <h4>{review.summary}</h4>
        {review.rating} stars <br/>
        {review.date} <br/>
        {review.body} <br/>
        {JSON.stringify(review.photos[0])} <br/>
        Helpful? {review.helpfulness}
      </div>
    )
  }
}

export default ReviewTile;