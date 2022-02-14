import React from 'react';
import axios from 'axios';


class RARApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: []
    }
  }


  render() {
    return (
      <div>This is Ratings and Review</div>
    )
  }
}

export default RARApp;