import React, { useState } from 'react';
import RelatedCards from './RelatedCards.jsx';
import './styles.css';

const RelatedList = ({ related, currItem }) => {
  const [index, setIndex] = useState(0);
  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= related.length) {
      newIndex = related.length - 1;
    }
    setIndex(newIndex);
  }
  return (
    <div className='outer-container'>
      <div id='compare-portal'></div>
      {index !== 0 &&
        <button className='carousel-button carousel-button-left' value='<' onClick={() => {updateIndex(index - 1)}}></button>
        }
        <div className='carousel'>
          <div className='related-box' style={{transform: `translateX(-${index * 50}%)`}} >
            {related.map((item, index) => {
              return <RelatedCards relatedItem={item} key={index} pos={index + 1} currItem={currItem} width={{width: '100%'}} total={related.length}/>
            })}
          </div>
        </div>
        {index !== related.length - 2 &&
          <button className='carousel-button carousel-button-right' value='>' onClick={() => {updateIndex(index + 1)}}>
          </button>
          }
    </div>
  )
}

export default RelatedList;