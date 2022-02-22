import React from 'react';

const ProductPhotos = (props) => {

 function handleClick(event) {
    event.preventDefault();
    props.changePhoto(props.photo.url);
  }

    return (
        <img id="productPhotos" src={props.photo.thumbnail_url} onClick={handleClick} />
    );
}

export default ProductPhotos;
