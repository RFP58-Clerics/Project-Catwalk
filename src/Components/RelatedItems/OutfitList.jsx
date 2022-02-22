import React, { useEffect, useState } from 'react';
import OutfitCards from './OutfitCards.jsx';

const OutfitList = ({ product }) => {
  const [savedItems, setSavedItems] = useState(null);
  const [storage, setStorage] = useState({...localStorage})
  const [index, setIndex] = useState(0);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= storage.length) {
      newIndex = storage.length - 1;
    }
    setIndex(newIndex);
  }

  useEffect(() => {
    setSavedItems(Object.values(storage));
  }, [storage])

  const addToList = (e) => {
    e.preventDefault();
    localStorage.setItem(product.id, JSON.stringify(product));
    setStorage({...localStorage});
  }

  return (
   <div className='outer-container'>
     <button className='carousel-button carousel-button-left' value='<' onClick={() => {updateIndex(index - 1)}}></button>
        <div className='carousel'>
          <div className='related-box' style={{transform: `translateX(-${index * 50}%)`}} >
     <div className='card' style={{width: '50%'}}>
       <div className='card-grid' onClick={addToList}>
         <img className='img' src=''></img>
         <div className='card-text'>Add Item to Your Outfit List</div>
       </div>
       </div>
     {savedItems &&
     savedItems.map((item, i) => {
     return <OutfitCards item={item} key={i} />
     })
     }
        </div>
     </div>
     {index !== storage.length - 2 &&
          <button className='carousel-button carousel-button-right' value='>' onClick={() => {updateIndex(index + 1)}}>
          </button>
          }
     </div>
  )
}

export default OutfitList;