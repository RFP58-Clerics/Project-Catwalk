/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedList from './RelatedList.jsx';
import OutfitList from './OutfitList.jsx';

function RelatedApp({ product }) {
  const [related, setRelated] = useState([]);
  const [curr, setCurr] = useState(null);
  // let product = JSON.stringify(props.product.id);
  // console.log(props.product.id);
  const getRelated = () => {
    axios.get('/related', {
      params: {
        id: product.id,
      },
    })
      .then((results) => {
        setRelated(results.data);
      });
  };

  useEffect(() => {
    getRelated();
    axios.get('/getOne', {
      params: {
        id: product.id,
      },
    })
      .then((results) => {
        setCurr(results.data);
      });
  }, [product]);

  return curr && (
    <div>
      <h3 className="related-header">Related Items</h3>
      <RelatedList related={related} currItem={curr} />
      <h3 className="related-header">Outfit List</h3>
      <OutfitList product={curr} />
    </div>
  );
}

export default RelatedApp;
