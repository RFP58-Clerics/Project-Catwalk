import React from 'react';
import RelatedCards from './RelatedCards.jsx';
import './styles.css';

const RelatedList = (props) => {
  return (
    <div className='related-bo'>
      <button className='carousel-button carousel-button--left'>
        </button>
        <div className='carousel'>
          <div className='related-box'>
            {props.related.map((item, index) => {
              return <RelatedCards item={item} key={index} pos={index + 1} />
            })}
          </div>
        </div>
      <button className='carousel-button carousel-button--right'>
        </button>
    </div>
  )
}

export default RelatedList;