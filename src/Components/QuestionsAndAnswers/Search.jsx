import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      allQuestions: [],
      prevLength: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const searchedWord = event.target.value;
    this.setState({
      input: searchedWord,
      prevLength: searchedWord.length,
    });
    console.log('searchedWord: ', searchedWord);
    console.log('currentLength: ', searchedWord.length);
    console.log('preLength: ', this.state.prevLength);
    console.log('allQuestions: ', this.props.copiedQuestions);
    let newFilter = [];
    if (searchedWord.length < this.state.prevLength && searchedWord.length > 2) {
      console.log('allQs: ', this.state.allQuestions);
      newFilter = this.props.copiedQuestions.filter((question) => (
        question.question_body.toLowerCase().includes(searchedWord.toLowerCase())
      ));
      this.setState({ prevLength: searchedWord.length });
      this.props.handleSearch(newFilter);
    } else if (searchedWord.length >= 3) {
      console.log('im in IF block');
      newFilter = this.props.questions.filter((question) => (
        question.question_body.toLowerCase().includes(searchedWord.toLowerCase())
      ));
      // console.log('newFilter: ', newFilter);
      this.setState({ prevLength: searchedWord.length });
      this.props.handleSearch(newFilter);
    } else {
      this.props.getQuestions(this.props.productInfo.id);
    }
  }

  render() {
    return (
      <form className="searchQuestion">
        <input type="text" placeholder="Have a question? Search for answers." value={this.state.input} onChange={this.handleChange} />
        <input type="submit" value="Search" />
      </form>

    );
  }
}

export default Search;
