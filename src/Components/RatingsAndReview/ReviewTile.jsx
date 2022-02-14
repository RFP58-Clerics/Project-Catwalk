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
        {JSON.stringify(review)}
      </div>
    )
  }
}

export default ReviewTile;