import React from 'react';
import ReviewTile from './ReviewTile.jsx';

const Reviews = ({reviews}) => {
  return (
    <div>
      {reviews.map((review, key) =>
        <ReviewTile review={review} key={key} />
      )}
    </div>
  )
}

export default Reviews;