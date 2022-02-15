import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedList from './RelatedList.jsx';

const RelatedApp = (props) => {
  const [related, setRelated] = useState([]);
  // let product = JSON.stringify(props.product.id);
  // console.log(props.product.id);
  const getRelated = () => {

      // let id = props.id;
      console.log(props.product.id);
      axios.get('/related', {
        params: {
          id: props.product.id
        }
      })
        .then((results) => {
          console.log('then', results);
          setRelated(results.data);
        })

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

<<<<<<< HEAD
  // };

  useEffect(() => {
    // console.log(related.length)
    // related.length !== 0 ? null : getRelated()
    console.log('rendered')
    getRelated();
  }, []);




=======
  // componentDidMount() {
  //   getRelated();
  // }
>>>>>>> ab5faf2894c35b86be8a1534f0242b99eade919f

  return (
    <div>
      <RelatedList related={related}/>
    </div>
  )
}

export default RelatedApp;