import React from 'react';

const MoreStyles = (props) => {

  function handleClick(e) {
    e.preventDefault();
    props.changeStyle(props.style);
  }
    return(
      <img className={'moreStyles'} src={props.style.photos[0].thumbnail_url} onClick={handleClick}></img>
    );
}

export default MoreStyles;
