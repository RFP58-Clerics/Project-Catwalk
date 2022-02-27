import axios from 'axios';
import React from 'react';
import Overview from './Overview/Overview.jsx';
import RelatedApp from './RelatedItems/RelatedApp.jsx';
import RARApp from './RatingsAndReview/RARApp.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers.jsx';
import SearchResults from './SearchResults.jsx';
import './styles.css';

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
    this.handleInteraction = this.handleInteraction.bind(this);
  }

  componentDidMount() {
    this.getData().then((data) => this.setState({ product: data[7] }));
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      searchTerm: '',
    });
  }

  handleInteraction(event, widge) {
    const elem = event.target;
    const html = elem.outerHTML;

    axios.post('/interactions', {
      element: html,
      widget: widge,
      time: new Date(),
    })
      .catch((err) => {
        console.log(err);
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
        <style>{'body {background-color: gainsboro;}'}</style>
        <div id="qa-portal"></div>
        <div className="top-bar">
          <div id="new-review" />
          <h1>CLERICAL hahahahahah</h1>
          {/* <img className="logoPicture" alt="logo" src="https://www.dndbeyond.com/avatars/thumbnails/6/371/420/618/636272706155064423.png" /> */}
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Search for a product..." value={searchTerm} onChange={this.searchProducts} onFocus={this.showSearch} onBlur={() => setTimeout(this.hideSearch, 400)} />
            <input className="searchButton" type="submit" value="Search" />
          </form>
        </div>
        {showSearch && <SearchResults products={searchResults} setProduct={this.setProduct} /> }
        <Overview product={product} onClick={(event) => this.handleInteraction(event, 'Overview')} />
        <RelatedApp product={product} onClick={(event) => this.handleInteraction(event, 'Related')} />
        <RARApp product={product} onClick={(event) => this.handleInteraction(event, 'RatingsAndReviews')} />
        <QuestionsAndAnswers product={product} onClick={(event) => this.handleInteraction(event, 'QuestionsAndAnswers')} />
      </>
    );
  }
}

export default App;
