import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    // console.log('etv: ', event.target.value);
    // console.log('etv: ', event.target.value.length);
    this.setState({ input: event.target.value });
    const searchedWord = event.target.value;
    let newFilter = [];
    if (searchedWord.length >= 3) {
      console.log('im in IF block');
      newFilter = this.props.questions.filter((question) => (
        question.question_body.toLowerCase().includes(searchedWord.toLowerCase())
      ));
      // console.log('newFilter: ', newFilter);
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
