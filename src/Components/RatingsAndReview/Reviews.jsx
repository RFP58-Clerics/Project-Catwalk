import React from 'react';
import ReviewTile from './ReviewTile.jsx';
import './reviewstyles.css';
import styled from 'styled-components';

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
    const reviews = this.props.reviews.slice(0, this.state.showCount);
    return (
      <div>
        <div className="scrollReviews">
          {reviews.map((review, key) => <ReviewTile review={review} key={key} />)}
        </div>
        { this.state.showCount < this.props.reviews.length
          && <Button onClick={this.handleMoreButton}>More Reviews</Button>}
      </div>
    );
  }
}

export default Reviews;
