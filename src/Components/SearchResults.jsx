import React from 'react';
import PropTypes from 'prop-types';

const SearchResults = function SearchResults({ products, setProduct }) {
  return (
    <div className="searchResults">
      { products.map((product) => (
        <div
          href="#"
          role="link"
          tabIndex={0}
          onClick={() => setProduct(product)}
          onKeyPress={() => setProduct(product)}
          key={product.id}
        >
          {product.name}
        </div>
      ))}
    </div>
  );
};

SearchResults.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  setProduct: PropTypes.func.isRequired,
};

export default SearchResults;
