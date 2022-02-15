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


<<<<<<< HEAD
=======
  componentDidMount() {
    this.getData();
  }
>>>>>>> ab5faf2894c35b86be8a1534f0242b99eade919f

  getData() {
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

  componentDidMount() {
    this.getData();
  }

  render() {
    return this.state.productData.length === 0 ? null : (
<<<<<<< HEAD
      <div>
        <h1>Team Cleric!!</h1>
=======
      <>
        <div className='top-bar'>
          <h1>Logo</h1>
          <h1>Search Bar</h1>
        </div>
>>>>>>> ab5faf2894c35b86be8a1534f0242b99eade919f
        <ProductDetail product={this.state.productData[0]}/>
        <RelatedApp product={this.state.productData[0]}/>
        <RARApp product={this.state.productData[0]}/>
        <QuestionsAndAnswers product={this.state.productData[0]}/>
    </>
    )
  }
}

export default App;