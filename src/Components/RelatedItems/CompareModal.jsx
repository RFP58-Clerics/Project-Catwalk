import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import CompareGrid from './CompareGrid.jsx';

const featuresList = (item1, item2) => {
  const obj = {};
  item1.features.map((cat) => {
    obj[cat.feature] = { feature: cat.feature, curr: cat.value, related: null };
  });
  item2.features.map((cat) => {
    if (obj[cat.feature]) {
      obj[cat.feature].related = cat.value;
    } else {
      obj[cat.feature] = { feature: cat.feature, curr: null, related: cat.value };
    }
  });
  return obj;
};

const CompareModal = ({
  open, onClose, currItem, relatedItem,
}) => {
  const [compareList, setCompareList] = useState(null);
  // const [curr, setCurr] = useState(null);

  useEffect(() => {
    setCompareList(Object.values(featuresList(currItem, relatedItem)));
  }, []);
  return open && ReactDom.createPortal(

    <div>
      <button type="button" className="compare-button" onClick={onClose}>
        <img className="card-button-img" src="https://img.icons8.com/windows/32/000000/xbox-x.png" alt="Unavailable" />
      </button>
      <div className="compare-container">
        <div className="compare-title">{currItem.name}</div>
        <div className="compare-title">Feature</div>
        <div className="compare-title">{relatedItem.name}</div>
        {
        compareList.map((feature, i) => <CompareGrid compareObj={feature} key={i} />)
        }
      </div>
    </div>,
    document.getElementById('compare-portal'),
  );
};

export default CompareModal;
