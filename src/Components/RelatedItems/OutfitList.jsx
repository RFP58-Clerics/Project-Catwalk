import React, { useEffect, useState } from 'react';
import OutfitCards from './OutfitCards.jsx';

function OutfitList({ product }) {
  const [savedItems, setSavedItems] = useState(null);
  const [storage, setStorage] = useState({ ...localStorage });
  // const [move, setMove] = useState(storage.length)
  const [index, setIndex] = useState(0);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= savedItems.length) {
      newIndex = savedItems.length - 1;
    }
    setIndex(newIndex);
  };

  useEffect(() => {
    if (storage) {
      setSavedItems(Object.values(storage));
    }
  }, [storage]);

  const addToList = (e) => {
    e.preventDefault();
    localStorage.setItem(product.id, JSON.stringify(product));
    setStorage({ ...localStorage });
  };

  return (
    <div className="outer-container">
      {index !== 0
     && (
     <button type="button" className="carousel-button carousel-button-left" value="<" onClick={() => { updateIndex(index - 1); }}>
       <img src="https://img.icons8.com/ios-glyphs/30/000000/chevron-left.png" alt="Unavailable" />
     </button>
     )}
      <div className="carousel">
        <div className="related-box" style={{ transform: `translateX(-${index * 50}%)` }}>
          <div className="card">
            <div className="card-grid" role="button" onClick={addToList}>
              <img className="img add-icon" src="https://img.icons8.com/fluency-systems-regular/96/000000/add--v1.png" alt="Unavailable" />
              <div className="card-text">
                <div>Add to Outfits</div>
              </div>
            </div>
          </div>
          {savedItems
     && savedItems.map((item, i) => <OutfitCards item={item} key={i} setStorage={setStorage} />)}
        </div>
      </div>
      {savedItems && index < savedItems.length - 4
          && (
          <button type="button" className="carousel-button carousel-button-right" value=">" onClick={() => { updateIndex(index + 1); }}>
            <img src="https://img.icons8.com/ios-glyphs/30/000000/chevron-right.png" alt="Unavailable" />
          </button>
          )}
    </div>
  );
}

export default OutfitList;
