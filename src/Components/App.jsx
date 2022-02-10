import React from 'react';
import ProductDetail from './ProductDetail/ProductDetail.jsx';
import RelatedApp from './RelatedItems/RelatedApp.jsx';
import RARApp from './RatingsAndReview/RARApp.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers.jsx';
import axios from 'axios';
import TOKEN from '../config.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productData: []
    }

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData(endpoint) {
    axios({
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/${endpoint}`,
      headers: {'Authorization': TOKEN}
    })
    .then((res) => {
      this.setState({
        productData: res.data
      });
    })
    .catch((error) => {
      console.error(error)
    })
  }

  render() {
    return(
      <div>
        <h1>Team Cleric!!</h1>
        <ProductDetail />
        <RelatedApp />
        <RARApp />
        <QuestionsAndAnswers />
    </div>
    )
  }
}

export default App;