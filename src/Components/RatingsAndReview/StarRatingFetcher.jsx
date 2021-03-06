/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import StarRating from './StarRating.jsx';
import './reviewstyles.css';

const calcAverageRating = (ratings) => {
  const r = [];
  for (let i = 0, keys = Object.keys(ratings); i < keys.length; i += 1) {
    const k = keys[i];
    r[parseInt(k, 10)] = parseInt(ratings[k], 10);
  }

  let starSum = 0;
  let totalReviews = 0;
  for (let i = 1; i < 6; i += 1) {
    if (r[i]) {
      starSum += i * r[i];
      totalReviews += r[i];
    }
  }
  return starSum / totalReviews;
};

// eslint-disable-next-line object-curly-spacing
const StarRatingFetcher = function StarRatingFetcher({productId, type}) {
  const [rating, setRating] = useState(null);
  useEffect(() => {
    if (!productId) {
      return;
    }

    axios({
      method: 'get',
      url: `reviews/meta/${productId}`,
    })
      .then((res) => {
        if (!type) {
          setRating(calcAverageRating(res.data.ratings));
        } else {
          setRating(parseFloat(res.data.characteristics[type].value));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productId, type]);

  return (<StarRating rating={rating} />);
};

export default StarRatingFetcher;
