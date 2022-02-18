import React from 'react';
import StarRatingFetcher from '../RatingsAndReview/StarRatingFetcher.jsx';

const ProductDetails = (props) => (
  <>
    <StarRatingFetcher productId={props.product.id} />
    <div className="productTotalReviews">Read all {props.reviews.length} reviews</div>
    <div className="productCategory">{props.product.category}</div>
    <div className="productName">{props.product.name}</div>
    <div className="productPrice">${props.productPrice}</div>
    <div className="productDescription">{props.product.description}</div>
  </>
)

export default ProductDetails;
