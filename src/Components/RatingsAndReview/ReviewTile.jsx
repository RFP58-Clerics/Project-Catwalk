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
<<<<<<< HEAD
        {review.summary}
=======
        <h4>{review.summary}</h4>
        {review.rating} stars <br/>
        {review.date} <br/>
        {review.body} <br/>
        {JSON.stringify(review.photos[0])} <br/>
        Helpful? {review.helpfulness}
>>>>>>> ab5faf2894c35b86be8a1534f0242b99eade919f
      </div>
    )
  }
}

export default ReviewTile;