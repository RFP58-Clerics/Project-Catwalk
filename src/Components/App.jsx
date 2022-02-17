import axios from 'axios';
import React from 'react';
import ProductDetail from './ProductDetail/ProductDetail.jsx';
import RelatedApp from './RelatedItems/RelatedApp.jsx';
import RARApp from './RatingsAndReview/RARApp.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers.jsx';
import SearchResults from './SearchResults.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productData: [],
      product: null,
      searchTerm: '',
      showSearch: false,
    };
    this.getData = this.getData.bind(this);
    this.searchProducts = this.searchProducts.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showSearch = this.showSearch.bind(this);
    this.hideSearch = this.hideSearch.bind(this);
    this.setProduct = this.setProduct.bind(this);
  }

  componentDidMount() {
    this.getData().then((data) => this.setState({ product: data[0] }));
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      searchTerm: '',
    });
  }

  getData() {
    return axios({
      method: 'get',
      url: '/products?count=200',
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

  setProduct(product) {
    this.setState({ product });
  }

  searchProducts(event) {
    event.preventDefault();
    this.setState({ searchTerm: event.target.value });
  }

  showSearch() {
    this.setState({ showSearch: true });
  }

  hideSearch() {
    this.setState({ showSearch: false });
  }

  render() {
    const {
      searchTerm, productData, product, showSearch,
    } = this.state;
    let searchResults = productData;
    if (searchTerm && searchTerm.length) {
      searchResults = searchResults.filter((prod) => prod.name.toLowerCase()
        .includes(searchTerm.toLowerCase()));
    }

    return product && (
      <>
        <div className="top-bar">
          <h1>Logo</h1>
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Search for a product..." value={searchTerm} onChange={this.searchProducts} onFocus={this.showSearch} onBlur={() => setTimeout(this.hideSearch, 400)} />
            <input type="submit" value="Search" />
          </form>
        </div>
        { showSearch && <SearchResults products={searchResults} setProduct={this.setProduct} /> }
        <ProductDetail product={product} />
        <RelatedApp product={{id: 40885}} />
        <RARApp product={product} />
        <QuestionsAndAnswers product={product} />
      </>
    );
  }
}

export default App;
