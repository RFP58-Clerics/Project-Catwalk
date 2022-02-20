import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OutfitCards = ({ item }) => {
  const [product, setProduct] = useState(JSON.parse(item));
  const [styles, setStyles] = useState({name: false});
  useEffect(() => {
    console.log(product)
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
  }, [])
  return styles.name && (
    <>
       <div className='card' style={{width: '50%'}}>
       <div className='card-grid' >
         <img className='img' src={styles.photos[0].thumbnail_url}></img>
         <div className='card-text'>
         <ul>{product.name}</ul>
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