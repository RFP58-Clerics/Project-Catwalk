import React from 'react';

const ProductStyles = (props) => {

 function handleClick(event) {
    event.preventDefault();
    props.changePhoto(props.photo.url);
  }

    return (
        <img className='styleThumbnail' src={props.photo.thumbnail_url} onClick={handleClick} />
    );
}

export default ProductStyles;
