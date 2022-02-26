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
    event.preventDefault();
    const { copiedQuestions, handleSearch } = this.props;
    const searchedWord = event.target.value;
    this.setState({
      input: searchedWord,
    });

    let newFilter = [];
    if (searchedWord.length >= 3) {
      newFilter = copiedQuestions.filter((question) => (
        question.question_body.toLowerCase().includes(searchedWord.toLowerCase())
      ));
      handleSearch(newFilter);
    } else {
      handleSearch(copiedQuestions);
    }
  }

  render() {
    const { input } = this.state;
    return (
      <form className="searchQuestion">
        <input className="searchQuestionInput" type="text" placeholder="Have a question? Search for answers." value={input} onChange={this.handleChange} />
        <input className="searchButton" type="submit" value="Search" />
      </form>
    );
  }
}

export default Search;
