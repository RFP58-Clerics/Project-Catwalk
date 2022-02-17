import React from 'react';
import ReviewTile from './ReviewTile.jsx';
import './reviewstyles.css';

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
          && <button onClick={this.handleMoreButton}>More Reviews</button>}
      </div>
    );
  }
}

export default Reviews;
