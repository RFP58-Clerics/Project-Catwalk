import React from 'react';
import StarRatingFetcher from '../RatingsAndReview/StarRatingFetcher.jsx';

function ProductDetails(props) {
  function handleClick(e) {
    e.preventDefault();
    document.getElementById('scroll').scrollIntoView({ behavior: 'smooth' });
  }

  return props.salePrice ? (
    <>
      <div className="catRev">
        <div className="productCategory">{props.product.category}</div>
        <div className="revs">
          <div className="productStarRating">
            <StarRatingFetcher productId={props.product.id} />
          </div>
          <div className="productReviews" onClick={handleClick}>
            Read all
            {' '}
            {props.reviews.length}
            {' '}
            reviews
          </div>
        </div>
      </div>
      <div className="nameGang">
        <div className="productName">{props.product.name}</div>
        <div className="productSlogan">{props.product.slogan}</div>
      </div>
      <div className="productPriceSale">
        $
        {props.productPrice}
      </div>
      <div className="salePrice">
        $
        {props.salePrice}
      </div>
      <div className="productDescription" id="productDescription">{props.product.description}</div>
    </>
  ) : (
    <>
      <div className="catRev">
        <div className="productCategory">{props.product.category}</div>
        <div className="revs">
          <div className="productStarRating">
            <StarRatingFetcher productId={props.product.id} />
          </div>
          <div className="productReviews" onClick={handleClick}>
            Read all
            {' '}
            {props.reviews.length}
            {' '}
            reviews
          </div>
        </div>
      </div>
      <div className="nameGang">
        <div className="productName">{props.product.name}</div>
        <div className="productSlogan">{props.product.slogan}</div>
      </div>
      <div className="productPriceNoSale">
        $
        {props.productPrice}
      </div>
      <div className="productDescription">{props.product.description}</div>
    </>
  );
}

export default ProductDetails;
