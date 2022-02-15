import React from 'react';
import PropTypes from 'prop-types';

const StarRating = function StarRating({ rating }) {
  // if null, placeholder of 0 for now... later will want to change so it looks like a
  // product with a 'null' rating is actually just not rated yet, instead of a 0 rating
  return <div>{rating || 0}</div>;
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default StarRating;
