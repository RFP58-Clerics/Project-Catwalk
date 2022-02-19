/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedList from './RelatedList.jsx';

const RelatedApp = ({ product }) => {
  const [related, setRelated] = useState([]);
  const [curr, setCurr] = useState(null);
  // let product = JSON.stringify(props.product.id);
  // console.log(props.product.id);
  const getRelated = () => {
    axios.get('/related', {
      params: {
        id: product.id
      }
    })
      .then((results) => {
        // console.log('then', results);
        setRelated(results.data);
      })
    // axios.get('/getOne', {
    //   params: {
    //     id: currItem.id
    //   }
    // })
    // .then((results) => {
    //   setCurr(results.data);
    // })
  };
  // const topCarousel = (cards) => {
  //   return (
  //     <div className='carousel'>
  //       <button className='carousel-button carousel-button--left'>
  //       </button>
  //       <div className='carousel-track-container'>
  //         <ul className='carousel-track'>
  //           {cards}
  //         </ul>
  //     </div>
  //     <button className='carousel-button carousel-button--right'>
  //       </button>
  //   )

  // };

  useEffect(() => {
    // console.log(related.length)
    // related.length !== 0 ? null : getRelated()
    // console.log('rendered')
    getRelated()
      axios.get('/getOne', {
        params: {
          id: product.id
        }
      })
      .then((results) => {
        setCurr(results.data);
      })
  }, [product]);

  // useEffect(() => {
  //   axios.get('/getOne', {
  //     params: {
  //       id: product.id
  //     }
  //   })
  //   .then((results) => {
  //     setCurr(results.data);
  //   })
  // }, []);





  return curr && (
    <div>
      <RelatedList related={related} currItem={curr}/>
    </div>
  )
}

export default RelatedApp;