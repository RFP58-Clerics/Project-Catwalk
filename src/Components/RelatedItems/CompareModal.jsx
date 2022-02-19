import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CompareGrid from './CompareGrid.jsx';

const featuresList = (item1, item2) => {
  let obj = {};
  item1.features.map((cat) => {
    obj[cat.feature] = {feature: cat.feature, curr: cat.value, related: null}
  })
  item2.features.map((cat) => {
    if (obj[cat.feature]) {
      obj[cat.feature].related = cat.value;
    } else {
      obj[cat.feature] = {feature: cat.feature, curr: null, related: cat.value};
    }
  })
  return obj;
}

const CompareModal = ({ open, onClose, currItem, relatedItem }) => {
  const [compareList, setCompareList] = useState(null);
  const [curr, setCurr] = useState(null);




  useEffect(() => {
    setCompareList(Object.values(featuresList(currItem, relatedItem)));

  }, []);
  return open && (
    <div>
      <button onClick={onClose}>Close</button>
      <div className='compare-container'>
        <div>{currItem.name}</div>
        <div>Feature</div>
        <div>{relatedItem.name}</div>
        {
        compareList.map((feature, i) => {
          return <CompareGrid compareObj={feature} key={i} />
        })
        }
      </div>
    </div>
  )
}

export default CompareModal;


// useEffect(() => {
//   if (curr) {
//     setCompareList(Object.values(featuresList(currItem, relatedItem)));
//   } else {
//     null;
//   }
// }, [curr]);