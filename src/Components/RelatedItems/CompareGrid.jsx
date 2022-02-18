import React, { useEffect, useState } from 'react';

const CompareGrid = ({ compareObj }) => {
  const [ready, setReady] = useState(false);
  const [curr, setCurr] = useState(compareObj.curr);
  const [related, setRelated] = useState(compareObj.related);

  useEffect(() => {
    if (curr === true) {
      setCurr('✔')
    } else if (!curr) {
      setCurr(' ')
    }

    if (related === true) {
      setRelated('✔')
    } else if (!related) {
      setRelated(' ')
    }
  }, [])
  return (
    <div className='compare-row'>
      <div className='compare-curr' >{curr}</div>
      <div className='compare-feature' >{compareObj.feature}</div>
      <div className='compare-related' >{related}</div>
    </div>
  )
}

export default CompareGrid;