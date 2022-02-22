import React from 'react';
import StarRatingFetcher from '../RatingsAndReview/StarRatingFetcher.jsx';

const ProductDetails = (props) => {

  function handleClick(event) {
    event.preventDefault();
    document.getElementById("scroll").scrollIntoView({behavior: "smooth"});
  }

  return (
  <>
    <div className="productDetailsContainer" id="productStarRating">
      <StarRatingFetcher productId={props.product.id} />
    </div>
    <div className="productDetailsContainer" id="productReviews"onClick={handleClick}>Read all {props.reviews.length} reviews</div>
    <div className="productDetailsContainer" id="productCategory">{props.product.category}</div>
    <div className="productDetailsContainer" id="productName">{props.product.name}</div>
    <div className="productDetailsContainer" id="productPrice">
      ${props.productPrice}
      <br></br>
      {props.salePrice ? `$${props.salePrice}` : null}
      </div>
    <div className="productDetailsContainer" id="productDescription">{props.product.description}</div>
  </>
  )
}

export default ProductDetails;
