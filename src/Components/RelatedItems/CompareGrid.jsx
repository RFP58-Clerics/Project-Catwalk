import React, { useEffect, useState } from 'react';

const CompareGrid = ({ compareObj }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    console.log(compareObj)
  })
  return ready && (
    <div>
      <div className='compare-curr' >{currItemValue}</div>
      <div className='compare-feature' >{feature}</div>
      <div className='compare-related' >{relatedValue}</div>
    </div>
  )
}

export default CompareGrid;