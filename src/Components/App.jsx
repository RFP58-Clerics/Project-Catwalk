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
    this.getData();
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
    return this.state.productData.length === 0 ? null : (
      <div>
        <h1>Team Cleric!!</h1>
        <ProductDetail product={this.state.productData[0]}/>
        <RelatedApp product={this.state.productData[0]}/>
        <RARApp product={this.state.productData[0]}/>
        <QuestionsAndAnswers product={this.state.productData[0]}/>
    </div>
    )
  }
}

export default App;