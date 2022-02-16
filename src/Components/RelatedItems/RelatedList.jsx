import React, { useState } from 'react';
import RelatedCards from './RelatedCards.jsx';
import './styles.css';

const RelatedList = (props) => {
  const [index, setIndex] = useState(0);
  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= props.related.length) {
      newIndex = props.related.length - 1;
    }
    setIndex(newIndex);
  }
  return (
    <div className='outer-container'>
      {index !== 0 &&
        <button className='carousel-button carousel-button-left' onClick={() => {updateIndex(index - 1)}}>
        </button>
        }
        <div className='carousel'>
          <div className='related-box' style={{transform: `translateX(-${index * 50}%)`}} >
            {props.related.map((item, index) => {
              return <RelatedCards item={item} key={index} pos={index + 1} width={{width: '100%'}} total={props.related.length}/>
            })}
          </div>
        </div>
        {index !== props.related.length - 1 &&
          <button className='carousel-button carousel-button-right' onClick={() => {updateIndex(index + 1)}}>
          </button>
          }
    </div>
  )
}

export default RelatedList;