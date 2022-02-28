/* eslint-disable react/prop-types */
import React from 'react';
import './reviewstyles.css';
import styled from 'styled-components';
import ReviewTile from './ReviewTile.jsx';

const Button = styled.button`
  background: #2b2b2b;
  color: white;
  font-size: 12px;
  padding: 12px;
  cursor: pointer;
  width: fit-content;
  height: fit-content;
  border-radius: 0.25rem;
`;

class Reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showCount: 2,
    };

    this.handleMoreButton = this.handleMoreButton.bind(this);
  }

  handleMoreButton(event) {
    event.preventDefault();
    this.setState((oldState) => ({ showCount: oldState.showCount + 2 }));
  }

  render() {
    const { reviews } = this.props;
    const { showCount } = this.state;
    const slicedReviews = reviews.slice(0, showCount);
    return (
      <div>
        <div className="scrollReviews">
          {slicedReviews.map((review, key) => <ReviewTile review={review} key={key} />)}
        </div>
        { showCount < reviews.length
          && <Button onClick={this.handleMoreButton}>More Reviews</Button>}
      </div>
    );
  }
}

export default Reviews;
