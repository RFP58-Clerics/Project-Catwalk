import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: #2b2b2b;
  color: white;
  font-size: 12px;
  padding: 12px;
  cursor: pointer;
`;

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    let review = this.props.review;
    return (
      <div>
        <h4>{review.summary}</h4>
        {review.rating}
        stars
        <br />
        {review.date}
        <br />
        {review.body}
        <br />
        {JSON.stringify(review.photos[0])}
        <br />
        Helpful?
        <Button>Yes</Button>
        {review.helpfulness}
        <Button>No</Button>
        <Button>Report</Button>
      </div>
    );
  }
}

export default ReviewTile;
