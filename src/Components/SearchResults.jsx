import React from 'react';

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

export default SearchResults;
