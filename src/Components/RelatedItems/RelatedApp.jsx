import React, { useState } from 'react';
import axios from 'axios';
import RelatedList from './RelatedList.jsx';

const RelatedApp = (props) => {
  const [related, setRelated] = useState([]);
  const getRelated = () => {
    // let id = props.id;
    axios.get('/related', {
      params: {
        id: props.id
      }
    })
      .then((results) => {
        console.log(results.data);
        setRelated(results.data);
      })
  }

  // componentDidMount() {
  //   getRelated();
  // }
  return (
    <div>
      <RelatedList related={related}/>
    </div>
  )
}

export default RelatedApp;