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
      productData: [],
    };
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios({
      method: 'get',
      url: '/products',
    })
      .then((res) => {
        this.setState({
          productData: res.data,
        });
        return res.data;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return this.state.productData.length === 0 ? null : (
      <>
        <div className='top-bar'>
          <h1>Logo</h1>
          <h1>Search Bar</h1>
        </div>
        <ProductDetail product={this.state.productData[0]}/>
        <RelatedApp product={this.state.productData[0]}/>
        <RARApp product={this.state.productData[0]}/>
        <QuestionsAndAnswers product={this.state.productData[0]}/>
      </>
    );
  }
}

export default App;