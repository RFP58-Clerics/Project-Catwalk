import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './styles.css';


const RelatedCards = (props) => {
  const [item, setItem] = useState({name: 'wrong'});
  const [styles, setStyles] = useState({'default?': false});
  const [price, setPrice] = useState('Fwweee')
  useEffect(() => {
    // item.name !== 'wrong' ? null :
    axios.get('/getOne', {
      params: {
        id: props.item
      }
    })
    .then((results) => {
      setItem(results.data);
      axios.get('/itemStyles', {
        params: {
          id: props.item
        }
      })
      .then((results) => {
        // console.log(results.data)
        setStyles(results.data.results[1]);
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
  return (
   <div className='card' data-position={props.pos}>
    {styles['default?']  &&
    <img className='img' src={styles.photos[0].thumbnail_url} ></img>
    }
    <div className='card-text'>
      <ul>{item.name}</ul>
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
  )
}

export default RelatedCards;