import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CompareModal from './CompareModal.jsx';
import StarRatingFetcher from '../RatingsAndReview/StarRatingFetcher.jsx';
import './styles.css';


const RelatedCards = ({ relatedItem, pos, currItem }) => {
  const [item, setItem] = useState({name: 'wrong'});
  const [styles, setStyles] = useState({name: false});
  const [price, setPrice] = useState('Fwweee');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // item.name !== 'wrong' ? null :
    axios.get('/getOne', {
      params: {
        id: relatedItem
      }
    })
    .then((results) => {
      setItem(results.data);
      axios.get('/itemStyles', {
        params: {
          id: relatedItem
        }
      })
      .then((results) => {
        setStyles(results.data.results[0]);
        results.data.results.map((style) => {
          style['default?'] ? setStyles(style) : null;
        })
      })
    })
  }, []);
  // await styles['default?'] === true;
  //       styles.sale_price ? setPrice(styles.sale_price) : setPrice(styles.original_price);
  //       console.log(styles);
  // console.log(styles)
  // conditionally render sales price
  // styles.sale_price ? setPrice('price') : null;

  return !item.id ? null : (
    <>
    <div className='card' data-position={pos} style={{width: '50%'}}>
      <button className='card-button related-button' value='★' onClick={() => setIsOpen(true)}>
      <img className='card-button-img' src="https://img.icons8.com/ios/50/000000/star--v1.png"/>
      </button>
      <CompareModal open={isOpen} currItem={currItem} relatedItem={item} pos={pos} onClose={() => setIsOpen(false)}>Compare!</CompareModal>
      <div className='card-grid'>
      {styles.name  &&
      <img className='img' src={styles.photos[0].thumbnail_url} alt="No Image Available" ></img>
      }
      <div className='card-text'>
        <ul>{item.name}</ul>
        <StarRatingFetcher productId={relatedItem} />
        <li>{item.category}</li>
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

export default RelatedCards;



