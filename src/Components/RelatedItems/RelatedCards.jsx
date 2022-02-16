import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';


const RelatedCards = (props) => {
  const [item, setItem] = useState({name: 'wrong'});
  const [styles, setStyles] = useState({'default?': false});
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
        results.data.results.map((style) => {
          style['default?'] ? setStyles(style) : null;
        })
      })
      // let item = results.data
      // return (
      //   <div>
      //     {item.name}
      //   </div>
      // )
    })
  }, []);
  return (
   <div className='card'>
    {styles['default?']  &&
    <img className='img' src={styles.photos[0].thumbnail_url} ></img>
    }
    <br></br>
     {item.name}<br></br>
     {item.default_price}
   </div>
  )
}

export default RelatedCards;