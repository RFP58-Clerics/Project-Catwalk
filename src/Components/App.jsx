import React from 'react';
import ProductDetail from './ProductDetail/ProductDetail.jsx';
import RelatedApp from './RelatedItems/RelatedApp.jsx';
import RARApp from './RatingsAndReview/RARApp.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers.jsx';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productData: []
    }

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData('qa/questions');
  }

  getData() {
    // endpoint = endpoint ? endpoint : 'products';
    // console.log(endpoint);
    axios({
      method: 'get',
      url: `/products`,
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