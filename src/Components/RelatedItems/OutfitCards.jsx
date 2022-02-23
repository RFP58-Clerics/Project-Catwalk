import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StarRatingFetcher from '../RatingsAndReview/StarRatingFetcher.jsx';

const OutfitCards = ({ item, setStorage }) => {
  const [product, setProduct] = useState(JSON.parse(item));
  const [styles, setStyles] = useState({name: false});
  useEffect(() => {
    setProduct(JSON.parse(item));
  }, [item])
  useEffect(() => {
    axios.get('/itemStyles', {
      params: {
        id: product.id
      }
    })
    .then((results) => {
      setStyles(results.data.results[0]);
      results.data.results.map((style) => {
        style['default?'] ? setStyles(style) : null;
      })
    })
  }, [product])

  const removeItem = () => {
    localStorage.removeItem(product.id)
    setStorage({...localStorage})
    // setProduct(item)
  }
  return styles.name && (
    <>
       <div className='card' style={{width: '50%'}}>
       <button className='card-button related-button' onClick={removeItem}>
       <img className='card-button-img' src="https://img.icons8.com/windows/32/000000/xbox-x.png"/>
       </button>
       <div className='card-grid' >
         <img className='img' src={styles.photos[0].thumbnail_url}></img>
         <div className='card-text'>
         <ul>{product.name}</ul>
         <StarRatingFetcher productId={product.id} />
        <li>{product.category}</li>
        {styles.sale_price &&
        <div>
        <li className='sale'>{styles.sale_price}</li>
        <li className='price'>{styles.original_price}</li>
        </div>
        }
        {!styles.sale_price &&
        <li className='normal'>{styles.original_price}</li>
        }
         </div>
       </div>
    </div>
    </>
  )
}

export default OutfitCards;