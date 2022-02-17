import axios from 'axios';
import React from 'react';
import ProductDetail from './ProductDetail/ProductDetail.jsx';
import RelatedApp from './RelatedItems/RelatedApp.jsx';
import RARApp from './RatingsAndReview/RARApp.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productData: [],
      searchTerm: '',
    };
    this.getData = this.getData.bind(this);
    this.searchProducts = this.searchProducts.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      searchTerm: '',
    });
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
        console.log(error);
      });
  }

  searchProducts(event) {
    event.preventDefault();
    this.setState({
      searchTerm: event.target.value,
    });
  }

  render() {
    return this.state.productData.length === 0 ? null : (
      <>
        <div className="top-bar">
          <h1>Logo</h1>
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Search for a product..." value={this.state.searchTerm} onChange={this.searchProducts} />
            <input type="submit" value="Search" />
          </form>
        </div>
        <ProductDetail product={this.state.productData[0]} />
        <RelatedApp product={{id: 40885}} />
        <RARApp product={this.state.productData[0]} />
        <QuestionsAndAnswers product={this.state.productData[0]} />
      </>
    );
  }
}

export default App;
